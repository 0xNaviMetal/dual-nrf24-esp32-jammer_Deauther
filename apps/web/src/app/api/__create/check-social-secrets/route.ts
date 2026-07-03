/**
 * ⚠ ANYTHING PLATFORM — DO NOT REWRITE THIS FILE ⚠
 *
 * Dev-only helper for the social sign-in shim. Reports which OAuth credential
 * env vars are missing for a provider so the builder preview can warn that the
 * button won't work once published. Returns 404 outside development.
 */
import { NextResponse } from "next/server";

const REQUIRED_ENV_KEYS: Record<string, string[]> = {
	google: ["GOOGLE_CLIENT_ID", "GOOGLE_CLIENT_SECRET"],
	apple: ["APPLE_CLIENT_ID", "APPLE_CLIENT_SECRET"],
};

export function GET(request: Request) {
	if (process.env.NEXT_PUBLIC_CREATE_ENV !== "DEVELOPMENT") {
		return NextResponse.json({ error: "not found" }, { status: 404 });
	}

	const provider = new URL(request.url).searchParams.get("provider");
	if (!provider || !(provider in REQUIRED_ENV_KEYS)) {
		return NextResponse.json({ error: "invalid provider" }, { status: 400 });
	}

	const missing = REQUIRED_ENV_KEYS[provider].filter(
		(key) => !process.env[key],
	);
	return NextResponse.json({ provider, missing });
}
