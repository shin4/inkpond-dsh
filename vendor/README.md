# Pinned upstream engine

`inkpond-c502ef8.tgz` is a separate, prebuilt upstream package from local
inkpond commit `c502ef8ba4a898b22f321a5dba3e2255736bc60c`. That commit includes
the solar terms and Northern sea scenes and was not on GitHub main when imported.
Its package metadata still says 0.1.0; it is not the npm 0.1.0 artifact.
The lockfile pins the archive integrity. Do not edit the engine inside this plugin.

SHA256: `bca533f4608f90da05d36b6c10aebda7850401a9bd97c84362bdf311d94d9428`

Built from a clean `git archive` of that commit with Node, the plugin's pinned
TypeScript 5.9.3 and React 18 types, using upstream `scripts/build.mjs`, followed
by `npm pack --ignore-scripts`. No upstream working-tree changes were included.
The archive includes upstream MIT and font OFL notices. It is a development
dependency only; the plugin release contains its bundled code, fonts and notices.

To reproduce with the upstream commit available locally:

```sh
mkdir -p .local/upstream-c502ef8
git -C ../inkpond archive c502ef8ba4a898b22f321a5dba3e2255736bc60c | tar -x -C .local/upstream-c502ef8
node .local/upstream-c502ef8/scripts/build.mjs
npm pack ./.local/upstream-c502ef8 --ignore-scripts --pack-destination .local
```
