// @vitest-environment jsdom
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, expect, it, vi } from "vitest";
import { createUpdateAccess } from "../src/client/adapter";
import { UpdateSettings, type UpdateAccess } from "../src/client/updates";

let root: Root | undefined;
afterEach(async () => {
	if (root) await act(async () => root!.unmount());
	root = undefined;
	document.body.innerHTML = "";
	vi.unstubAllGlobals();
});
const target = {
	kind: "available" as const,
	installed: "0.3.3",
	version: "0.3.4",
	registry: "https://registry.npmjs.org/",
};
function host(manager: object | undefined) {
	const openList = vi.fn();
	const ctx = {
		get: (name: string) =>
			name === "remote.pluginManager"
				? manager
				: name === "pluginNavigation"
					? { openList }
					: undefined,
	};
	return { access: createUpdateAccess(ctx), openList };
}
function versions(versions: object[]) {
	return {
		ok: true,
		value: {
			status: "listed",
			installed: "0.3.3",
			registry: target.registry,
			versions,
		},
	};
}
const version = (v: string, extra = {}) => ({
	version: v,
	bundle: true,
	prerelease: false,
	...extra,
});

it("keeps rc.5 on native navigation without attempting inspect, removal or installation", async () => {
	const old = {
		inspect: vi.fn(),
		installBundle: vi.fn(),
		removeBundle: vi.fn(),
	};
	const { access, openList } = host(old);
	expect(access.supported()).toBe(false);
	expect(await access.check(new AbortController().signal)).toEqual({
		kind: "unsupported",
	});
	expect(await access.upgrade(target)).toBe("failed");
	access.openManagement();
	expect(openList).toHaveBeenCalledOnce();
	for (const fn of Object.values(old)) expect(fn).not.toHaveBeenCalled();
});

it("checks only this package and chooses a compatible stable version, preserving the answering registry", async () => {
	const listVersions = vi
		.fn()
		.mockResolvedValue(
			versions([
				version("0.4.0", { incompatible: {} }),
				version("0.3.6-beta.1", { prerelease: true }),
				version("0.3.5", { deprecated: "retired" }),
				version("0.3.4"),
			]),
		);
	const updateBundle = vi
		.fn()
		.mockResolvedValue({
			ok: true,
			value: { to: "0.3.4", result: { application: "applied" } },
		});
	const { access } = host({ listVersions, updateBundle });
	const signal = new AbortController().signal;
	expect(await access.check(signal)).toEqual(target);
	expect(listVersions).toHaveBeenCalledWith("dsh-inkpond", {}, signal);
	expect(await access.upgrade(target)).toBe("applied");
	expect(updateBundle).toHaveBeenCalledWith("dsh-inkpond", "0.3.4", {
		registry: target.registry,
	});
});

it("distinguishes unsupported sources, unavailable updates, and failed checks", async () => {
	const listVersions = vi.fn();
	const { access } = host({ listVersions, updateBundle: vi.fn() });
	const check = () => access.check(new AbortController().signal);
	listVersions.mockResolvedValueOnce({
		ok: true,
		value: { status: "refused", problem: "not-updatable" },
	});
	expect(await check()).toEqual({ kind: "unmanaged" });
	listVersions.mockResolvedValueOnce(
		versions([version("0.4.0", { incompatible: {} })]),
	);
	expect(await check()).toEqual({ kind: "blocked" });
	listVersions.mockResolvedValueOnce(versions([]));
	expect(await check()).toEqual({ kind: "current" });
	listVersions.mockRejectedValueOnce(new Error("offline"));
	expect(await check()).toEqual({ kind: "failed" });
});

it("reports restart, recovery failure and uncertain transport outcomes without claiming success", async () => {
	const updateBundle = vi.fn();
	const { access } = host({ listVersions: vi.fn(), updateBundle });
	for (const [result, restore, outcome] of [
		["restart-required", undefined, "restart"],
		["failed", "applied", "restored"],
		["failed", "failed", "removed"],
		["failed", undefined, "failed"],
	] as const) {
		updateBundle.mockResolvedValueOnce({
			ok: true,
			value: {
				to: target.version,
				result: { application: result },
				...(restore ? { restore: { application: restore } } : {}),
			},
		});
		expect(await access.upgrade(target)).toBe(outcome);
	}
	updateBundle.mockRejectedValueOnce(new Error("connection lost"));
	expect(await access.upgrade(target)).toBe("unknown");
});

async function render(access: UpdateAccess) {
	vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
	const container = document.createElement("div");
	document.body.append(container);
	root = createRoot(container);
	await act(async () => root!.render(<UpdateSettings access={access} zh />));
}
async function click(text: string) {
	const button = [...document.querySelectorAll("button")].find(
		(b) => b.textContent === text,
	)!;
	expect(button).toBeDefined();
	await act(async () => button.click());
}

it("requires an explicit confirmation and prevents duplicate upgrades", async () => {
	let finish!: (value: "restart") => void;
	const upgrade = vi.fn().mockImplementation(
		() =>
			new Promise((resolve) => {
				finish = resolve;
			}),
	);
	const access: UpdateAccess = {
		supported: () => true,
		canNavigate: () => true,
		openManagement: vi.fn(),
		check: vi.fn().mockResolvedValue(target),
		upgrade,
	};
	await render(access);
	expect(access.check).not.toHaveBeenCalled();
	await click("检查更新");
	await click("升级到 0.3.4");
	expect(upgrade).not.toHaveBeenCalled();
	await click("取消");
	expect(upgrade).not.toHaveBeenCalled();
	await click("升级到 0.3.4");
	await click("确认升级");
	expect(upgrade).toHaveBeenCalledExactlyOnceWith(target);
	expect(
		[...document.querySelectorAll("button")].every((b) => b.disabled),
	).toBe(true);
	await act(async () => finish("restart"));
	expect(document.querySelector('[role="status"]')!.textContent).toContain(
		"重启 DSH",
	);
});

it("aborts an in-flight check on disposal and ignores its late answer", async () => {
	let finish!: (value: typeof target) => void;
	let signal!: AbortSignal;
	const check = vi.fn().mockImplementation((s: AbortSignal) => {
		signal = s;
		return new Promise((resolve) => {
			finish = resolve;
		});
	});
	const access: UpdateAccess = {
		supported: () => true,
		canNavigate: () => false,
		openManagement: vi.fn(),
		check,
		upgrade: vi.fn(),
	};
	await render(access);
	await click("检查更新");
	await act(async () => root!.unmount());
	root = undefined;
	expect(signal.aborted).toBe(true);
	await act(async () => finish(target));
	expect(document.querySelector("button")).toBeNull();
	expect(access.upgrade).not.toHaveBeenCalled();
});
