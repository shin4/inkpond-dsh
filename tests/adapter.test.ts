// @vitest-environment jsdom
import { beforeEach, afterEach, it, expect, vi } from "vitest";
import { installBackground, AVOID } from "../src/client/adapter";
import { createPreferences, DEFAULTS } from "../src/client/preferences";
let dispose: (() => void) | undefined;
let store: ReturnType<typeof createPreferences>;
const settle = async () => {
	await new Promise((resolve) => setTimeout(resolve, 30));
};
beforeEach(() => {
	document.body.innerHTML =
		'<main data-conversation-content data-conversation-region="chat" data-content-phase="hero"><div data-conversation-scroll><div data-composer-card><button>Send</button></div></div></main>';
	localStorage.clear();
	store = createPreferences(localStorage);
	vi.stubGlobal("requestAnimationFrame", (fn: FrameRequestCallback) =>
		setTimeout(() => fn(performance.now()), 1),
	);
	vi.stubGlobal("cancelAnimationFrame", clearTimeout);
});
afterEach(() => {
	dispose?.();
	dispose = undefined;
	store.destroy();
	document.body.removeAttribute("data-ds-dark-theme");
	vi.unstubAllGlobals();
});
function fake() {
	const destroy = vi.fn();
	const create = vi.fn(() => ({
		destroy,
		setActive: vi.fn(),
		refreshInk: vi.fn(),
		drop: vi.fn(),
		ripple: vi.fn(),
	}));
	return { destroy, create };
}
it("mounts Big fat whale once, avoids controls, and retracts everything on unload", async () => {
	const { create, destroy } = fake();
	dispose = installBackground(store, create);
	expect(create).toHaveBeenCalledTimes(1);
	expect(create.mock.calls[0]).toEqual(
		expect.arrayContaining([expect.objectContaining({ scene: "dafeijing" })]),
	);
	document.querySelector("button")!.textContent = "Send now";
	await settle();
	expect(create).toHaveBeenCalledTimes(1);
	expect(document.querySelector(`[${AVOID}]`)).not.toBeNull();
	dispose();
	dispose = undefined;
	expect(destroy).toHaveBeenCalledTimes(1);
	expect(document.querySelector("canvas")).toBeNull();
	expect(document.querySelector(`[${AVOID}]`)).toBeNull();
	document.body.append(document.createElement("div"));
	await settle();
	expect(create).toHaveBeenCalledTimes(1);
});
it("removes on active conversation by default, supports opt-in, and disables", async () => {
	const { create, destroy } = fake();
	dispose = installBackground(store, create);
	document.querySelector("main")!.setAttribute("data-content-phase", "active");
	await settle();
	expect(destroy).toHaveBeenCalledTimes(1);
	store.update({ scope: "conversation" });
	await settle();
	expect(create).toHaveBeenCalledTimes(2);
	store.update({ enabled: false });
	await settle();
	expect(document.querySelector("canvas")).toBeNull();
});
it("recreates on scene/theme change without retaining old instances", async () => {
	const { create, destroy } = fake();
	dispose = installBackground(store, create);
	store.update({ scene: "qingming", motion: "still" });
	await settle();
	expect(destroy).toHaveBeenCalledTimes(1);
	document.body.setAttribute("data-ds-dark-theme", "");
	await settle();
	expect(destroy).toHaveBeenCalledTimes(2);
	expect(create).toHaveBeenCalledTimes(3);
	expect(document.querySelector("canvas")?.dataset.dark).toBe("true");
});
it("does not decorate embedded right panels or unknown host layouts", () => {
	document.body.innerHTML =
		'<div data-rightbar-col><div data-conversation-content data-conversation-region="chat" data-content-phase="hero"></div></div><div data-conversation-content data-conversation-region="chat" data-content-phase="unknown"></div>';
	const { create } = fake();
	dispose = installBackground(store, create);
	expect(create).not.toHaveBeenCalled();
});
it("fails closed without a mutation/retry loop if canvas creation fails", async () => {
	const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
	const create = vi.fn(() => {
		throw new Error("Canvas unavailable");
	});
	dispose = installBackground(store, create);
	await settle();
	expect(create).toHaveBeenCalledTimes(1);
	expect(document.querySelector("canvas")).toBeNull();
	store.update({ scene: "shanshui" });
	await settle();
	expect(create).toHaveBeenCalledTimes(2);
	warn.mockRestore();
});

it.each(["jieqi", "beiming", "lotus"] as const)("switches to %s and restores the default without leaking canvases", async (scene) => {
	const { create, destroy } = fake();
	dispose = installBackground(store, create);
	store.update({ scene, motion: "still" });
	await settle();
	expect(create.mock.calls.at(-1)).toEqual(expect.arrayContaining([
		expect.objectContaining({ scene, reducedMotion: true }),
	]));
	expect(document.querySelectorAll("canvas")).toHaveLength(1);
	expect(destroy).toHaveBeenCalledTimes(1);
	const reloaded = createPreferences(localStorage);
	expect(reloaded.get().scene).toBe(scene);
	reloaded.destroy();
	store.update(DEFAULTS);
	await settle();
	expect(document.querySelector("canvas")?.dataset.scene).toBe("dafeijing");
	expect(destroy).toHaveBeenCalledTimes(2);
});
