# Release checklist

1. Run `npm ci`, `npm run check`, `npm pack`; inspect the package file list and licenses.
2. Install the exact tarball into an isolated DSH profile; verify activation, scene/theme controls and uninstall.
3. Commit only source, tests, docs, lockfile and the pinned upstream dependency archive. Never include `.local`, host data, credentials or npm logs.
4. Publish a GitHub tag/release and attach the prebuilt versioned tarball and SHA256SUMS.
5. Publish that exact tarball to npm after authentication: `npm publish ./dsh-inkpond-0.3.4.tgz --access public`.
6. Once npm is verified, update both README install sections with the package-name command.
7. Submit the prepared catalog entries separately. Recheck upstream contribution rules at submission time.

## Markets

- dshmarket: https://github.com/awesome-dsh-plugin/awesome-dsh-plugin/blob/main/contributing.md
  Add one `data/plugins/shin4__inkpond-dsh.yml`. Repository must be at least one day old.
  Release tarball installation is supported; no npm account is needed for this channel.
- 1024Store: https://github.com/imsai-sh/awesome-deepseek-harness-plugins/blob/main/CONTRIBUTING.md
  Add one `catalog/plugins/shin4--inkpond-dsh.json`, with the actual submission date.
  Without npm publication the listing is browse-only. A single added entry passing static review can auto-merge.

Do not edit either catalog's generated READMEs. Prepared entries live in `docs/market`.

## v0.3.4 release preparation — 2026-11-04

- Adds a bilingual repository link at the bottom of plugin settings. Opening
  GitHub requires an explicit click; the link uses a new page and suppresses
  opener/referrer access. No Star API, telemetry or automatic requests are added.
- Package and lockfile versions are 0.3.4. Publication is in progress;
  both READMEs include release-prepared 0.3.4 install instructions.
- Validation: clean `npm ci`, type checking, all 18 tests, build and package
  inspection passed. The final tarball passed isolated rc.3/rc.5 installation,
  client-byte comparison and removal. Real rc.5 browser verification covered
  Chinese/English labels and explicit new-page navigation.
- Release artifact: `dsh-inkpond-0.3.4.tgz`.
  SHA256: `2fb087ebb1ba10443d46c1a04ec5b001e466554c54abd6b218a072e65bda95ad`.
- Validation details are recorded in `docs/verification.md`.

## v0.3.3 publication status — 2026-11-03

- Adds a manual native Host update entry. Supports check/confirm/exact-version
  update where the Host exposes both APIs; older Hosts show native-management
  guidance. The Client has no direct registry access or self-managed installer.
- `npm run check` passed: 18 tests, type checking and build. Final tarball
  inspection and isolated install/uninstall passed on rc.5 and alpha.2.
  Real browser checks cover old-host navigation and a synthetic-registry update
  on the official alpha Host; scope and limitations are in `docs/verification.md`.
- Release artifact: `dsh-inkpond-0.3.3.tgz`.
  SHA256: `fb8f14b0a40463a5155c0643196c988114e1ef3e7b3605fa3fb9f1d1924d52c2`.
- Release commit: `892d1529e7899a793e85867e6b82ff80189bdb0f`; GitHub CI passed.
- GitHub Release: https://github.com/shin4/inkpond-dsh/releases/tag/v0.3.3
  Includes the tested tarball and SHA256SUMS-0.3.3; downloaded bytes match.
- npm `dsh-inkpond@0.3.3` is public; `latest` points to 0.3.3.
  The registry tarball matches the tested GitHub artifact byte-for-byte.
- The immutable tarball includes release-prepared documentation; the current
  publication status is here and in both repository READMEs.
- dshmarket: https://github.com/awesome-dsh-plugin/awesome-dsh-plugin/pull/11517
  Updates only the tarball URL to 0.3.3; merged on 2026-11-03 UTC.
- 1024 Store: https://github.com/imsai-sh/awesome-deepseek-harness-plugins/pull/733
  Updated the existing PR to the 0.3.3 release. Versions are discovered
  automatically; the existing description change awaits maintainer review.
- Engine pin, verified minimum DSH version, defaults and preference keys are unchanged.

## v0.3.2 publication status — 2026-11-02

- Fixes rc.5 compatibility rejection; uses `engines.dsh: >=0.2.1-rc.3` with no
  upper bound, as requested. Actual host validation remains rc.3 and rc.5.
  Future prerelease/stable matching was checked with the real rc.5 evaluator.
- Type checking, 12 tests, build, package inspection, isolated rc.3/rc.5
  install/uninstall and rc.5 browser validation passed; see `docs/verification.md`.
