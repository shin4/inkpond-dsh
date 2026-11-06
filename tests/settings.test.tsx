// @vitest-environment jsdom
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, expect, it, vi } from "vitest";
import { createSettings } from "../src/client/settings";
import { createPreferences, DEFAULTS, STORAGE_KEY } from "../src/client/preferences";
import type { UpdateAccess } from "../src/client/updates";

let root: Root | undefined;
let store: ReturnType<typeof createPreferences> | undefined;
afterEach(async () => {
	if (root) await act(async () => root!.unmount());
	root = undefined;
	store?.destroy();
	store = undefined;
	document.body.innerHTML = "";
	document.documentElement.lang = "";
	localStorage.clear();
	vi.unstubAllGlobals();
});
async function render(storage: Storage | undefined = localStorage, lang = "zh") {
	vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
	document.documentElement.lang = lang;
	store = createPreferences(storage);
	const access: UpdateAccess = { supported: () => true, canNavigate: () => true, openManagement: vi.fn(), check: vi.fn(), upgrade: vi.fn() };
	const Settings = createSettings(store, access);
	const container = document.createElement("div");
	document.body.append(container);
	root = createRoot(container);
	await act(async () => root!.render(<Settings />));
	return access;
}
async function choose(value: string) {
	const input = document.querySelector<HTMLInputElement>(`input[type="radio"][value="${value}"]`)!;
	await act(async () => input.click());
	return input;
}
it("connects the redesigned choices to persisted preferences and restores the full defaults", async () => {
	localStorage.setItem(STORAGE_KEY, JSON.stringify({ scene: "lotus", strength: 0.65 }));
	const access = await render();
	expect(document.querySelector<HTMLInputElement>('input[value="lotus"]')!.checked).toBe(true);
	expect(document.querySelector("output")!.textContent).toBe("65%");
	for (const scene of ["shanshui", "qingming", "jieqi", "beiming", "dafeijing", "lotus"]) {
		expect((await choose(scene)).checked).toBe(true);
		expect(store!.get().scene).toBe(scene);
	}
	await choose("conversation");
	await choose("still");
	const toggles = document.querySelectorAll<HTMLInputElement>('[role="switch"]');
	await act(async () => { toggles[0].click(); toggles[1].click(); });
	expect(JSON.parse(localStorage.getItem(STORAGE_KEY)!)).toMatchObject({ scene: "lotus", scope: "conversation", motion: "still", enabled: false, tint: false, strength: 0.65 });
	const reset = [...document.querySelectorAll("button")].find((b) => b.textContent === "恢复默认")!;
	await act(async () => reset.click());
	expect(store!.get()).toEqual(DEFAULTS);
	expect(JSON.parse(localStorage.getItem(STORAGE_KEY)!)).toEqual(DEFAULTS);
	expect(access.check).not.toHaveBeenCalled();
	expect(access.upgrade).not.toHaveBeenCalled();
});
it("retains storage-failure feedback and a safe ordinary repository link in English", async () => {
	await render({ getItem: () => null, setItem: () => { throw new Error("blocked"); } } as unknown as Storage, "en");
	await choose("lotus");
	expect(document.querySelector('[role="status"]')!.textContent).toContain("Storage unavailable");
	const link = document.querySelector<HTMLAnchorElement>(".dsh-inkpond-repository a")!;
	expect(link.href).toBe("https://github.com/shin4/inkpond-dsh");
	expect(link.target).toBe("_blank");
	expect(link.rel).toBe("noopener noreferrer");
	expect(link.textContent).toContain("Star on GitHub");
	expect(document.querySelectorAll('input[type="radio"]')).toHaveLength(10);
});
