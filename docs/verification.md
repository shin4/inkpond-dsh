# Verification — 2026-10-26

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
