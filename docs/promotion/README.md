# Inkpond 0.3.5 promotion assets

Prepared on 2026-11-06 for the DSH community and Bilibili. These are documentation
and media changes, not a new plugin release. npm and GitHub Release 0.3.5 remain
the published distribution.

## Publication record

- Official DSH community: https://github.com/deepseek-ai/deepseek-harness/discussions/12419
  Published in Show Your Plugins! on 2026-11-06; source body, author and category
  were read back and verified. Future updates should use this topic.
- Bilibili: https://www.bilibili.com/video/BV1vT4B6KExv/
  Submitted on 2026-11-06 after the user confirmed the upload agreement notice.
  Upload, 1080p transcoding and moderation are complete, as verified in the
  Creator Center progress page. The category is Artificial Intelligence and
  the content declaration discloses marketing information.
- Public assets and README changes: commit `2f45f53488598e36ba041834d2a314257c58f291`.
  [CI passed](https://github.com/shin4/inkpond-dsh/actions/runs/42194520679).
- V2EX Share Your Creations: skipped for this campaign at the owner's request
  on 2026-11-06. The [draft](v2ex-post.md) is retained for reference and has not
  been published. Registration, invitation-code activation and posting are no
  longer pending campaign actions.
- Additional directory, `2BingLing/dsh-market`:
  https://github.com/2BingLing/dsh-market/issues/346
  Inkpond was already listed; the existing snapshot still referenced 0.3.2.
  Submitted the supported data-fix template with the `submission` label to add
  author copy, the six-scene description and exact npm install command. The
  body/label were read back and verified. The issue is open and the next
  directory pipeline has not yet been verified as applying the change.

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
  with deterministic typography and margins that preserve the title and whale
  in Bilibili's 4:3 and 16:9 views. Both crops were checked in the upload editor
  and synchronized. The video's opening card retains its wider 16:9 layout.

## Copy

- [Official community post](community-post.md), Chinese and English.
  Title: `DSH｜墨池 Inkpond｜可交互的汉字水墨背景`.
  Follows the [plugin category guidelines](https://github.com/deepseek-ai/deepseek-harness/discussions/2004):
  one project per topic, an explicit unofficial label, real integration, source,
  introduction and screenshots. Update this single topic for future releases.
- [Bilibili title, description, chapters and tags](bilibili-post.md).
- [V2EX title and post body](v2ex-post.md), retained for reference; this channel
  is skipped for the current campaign.
- [Additional directory data-fix submission](dsh-market-data-fix.md), following
  that project's [contribution rules](https://github.com/2BingLing/dsh-market/blob/master/CONTRIBUTING.md).

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
The final documentation tarball also installed and uninstalled successfully in
a second isolated profile. Both recording/rendering browser sessions and the
loopback servers were stopped after export.

Private capture inputs and review frames are under ignored
`output/playwright/promotion`; isolated host data and logs are under ignored
`.local`. Only selected, reviewed exports are stored in `docs/images` and
`docs/media`.

To reproduce the cards, run `python3 docs/promotion/render_cards.py` from the
repository root. Serve the generated directory on loopback and capture each
HTML card at 1600×900 (including the separate `video-title` card), and the three
caption strips at 1920×112. Screenshots
require system Chinese fonts; the cover requires its original local capture.
`python3 docs/promotion/assemble_video.py` then assembles the six segments with
ffmpeg; it needs the documented local capture inputs. The final file is copied
to `docs/media` after visual review. No generated capture or host directory is
staged wholesale.

Review covered Chinese/English text fit, installation source/package name,
new-conversation guidance, five timeline frames, 40-second duration, codec/frame
size, and actual strength labels. Native desktop shells and Windows/Linux are
not newly claimed as tested.
Separating the safe-area thumbnail from the video title card was verified by
re-exporting the full video: its bytes still match the submitted/public MP4,
SHA256 `4a3fd5a9508393b11aa5a7da3fda8d76a2c1b35c0f1dcac7c2c3249a883293b7`.

## Follow-up measurement

Record each platform's own views, repository visitors/referrers and npm download
counts separately after publication. Daily source data may arrive late. npm
downloads, release downloads, clones and Stars are not unique installations or
active users; validation downloads must not be presented as campaign adoption.
Use voluntary installation feedback to identify friction without adding plugin
telemetry.
