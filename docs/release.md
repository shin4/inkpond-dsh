# Release checklist

1. Run `npm ci`, `npm run check`, `npm pack`; inspect the package file list and licenses.
2. Install the exact tarball into an isolated DSH profile; verify activation, scene/theme controls and uninstall.
3. Commit only source, tests, docs and lockfile. Never include `.local`, host data, credentials or npm logs.
4. Publish a GitHub tag/release and attach the prebuilt versioned tarball and SHA256SUMS.
5. Publish that exact tarball to npm after authentication: `npm publish ./dsh-inkpond-0.1.0.tgz --access public`.
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

## v0.1.0 publication status

- npm: `dsh-inkpond@0.1.0` is public. Registry download SHA256 matches the tested GitHub Release tarball: `1a27ce8ec29776a1983e9eedb43dd8fe8154fbd4ed80f6f8ad8161d992c75c4b`.
- The immutable 0.1.0 tarball contains the pre-publication README; current installation instructions are in the repository and Release notes.
- 1024 Store submission: https://github.com/imsai-sh/awesome-deepseek-harness-plugins/pull/700
- dshmarket submission remains pending the minimum repository age of one day.
