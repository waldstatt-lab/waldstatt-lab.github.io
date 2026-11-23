---
tags: [adr]
status: superseded
date: 2026-11-18
amends:
  - 0006-make-waldstatt-games-a-browser-game.md
amended-by:
  - 0008-keep-named-waldstatt-saves-and-files.md
superseded-by: [0010-move-waldstatt-games-into-its-own-repository.md]
sources:
  - src/variants/waldstatt-games/game/state.ts
  - src/variants/waldstatt-games/game/main.ts
  - https://github.com/waldstatt-lab/waldstatt-lab.github.io/blob/04ce560ec337419cc36983e4c10d08c2816cbf51/docs/pitches/waldstatt-games/pitch--leben-in-der-waldstatt.md
---

# 0007 — Save Waldstatt Games in IndexedDB

> Superseded by [ADR 0010](0010-move-waldstatt-games-into-its-own-repository.md):
> Waldstatt Games moved to its own repository,
> [waldstatt-lab/waldstatt](https://github.com/waldstatt-lab/waldstatt), where this decision
> lives on. The record stays for its rationale; its links point to this
> repository as it was before the move.

**Amended by [ADR 0008](0008-keep-named-waldstatt-saves-and-files.md):**
forests saved under a name live in a second database, `waldstatt-games-saves`,
which «Neu beginnen» leaves alone; loading one or a file replaces the records of
`waldstatt-games` in one transaction after opening it at a higher version. The
tell's single database name below now covers the forest being played only.

## Context

[ADR 0006](0006-make-waldstatt-games-a-browser-game.md) keeps the Waldstatt
Games save as one versioned JSON document in `localStorage` under keys starting
with `waldstatt-games/`. `state.ts` writes the whole document, felled trees and
cobbles as base64 bitsets per chunk, two seconds after each change and when the
page is hidden.

The [pitch «Leben in der Waldstatt»](https://github.com/waldstatt-lab/waldstatt-lab.github.io/blob/04ce560ec337419cc36983e4c10d08c2816cbf51/docs/pitches/waldstatt-games/pitch--leben-in-der-waldstatt.md)
makes the save larger and changes it all the time. It adds every Waldmensch
with position, age, sex, hunger and work; growth per tile for the forest that
grows back; tombstones; the condition of buildings; the flood's phase and
progress; and the build menu's unlocks. The save's format changes to version 3
anyway.

Size alone does not force a change: even a large settlement stays well under a
megabyte. What does:

- With people moving, the save is dirty almost every time it is written. In
  `localStorage`, each write rebuilds and stores the whole document
  synchronously on the main thread, which competes with the rules and the
  rendering on phones.
- Chunk data is binary. `localStorage` holds only strings, so every chunk is
  base64-encoded and rewritten even when only one changed.
- The organization's Pages sites share one origin. Its `localStorage` quota of
  about 5 MB is shared with the games' saves (`moto-devil/`, `car-drive/`), and
  isolation rests on a key prefix.

Alternatives considered:

- **Stay with `localStorage`** and write less often. This is the least code,
  but the full, synchronous write stays, and saving less often loses more on a
  crash or a closed tab.
- **Split the save across several `localStorage` keys**, one per chunk. This
  lets a write cover only what changed, but stays synchronous and string-only,
  and makes the shared quota tighter.
- **IndexedDB through a library** such as `idb`. It is pleasant to use, but
  adds a dependency for a few calls.
- **IndexedDB through the raw API** with a small wrapper. Chosen.
- **The Origin Private File System.** Fast and binary, but meant for files, with
  less support for small keyed records and in older Safari versions.

## Decision

For the Waldstatt Games variant only:

- The save lives in one IndexedDB database named `waldstatt-games`, in
  [`state.ts`](https://github.com/waldstatt-lab/waldstatt-lab.github.io/blob/04ce560ec337419cc36983e4c10d08c2816cbf51/src/variants/waldstatt-games/game/state.ts). Its
  `meta` store holds the settlement (version, stock, buildings, unlocks, the
  flood, camera, seed and more) and the people; its `chunks` store holds one
  record per chunk with its felled trees, cobbles and seedlings as
  `Uint8Array`s.
- Writes are batched in one transaction a few seconds after a change and when
  the page is hidden, and cover only the records that changed.
- A small wrapper over the raw IndexedDB API in the variant's folder opens,
  reads, writes and deletes the database. No library is added.
- Version 2 saves in `localStorage` are not converted: the variant was not
  published yet. They are ignored, and «Neu beginnen» removes their key.
- Everything read from the database is untrusted input, as in ADR 0006: each
  record is checked against its schema version and limits, and a broken save
  starts a new forest with a notice. Nothing from it is set as HTML.
- «Neu beginnen» deletes the `waldstatt-games` database and any keys starting
  with `waldstatt-games/`, never other databases or `localStorage.clear()`.
- The installed app asks for persistent storage with
  `navigator.storage.persist()`; the game works the same if it is refused.

Every other part of ADR 0006 stays; ADR 0006 notes this amendment below its
title.

## Consequences

- Saving no longer blocks the main thread with a full rewrite, and stores only
  what changed, so a settlement of hundreds can save often.
- The variant no longer competes with the games for the shared `localStorage`
  quota, and a database of its own is simpler to delete than a set of keys.
- Loading becomes asynchronous. The page already waits for the water pages
  before it starts, so the visitor sees no difference.
- About a hundred lines of wrapper code to keep. Forests saved before this
  change are lost, which is acceptable before the variant is published.
- IndexedDB is evicted under the same rules as `localStorage`: browsers may
  clear a rarely visited site's storage, and Safari limits script-written
  storage for sites that are not installed. Persistent storage helps the
  installed app only.
- Inspecting a save takes the browser's IndexedDB panel instead of one
  `localStorage` value.

## The tell

- `rg -n "indexedDB" src` finds matches only in `src/variants/waldstatt-games/`,
  and the only database name is `waldstatt-games`.
- `rg -n "localStorage" src/variants/waldstatt-games` finds only the reset of
  old keys starting with `waldstatt-games/` and comments.
- `rg -n "localStorage.clear|deleteDatabase" src` finds no `localStorage.clear`,
  and `deleteDatabase` only for `waldstatt-games`.

A search cannot show that a reset leaves the games' saves alone. Check it by
hand in the browser's application panel: play a game, then reset the forest.
