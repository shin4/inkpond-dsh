"""Render deterministic HTML source cards; capture at 1600x900 with a browser.

Run from the repository root. This uses only local screenshots and system fonts.
The actual DSH recording is kept separately; these cards do not simulate host UI.
"""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "output/playwright/promotion"
OUT.mkdir(parents=True, exist_ok=True)

CSS = """
*{box-sizing:border-box}html,body{margin:0;width:1600px;height:900px;overflow:hidden}
body{font-family:-apple-system,BlinkMacSystemFont,'PingFang SC','Microsoft YaHei',sans-serif;background:#f5f4ef;color:#182c2b}
.page{padding:64px 72px;height:900px;position:relative}
.brand{font-size:24px;letter-spacing:3px;font-weight:650;color:#31635e}
.eyebrow{margin-top:20px;font-size:19px;letter-spacing:2px;color:#60736e}
h1{font-size:64px;line-height:1.22;letter-spacing:-1px;margin:28px 0 18px;font-weight:750}
.sub{font-size:26px;color:#5b6f69;line-height:1.6;margin:0}
.steps{display:grid;grid-template-columns:1fr 1fr 1fr;gap:22px;margin-top:44px}
.step{background:#fffefa;border:1px solid #d7e0d7;border-radius:22px;padding:30px;height:348px}
.num{font-size:22px;color:#40786f;font-weight:650;letter-spacing:2px}
h2{font-size:32px;line-height:1.28;margin:24px 0 18px;letter-spacing:-.5px}
p{font-size:23px;line-height:1.6;color:#536661;margin:12px 0}
code{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:26px;letter-spacing:-.7px;color:#153e37;background:#edf3ec;border-radius:10px;display:inline-block;padding:13px 15px;white-space:nowrap}
.note{font-size:20px;line-height:1.55;color:#697972}.footer{position:absolute;bottom:48px;left:72px;right:72px;display:flex;justify-content:space-between;font-size:18px;color:#687872}
.pill{display:inline-block;background:#e5eee4;border-radius:30px;padding:9px 18px;font-size:21px;color:#28594f}
.cover{padding-left:230px;padding-right:230px}.cover h1{font-size:84px;line-height:1.15;margin-top:54px}.cover .copy{position:relative;z-index:1;width:550px}
.cover .footer{left:230px;right:230px;font-size:15px}
.whale{position:absolute;right:220px;top:200px;width:520px;height:470px;background-color:white;background-repeat:no-repeat;background-size:1800px 1012.5px;background-position:-800px -20px;border:1px solid #d7e0d7;border-radius:30px}
.capture-label{position:absolute;bottom:24px;left:24px;font-size:18px;background:#f5f4ef;padding:10px 16px;border-radius:20px;color:#536661}
.video-title{padding-left:72px;padding-right:72px}.video-title h1{font-size:100px}.video-title .copy{width:650px}
.video-title .whale{right:60px;top:170px;width:700px;height:520px;background-size:2000px 1125px;background-position:-880px -20px}
.video-title .footer{left:72px;right:72px;font-size:18px}
.end h1{font-size:80px;margin-top:80px}.end code{font-size:48px;padding:24px 32px;margin-top:28px}.end .sub{font-size:32px;margin-top:30px}
"""

def write(name, body, lang="zh-CN"):
    (OUT / f"{name}.html").write_text(
        f'<!doctype html><html lang="{lang}"><meta charset="utf-8"><title>Inkpond — {name}</title>'
        f'<style>{CSS}</style><body>{body}</body></html>', encoding="utf-8")

write("install-guide-zh", """
<main class="page"><div class="brand">墨池 / INKPOND</div>
<h1>三步，让大肥鲸游进 DSH。</h1><p class="sub">可交互的汉字水墨背景 · 六个场景 · 开源插件</p>
<div class="steps">
<section class="step"><div class="num">01 / 打开</div><h2>进入添加插件</h2><p>在 DSH 左侧点击「插件」<br>再点击「添加插件」。</p><span class="pill">插件 → 添加插件</span></section>
<section class="step"><div class="num">02 / 安装</div><h2>填入包名</h2><code>dsh-inkpond@0.3.5</code><p>选择「npm 官方源」并安装。</p></section>
<section class="step"><div class="num">03 / 看见</div><h2>新建空白会话</h2><p>首次安装默认显示大肥鲸。<br>默认仅新会话显示。</p><span class="pill">新会话 = 新风景</span></section>
</div><p class="note">若宿主提示重启，请按提示重启。已有保存偏好的客户端保留原选择。无需下载源码或本机编译。</p>
<footer class="footer"><span>github.com/shin4/inkpond-dsh</span><span>非官方插件 · 实录验证：macOS / DSH 0.2.2-rc.1 Web</span></footer></main>
""")

