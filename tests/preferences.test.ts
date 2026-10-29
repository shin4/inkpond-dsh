// @vitest-environment jsdom
import { describe, it, expect, vi } from "vitest";
import {
	createPreferences,
	DEFAULTS,
	normalize,
	STORAGE_KEY,
} from "../src/client/preferences";
describe("preferences", () => {
	it("defaults to Big fat whale and rejects corrupt or unexpected values", () => {
		expect(normalize(null)).toEqual(DEFAULTS);
		expect(normalize(null).scene).toBe("dafeijing");
		expect(normalize({ scene: "lotus" }).scene).toBe("lotus");
		expect(
			normalize({
				scene: "unknown",
				strength: NaN,
				motion: "always",
				enabled: "false",
			}),
		).toEqual(DEFAULTS);
		expect(normalize({ strength: 99 }).strength).toBe(0.8);
	});
	it("persists validated settings and synchronizes other windows", () => {
		localStorage.clear();
		const s = createPreferences(localStorage);
		const fn = vi.fn();
		s.subscribe(fn);
		s.update({ scene: "qingming" });
		expect(JSON.parse(localStorage.getItem(STORAGE_KEY)!).scene).toBe(
			"qingming",
		);
		localStorage.setItem(STORAGE_KEY, JSON.stringify({ scene: "shanshui" }));
		window.dispatchEvent(new StorageEvent("storage", { key: STORAGE_KEY }));
		expect(s.get().scene).toBe("shanshui");
		s.destroy();
		const count = fn.mock.calls.length;
		window.dispatchEvent(new StorageEvent("storage", { key: STORAGE_KEY }));
		expect(fn).toHaveBeenCalledTimes(count);
	});
	it("continues in memory when storage is unavailable", () => {
		const s = createPreferences(undefined);
		s.update({ enabled: false });
		expect(s.get().enabled).toBe(false);
		expect(s.isPersistent()).toBe(false);
		s.destroy();
	});
});
