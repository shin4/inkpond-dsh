# Settings redesign QA

final result: passed

- Source visual truth: `output/playwright/settings-redesign/approved-design.png`.
- Final implementation: `output/playwright/settings-redesign/dark-component-final.png`.
- Host context: `output/playwright/settings-redesign/dark-host-final.png`.
- Additional states: `light-component.png`, `mobile-top.png`, `mobile-star.png` in the same directory.
- Runtime: official DSH 0.2.2-rc.1, Cordis 4.1.0, macOS arm64, isolated Web profile, in-app Chromium browser.
- Desktop viewport: 1440 x 1200 CSS px. Component: 800 x 999.695 CSS px; final PNG: 800 x 1000 pixels, normalized to one output pixel per CSS pixel using CDP capture. Native browser screenshot scaling was not used for the final comparison.
- Reference: 1122 x 1402 pixels, including outer margins. Compare its approximately 986 px content width to the 800 px implementation content width; the host supplies the outer page padding. No browser chrome is included in the component comparison.
- State: Chinese, dark, enabled, Big fat whale, new conversations only, color accents on, 45%, system motion, no update check performed.

## Findings and comparison history

1. Initial 800 x 943 component capture was reviewed together with the approved image. [P2] The heading, controls and Star banner were too dense. Increased the title to 38px, body to 18px, section titles to 22px, scene target height to 58px, row minimum to 72px and Star heading to 24px. Rebuilt, repacked and reinstalled the artifact before recapture.
2. The light comparison exposed [P2] weak selected-state contrast. Changed the light selected surface from #f0f0f0 to #dedee3; retained the dark surface. Final light screenshot and computed selected RGB(222, 222, 227) confirm the fix.
3. Final approved image, dark implementation and light implementation were opened together for the second visual comparison. No actionable P0/P1/P2 differences remain.
4. At the user's direction, the plugin configuration is visually placed before the introduction. The adapter identifies only the Inkpond detail, configuration and document semantic markers and a verified flex-column container. It marks this container rather than moving React-owned nodes. Chromium's `reading-flow: flex-visual` also places settings before the introduction in the accessibility tree. Unknown layouts are unchanged.

## Required fidelity surfaces

- Typography: retains the host system font, strong title and compact utility copy. Chinese labels remain readable. English labels and storage feedback are covered by the rendered component regression test. Small help copy stays 14px to fit the host's product scale rather than copying the raster mock's oversized text literally.
- Spacing and layout: three-column scene choices on desktop, two columns at a 345px component width. Flat aligned settings rows, a subdued update group, and one highlighted Star banner follow the approved hierarchy. The host provides page margins; no extra enclosing card was added.
- Colors: host foreground and surface tokens follow light/dark themes; amber is limited to the Star section. The final light selected state is visibly distinct. Forced colors restores native radios and switches; the background canvas is hidden.
- Images and icons: no illustration assets are required. Check, Star and external-link symbols are actual bundled Tabler icons with MIT notice, not handmade approximations. The pinned Inkpond renderer and six embedded fonts are unchanged.
- Copy: one short introduction, one local-storage note and one manual-update note replace the longer settings explanations. Update failure, unavailable source, incompatible target, restart, recovery and unknown result remain distinct. GitHub opens the existing repository and does not claim to star automatically.

## Focused checks

The full-resolution component comparison made scene labels, selected check, 45% slider, update actions and Star banner legible. Those regions were inspected in the same source/implementation comparison; separate magnified crops were unnecessary. The narrow-screen Star capture verifies the full CTA, headline, and external-link icon remain visible and reachable.

## Interaction and compatibility checks

- `npm run check`: type check, 22 tests and production build passed.
- `npm pack`: 12 allowed files, six offline fonts, plugin/upstream/Tabler MIT notices and font OFL notice; no local data or dependencies.
- Exact tarball installed into an isolated DSH_HOME; all 12 installed files match the archive. Host starts from /private/tmp to avoid checkout self-resolution. PNPM_HOME is consistent for installation and runtime.
- Native settings slot renders all six scenes and all preferences. Arrow-key selection and range input work. Changes to scene, scope, tint, strength and motion survive reload; Restore defaults restores all original defaults.
- Composer typing without sending, canvas pointer pass-through, composer avoidance, dark theme, and forced-colors hiding were checked. Reduced-motion emulation was exercised; no animation timing/performance claim is made.
- The tarball source correctly falls back to native plugin management on Check for updates. The Plugins action opens the native list. Six update tests preserve explicit confirmation, duplicate prevention, cancellation and outcome mapping; this redesign pass did not repeat a registry upgrade or failed recovery.
- Native disable removed settings, stylesheet, layout marker, background host and avoidance markers. Re-enable restored the plugin. Unit coverage also verifies unknown layouts and other plugin pages remain untouched.
- At 390 x 844 CSS px, component clientWidth and scrollWidth were both 345px. The grid had two 166.5px columns. The Star CTA remained inside the viewport. The final one-line light color correction does not change the narrow layout.
- Fresh final browser session had no warnings/errors. Connection retry warnings from earlier intentional host restarts were excluded by opening a fresh acceptance tab.
- Temporary viewport and media emulations were reset. The final isolated loopback host and browser preview are intentionally left open for user review.

## Limits and follow-up polish

- No native desktop-shell, Windows/Linux, real model calls, long-chat, full whale animation-cycle or failed-update recovery claim.
- P3: native range track rendering varies slightly by browser. Native input behavior is retained.
- At the time of this visual QA, no publication or Git commit had been performed. The 0.3.5 release follow-up is recorded in `docs/release.md` and `docs/verification.md`.

## Implementation checklist

- [x] Match the approved setting hierarchy and highlighted Star CTA.
- [x] Place settings above the introduction with a bounded adapter and cleanup.
- [x] Retain every preference and update outcome.
- [x] Pass source/implementation comparison and responsive checks.
- [x] Validate the packaged artifact in the requested real host.
