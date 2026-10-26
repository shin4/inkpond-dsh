import type { Context } from "@deepseek-ai/cordis";
import { createPreferences } from "./preferences";
import { installBackground } from "./adapter";
import { createSettings } from "./settings";
import css from "./styles.css";

// The narrow host boundary is checked against the installed DSH runtime.
interface ClientContext extends Context {
	slots: {
		inject(name: string, callback: () => () => void): () => void;
		register(
			options: { name: string; key: string },
			component: ReturnType<typeof createSettings>,
		): () => void;
	};
}
export const name = "inkpond";
export const inject = ["slots"];
export function apply(ctx: ClientContext): void {
	ctx.effect(() => {
		let storage: Storage | undefined;
		try {
			storage = window.localStorage;
		} catch {
			/* Private storage may be disabled. */
		}
		const store = createPreferences(storage);
		const style = document.createElement("style");
		style.dataset.inkpond = "";
		style.textContent = css;
		document.head.append(style);
		const stop = installBackground(store);
		const settings = ctx.slots.inject("plugins.bundle.config", () =>
			ctx.slots.register(
				{ name: "plugins.bundle.config", key: "dsh-inkpond" },
				createSettings(store),
			),
		);
		return () => {
			settings();
			stop();
			store.destroy();
			style.remove();
		};
	});
}
