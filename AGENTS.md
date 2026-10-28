# Inkpond for DSH

- Repository: https://github.com/shin4/inkpond-dsh. npm package: `dsh-inkpond`.
- Standalone DSH plugin. Keep the upstream inkpond engine separate and pinned.
- Default scene is lotus (莲池), scope is new conversations only.
- Client code must not access chat contents, credentials or external services.
- Preserve click-through behavior, input readability, reduced motion, forced colors and lifecycle cleanup.
- Use semantic host DOM markers only; keep host-dependent logic in adapter.ts and fail closed on unknown layouts.
- Declare only verified DSH versions. Do not widen engines.dsh without a real host test.
- Both READMEs must describe the same behavior and install status.
- Preserve MIT and font OFL notices in the actual tarball.
- Validation: `npm run check`, `npm pack`, then install that tarball into an isolated `DSH_HOME`.
- Keep .local, output, host configuration, authentication tokens and sessions out of Git and release artifacts.
- Use tarballs for host validation: uninstalling a linked checkout may remove its node_modules.
