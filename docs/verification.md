# Verification

## v0.3.5 release artifact — 2026-11-06

- Clean `npm ci`, `npm run check` (22 tests, type check and build) and `npm pack`
  passed. Manifest and bundled build metadata are 0.3.5. The archive contains
  12 allowed files, all plugin/upstream/Tabler MIT and font OFL notices, and six
  embedded fonts; no local profiles, sessions, credentials or output.
- Installed this exact tarball into a fresh isolated official DSH 0.2.2-rc.1
  Web profile on macOS. All 12 installed files matched the archive. Neutral
  working directory and consistent PNPM_HOME prevented test-environment package
  self-resolution or store mismatch.
- Cold browser startup showed native v0.3.5 running, default Big fat whale and
  pointer pass-through. Settings appeared before the introduction. Scene/motion
  changes, dark theme and restore defaults worked. Browser warnings/errors: zero.
  Detailed preference, accessibility and responsive coverage from the preceding
  redesign verification still applies; no rendering-engine changes were added.
- The test browser and host were stopped; native uninstall removed the dependency
  and bundle from the isolated profile. The earlier workspace preview is separate.
- SHA256: `1cf375cddcc334a0c7483cd805a227ec0167bdaaefeb11785ff64a6cd19bbf74`.
- This pass does not add native desktop-shell, Windows/Linux, real model,
  long-chat, animation-cycle or failed-recovery coverage. Publication status is
  recorded in `docs/release.md`; immutable tarballs contain release-prepared docs.

## Settings redesign — 2026-11-06 (workspace, unpublished)

- Implemented the approved settings design: six direct scene choices, native radio
  groups for scope/motion, switches, strength value and a highlighted ordinary
  GitHub Star link. Shortened bilingual settings/update copy while retaining all
  update confirmation, cancellation, retry, recovery and unknown-result behavior.
- At the user's request, configuration appears before the introduction. Host
  bindings remain in `adapter.ts` and use only `data-plugin-detail`,
  `data-plugin-config`, `data-detail-document` and the verified flex-column layout.
  No React-owned host node is moved. Unknown layouts remain unchanged, other
  plugin pages are untouched, and disposal retracts the layout marker. Current
  Chromium also follows the visual order for reading/focus via `reading-flow`.
- Expanded the Cordis peer declaration to `~4.0.5 || ~4.1.0`, covering the verified
  old and new host families. The minimum-only DSH engine range, upstream engine
  pin, defaults and preference keys are unchanged. The isolated profile still
  reports a missing Cordis peer because the Host supplies it outside that profile;
  this did not block installation or activation.
- `npm run check` passed: type checking, 22 tests and build. Added preference-control,
  storage-failure, safe-link and bounded-layout lifecycle coverage; the existing
  update and background regression cases pass.
- `npm pack` contains 12 allowed files. Plugin/upstream/Tabler MIT notices, font
  OFL and six embedded fonts are present; local profiles, output, sessions,
  credentials and development dependencies are absent. Every installed file was
  compared with this exact archive.
- Installed the tarball using official DSH 0.2.2-rc.1 in a fresh macOS Web profile.
  The host was launched from a neutral directory with a consistent PNPM_HOME.
  Native settings, keyboard choices, range changes, reload persistence, reset,
  default Big fat whale, input without sending, pointer pass-through, composer
  avoidance, dark theme and forced-colors hiding passed. Reduced-motion emulation
  was exercised without claiming animation timing or performance measurements.
- Native disable removed settings, styles, layout/host/avoidance markers, and
  re-enable restored the plugin. Tarball-source update fallback and native Plugins
  navigation passed. Update confirmation/outcome/cancellation remain unit-tested;
  this pass did not repeat the earlier real registry upgrade or failed recovery.
- Visual comparison passed after typography/spacing and light-selection contrast
  corrections. Desktop dark/light and a 390px viewport were inspected; the narrow
  settings region had no horizontal overflow. Details are in `design-qa.md`.
- Fresh final acceptance browser had no warnings/errors. Temporary media and
  viewport emulation were reset. The isolated loopback preview remains open for
  review; no daily DSH profile, real account or model call was used.
- At this initial workspace check, the redesign was not published; npm/GitHub
  still provided the previous 0.3.4. The 0.3.5 release follow-up is recorded above.
  No new native desktop-shell, Windows/Linux, long-chat or animation-cycle claim.
- Final tarball SHA256: `e844e25ed7d1cdd7934374d63a3d4e690b478ccb71b848c38ecd629ce3e8816e`.

## Repository link — 2026-11-04 (v0.3.4, local)

- Added a bilingual ordinary repository link below the update controls. No Star
  API, automatic external request or tracking is added; background behavior,
  engine pin, compatibility requirement and preferences are unchanged.
