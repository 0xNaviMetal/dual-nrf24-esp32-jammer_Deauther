import AsyncStorage from "@react-native-async-storage/async-storage";
import { usePathname } from "expo-router";
import { useEffect } from "react";
import { Platform } from "react-native";

const VISITOR_ID_KEY = "anything_analytics_visitor_id";

// Mirror the gating used by Sentry / the TestFlight logger: only emit from
// real (production) builds, never from the in-builder dev runtime.
function isActive(): boolean {
	return !__DEV__ && process.env.EXPO_PUBLIC_CREATE_ENV !== "DEVELOPMENT";
}

function generateVisitorId(): string {
	const rand = () => Math.random().toString(36).slice(2);
	return `${rand()}${rand()}`.slice(0, 32);
}

let visitorIdPromise: Promise<string> | null = null;

// Stable, anonymous, per-install id. Not a secret, so AsyncStorage (not the
// keychain) is the right home. Generated once and reused for the install.
function getVisitorId(): Promise<string> {
	if (!visitorIdPromise) {
		visitorIdPromise = (async () => {
			try {
				const existing = await AsyncStorage.getItem(VISITOR_ID_KEY);
				if (existing) return existing;
				const created = generateVisitorId();
				await AsyncStorage.setItem(VISITOR_ID_KEY, created);
				return created;
			} catch {
				// If persistence fails, fall back to a session-scoped id so the
				// current run still attributes its views to one visitor.
				return generateVisitorId();
			}
		})();
	}
	return visitorIdPromise;
}

// Records one screen view per route change. The endpoint enforces the global
// flag and the project's analytics opt-in, dropping events (204) when off, so
// this always fires and the server decides whether to keep it.
export function ScreenViewTracker() {
	const pathname = usePathname();

	useEffect(() => {
		if (!isActive()) return;

		const endpoint = process.env.EXPO_PUBLIC_ANALYTICS_ENDPOINT;
		const host = process.env.EXPO_PUBLIC_HOST;
		const projectGroupId = process.env.EXPO_PUBLIC_PROJECT_GROUP_ID;
		if (!endpoint || !host || !projectGroupId || !pathname) return;

		let cancelled = false;
		void (async () => {
			try {
				const visitorId = await getVisitorId();
				if (cancelled) return;
				await fetch(endpoint, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						d: host,
						p: pathname,
						pgid: projectGroupId,
						vid: visitorId,
						os: Platform.OS,
						dt: "mobile",
					}),
				});
			} catch {
				// Analytics must never crash or block the host app.
			}
		})();

		return () => {
			cancelled = true;
		};
	}, [pathname]);

	return null;
}
