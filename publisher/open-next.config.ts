import type { OpenNextConfig } from "@opennextjs/aws/types/open-next";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { ReadableStream } from "node:stream/web";

const s3Client = new S3Client({ region: process.env.ASSETS_BUCKET_REGION });

// Helper to build S3 key with project prefix
const getAssetKey = (relativePath: string) => {
  const prefix = process.env.ASSETS_BUCKET_KEY_PREFIX;
  return prefix ? `${prefix}/${relativePath}` : relativePath;
};

const config: OpenNextConfig = {
  appPath: "../../home/user/project/apps/web",
  buildOutputPath: "../../home/user/project/apps/web",
  buildCommand: "node /opt/anything-publisher/run-next-build.mjs",
  // Enable cache interception to bypass Next.js's internal filesystem-based caching
  // This routes cache operations directly through OpenNext's handlers, avoiding
  // errors when Next.js tries to write to /var/task (read-only in Lambda)
  dangerous: {
    enableCacheInterception: true,
  },
  default: {
    override: {
      // Use S3 for incremental cache (ISR/SSG pages and fetch cache)
      // This requires CACHE_BUCKET_NAME, CACHE_BUCKET_REGION, CACHE_BUCKET_KEY_PREFIX env vars
      incrementalCache: "s3",
      // Keep tag cache as dummy since we don't have DynamoDB
      // This means revalidateTag() won't work, but basic ISR/SSG will
      tagCache: "dummy",
    },
  },
  // Asset resolver must be in middleware config (not default.override)
  // It intercepts requests in the routing layer before they reach NextServer
  middleware: {
    external: false,
    // Asset resolver must be a lazy-loaded function that returns the resolver
    assetResolver: () => ({
      name: "s3-asset-resolver",
      maybeGetAssetResult: async (event) => {
        const rawPath = event.rawPath;

        // Next.js builds dynamic-route chunks with the route folder name in the
        // filename, e.g. app/case-studies/[slug]/page-hash.js. The browser
        // percent-encodes the brackets in the URL ([ -> %5B, ] -> %5D). The
        // assets are stored in S3 under the decoded key (with literal brackets).
        // Decode the path before matching and before building the S3 key so the
        // lookup succeeds. decodeURIComponent is safe here: it only decodes
        // percent-escaped octets; a double-encoded path from the build pipeline
        // is not possible since Next.js emits real filesystem paths.
        let path: string;
        try {
          path = decodeURIComponent(rawPath);
        } catch {
          // Malformed percent-encoding; fall back to the raw path and let the
          // S3 lookup fail naturally (NoSuchKey -> undefined -> Next.js routing).
          path = rawPath;
        }

        // Known static asset patterns from Next.js
        // - /_next/static/* - JS, CSS, and other build assets
        // - /_next/data/* - Pre-rendered page data (JSON)
        // - Any path with a static file extension (from public folder)
        const isKnownStaticPath = path.startsWith("/_next/static") || path.startsWith("/_next/data");

        // Static file extensions that might come from public folder
        // These are served at root, not /public/
        const staticExtensions = [
          ".ico", ".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp", ".avif",
          ".woff", ".woff2", ".ttf", ".eot", ".otf",
          ".mp4", ".webm", ".ogg", ".mp3", ".wav",
          ".pdf", ".txt", ".xml", ".json", ".css", ".js",
          ".map", ".webmanifest", ".manifest"
        ];
        const hasStaticExtension = staticExtensions.some(ext => path.toLowerCase().endsWith(ext));

        // Skip if not a potential static asset
        if (!isKnownStaticPath && !hasStaticExtension) {
          return undefined;
        }

        const relativePath = path.startsWith("/") ? path.slice(1) : path;
        const key = getAssetKey(relativePath);

        try {
          const response = await s3Client.send(
            new GetObjectCommand({
              Bucket: process.env.ASSETS_BUCKET_NAME,
              Key: key,
            })
          );

          const body = await response.Body?.transformToByteArray();
          if (!body) {
            return undefined;
          }

          // Determine cache control based on path
          // _next/static files are immutable (hashed filenames)
          // Other files should revalidate
          // Use the decoded path for the immutability check (consistent with key lookup above).
          const isImmutable = path.startsWith("/_next/static");
          const cacheControl = isImmutable
            ? "public, max-age=31536000, immutable"
            : "public, max-age=0, must-revalidate";

          // Create a ReadableStream from the body buffer
          const buffer = Buffer.from(body);
          const stream = new ReadableStream({
            start(controller) {
              controller.enqueue(new Uint8Array(buffer));
              controller.close();
            },
          });

          return {
            type: "core",
            statusCode: 200,
            headers: {
              "content-type": response.ContentType || "application/octet-stream",
              "cache-control": response.CacheControl || cacheControl,
              "content-length": String(buffer.length),
            },
            body: stream,
            isBase64Encoded: false,
          };
        } catch (error: any) {
          // NoSuchKey means the file doesn't exist in S3
          // This is expected for routes that look like static files but aren't
          // For any error, continue to Next.js routing
          return undefined;
        }
      },
    }),
  },
};

export default config;
