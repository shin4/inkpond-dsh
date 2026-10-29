# Inkpond for DSH

[简体中文](README.md)

Interactive Chinese glyph ink-wash backgrounds for DeepSeek Harness.
The default **lotus pond** has drifting koi, lotus leaves and flowers. Pointer movement makes ripples;
clicking empty space drops ink. Misty hills, a Qingming handscroll, the 24 solar terms, the Northern sea and Big fat whale are also included.

![Lotus pond live preview in DSH, 1280×720](https://raw.githubusercontent.com/shin4/inkpond-dsh/main/docs/images/lotus-preview.gif)

[View the 16:9 still screenshot](https://raw.githubusercontent.com/shin4/inkpond-dsh/main/docs/images/lotus-preview.png) · Actual capture, approximately 10 seconds, with the default lotus scene and 45% strength.

## Compatibility

The initial verified host is **DSH 0.2.1-rc.3**, using the kernel shipped with the official macOS
Desktop app in an isolated Web profile. `engines.dsh` is intentionally pinned to that version.
Other releases and Windows/Linux are not yet verified. The adapter uses semantic conversation DOM
markers; host layout/API changes need validation before widening compatibility.

## Install

The source version is **0.3.0** (adding Big fat whale), not yet published; the npm / Release commands below still target the published 0.2.0.
To try 0.3.0 locally, run `npm ci && npm run check && npm pack`, then install the generated `dsh-inkpond-0.3.0.tgz`.

### Desktop or Web: use the Add plugin wizard (recommended)

1. Open **Plugins → Add plugin → Install a third-party plugin** in DSH.
2. Enter the npm package name in the **Package name or address** field:

   ```text
   dsh-inkpond
   ```

   To pin the published version, enter `dsh-inkpond@0.2.0` instead.
3. Select **Official npm registry** under the installation registry options, then click **Install**.
   Mirrors may not have synchronized a newly published version yet.
4. Start a new empty conversation to see the default lotus pond. If DSH requests a restart,
   fully quit and reopen the application.

The wizard installs directly from npm, independently of listings in 1024 Store or dshmarket.
No source checkout or local compilation is needed. The compatibility limits above still apply.

### Install into a Web profile with the CLI

```bash
dsh plugin --profile web add dsh-inkpond@0.2.0
```

For Desktop, prefer the in-app wizard above, which targets the current application's profile.
The terminal's `web` profile is not necessarily the Desktop profile.
The package is published on [npm](https://www.npmjs.com/package/dsh-inkpond).

### Install a Release tarball

Download `dsh-inkpond-0.2.0.tgz` from [Releases](https://github.com/shin4/inkpond-dsh/releases).
Enter its absolute local path in the host plugin manager, or install into a regular Web profile:

```bash
dsh plugin --profile web add /absolute/path/to/dsh-inkpond-0.2.0.tgz
```

Refresh the page; restart the instance if it does not hot-load. The tarball is prebuilt and
does not compile code at installation time.
A GitHub source checkout requires `npm ci && npm run build` before installation.

## Preferences

Open Plugins → Installed → dsh-inkpond. Select Lotus pond (default), Misty hills, Qingming handscroll, 24 solar terms (selected by the current date), Northern sea (waves and a whale) or Big fat whale (eating rice, spouting grains and reacting to the pointer);
choose new conversations only (default) or all conversations, toggle color accents, adjust ink strength,
and select system animation preferences or a still image. All-conversation mode needs further long-chat testing.
Restore defaults returns to Lotus pond, 45% strength, new conversations only and system motion preferences.

The canvas passes through clicks and never controls typing or sending. Hidden pages pause animation;
reduced motion produces a still image, and forced colors hides the decoration. Weak devices downgrade automatically.

Preferences use this client's origin-local storage (`dsh-inkpond.preferences.v1`); performance uses
`dsh-inkpond.tier.v1`. They do not synchronize between browsers, ports or devices. When storage is
unavailable, changes last only for the current page. Uninstall removes runtime instances, styles and DOM
markers but retains preferences for reinstall. Delete those two storage keys to remove preferences too.

## Development

Node.js 22+ and npm:

```bash
npm ci
npm run check
npm pack
```

`check` runs type checking, tests and the build. The tarball contains the Host entry, DSH client factory,
offline fonts and licenses. React comes from DSH; the renderer is pinned to local inkpond commit `4cb32fb1ef9120d4115e47265ad13a13c7fb59f6`
(an independent dependency tarball; see `vendor/README.md`).
Test tarballs in a separate `DSH_HOME`. Avoid uninstall tests in a daily profile. DSH local-link removal
was observed cleaning the linked target's development dependencies, so use tarballs for acceptance testing.
See the [verification record](docs/verification.md) and [release checklist](docs/release.md).

## Scope and licenses

This plugin adds only backgrounds and appearance preferences. It registers no model tools, reads no
messages, sends no telemetry and makes no third-party network requests. All fonts are included; no CDN
is needed. The host's own networking is outside this plugin's control.

MIT code; renderer from [inkpond](https://github.com/shin4/inkpond). Font subsets use SIL OFL 1.1;
see [third-party notices](THIRD_PARTY_NOTICES.md). Independent community project, unaffiliated with DeepSeek.
