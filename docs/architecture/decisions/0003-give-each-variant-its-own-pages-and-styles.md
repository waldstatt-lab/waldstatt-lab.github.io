---
tags: [adr]
status: accepted
date: 2026-11-15
amended-by: [0011-make-waldstatt-lab-the-site.md]
amends:
  - 0001-build-a-static-site-with-astro-and-daisyui.md
  - 0002-compare-name-candidates-as-variant-routes.md
sources:
  - src/variants/
  - src/pages/
  - src/styles/overview.css
  - src/lib/games.ts
---

# 0003 — Give each variant its own pages, layout and stylesheet

> Amended by [ADR 0011](0011-make-waldstatt-lab-the-site.md): `/` is the Lab's home
> page, and the variants are listed at `/fun/`. `src/styles/overview.css` became
> `src/lab/variants.css`, and `src/pages/` also holds the Lab's own folders.

## Context

[ADR 0002](0002-compare-name-candidates-as-variant-routes.md) served every name
candidate from one set of dynamic pages (`src/pages/[variant]/`) that differed only
in name, tagline and daisyUI theme. The candidates are meant to be designed
independently, each with its own look and possibly its own pages, before
colleagues choose one. With shared pages, every design change affected all
variants, or the pages had to branch on the slug.

Alternatives considered:

- **Shared dynamic pages with a component map per variant.** Keeps identical page
  sets, but a variant cannot add pages of its own, and the indirection is harder
  to follow.
- **One folder of pages per variant** using Astro's file-based routing, with the
  variant's layout, components and stylesheet beside it.

## Decision

Each variant owns two folders named after its slug:

- `src/pages/<slug>/`: its pages; the initial set is `index.astro`,
  `ueber-uns.astro`, and `spiele/[game].astro`.
- `src/variants/<slug>/`: `meta.ts` (slug, name, tagline), `Layout.astro`,
  components such as `GameCard.astro`, `styles.css` (Tailwind, typography and
  daisyUI without built-in themes), and `theme.css`, a custom daisyUI theme named
  after the slug. Each theme starts as a copy of a built-in theme.

Only the game texts (`src/content/games/`, read through `src/lib/games.ts`) and
`src/lib/url.ts` are shared. [src/variants/index.ts](../../../src/variants/index.ts)
lists the variants for the overview at `/` and fails the build when a listed
variant has no `src/pages/<slug>/index.astro`, when a page folder is not listed,
or when a slug is a game's Pages path. The overview imports every variant's
`theme.css` through `src/styles/overview.css`.

This amends ADR 0002, whose route structure, shared game content, and reserved
slugs remain, and the theme consequence of
[ADR 0001](0001-build-a-static-site-with-astro-and-daisyui.md): themes now live in
each variant's `theme.css`, not in one global stylesheet.

## Consequences

- A variant can change its layout, fonts, colors and components, or add pages,
  without affecting the others; its pages load only its own stylesheet.
- The initial variants duplicate the same layout and pages; fixes to that shared
  starting point must be repeated in each variant that still uses it.
- Adding a variant means copying both folders, renaming them, changing `meta.ts`
  and the theme name, listing it in `src/variants/index.ts`, and importing its
  theme in `src/styles/overview.css`.
- Choosing the name means moving that variant's pages to `src/pages/` and deleting
  the other folders; record that as a new ADR.

## The tell

- `mise run build` fails with a message naming the folder when `src/pages/` and
  `src/variants/index.ts` disagree.
- `rg -n 'variants/' src/pages/<slug>` shows that a variant's pages import only from
  their own `src/variants/<slug>/` folder; an import of another variant's folder
  couples them.
- Every `src/variants/*/theme.css` is imported in `src/styles/overview.css`;
  otherwise its overview card falls back to the default theme.
