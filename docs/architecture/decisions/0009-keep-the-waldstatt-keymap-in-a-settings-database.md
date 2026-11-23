---
tags: [adr]
status: superseded
date: 2026-11-18
amends:
  - 0008-keep-named-waldstatt-saves-and-files.md
superseded-by: [0010-move-waldstatt-games-into-its-own-repository.md]
sources:
  - src/variants/waldstatt-games/game/keys.ts
  - src/variants/waldstatt-games/game/keysDialog.ts
  - src/variants/waldstatt-games/game/textCursor.ts
  - src/variants/waldstatt-games/game/input.ts
  - src/variants/waldstatt-games/game/ui.ts
---

# 0009 — Let visitors bind the Waldstatt's keys, kept in a settings database

> Superseded by [ADR 0010](0010-move-waldstatt-games-into-its-own-repository.md):
> Waldstatt Games moved to its own repository,
> [waldstatt-lab/waldstatt](https://github.com/waldstatt-lab/waldstatt), where this decision
> lives on. The record stays for its rationale; its links point to this
> repository as it was before the move.

## Context

The Waldstatt's keys were fixed in code: arrows or h, j, k, l moved the cursor
on the map, and a, s, p, x, b, m, / and : chose tools and menus anywhere. A
visitor using the Neo layout moves with s, e, i, u (left, right, down, up)
or t, r, n, m, and expects vim's ways: a count before a movement, and o to
jump to the selection's other corner. s and m were already taken by the saw
and the menu, so offering these keys means letting visitors rebind every key,
and keeping each key to one action so a change cannot shadow another.

The keymap is a preference of the device, not part of a forest: «Neu
beginnen» must not reset it, and loading a saved forest must not change it.

Alternatives considered for where it lives:

- **`localStorage`.** Synchronous, so no default keys show for a moment. But
  ADR 0007 moved the variant out of the origin's shared `localStorage`, and
  its tell expects only the reset of old keys there.
- **A record in `waldstatt-games`.** «Neu beginnen» deletes that database.
- **A store in `waldstatt-games-saves`.** Needs a version change of that
  database, and mixes settings with the list of saved forests.
- **A database of its own, `waldstatt-games-settings`.** Chosen: one small
  record, untouched by resets and loading.

## Decision

For the Waldstatt Games variant only:

- [`keys.ts`](https://github.com/waldstatt-lab/waldstatt-lab.github.io/blob/04ce560ec337419cc36983e4c10d08c2816cbf51/src/variants/waldstatt-games/game/keys.ts) holds the
  keymap: each action (moving left, right, up and down, starting a selection,
  its other corner, applying, zooming, the four tools, Bauen, the menu and
  both finders) has a list of keys. Defaults: arrows, h j k l and s e i u
  move; v selects; o jumps to the other corner; Enter and Space apply; + =
  and - _ zoom; a, g, p, x choose Axt, Säge, Pflastern and Abreissen (the saw
  moved from s to g); b, m, / and : as before.
- The text mode on a text read top-down, started with Enter on it and left
  with Escape
  ([`textCursor.ts`](https://github.com/waldstatt-lab/waldstatt-lab.github.io/blob/04ce560ec337419cc36983e4c10d08c2816cbf51/src/variants/waldstatt-games/game/textCursor.ts)),
  has its own actions as vim's normal and visual modes: characters and lines
  (h j k l and the arrows), words (w, b, e), gg and G, v and V, o, and y to
  copy. They form a scope of their own, where Shift counts («G» is not «g»),
  and go before the map's and the global keys while the text mode is on.
- Within a scope a key belongs to one action at most. Adding a key that
  another action of its scope has is refused, naming that action. Escape, Tab and the digits cannot be bound, nor
  keys with Ctrl, Alt or Cmd. Letters count without regard to Shift, which
  pans with the movement keys.
- Digits typed on the map are a count for the next movement, up to 9999;
  Escape or any other key drops it, and a small badge shows it. In the text
  mode they count the next motion, or the line for gg and G.
- The dialog «Tasten» ([`keysDialog.ts`](https://github.com/waldstatt-lab/waldstatt-lab.github.io/blob/04ce560ec337419cc36983e4c10d08c2816cbf51/src/variants/waldstatt-games/game/keysDialog.ts)),
  from the menu and the «:» command `tasten`, lists each action's keys,
  removes one with ×, adds one with «+ Taste» and the next key pressed, and
  brings the defaults back after asking. The map's description and the
  menu's key list are written from the keymap.
- The keymap lives in the IndexedDB database `waldstatt-games-settings`, store
  `settings`, record `keys`, as `{ version: 1, keys }`, written on every
  change. «Neu beginnen» and loading leave it.
- What is read back is untrusted input: unknown actions, keys that cannot be
  bound and keys given twice are dropped; an action missing from it gets its
  default keys that are still free.

ADR 0008 stays accepted and notes this amendment below its title.

## Consequences

- Visitors with other layouts or habits can play with their own keys, and
  each key does one thing.
- The saw's key changes from s to g, which visitors used to s must relearn.
- A third database to know about when inspecting or clearing the variant's
  storage by hand.
- The keymap is read asynchronously: for the first moments of a visit the
  defaults apply.
- Key labels in announcements and help follow the keymap, so texts no longer
  name fixed keys except Escape and the digits.
- A key can mean two things: b moves back a word in a text and opens Bauen
  elsewhere. The dialog groups the text mode's keys apart to show this.
- The text mode needs the CSS Custom Highlight API to draw its cursor; older
  browsers show the document selection instead.

## The tell

- `rg -n "indexedDB\.(open|deleteDatabase)" src` finds matches only in
  `src/variants/waldstatt-games/game/state.ts` (`waldstatt-games`),
  `saves.ts` (`waldstatt-games-saves`) and `keys.ts`
  (`waldstatt-games-settings`).
- `rg -n "event\.key ===" src/variants/waldstatt-games/game/input.ts
  src/variants/waldstatt-games/game/ui.ts src/variants/waldstatt-games/game/textCursor.ts`
  finds only Escape, Tab, Backspace, Enter and the arrows of the finder, and
  Shift: other keys go through `actionFor()` or `textActionFor()`.
- `rg -n "deleteDatabase" src` still finds only `waldstatt-games`.

A search cannot show that a binding takes effect everywhere. Check it by hand:
bind a key, use it on the map and outside it, reload, and reset the forest.