- `npm run check` passed: type checking, all 18 existing tests and build.
- `npm pack` contains 11 allowed files, version 0.3.4 in manifest/build metadata,
  six embedded fonts and the plugin/upstream MIT and font OFL notices. No local
  profiles, credentials, output or development dependencies are included.
- Installed this exact tarball into a fresh isolated DSH 0.2.1-rc.5 Web profile
  on macOS. Native Plugins showed v0.3.4 running; installed client bytes match
  the build. The settings link and both Chinese/English labels rendered.
- Clicking the link opened the expected repository URL in a new page with
  `window.opener === null` and an empty referrer. GitHub navigation was fulfilled
  by a browser route fixture, so this verifies navigation behavior, not GitHub
  availability. The settings page loaded no GitHub resource before the click.
- After release-prepared README edits, the final tarball was installed into
  fresh isolated rc.5 and Desktop-bundled minimum rc.3 profiles. Client bytes
  matched, and uninstall removed each dependency and bundle entry. No new rc.3
  browser coverage is claimed.
- Browser and isolated Host were stopped; tarball uninstall was verified.
  No real account, model call, new host-version or native desktop-shell coverage
  is claimed. Public npm and GitHub tarballs match the tested artifact
  byte-for-byte; publication is recorded in `docs/release.md`.
- SHA256: `2fb087ebb1ba10443d46c1a04ec5b001e466554c54abd6b218a072e65bda95ad`.

## Native update entry — 2026-11-03 (v0.3.3, local)

- Added a manual settings entry using only optional native Host services.
  Host-dependent bindings stay in `adapter.ts`; the Client makes no external
  requests and adds no downloader, background polling, model tool or Host service.
- Both `listVersions` and `updateBundle` must be present. The check offers only
  compatible, non-deprecated stable bundle versions returned by the Host. An
  explicitly confirmed update passes the exact version and answering registry
  back to the Host. Network, unsupported-source, restart, recovery and unknown
  outcomes remain distinct; failures are never reported as up to date.
- Unmount aborts an active check and ignores late results. An upgrade already
  handed to the Host survives the settings component being replaced; final
  installed version is visible in native Plugins after self-update reloads it.
- `npm run check` passed: type checking, 18 tests and build. Six new tests cover
  old-host fallback without package mutations, version eligibility/source,
  failure and recovery result mapping, confirmation/duplicate prevention, and
  cancellation on disposal. Recovery outcome mapping is unit-tested; this pass
  did not force a real failed installation or failed recovery.
- `npm pack` contains 11 allowed files, version 0.3.3 in manifest/build metadata,
  six offline fonts and plugin/upstream MIT plus font OFL notices. No local
  registry, test profiles, output or development dependencies are included.
- Real DSH 0.2.1-rc.5 in an isolated macOS Web profile: manual instructions and
  Open Plugins rendered; the button returned to the native list. Background
  regression retained default Big fat whale, pointer pass-through and composer
  avoidance. Browser console had no warnings/errors.
- Real published DSH 0.2.2-alpha.2 in an isolated macOS Web profile: used a
  loopback-only fixture registry with synthetic 0.3.3 and 0.3.4 archives derived
  from this build. Check showed 0.3.3 → 0.3.4. Before confirmation the installed
  version remained 0.3.3; after confirmation the actual installed manifest and
  saved exact dependency were 0.3.4, the plugin reloaded and native Plugins
  showed the new version running. A saved lotus preference survived. A new
  check reported no newer version; the browser console had no warnings/errors.
  These synthetic versions were not published. The alpha Host is a capability
  test, not a new minimum requirement or a recommendation to upgrade DSH.
- After final README edits, reinstalled the final tarball on both isolated
  Hosts, compared installed client bytes to the build, and uninstalled. Both
  dependencies and bundle entries were removed. Test browsers, Hosts and
  loopback registry were stopped. No credentials or model calls were used.
- The final tarball also passed isolated installation, client-byte comparison and
  removal with the Desktop-bundled minimum DSH 0.2.1-rc.3 CLI. No new rc.3
  browser interaction coverage is claimed.
- SHA256: `fb8f14b0a40463a5155c0643196c988114e1ef3e7b3605fa3fb9f1d1924d52c2`.
- No new Windows/Linux, native desktop-shell, long-chat or future-host claim.
  Published npm and GitHub tarballs match the tested release artifact byte-for-byte;
  publication details are tracked in `docs/release.md`.

## DSH rc.5 compatibility fix — 2026-11-02 (v0.3.2)

- Reproduced rc.5 rejecting the original 0.1.0 tarball because its
  `engines.dsh` requires exactly 0.2.1-rc.3. The host rolled back installation.
  This was a compatibility gate rejection; no plugin crash or data loss was observed.
