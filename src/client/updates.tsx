import { useEffect, useRef, useState } from "react";

export type UpdateCheck =
	| { kind: "unsupported" | "current" | "blocked" | "unmanaged" | "failed" }
	| {
			kind: "available";
			installed: string;
			version: string;
			registry: string | null;
	  };
export type UpdateOutcome =
	| "applied"
	| "restart"
	| "restored"
	| "removed"
	| "failed"
	| "unknown";
export interface UpdateAccess {
	supported(): boolean;
	canNavigate(): boolean;
	openManagement(): void;
	check(signal: AbortSignal): Promise<UpdateCheck>;
	upgrade(
		target: Extract<UpdateCheck, { kind: "available" }>,
	): Promise<UpdateOutcome>;
}

export function UpdateSettings({
	access,
	zh,
}: {
	access: UpdateAccess;
	zh: boolean;
}) {
	const t = (cn: string, en: string) => (zh ? cn : en);
	const [check, setCheck] = useState<UpdateCheck>();
	const [pending, setPending] = useState<"check" | "upgrade">();
	const [confirm, setConfirm] = useState(false);
	const [outcome, setOutcome] = useState<UpdateOutcome>();
	const alive = useRef(false);
	const checking = useRef<AbortController>();
	const busy = useRef(false);
	useEffect(() => {
		alive.current = true;
		return () => {
			alive.current = false;
			checking.current?.abort();
		};
	}, []);
	const runCheck = async () => {
		if (busy.current) return;
		busy.current = true;
		setPending("check");
		setConfirm(false);
		setOutcome(undefined);
		const controller = new AbortController();
		checking.current = controller;
		const result = await access.check(controller.signal);
		if (!alive.current || controller.signal.aborted) return;
		busy.current = false;
		setCheck(result);
		setPending(undefined);
	};
	const upgrade = async () => {
		if (busy.current || !confirm || check?.kind !== "available") return;
		busy.current = true;
		setPending("upgrade");
		setConfirm(false);
		const result = await access.upgrade(check);
		if (!alive.current) return; // The Host may replace this plugin during self-update.
		busy.current = false;
		setPending(undefined);
		setCheck(undefined);
		setOutcome(result);
	};
	const supported = access.supported();
	const messages: Record<UpdateOutcome, string> = {
		applied: t("升级完成。", "Update completed."),
		restart: t(
			"新版已安装，请重启 DSH 后生效。",
			"Installed. Restart DSH to apply the update.",
		),
		restored: t(
			"升级未完成，宿主已重新安装旧版；请在插件管理中确认状态。",
			"Update did not complete. The Host reinstalled the previous version; check its status in Plugins.",
		),
		removed: t(
			"升级和旧版恢复均未成功，请在插件管理中重新安装。",
			"The update and recovery failed. Reinstall from Plugins.",
		),
		failed: t(
			"升级未完成，请在插件管理中查看结果后重试。",
			"Update did not complete. Check the result in Plugins before retrying.",
		),
		unknown: t(
			"未能确认升级结果，请在插件管理中核对当前版本。",
			"The update result could not be confirmed. Check the installed version in Plugins.",
		),
	};
	return (
		<section
			className="dsh-inkpond-updates"
			aria-label={t("插件更新", "Plugin updates")}
		>
			<h4>{t("插件更新", "Plugin updates")}</h4>
			{!supported && (
				<p>
					{t(
						"此宿主暂不支持一体更新。请在插件管理中卸载旧版，再按明确版本安装新版；外观偏好会保留。",
						"This Host does not support integrated updates. Uninstall and reinstall an exact newer version in Plugins; appearance preferences are retained.",
					)}
				</p>
			)}
			{supported && (
				<button type="button" disabled={!!pending} onClick={runCheck}>
					{pending === "check"
						? t("正在检查…", "Checking…")
						: t("检查更新", "Check for updates")}
				</button>
			)}
			<div role="status" aria-live="polite">
				{check?.kind === "current" && (
					<p>{t("未发现更新版本。", "No newer version was found.")}</p>
				)}
				{check?.kind === "blocked" && (
					<p>
						{t(
							"发现新版，但暂无适合当前宿主的稳定版本。请在插件管理中查看。",
							"Newer versions exist, but no compatible stable update is available. Check Plugins for details.",
						)}
					</p>
				)}
				{check?.kind === "unmanaged" && (
					<p>
						{t(
							"当前安装来源不支持一体更新，请在插件管理中更新。",
							"This installation source does not support integrated updates. Update through Plugins.",
						)}
					</p>
				)}
				{check?.kind === "failed" && (
					<p>
						{t(
							"检查失败，请重试或打开插件管理。",
							"The check failed. Retry or open Plugins.",
						)}
					</p>
				)}
				{check?.kind === "unsupported" && (
					<p>
						{t(
							"宿主更新能力暂不可用，请打开插件管理。",
							"Host update support is unavailable. Open Plugins.",
						)}
					</p>
				)}
				{check?.kind === "available" && (
					<p>
						{check.installed} → {check.version}
					</p>
				)}
				{pending === "upgrade" && (
					<p>
						{t(
							"正在升级，设置页可能重新载入。请勿重复操作；完成后可在插件管理中确认版本。",
							"Updating. This page may reload. Avoid repeating the action; check the installed version in Plugins afterwards.",
						)}
					</p>
				)}
				{outcome && <p>{messages[outcome]}</p>}
			</div>
			{check?.kind === "available" && !pending && !confirm && (
				<button type="button" onClick={() => setConfirm(true)}>
					{t("升级到", "Update to")} {check.version}
				</button>
			)}
			{confirm && check?.kind === "available" && (
				<div
					role="group"
					aria-label={t("确认插件升级", "Confirm plugin update")}
				>
					<p>
						{t("确认将此插件升级到", "Update this plugin to")} {check.version}？
						{t(
							"宿主将执行安装，必要时提示重启。",
							"The Host will install it and may require a restart.",
						)}
					</p>
					<button type="button" onClick={upgrade}>
						{t("确认升级", "Confirm update")}
					</button>
					<button type="button" onClick={() => setConfirm(false)}>
						{t("取消", "Cancel")}
					</button>
				</div>
			)}
			<button
				type="button"
				disabled={!!pending || !access.canNavigate()}
				onClick={() => access.openManagement()}
			>
				{t("打开插件管理", "Open Plugins")}
			</button>
		</section>
	);
}
