# Pitches

A pitch shapes a substantial feature before it is built: the problem, a rough
solution, the risks, and what is deliberately left out. Small fixes and
documentation corrections do not need one. See
[CONTRIBUTING.md](../../CONTRIBUTING.md#shaping-work) for the workflow.

Save each pitch as `docs/pitches/<topic>/pitch--<slug>.md`, and keep breadboards,
fat-marker sketches (for example Excalidraw files), and reference images beside it.

## Template

Copy this outline into a new pitch:

```markdown
# Problem

What is wrong or missing, and for whom? Describe the situation that makes this
worth doing now, without proposing the solution yet.

# Solution

The rough shape of the answer: the elements, how the user meets them, and how
they connect. Link breadboards or sketches kept beside this file. Stay at the
level of detail that leaves room for the implementation to decide.

# Security

Network, storage, external content, or untrusted input this introduces, and how
it is contained, or why no security concern applies.

# Rabbit Holes

Details that could swallow the work, and the decision that avoids each one.

# No-Gos

What this pitch explicitly does not include.
```

## Index

The pitches for Waldstatt Games moved with it to
[waldstatt-lab/waldstatt](https://github.com/waldstatt-lab/waldstatt/tree/main/docs/pitches)
([ADR 0010](../architecture/decisions/0010-move-waldstatt-games-into-its-own-repository.md)).

| Pitch | Status |
| --- | --- |
| [Waldstatt-Lab: the Lab in the forest](waldstatt-lab/pitch--waldstatt-lab.md) | implemented |
| [Schafbock Studio: pop-art superhero](schafbock-studio/pitch--pop-art-superhero.md) | Implemented |
| [November Games: Zukunftstag im Cyberpunk-Stil](november-games/pitch--zukunftstag-cyberpunk.md) | implemented |
| [Egg Settlers: a strategy-game variant where settlers build a giant egg](egg-settlers/pitch--egg-settlers.md) | implemented |
| [2raben games: Pixel-Raben aus Einsiedeln](2raben-games/pitch--pixel-raben.md) | Implemented |
