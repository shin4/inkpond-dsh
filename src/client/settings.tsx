import { useSyncExternalStore } from "react";
import { DEFAULTS, type PreferenceStore } from "./preferences";
export function createSettings(store: PreferenceStore) {
	return function Settings() {
		const p = useSyncExternalStore(store.subscribe, store.get);
		const zh = (document.documentElement.lang || navigator.language).startsWith(
			"zh",
		);
		const t = (cn: string, en: string) => (zh ? cn : en);
		return (
			<section
				className="dsh-inkpond-settings"
				aria-label={t("墨池设置", "Inkpond settings")}
			>
				<h3>{t("墨池", "Inkpond")}</h3>
				<p>
					{t(
						"以字为墨，以页为池。设置仅保存在当前客户端。",
						"Chinese glyphs, painted as ink. Preferences stay in this client.",
					)}
				</p>
				<label>
					<span>{t("启用背景", "Enable background")}</span>
					<input
						type="checkbox"
						checked={p.enabled}
						onChange={(e) => store.update({ enabled: e.target.checked })}
					/>
				</label>
				<label>
					<span>{t("场景", "Scene")}</span>
					<select
						value={p.scene}
						onChange={(e) =>
							store.update({ scene: e.target.value as typeof p.scene })
						}
					>
						<option value="lotus">{t("莲池", "Lotus pond")}</option>
						<option value="shanshui">{t("山水", "Misty hills")}</option>
						<option value="qingming">
							{t("清明上河", "Qingming handscroll")}
						</option>
						<option value="jieqi">{t("二十四节气", "24 solar terms")}</option>
						<option value="beiming">{t("北冥", "Northern sea")}</option>
						<option value="dafeijing">{t("大肥鲸", "Big fat whale")}</option>
					</select>
				</label>
				<label>
					<span>{t("显示范围", "Show background")}</span>
					<select
						value={p.scope}
						onChange={(e) =>
							store.update({ scope: e.target.value as typeof p.scope })
						}
					>
						<option value="empty">
							{t("仅新会话", "New conversations only")}
						</option>
						<option value="conversation">
							{t("所有会话", "All conversations")}
						</option>
					</select>
				</label>
				<label>
					<span>{t("淡彩", "Color accents")}</span>
					<input
						type="checkbox"
						checked={p.tint}
						onChange={(e) => store.update({ tint: e.target.checked })}
					/>
				</label>
				<label>
					<span>
						{t("墨色浓淡", "Ink strength")} · {Math.round(p.strength * 100)}%
					</span>
					<input
						type="range"
						min="0.1"
						max="0.8"
						step="0.05"
						value={p.strength}
						onChange={(e) => store.update({ strength: Number(e.target.value) })}
					/>
				</label>
				<label>
					<span>{t("动画", "Animation")}</span>
					<select
						value={p.motion}
						onChange={(e) =>
							store.update({ motion: e.target.value as typeof p.motion })
						}
					>
						<option value="system">{t("跟随系统", "Follow system")}</option>
						<option value="still">{t("静态画面", "Still image")}</option>
					</select>
				</label>
				{!store.isPersistent() && (
					<p role="status">
						{t(
							"存储不可用，本次设置在关闭页面后失效。",
							"Storage unavailable. These preferences last only for this page.",
						)}
					</p>
				)}
				<button type="button" onClick={() => store.update(DEFAULTS)}>
					{t("恢复默认", "Restore defaults")}
				</button>
			</section>
		);
	};
}
