---
tags: [adr]
status: accepted
date: 2026-11-15
amended-by:
  - 0003-give-each-variant-its-own-pages-and-styles.md
  - 0011-make-waldstatt-lab-the-site.md
sources:
  - src/variants.ts
  - src/pages/index.astro
  - src/pages/[variant]/
  - src/content/games/
---

# 0002 — Compare name candidates as variant routes that share the game content

> Amended by [ADR 0003](0003-give-each-variant-its-own-pages-and-styles.md):
> each variant now has its own pages in `src/pages/<slug>/` and its own layout,
> components and theme in `src/variants/<slug>/`; `src/variants.ts` and
> `src/pages/[variant]/` were replaced by `src/variants/index.ts` and those folders.
>
> Amended by [ADR 0011](0011-make-waldstatt-lab-the-site.md): the name is
> Waldstatt-Lab, whose pages are at `/`. The candidates stay at their addresses,
> listed at `/fun/`, and show only the games of the Zukunftstag 2026.

## Context

The studio's name is not decided; "2raben" is temporary. Colleagues should compare
complete versions of the site, one per name candidate (for example Schafbock Studio,
Egg Settlers, November Games, and Waldstatt Games), and then choose. The game texts
are the same in every version.

Alternatives considered:

- **One branch or deployment per candidate.** Fully independent, but the game texts
  drift apart and comparing means switching between sites.
- **A name switcher on one page.** Quick to compare, but cannot show different
  layouts and does not show the site as it would really appear.
- **One route per candidate** in a single build, sharing the content collection.

## Decision

`src/variants.ts` lists the variants: slug, name, daisyUI
theme, and tagline. Each variant is served under `/<slug>/` with a home page,
`/<slug>/ueber-uns/`, and `/<slug>/spiele/<game>/` for every entry in
`src/content/games/`. The root page lists all variants, each rendered in its own
theme, so colleagues can open them side by side.

On the organization's Pages domain, the games' project sites take precedence over
the organization site, so `src/variants.ts` refuses slugs that equal a game's Pages
path (`moto-devil`, `carrrgh`).

## Consequences

- Adding a candidate is one entry in `src/variants.ts` plus its theme in
  `src/styles/global.css`. A variant that needs its own layout or components adds
  them beside the shared ones and selects them by slug.
- Game texts exist once and stay consistent across variants.
- After the name is chosen, the chosen variant moves to `/` and the others are
  removed; record that as a new ADR superseding this one.

## The tell

- `mise run build` lists `/<slug>/`, `/<slug>/ueber-uns/`, and
  `/<slug>/spiele/<game>/` for every variant and game.
- Every slug in `src/variants.ts` differs from the path of each `playUrl` in
  `src/content/games/`; update the reserved list when a game is added.
