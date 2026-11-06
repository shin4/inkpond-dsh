# Inkpond 0.3.5 promotion assets

Prepared on 2026-11-06 for the DSH community and Bilibili. These are documentation
and media changes, not a new plugin release. npm and GitHub Release 0.3.5 remain
the published distribution.

## Public assets

- [Default Big fat whale GIF](../images/whale-preview.gif): 14 seconds, 1280×720,
  actual macOS DSH 0.2.2-rc.1 Web capture at the default 45% strength.
- [Full-size screenshot](../images/whale-preview.png): 1600×900, same host/defaults.
- Three-step install guides: [Chinese](../images/install-guide-zh.png) and
  [English](../images/install-guide-en.png), 1600×900 explanatory cards.
- [40-second demonstration](../media/inkpond-dsh-0.3.5-demo.mp4): 1920×1080,
  30 fps, H.264/AAC, silent. Live inputs were captured at 1600×900. The whale
  close-up uses 80% strength and is explicitly labeled; Lotus pond uses 45%.
  Screenshots/cards are interleaved with real-time screen recordings. No
  installation progress, model response or successful message send is simulated.
- [Bilibili cover](../media/bilibili-cover.png): an actual 80% capture excerpt
  with deterministic typography; not a generated product mockup.

## Copy

- [Official community post](community-post.md), Chinese and English.
  Title: `DSH｜墨池 Inkpond｜可交互的汉字水墨背景`.
  Follows the [plugin category guidelines](https://github.com/deepseek-ai/deepseek-harness/discussions/2004):
  one project per topic, an explicit unofficial label, real integration, source,
  introduction and screenshots. Update this single topic for future releases.
- [Bilibili title, description, chapters and tags](bilibili-post.md).

The primary action is installation. Both READMEs show the actual package name
and emphasize starting a new empty conversation. Saved preferences and verified
host/platform limits are retained. No analytics, telemetry or client behavior is
added for this campaign.

## Capture and export record

The plugin was installed from a locally packed tarball into an isolated
`DSH_HOME`, with no personal account, API key or chat content in the captures.
`npm run check` passed all 22 tests, type checking and build. Package inspection
confirmed MIT, OFL and Tabler notices, with host state, captures and working
material excluded. Runtime files, package manifest, patch and notices match the
published 0.3.5 tarball byte-for-byte; the local package's documentation differs.

Private capture inputs and review frames are under ignored
`output/playwright/promotion`; isolated host data and logs are under ignored
`.local`. Only selected, reviewed exports are stored in `docs/images` and
`docs/media`.

To reproduce the cards, run `python3 docs/promotion/render_cards.py` from the
repository root. Serve the generated directory on loopback and capture each
HTML card at 1600×900, and the three caption strips at 1920×112. Screenshots
require system Chinese fonts; the cover requires its original local capture.
`python3 docs/promotion/assemble_video.py` then assembles the six segments with
ffmpeg; it needs the documented local capture inputs. The final file is copied
to `docs/media` after visual review. No generated capture or host directory is
staged wholesale.

Review covered Chinese/English text fit, installation source/package name,
new-conversation guidance, five timeline frames, 40-second duration, codec/frame
size, and actual strength labels. Native desktop shells and Windows/Linux are
not newly claimed as tested.

## Follow-up measurement

Record each platform's own views, repository visitors/referrers and npm download
counts separately after publication. Daily source data may arrive late. npm
downloads, release downloads, clones and Stars are not unique installations or
active users; validation downloads must not be presented as campaign adoption.
Use voluntary installation feedback to identify friction without adding plugin
telemetry.
