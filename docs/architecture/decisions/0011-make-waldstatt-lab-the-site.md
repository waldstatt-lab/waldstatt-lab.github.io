---
tags: [adr]
status: accepted
date: 2026-11-24
amends:
  - 0002-compare-name-candidates-as-variant-routes.md
  - 0003-give-each-variant-its-own-pages-and-styles.md
  - 0010-move-waldstatt-games-into-its-own-repository.md
sources:
  - src/pages/
  - src/lab/
  - src/content.config.ts
  - src/lib/games.ts
  - src/lib/events.ts
  - src/variants/index.ts
  - ../../pitches/waldstatt-lab/pitch--waldstatt-lab.md
---

# 0011 — Make Waldstatt-Lab the site and keep the name candidates under Fun

## Context

The name is Waldstatt-Lab. It was none of the four candidates, so
[ADR 0002](0002-compare-name-candidates-as-variant-routes.md)'s plan, to move the
chosen variant to `/` and remove the others, does not fit. The site must also take
further events (a Zukunftstag every year, workshops, campaigns), each with any number
of games, and tell how games were made.

Alternatives considered:

- **Make the Lab a fifth variant and redirect `/` to it.** Keeps the structure, but
  puts the real site at a second-class address and leaves it among proposals.
- **Remove the candidates.** Simplest, but loses work worth showing.
- **Give the Lab the root and keep the candidates at their addresses.** Chosen.

For the games of later events, the candidates could show every game. Schafbock
Studio and 2raben games have texts and art per game and fail the build without
them, so every new game would mean work in pages nobody develops.

For the forest, alternatives were bitmaps in the repository, which are large and
cannot be continued at any width, and drawing with JavaScript, which the content
would then wait for.

## Decision

- The Lab's pages live directly in `src/pages/`: `index.astro`, `ueber-uns.astro`,
  `spiele/[game].astro`, `anlaesse/` and `fun.astro`. Their layout, components, styles
  and theme live in `src/lab/`, and the same rules as for a variant hold: no imports
  from a variant, except what `/fun/` shows of it (meta, theme, preview picture).
- The candidates stay at `/<slug>/`, linked from `/fun/` alone, and
  `src/variants/index.ts` refuses slugs that are routes of the Lab. Each has an
  explanation in its `meta.ts` and a `preview.webp`.
- Content is in three collections: `events`, `games`, each naming its event, and
  `making`, how a game was made. `getVariantGames()` gives the candidates the games of
  the Zukunftstag 2026; `getGames()` gives the Lab all of them.
- The forest is drawn at build time as SVG by `src/lab/forest.ts` and served from
  `/wald/`. All its pictures share one repeating lattice of trees, so they continue
  each other without a seam.
- The Lab's typefaces, Grenze and Atkinson Hyperlegible Next, are self-hosted from
  `@fontsource`, like the candidates' ones. Both are under the SIL Open Font License.
- Sketches from the game repositories' pitches and screenshots of the games may be
  copied, scaled down and without metadata, to tell a game's story. Game builds and
  the games' own assets still may not.

This amends ADR 0002 (the candidates stay after the choice), ADR 0003 (the shared
modules, the page folder check, and `src/styles/overview.css`, now
`src/lab/variants.css`) and ADR 0010 (the link to the Waldstatt game).

## Consequences

- A new event or game is a Markdown file and a picture; no page changes.
- The candidates are kept, not developed: they show two games, whatever follows.
- Screenshots and previews age with what they show and are replaced by hand.
- The Lab's pages have no scripts. The home page loads about 45 kB of forest, gzipped.

## The tell

- `ls src/pages` shows the Lab's pages and one folder per candidate; a folder that is
  neither fails the build.
- `rg -n "variants" src/lab src/pages/*.astro src/pages/spiele src/pages/anlaesse`
  finds imports only in `src/pages/fun.astro` and `src/lab/variants.css`.
- `rg -n "getGames\(" src/variants src/pages/*/` finds only the Lab's
  `src/pages/spiele/[game].astro`.
- Seams in the forest show only in a browser: look at a band's edges at odd and even
  window widths.