- Release artifact: `dsh-inkpond-0.3.2.tgz`.
  SHA256: `d895e4c9e33a1e8f0d0184c114e4e69f1103aa33bb90e3fd453e56adb281f168`.
- Release commit: `6280ac05722b2b8b411e819e42524cc4a23f4b7c`; GitHub CI passed.
- GitHub Release: https://github.com/shin4/inkpond-dsh/releases/tag/v0.3.2
  Includes the tested tarball and SHA256SUMS-0.3.2; downloaded bytes match.
- npm `dsh-inkpond@0.3.2` is public; `latest` points to 0.3.2.
  The registry tarball matches the tested Release artifact byte-for-byte.
- The immutable tarball contains the pre-publication README; current installation
  status is recorded here and in both repository READMEs.
- Updated the prepared market tarball URL to 0.3.2; external catalog submissions
  are separate from this package release.

## v0.3.1 publication status — 2026-10-29

- Default scene and Restore defaults now use Big fat whale; existing saved scene choices remain intact.
- Engine pin, host compatibility, new-conversation scope and 45% strength are unchanged.
- Type checking, 12 tests, build, packaging and isolated DSH install/uninstall passed.
- Release commit: `fafcfdb9ac07ed05fe1933b275fdb9366207798d`; GitHub CI passed.
- GitHub Release: https://github.com/shin4/inkpond-dsh/releases/tag/v0.3.1
  Includes the tested tarball and SHA256SUMS-0.3.1; downloaded bytes match.
  SHA256: `264a23cb481334d75e6cf2a18f4984174684a25765c67d04db686efddbcfad3b`.
- npm `dsh-inkpond@0.3.1` is public; `latest` points to 0.3.1.
  The downloaded registry tarball matches the tested Release artifact byte-for-byte.
- The immutable tarball contains the pre-publication README; current status is recorded here.

## v0.3.0 publication status — 2026-10-29

- Source, lockfile and bundled build metadata are 0.3.0.
- Adds Big fat whale from pinned upstream commit `4cb32fb1ef9120d4115e47265ad13a13c7fb59f6`.
- Checks, packaging and isolated host install/uninstall passed; see `docs/verification.md`.
- Release commit: `dae462108350ccd29e235de9e37301de911e9512`; GitHub CI passed.
- GitHub Release: https://github.com/shin4/inkpond-dsh/releases/tag/v0.3.0
  Includes the tested `dsh-inkpond-0.3.0.tgz` and `SHA256SUMS`; downloaded bytes match.
  SHA256: `5276a0bf3adc1bd9caa19b851344aecfd7d85b29d1483524ef60595150d0735a`.
- npm: `dsh-inkpond@0.3.0` is public and `latest` points to 0.3.0.
  Downloaded registry bytes match the tested GitHub Release tarball and SHA256 above.
- The immutable tarball includes the pre-publication README; current status is here and in the repository READMEs.
- dshmarket update: https://github.com/awesome-dsh-plugin/awesome-dsh-plugin/pull/10406
  Both PR check and Submission gate passed; maintainer merge is pending.
  The live storefront still links the 0.2.0 tarball.
- 1024 Store update: https://github.com/imsai-sh/awesome-deepseek-harness-plugins/pull/733
  Updated the existing PR to six scenes; static review passed, maintainer merge required.
  The live detail API reads manifest version 0.3.0, but its catalog description still lists three scenes.

## v0.2.0 publication status — 2026-10-28

- Release commit: `780c620c067de8190135cad2ecc9d9da8e117d34`; GitHub CI passed.
- GitHub Release: https://github.com/shin4/inkpond-dsh/releases/tag/v0.2.0
  Includes `dsh-inkpond-0.2.0.tgz` and `SHA256SUMS`.
- npm: `dsh-inkpond@0.2.0` is public and the `latest` tag points to 0.2.0.
- The registry download is byte-for-byte identical to the tested Release tarball.
  SHA256: `fafbf57d82fc11a24fd3a1479519ea38ffae8d4d6e6e229f2e545cb008637d53`.
- Final versioned package passed 11 tests, type checking, build and isolated DSH installation/uninstallation.

## v0.1.0 publication status

- npm: `dsh-inkpond@0.1.0` is public. Registry download SHA256 matches the tested GitHub Release tarball: `1a27ce8ec29776a1983e9eedb43dd8fe8154fbd4ed80f6f8ad8161d992c75c4b`.
- The immutable 0.1.0 tarball contains the pre-publication README; current installation instructions are in the repository and Release notes.
- 1024 Store submission: https://github.com/imsai-sh/awesome-deepseek-harness-plugins/pull/700
- dshmarket submission remains pending the minimum repository age of one day.
