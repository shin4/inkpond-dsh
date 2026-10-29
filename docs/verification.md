# Verification

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
  Version 0.3.0 has not been published by this change.

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
