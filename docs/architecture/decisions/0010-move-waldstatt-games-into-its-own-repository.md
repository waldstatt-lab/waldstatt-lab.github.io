---
tags: [adr]
status: accepted
date: 2026-11-19
amended-by: [0011-make-waldstatt-lab-the-site.md]
supersedes:
  - 0006-make-waldstatt-games-a-browser-game.md
  - 0007-save-waldstatt-games-in-indexeddb.md
  - 0008-keep-named-waldstatt-saves-and-files.md
  - 0009-keep-the-waldstatt-keymap-in-a-settings-database.md
amends:
  - 0001-build-a-static-site-with-astro-and-daisyui.md
  - 0004-allow-optional-client-side-scripts-in-a-variant.md
sources:
  - src/variants/index.ts
  - src/styles/overview.css
  - src/pages/index.astro
  - astro.config.mjs
  - package.json
---

# 0010 — Move Waldstatt Games into its own repository

> Amended by [ADR 0011](0011-make-waldstatt-lab-the-site.md): the overview is gone.
> Of the Lab's pages, only the Fun page links to the Waldstatt game; others name
> it and lead there.

## Context

[ADR 0006](0006-make-waldstatt-games-a-browser-game.md) turned the Waldstatt
Games variant into a building game, and ADRs 0007 to 0009 gave it saves in
IndexedDB, named saves and files, and a keymap of its own. It went on growing,
with commands, macros and a script language, and by then it held most of this
repository's code, dependencies and documents and most of its changes. The
other variants are small static sites that compare names.

Alternatives considered:

- **Keep it as a variant.** Every change to the game stays a change to the
  studio website, and the game's dependencies, documents and rules for scripts
  and storage apply to a site that otherwise needs none of them.
- **Move it to its own repository and deployment**, like Moto Devil and Car
  Drive. Chosen.

## Decision

- The game lives in [waldstatt-lab/waldstatt](https://github.com/waldstatt-lab/waldstatt) and
  is published as that repository's Pages site, <https://waldstatt-lab.github.io/waldstatt/>.
  Its pitches and ADRs moved with it.
- This repository removes `src/pages/waldstatt-games/`,
  `src/variants/waldstatt-games/`, its entry in `src/variants/index.ts`, its
  theme in `src/styles/overview.css`, its pitches and the `pixi.js` dependency.
  The overview lists the remaining four variants.
- `/waldstatt-games/` stays a redirect to <https://waldstatt-lab.github.io/waldstatt/>,
  configured in [astro.config.mjs](../../../astro.config.mjs), so links and
  installed apps from the variant lead to the game. Saves carry over: the
  game keeps its database and key names, and both sites share the origin.
- ADRs 0006 to 0009 are superseded here and stay for their rationale; their
  links point to this repository as it was before the removal. Their current
  versions are in waldstatt-lab/waldstatt.
- Every remaining variant is again bound by ADRs 0001 and 0004, as amended by
  [ADR 0005](0005-enhance-november-games-with-local-interactions.md): no
  content depends on JavaScript, and no variant needs a rendering library.

## Consequences

- The studio website is again a set of small static sites; its build no
  longer bundles PixiJS or generates water data.
- Waldstatt Games is no longer a name candidate on the overview. Whether the
  studio's name may still be «Waldstatt Games» is a separate decision.
- The old variant's service worker stays registered in browsers that installed
  it, scoped to `/waldstatt-games/`. It fetches the page network-first, so it
  gets the redirect; its old cache stays until the browser clears it.

## The tell

- `rg -n -i "waldstatt" src` finds only the overview's link to the game in
  `src/pages/index.astro` and its reserved slug in `src/variants/index.ts`
  (added after this decision, so the overview leads to the game).
- `ls src/pages src/variants` shows no `waldstatt-games`.
- After `mise run build`, `dist/waldstatt-games/index.html` redirects to
  `https://waldstatt-lab.github.io/waldstatt/`, and `dist/` holds no other file under
  `waldstatt-games/`.
