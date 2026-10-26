export const STORAGE_KEY = "dsh-inkpond.preferences.v1";
export const SCENES = ["lotus", "shanshui", "qingming"] as const;
export interface Preferences {
	enabled: boolean;
	scene: (typeof SCENES)[number];
	scope: "empty" | "conversation";
	tint: boolean;
	strength: number;
	motion: "system" | "still";
}
export const DEFAULTS: Readonly<Preferences> = Object.freeze({
	enabled: true,
	scene: "lotus",
	scope: "empty",
	tint: true,
	strength: 0.45,
	motion: "system",
});
export function normalize(value: unknown): Preferences {
	const v =
		value && typeof value === "object"
			? (value as Record<string, unknown>)
			: {};
	return {
		enabled: typeof v.enabled === "boolean" ? v.enabled : DEFAULTS.enabled,
		scene: SCENES.includes(v.scene as Preferences["scene"])
			? (v.scene as Preferences["scene"])
			: DEFAULTS.scene,
		scope: v.scope === "conversation" ? "conversation" : "empty",
		tint: typeof v.tint === "boolean" ? v.tint : DEFAULTS.tint,
		strength:
			typeof v.strength === "number" && Number.isFinite(v.strength)
				? Math.max(0.1, Math.min(0.8, v.strength))
				: DEFAULTS.strength,
		motion: v.motion === "still" ? "still" : "system",
	};
}
export function createPreferences(storage?: Storage, target: Window = window) {
	const read = () => {
		try {
			return normalize(JSON.parse(storage?.getItem(STORAGE_KEY) ?? "null"));
		} catch {
			return normalize(null);
		}
	};
	let current = read();
	let persistent = true;
	const listeners = new Set<() => void>();
	const notify = () => listeners.forEach((fn) => fn());
	const onStorage = (event: StorageEvent) => {
		if (event.key !== STORAGE_KEY && event.key !== null) return;
		current = read();
		notify();
	};
	target.addEventListener("storage", onStorage);
	return {
		get: () => current,
		isPersistent: () => persistent,
		subscribe(fn: () => void) {
			listeners.add(fn);
			return () => {
				listeners.delete(fn);
			};
		},
		update(value: Partial<Preferences>) {
			current = normalize({ ...current, ...value });
			try {
				if (!storage) throw new Error("Storage unavailable");
				storage.setItem(STORAGE_KEY, JSON.stringify(current));
				persistent = true;
			} catch {
				persistent = false;
			}
			notify();
		},
		destroy() {
			target.removeEventListener("storage", onStorage);
			listeners.clear();
		},
	};
}
export type PreferenceStore = ReturnType<typeof createPreferences>;
