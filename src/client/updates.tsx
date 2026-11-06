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
			"旧版已恢复，请到插件管理确认状态。",
			"Previous version restored. Check its status in Plugins.",
		),
		removed: t(
			"升级及恢复失败，请到插件管理重新安装。",
			"Update and recovery failed. Reinstall from Plugins.",
		),
		failed: t(
			"升级未完成，请到插件管理查看后重试。",
			"Update incomplete. Check Plugins before retrying.",
		),
		unknown: t(
			"升级结果未确认，请到插件管理核对版本。",
			"Update result unknown. Check the version in Plugins.",
		),
	};
	return (
		<section
			className="dsh-inkpond-updates"
			aria-label={t("插件更新", "Plugin updates")}
		>
			<div className="dsh-inkpond-update-header">
				<div>
					<h4>{t("插件更新", "Plugin updates")}</h4>
					<p>{supported
						? t("手动检查，确认后更新。", "Check manually. Confirm before updating.")
						: t("请到插件管理更新，外观偏好会保留。", "Update through Plugins. Appearance preferences are retained.")}</p>
				</div>
				<div className="dsh-inkpond-update-actions">
					{supported && (
						<button type="button" disabled={!!pending} onClick={runCheck}>
							{pending === "check" ? t("正在检查…", "Checking…") : t("检查更新", "Check for updates")}
						</button>
					)}
					<button className="dsh-inkpond-text-button" type="button" disabled={!!pending || !access.canNavigate()} onClick={() => access.openManagement()}>
						{t("插件管理", "Plugins")}
					</button>
				</div>
			</div>
			<div role="status" aria-live="polite">
				{check?.kind === "current" && (
					<p>{t("未发现更新版本。", "No newer version was found.")}</p>
				)}
				{check?.kind === "blocked" && (
					<p>
						{t(
							"暂无兼容的稳定新版，请到插件管理查看。",
							"No compatible stable update. Check Plugins for details.",
						)}
					</p>
				)}
				{check?.kind === "unmanaged" && (
					<p>
						{t(
							"此安装来源请到插件管理更新。",
							"Update this installation through Plugins.",
						)}
					</p>
				)}
				{check?.kind === "failed" && (
					<p>
						{t(
							"检查失败，请重试或到插件管理查看。",
							"The check failed. Retry or open Plugins.",
						)}
					</p>
				)}
				{check?.kind === "unsupported" && (
					<p>
						{t(
							"更新暂不可用，请到插件管理查看。",
							"Updates unavailable. Open Plugins.",
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
							"正在升级，页面可能重载。请勿重复操作。",
							"Updating. This page may reload. Do not repeat the action.",
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
							"安装后可能需要重启 DSH。",
							"DSH may need to restart after installation.",
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
		</section>
	);
}
