"""Assemble a 40-second, silent 1080p demo from actual host captures and cards.

Requires ffmpeg on PATH. Run render_cards.py and capture its HTML cards first.
No animation is generated or sped up; live clips retain their recorded timing.
"""
from pathlib import Path
import subprocess

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "output/playwright/promotion"

segments = [
    ("bilibili-cover.png", 3, None),
    ("whale-detail.webm", 12, "大肥鲸：游动、吃饭与指针互动｜80% 浓度演示，默认 45%"),
    ("lotus.webm", 6, "换个场景：莲池｜默认 45% 浓度"),
    ("settings.png", 5, "六个场景直接选择｜默认仅新会话，可调浓度与动画"),
    ("../../../docs/images/install-guide-zh.png", 8, None),
    ("video-end.png", 6, None),
]

for index, (source, duration, caption) in enumerate(segments):
    src = (OUT / source).resolve()
    if not src.is_file():
        raise SystemExit(f"Missing input: {src}")
    vf = "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2:color=0xf5f4ef,setsar=1,fps=30"
    cmd = ["ffmpeg", "-hide_banner", "-loglevel", "error", "-y"]
    if src.suffix == ".png":
        cmd += ["-loop", "1", "-framerate", "30"]
    cmd += ["-i", str(src)]
    if caption:
        strip = OUT / f"caption-{index}.png"
        if not strip.is_file():
            raise SystemExit(f"Missing rendered caption: {strip}")
        cmd += ["-loop", "1", "-i", str(strip), "-filter_complex",
                f"[0:v]{vf}[base];[base][1:v]overlay=0:968:shortest=1[out]", "-map", "[out]"]
    else:
        cmd += ["-vf", vf]
    cmd += ["-t", str(duration), "-an", "-c:v", "libx264", "-preset", "fast", "-crf", "18",
            "-pix_fmt", "yuv420p", str(OUT / f"segment-{index}.mp4")]
    subprocess.run(cmd, check=True)
    print(f"Rendered segment {index + 1}/{len(segments)}", flush=True)

listing = OUT / "segments.txt"
listing.write_text("".join(f"file 'segment-{i}.mp4'\n" for i in range(len(segments))))
subprocess.run([
    "ffmpeg", "-hide_banner", "-loglevel", "error", "-y",
    "-f", "concat", "-safe", "0", "-i", str(listing),
    "-f", "lavfi", "-i", "anullsrc=channel_layout=stereo:sample_rate=48000",
    "-c:v", "copy", "-c:a", "aac", "-shortest", "-movflags", "+faststart",
    "-metadata", "title=墨池 Inkpond for DSH — 演示与安装",
    str(OUT / "inkpond-dsh-0.3.5-demo.mp4"),
], check=True)
print("Saved output/playwright/promotion/inkpond-dsh-0.3.5-demo.mp4")