- Changed package/lockfile version to 0.3.2. At the user's request, the final
  `engines.dsh` is `>=0.2.1-rc.3`, with no upper bound. Forward installation
  eligibility is separate from the actually tested rc.3/rc.5 hosts. Updated
  AGENTS.md to retain that policy. The adapter, pinned engine, defaults and
  preference keys are unchanged.
- `npm run check` passed: type checking, all 12 tests and build.
- `npm pack` produced 11 files. Checked package and build version, exact host
  declaration, six embedded fonts, plugin/upstream MIT and font OFL notices.
  No local host data, output, credentials or development dependencies are included.
- Installed this exact tarball with official npm DSH 0.2.1-rc.5 in isolated
  `.local/verify-0.3.2-rc.5`, without an exact-version exemption. Cold startup on
  loopback succeeded; the native Plugins page showed v0.3.2 running and all six scenes.
- In Chrome, visually checked default Big fat whale and composer whitespace.
  Typed text into the real composer without sending; canvas pointer events remain
  `none`. The semantic chat/hero markers and composer avoidance remain compatible.
- Switched to lotus and still mode through native settings. Both preferences and
  the lotus canvas survived reload. Forced colors set the canvas display to `none`.
  Restore defaults returned Big fat whale, 45%, new conversations only and system motion.
- Native plugin disable removed canvas, style, host and avoidance markers (all zero).
  Browser console reported no warnings or errors. No credentials or model calls were used.
- Installed the same tarball with the macOS Desktop-bundled DSH 0.2.1-rc.3 CLI in
  isolated `.local/verify-0.3.2-rc.3`. Installed client bytes matched the build on both
  hosts. Native CLI uninstall removed the dependency and bundle on both hosts;
  the rc.5 test server and browser were stopped.
- After changing only compatibility metadata/docs, repacked and installed the final
  tarball into fresh `.local/verify-0.3.2-forward-rc.3` and
  `.local/verify-0.3.2-forward-rc.5`. Both installed manifests have the minimum-only
  range; client/host/build metadata/license bytes match the final artifact. Both
  uninstalls removed dependency and bundle. The browser-tested runtime code is unchanged.
- Tested the actual rc.5 `evaluatePluginCompatibility` function: rc.3, rc.4, rc.5,
  rc.6, 0.2.1, 0.2.2-rc.1, 0.3.0-rc.1, 0.3.0 and 1.0.0 pass the version gate;
  0.2.0 and 0.2.1-rc.2 are rejected. Future-version inputs test matching rules only,
  not real future-host compatibility. DSH currently includes prereleases in matching.
- Final tarball SHA256: `d895e4c9e33a1e8f0d0184c114e4e69f1103aa33bb90e3fd453e56adb281f168`.
- Limits: rc.3 received installation regression only in this pass; prior visual
  validation still applies. No native desktop-shell, Windows/Linux, real model
  streaming, long-chat or full animation-cycle validation was added.
- Published to npm and GitHub Releases. Both downloaded tarballs match the tested
  artifact byte-for-byte; publication details are in `docs/release.md`.

## Default scene update — 2026-10-29 (v0.3.1)

- Default scene and Restore defaults use Big fat whale (`dafeijing`). Existing
  saved scene choices are preserved; the storage key and normalization contract
  remain unchanged. Engine pin and declared host compatibility are unchanged.
- `npm run check` passed: type checking, 12 tests and build. Existing tests now
  assert Big fat whale on a fresh client, retention of a saved lotus choice,
  and switching back to the full defaults with instance cleanup.
- `npm pack` produced 11 files with version 0.3.1 in package/build metadata,
  six embedded fonts and MIT/OFL notices, without local host data.
- Installed the exact tarball into fresh `.local/verify-0.3.1` using the official
  macOS DSH 0.2.1-rc.3 CLI; the installed client matched the build byte-for-byte.
  Uninstall removed both the dependency and bundle entry.
- SHA256: `264a23cb481334d75e6cf2a18f4984174684a25765c67d04db686efddbcfad3b`.
- This patch did not repeat browser visual/interaction checks or expand host support.
  GitHub Release 0.3.1 is published; npm status is tracked in `docs/release.md`.

## Upstream upgrade — 2026-10-29 (v0.3.0)

- Pinned inkpond commit `4cb32fb1ef9120d4115e47265ad13a13c7fb59f6`, verified
  against GitHub main, as a separate archive built from a clean `git archive`.
  Added Big fat whale (`dafeijing`) as the sixth scene; provenance is in `vendor/README.md`.
- Defaults and `engines.dsh` remain unchanged. Six font subsets are embedded offline.
- `npm run check` passed: type checking, 12 tests and build. The scene lifecycle
  regression now covers Big fat whale persistence, still-mode forwarding, switching
  back to lotus and instance cleanup. The actual client factory loads all six fonts.