write("install-guide-en", """
<main class="page"><div class="brand">INKPOND / 墨池</div>
<h1>A little ink-wash world, in three steps.</h1><p class="sub">Interactive Chinese glyph backgrounds for DSH · Six scenes · Open source</p>
<div class="steps">
<section class="step"><div class="num">01 / OPEN</div><h2>Add a plugin</h2><p>In DSH, open Plugins,<br>then choose Add plugin.</p><span class="pill">Plugins → Add plugin</span></section>
<section class="step"><div class="num">02 / INSTALL</div><h2>Enter the package</h2><code>dsh-inkpond@0.3.5</code><p>Select the official npm registry<br>and install.</p></section>
<section class="step"><div class="num">03 / ENJOY</div><h2>Start a new conversation</h2><p>A fresh install shows Big fat whale.<br>New conversations only by default.</p></section>
</div><p class="note">Restart if requested by DSH. Existing saved choices are preserved. No source checkout or local compilation.</p>
<footer class="footer"><span>github.com/shin4/inkpond-dsh</span><span>Unofficial · Captured on macOS / DSH 0.2.2-rc.1 Web</span></footer></main>
""", "en")

whale = "whale-detail.png"
cover_html = f"""
<main class="page cover"><div class="brand">墨池 / INKPOND</div><div class="copy">
<h1>在 DSH 里<br>养一只<br>水墨鲸鱼。</h1>
<p class="sub">汉字绘成的鲸鱼，会游、会吃饭。<br>六场景 · 开源插件</p></div>
<div class="whale" style="background-image:url('{whale}')"><span class="capture-label">实际画面局部 · 80% 浓度</span></div>
<footer class="footer"><span>DeepSeek Harness 社区插件 · 非官方</span><span>墨池 0.3.5 / macOS Web 实录</span></footer></main>
"""
write("bilibili-cover", cover_html)
write("video-title", cover_html.replace('class="page cover"', 'class="page cover video-title"'))

write("video-end", """
<main class="page end"><div class="brand">墨池 / INKPOND</div><h1>下一段对话，从一池水墨开始。</h1>
<code>dsh-inkpond@0.3.5</code><p class="sub">添加插件 → 选择 npm 官方源 → 安装 → 新建空白会话</p>
<p>源码与完整指南：github.com/shin4/inkpond-dsh</p>
<p class="note">默认大肥鲸、45% 浓度、仅新会话。已有偏好保留；若宿主提示重启，请按提示重启。</p>
<footer class="footer"><span>不读取聊天内容 · 不注册模型工具 · 不发送遥测</span><span>非官方插件 · 兼容性范围见 README</span></footer></main>
""")

for index, caption in enumerate([
    "大肥鲸：游动、吃饭与指针互动｜80% 浓度演示，默认 45%",
    "换个场景：莲池｜默认 45% 浓度",
    "六个场景直接选择｜默认仅新会话，可调浓度与动画",
], start=1):
    (OUT / f"caption-{index}.html").write_text(
        '<!doctype html><html lang="zh-CN"><meta charset="utf-8"><style>'
        '*{box-sizing:border-box}body{margin:0;width:1920px;height:112px;padding:16px 72px;'
        'background:#f5f4ef;font-family:-apple-system,"PingFang SC",sans-serif;color:#182c2b}'
        'h1{font-size:34px;font-weight:500;margin:0 0 8px}p{font-size:23px;color:#536661;margin:0}'
        f'</style><h1>{caption}</h1><p>墨池 0.3.5 · macOS / DSH 0.2.2-rc.1 Web 实录</p></html>',
        encoding="utf-8")

print("Wrote five HTML cards and three caption strips to output/playwright/promotion")
