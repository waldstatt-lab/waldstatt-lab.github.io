# Architectural decision records

ADRs explain lasting architectural choices and their tradeoffs. Read them alongside
the [current architecture](../README.md) and [contribution guide](../../../CONTRIBUTING.md).
Routine refactoring and individual implementation details do not need a record.

## Recording a decision

Copy [the template](_adr-template.md) to `NNNN-<slug>.md`, using the next four-digit
number starting at `0001`, and add a link and status to the index below. Include
Context, Decision, Consequences, and The tell.

Use `proposed` for unimplemented choices, `accepted` for implemented choices,
and `superseded` for replaced choices. Use the recording date; for retrospective
records add `recorded: true` and distinguish observed code from reconstructed
tradeoffs. Do not invent historical discussions or imply that a recording date is
the implementation date.

Preserve accepted rationale. For replacements, use `supersedes` / `superseded-by`
on the new and old records and mark the old record superseded. For partial changes,
use `amends` / `amended-by`, keep both records accepted, and explain the amendment
below the old title. Update both sides and the index.

Keep Markdown links and lineage paths relative to the ADR file. In `sources`,
code paths are repository-relative and document paths are ADR-relative. Remove
unused metadata and placeholders before accepting a record.

**The tell** identifies a repository-root search, focused test, or manual review
that can expose drift. State the expected result and limitations; a search alone
does not prove correctness.

## Decision index

| Record | Status |
| --- | --- |
| [0001 — Build a static site with Astro and daisyUI on GitHub Pages](0001-build-a-static-site-with-astro-and-daisyui.md) | accepted; amended by 0003, 0004, 0005, 0006, 0010 |
| [0002 — Compare name candidates as variant routes that share the game content](0002-compare-name-candidates-as-variant-routes.md) | accepted; amended by 0003, 0011 |
| [0003 — Give each variant its own pages, layout and stylesheet](0003-give-each-variant-its-own-pages-and-styles.md) | accepted; amends 0001, 0002; amended by 0011 |
| [0004 — Allow optional client-side scripts in a variant](0004-allow-optional-client-side-scripts-in-a-variant.md) | accepted; amends 0001; amended by 0005, 0006, 0010 |
| [0005 — Enhance November Games with local interactions](0005-enhance-november-games-with-local-interactions.md) | accepted; amends 0001, 0004 |
| [0006 — Make Waldstatt Games a browser game that gates its content](0006-make-waldstatt-games-a-browser-game.md) | superseded by 0010; amends 0001, 0004; amended by 0007 |
| [0007 — Save Waldstatt Games in IndexedDB](0007-save-waldstatt-games-in-indexeddb.md) | superseded by 0010; amends 0006; amended by 0008 |
| [0008 — Keep named Waldstatt saves in a database of their own, and as files](0008-keep-named-waldstatt-saves-and-files.md) | superseded by 0010; amends 0007; amended by 0009 |
| [0009 — Let visitors bind the Waldstatt's keys, kept in a settings database](0009-keep-the-waldstatt-keymap-in-a-settings-database.md) | superseded by 0010; amends 0008 |
| [0010 — Move Waldstatt Games into its own repository](0010-move-waldstatt-games-into-its-own-repository.md) | accepted; supersedes 0006, 0007, 0008, 0009; amends 0001, 0004; amended by 0011 |
| [0011 — Make Waldstatt-Lab the site and keep the name candidates under Fun](0011-make-waldstatt-lab-the-site.md) | accepted; amends 0002, 0003, 0010 |