- `npm pack` contains 11 files, including upstream MIT and font OFL notices;
  no local profiles, credentials, sessions or development dependency archive.
- Installed the tarball into fresh `.local/verify-0.3.0` with the official macOS
  DSH 0.2.1-rc.3 CLI. Loopback Web cold startup succeeded; the native Plugins page
  showed v0.3.0 running with all six scenes. Big fat whale selection persisted
  after reload; its canvas rendered in the new conversation with the composer clear.
  No browser warnings/errors were recorded. No credentials or model calls were used.
- After final README/description punctuation edits, repacked and reinstalled the final
  tarball; its installed client and license files matched the build byte-for-byte.
  Uninstall removed the dependency and bundle entry. The test host was stopped.
- Final tarball SHA256: `5276a0bf3adc1bd9caa19b851344aecfd7d85b29d1483524ef60595150d0735a`.
- Limits: this pass did not verify the full feeding animation cycle, light theme,
  forced colors, long conversations or other host versions. Existing limits below apply.
  GitHub Release 0.3.0 is published; npm status is tracked in `docs/release.md`.

## Local upstream upgrade — 2026-10-28 (v0.2.0)

- Pinned local upstream commit `c502ef8ba4a898b22f321a5dba3e2255736bc60c`
  as a separate vendored dependency tarball; provenance and SHA256 are in `vendor/README.md`.
  npm latest was still 0.1.0; GitHub main was `df88c5cdabdef063ba5022cd5c761def7b4f6ef9`.
- Added solar terms and Northern sea choices. Defaults remain lotus, new conversations,
  45% strength and system motion. No change to the declared host version.
- Clean `npm ci`, `npm run check` passed: type checking, 11 tests and build.
  New regression cases check scene switching, persistence, still mode and instance cleanup.
  The real client factory test verifies all five inline fonts and no unresolved import.meta.
- Fixed offline embedding of the solar-term font at `../../assets/`.
- `npm pack` produced 11 files with MIT and OFL notices, no host data, credentials,
  .local files or vendored development archive.
- Installed the tarball in a fresh `.local/upgrade-dsh-home`, using the official macOS
  DSH 0.2.1-rc.3 CLI. Cold Web startup on loopback succeeded. Visually checked lotus,
  solar terms and Northern sea; the composer remained clear. New scenes appeared in
  native plugin settings. Solar-term selection survived reload; restore defaults worked.
  No browser warnings or errors were recorded during those scene checks.
- CLI uninstall succeeded and removed the dependency from the isolated profile.
- Release version 0.2.0 confirmed by the user. The versioned tarball is checked and
  installed/uninstalled in an isolated profile before publication.
- Limits: this upgrade did not repeat dark-theme, forced-colors or all 24 seasonal
  date checks in the host. Existing long-chat/platform limits below still apply.
  npm reported 3 development dependency advisories (1 moderate, 2 critical);
  dependency security remediation was not included in this engine upgrade.

## Original verification — 2026-10-26

Host: official macOS DeepSeek Harness application CLI, DSH 0.2.1-rc.3.
Testing uses an isolated DSH_HOME and loopback Web listener. No existing user credentials or sessions
were copied, and no paid model requests were made.

## Verified

- Local bundle discovery and activation with both Host and browser entry points.
- Install of the built .tgz, followed by a cold host restart; plugin source shown as the tarball.
- Default lotus scene; switching to hills and Qingming through the native Plugins page.
- Dark/light theme changes and compositor input-area whitespace.
- Settings survive page/host reload and restore defaults to lotus.
- Native DSH uninstall removes the package from the installed list and profile bundle manifest.
- Native DSH disable retracts canvas, plugin stylesheet and avoidance/host markers: all counts zero.
- Nine automated cases: preference normalization, persistence, storage failure, cleanup, conversation
  phase transitions, theme/scene recreation, excluded/unknown surfaces, failed-canvas retry prevention,
  and evaluation of the real built client factory with all three font payloads.

## Limits

- No model response/streaming, live long-conversation scrolling, upload or IME composition test yet.
- Full-conversation mode's lifecycle is unit-tested; its complete real-chat interaction matrix is pending.
- No native desktop-shell, Windows/Linux or other DSH release compatibility claim.
- Animation timing in the in-app browser is throttled; no numeric performance claim is made.
- Background attachment uses semantic DOM markers rather than a dedicated upstream background Slot.

## Packaging findings

Plain Vite/ESM output cannot be used as the client export. The artifact must register a factory with
DSH's module loader and resolve React through the host's shared table. The upstream font `new URL`
expressions must be transformed before CJS bundling; all three subsets are embedded as data URLs.
A regression test evaluates the final artifact so this failure cannot be hidden by source-only tests.

DSH removing a linked checkout was observed removing its node_modules; dependencies were restored
from the lockfile. Final installation tests use prebuilt tarballs instead of source links.
