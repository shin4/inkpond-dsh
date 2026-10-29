# Pinned upstream engine

`inkpond-4cb32fb.tgz` is a separate, prebuilt upstream package from local
inkpond commit `4cb32fb1ef9120d4115e47265ad13a13c7fb59f6`. That commit includes
all six scenes, including Big fat whale, and matched GitHub main on 2026-10-29.
Its package metadata still says 0.1.0; it is not the npm 0.1.0 artifact.
The lockfile pins the archive integrity. Do not edit the engine inside this plugin.

SHA256: `e41c772efdfb93640e53cc19ef47bc747f6664562b6a5bbe0c45bcd406443a70`

Built from a clean `git archive` of that commit with Node, the plugin's pinned
TypeScript 5.9.3 and React 18 types, using upstream `scripts/build.mjs`, followed
by `npm pack --ignore-scripts`. No upstream working-tree changes were included.
The archive includes upstream MIT and font OFL notices. It is a development
dependency only; the plugin release contains its bundled code, fonts and notices.

To reproduce with the upstream commit available locally:

```sh
mkdir -p .local/upstream-4cb32fb
git -C ../inkpond archive 4cb32fb1ef9120d4115e47265ad13a13c7fb59f6 | tar -x -C .local/upstream-4cb32fb
node .local/upstream-4cb32fb/scripts/build.mjs
npm pack ./.local/upstream-4cb32fb --ignore-scripts --pack-destination .local --cache .local/npm-cache
```
