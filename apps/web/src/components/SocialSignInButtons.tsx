/**
 * ⚠ ANYTHING PLATFORM — DO NOT REWRITE THIS FILE ⚠
 *
 * Renders the social sign-in buttons on the signin/signup pages. The set of
 * providers comes from NEXT_PUBLIC_CREATE_AUTH_PROVIDERS, which the platform
 * injects from the project's Authentication settings — so a provider only
 * appears here once it's enabled and configured. In the builder preview
 * (NEXT_PUBLIC_CREATE_ENV === 'DEVELOPMENT', inside an iframe) real OAuth can't
 * run, so clicks route to the dev shim; everywhere else they run the real
 * better-auth social flow.
 *
 *   Safe:   restyle the buttons, reorder providers.
 *   Unsafe: bypassing authClient.signIn.social, removing the dev-shim branch.
 */
"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";

const KNOWN_PROVIDERS = ["google", "apple"] as const;
type SocialProvider = (typeof KNOWN_PROVIDERS)[number];

const PROVIDER_LABELS: Record<SocialProvider, string> = {
	google: "Google",
	apple: "Apple",
};

const enabledProviders = (process.env.NEXT_PUBLIC_CREATE_AUTH_PROVIDERS ?? "")
	.split(",")
	.map((p) => p.trim())
	.filter((p): p is SocialProvider =>
		KNOWN_PROVIDERS.includes(p as SocialProvider),
	);

const isDevPreviewIframe = () => {
	if (process.env.NEXT_PUBLIC_CREATE_ENV !== "DEVELOPMENT") return false;
	try {
		return typeof window !== "undefined" && window.self !== window.top;
	} catch {
		// Cross-origin access to window.top throws — that means we're framed.
		return true;
	}
};

export function SocialSignInButtons({ callbackUrl }: { callbackUrl: string }) {
	const [error, setError] = useState<string | null>(null);
	const [pending, setPending] = useState<SocialProvider | null>(null);

	if (enabledProviders.length === 0) {
		return null;
	}

	const onClick = async (provider: SocialProvider) => {
		setError(null);
		setPending(provider);

		if (isDevPreviewIframe()) {
			const params = new URLSearchParams({ provider, callbackUrl });
			window.location.href = `/account/social-dev-shim?${params.toString()}`;
			return;
		}

		const { error: socialError } = await authClient.signIn.social({
			provider,
			callbackURL: callbackUrl,
		});
		if (socialError) {
			setError(
				socialError.message ??
					`Could not sign in with ${PROVIDER_LABELS[provider]}`,
			);
			setPending(null);
		}
	};

	return (
		<div className="flex flex-col gap-[12px]">
			<div className="flex items-center gap-[8px] text-[12px] text-gray-400">
				<span className="h-px flex-1 bg-gray-200" />
				or
				<span className="h-px flex-1 bg-gray-200" />
			</div>

			{enabledProviders.map((provider) => (
				<button
					key={provider}
					type="button"
					disabled={pending !== null}
					onClick={() => {
						void onClick(provider);
					}}
					className="flex items-center justify-center gap-[8px] rounded-[8px] border border-gray-300 bg-white p-[12px] text-[16px] font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
				>
					{pending === provider
						? "Redirecting…"
						: `Continue with ${PROVIDER_LABELS[provider]}`}
				</button>
			))}

			{error && (
				<div className="rounded-[8px] bg-red-50 p-[10px] text-[14px] text-red-600">
					{error}
				</div>
			)}
		</div>
	);
}
