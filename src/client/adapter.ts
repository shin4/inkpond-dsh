import { createInkPond, type InkPond } from "inkpond";
import type { Preferences, PreferenceStore } from "./preferences";

export const CONTENT =
	'[data-conversation-content][data-conversation-region="chat"]';
export const AVOID = "data-dsh-inkpond-avoid";
const HOST = "data-dsh-inkpond-host";
export function eligible(host: HTMLElement, prefs: Preferences): boolean {
	const phase = host.getAttribute("data-content-phase");
	return (
		prefs.enabled &&
		!host.closest('[data-rightbar-col], [role="dialog"]') &&
		(phase === "hero" || (prefs.scope === "conversation" && phase === "active"))
	);
}
/** Only the verified host's semantic markers are used. Unknown layouts stay untouched. */
export function installBackground(
	store: PreferenceStore,
	create = createInkPond,
) {
	let stopped = false;
	let scheduled = 0;
	const failures = new WeakMap<HTMLElement, string>();
	const mounts = new Map<
		HTMLElement,
		{
			canvas: HTMLCanvasElement;
			pond: InkPond;
			key: string;
			marked: Set<Element>;
		}
	>();
	const remove = (host: HTMLElement) => {
		const mount = mounts.get(host);
		if (!mount) return;
		mount.pond.destroy();
		mount.canvas.remove();
		host.removeAttribute(HOST);
		for (const element of mount.marked) element.removeAttribute(AVOID);
		mounts.delete(host);
	};
	const markContent = (host: HTMLElement, marked: Set<Element>) => {
		const candidates = new Set<Element>(
			host.querySelectorAll(
				'[data-composer-card],button,a,input,textarea,select,[contenteditable="true"],pre,table,[data-chat-flow],[data-chat-node-key]',
			),
		);
		// The hero stack is bounded by the composer width; avoid its heading too.
		if (host.getAttribute("data-content-phase") === "hero") {
			const card = host.querySelector("[data-composer-card]");
			const seat = host.querySelector("[data-composer-seat]");
			let ancestor = card?.parentElement;
			while (ancestor && ancestor !== seat && seat?.contains(ancestor)) {
				if (
					ancestor.children.length > 1 &&
					ancestor.getBoundingClientRect().height <
						host.getBoundingClientRect().height * 0.75
				)
					candidates.add(ancestor);
				ancestor = ancestor.parentElement;
			}
		}
		for (const element of marked)
			if (!candidates.has(element)) {
				element.removeAttribute(AVOID);
				marked.delete(element);
			}
		for (const element of candidates)
			if (!element.hasAttribute(AVOID)) {
				element.setAttribute(AVOID, "");
				marked.add(element);
			}
	};
	const sync = () => {
		scheduled = 0;
		if (stopped) return;
		const prefs = store.get();
		const dark = document.body.hasAttribute("data-ds-dark-theme");
		const key = JSON.stringify([
			prefs.scene,
			prefs.tint,
			prefs.strength,
			prefs.motion,
			dark,
		]);
		const hosts = new Set(
			Array.from(document.querySelectorAll<HTMLElement>(CONTENT)).filter((h) =>
				eligible(h, prefs),
			),
		);
		for (const [host, mount] of mounts)
			if (!hosts.has(host) || mount.key !== key || !mount.canvas.isConnected)
				remove(host);
		for (const host of hosts) {
			if (failures.get(host) === key) continue;
			const existing = mounts.get(host);
			if (existing) {
				markContent(host, existing.marked);
				continue;
			}
			const canvas = document.createElement("canvas");
			canvas.className = "inkpond dsh-inkpond-canvas";
			canvas.setAttribute("aria-hidden", "true");
			canvas.dataset.scene = prefs.scene;
			canvas.dataset.dark = String(dark);
			host.setAttribute(HOST, "");
			host.prepend(canvas);
			const marked = new Set<Element>();
			markContent(host, marked);
			try {
				const pond = create(canvas, {
					scene: prefs.scene,
					tint: prefs.tint,
					strength: prefs.strength,
					reducedMotion: prefs.motion === "still" ? true : undefined,
					avoidAttribute: AVOID,
					avoidPadding: 16,
					avoidFade: 100,
					tierStorageKey: "dsh-inkpond.tier.v1",
				});
				mounts.set(host, { canvas, pond, key, marked });
			} catch (error) {
				canvas.remove();
				host.removeAttribute(HOST);
				for (const element of marked) element.removeAttribute(AVOID);
				failures.set(host, key);
				console.warn("[dsh-inkpond] Background unavailable", error);
			}
		}
	};
	const schedule = () => {
		if (!stopped && !scheduled) scheduled = requestAnimationFrame(sync);
	};
	const observer = new MutationObserver(schedule);
	observer.observe(document.body, {
		subtree: true,
		childList: true,
		attributes: true,
		attributeFilter: [
			"data-content-phase",
			"data-ds-dark-theme",
			"data-conversation-session",
		],
	});
	const unsubscribe = store.subscribe(schedule);
	sync();
	return () => {
		stopped = true;
		cancelAnimationFrame(scheduled);
		observer.disconnect();
		unsubscribe();
		for (const host of mounts.keys()) remove(host);
	};
}
