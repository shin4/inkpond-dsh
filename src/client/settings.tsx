import { useId, useSyncExternalStore } from "react";
import { IconCheck, IconExternalLink, IconStar } from "@tabler/icons-react";
import { DEFAULTS, type PreferenceStore, type Preferences } from "./preferences";
import { UpdateSettings, type UpdateAccess } from "./updates";

function Choices<T extends string>({ title, value, options, onChange, scenes = false }: {
	title: string;
	value: T;
	options: readonly { value: T; label: string }[];
	onChange(value: T): void;
	scenes?: boolean;
}) {
	const id = useId();
	return (
		<div className={scenes ? "dsh-inkpond-scenes" : "dsh-inkpond-row"}>
			<span id={id} className={scenes ? "dsh-inkpond-section-title" : undefined}>{title}</span>
			<div role="radiogroup" aria-labelledby={id} className={scenes ? "dsh-inkpond-scene-grid" : "dsh-inkpond-segments"}>
				{options.map((option) => (
					<label className="dsh-inkpond-choice" key={option.value}>
						<input type="radio" name={id} value={option.value} checked={value === option.value} onChange={() => onChange(option.value)} />
						<span>{option.label}{scenes && value === option.value && <IconCheck size={18} stroke={2} aria-hidden="true" />}</span>
					</label>
				))}
			</div>
		</div>
	);
}

export function createSettings(store: PreferenceStore, updates: UpdateAccess) {
	return function Settings() {
		const p = useSyncExternalStore(store.subscribe, store.get);
		const strengthId = useId();
		const zh = (document.documentElement.lang || navigator.language).startsWith("zh");
		const t = (cn: string, en: string) => (zh ? cn : en);
		return (
			<section className="dsh-inkpond-settings" aria-label={t("墨池设置", "Inkpond settings")}>
				<header className="dsh-inkpond-heading">
					<div>
						<h3>{t("墨池", "Inkpond")}</h3>
						<p>{t("为对话添一笔水墨。", "A touch of ink for your conversations.")}</p>
					</div>
					<label className="dsh-inkpond-toggle">
						<span>{t("启用背景", "Enable background")}</span>
						<input type="checkbox" role="switch" checked={p.enabled} onChange={(e) => store.update({ enabled: e.target.checked })} />
					</label>
				</header>
				<Choices<Preferences["scene"]> scenes title={t("场景", "Scene")} value={p.scene} onChange={(scene) => store.update({ scene })} options={[
					{ value: "lotus", label: t("莲池", "Lotus pond") },
					{ value: "shanshui", label: t("山水", "Misty hills") },
					{ value: "qingming", label: t("清明上河", "Qingming handscroll") },
					{ value: "jieqi", label: t("二十四节气", "24 solar terms") },
					{ value: "beiming", label: t("北冥", "Northern sea") },
					{ value: "dafeijing", label: t("大肥鲸", "Big fat whale") },
				]} />
				<Choices<Preferences["scope"]> title={t("显示范围", "Show background")} value={p.scope} onChange={(scope) => store.update({ scope })} options={[
					{ value: "empty", label: t("仅新会话", "New conversations only") },
					{ value: "conversation", label: t("所有会话", "All conversations") },
				]} />
				<label className="dsh-inkpond-row dsh-inkpond-toggle">
					<span>{t("淡彩", "Color accents")}</span>
					<input type="checkbox" role="switch" checked={p.tint} onChange={(e) => store.update({ tint: e.target.checked })} />
				</label>
				<div className="dsh-inkpond-row">
					<label htmlFor={strengthId}>{t("墨色浓淡", "Ink strength")}</label>
					<div className="dsh-inkpond-strength">
						<input id={strengthId} type="range" min="0.1" max="0.8" step="0.05" value={p.strength} aria-valuetext={`${Math.round(p.strength * 100)}%`} onChange={(e) => store.update({ strength: Number(e.target.value) })} />
						<output htmlFor={strengthId}>{Math.round(p.strength * 100)}%</output>
					</div>
				</div>
				<Choices<Preferences["motion"]> title={t("动画", "Animation")} value={p.motion} onChange={(motion) => store.update({ motion })} options={[
					{ value: "system", label: t("跟随系统", "Follow system") },
					{ value: "still", label: t("静态画面", "Still image") },
				]} />
				<div className="dsh-inkpond-preference-footer">
					<p role={store.isPersistent() ? undefined : "status"}>{store.isPersistent()
						? t("设置仅保存在当前客户端。", "Preferences stay in this client.")
						: t("存储不可用，关闭页面后设置失效。", "Storage unavailable. Preferences last only for this page.")}</p>
					<button className="dsh-inkpond-text-button" type="button" onClick={() => store.update(DEFAULTS)}>{t("恢复默认", "Restore defaults")}</button>
				</div>
				<UpdateSettings access={updates} zh={zh} />
				<aside className="dsh-inkpond-repository" aria-label={t("支持墨池", "Support Inkpond")}>
					<IconStar className="dsh-inkpond-star" size={28} stroke={1.8} aria-hidden="true" />
					<div>
						<h4>{t("喜欢墨池？点个 Star", "Enjoy Inkpond? Give it a Star")}</h4>
						<p>{t("去 GitHub 为墨池点亮一颗星。", "Support Inkpond with a star on GitHub.")}</p>
					</div>
					<a href="https://github.com/shin4/inkpond-dsh" target="_blank" rel="noopener noreferrer">Star on GitHub <IconExternalLink size={18} stroke={1.8} aria-hidden="true" /></a>
				</aside>
			</section>
		);
	};
}
