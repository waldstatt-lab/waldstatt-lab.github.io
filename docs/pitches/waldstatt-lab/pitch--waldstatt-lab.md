# Problem

The name is chosen: Waldstatt-Lab. The site's start page still asks visitors to
compare name proposals, and nothing explains what Waldstatt-Lab is. The game pages
tell what the games are, but not how pupils got from a sketch on paper to a playable
game, although the game repositories' pitches and commits record it. And the site
assumes one event with two games: next year brings another Zukunftstag, and the Lab
will probably hold workshops and other campaigns.

Status: implemented on 24 November 2026; see the
[architecture](../../architecture/README.md#the-labs-site) and
[ADR 0011](../../architecture/decisions/0011-make-waldstatt-lab-the-site.md).

# Solution

The Lab gets the pages at the site's root; the name candidates stay and move out of
the way.

- **Forest.** The look follows the forest of the
  [Waldstatt game](https://waldstatt-lab.github.io/waldstatt/): dense firs seen at an
  angle, a clearing, the Alp, wooden boards. The flask in the clearing is the one
  from the GitHub organization's avatar; the sentence is from its description.
- **One clearing per event.** Scrolling the home page is a walk through the forest:
  the Lab's clearing, then for each event a board in the forest and a clearing with
  its games, newest first. Planned events are boards where the forest still stands.
- **What it is.** The home page takes the name apart: «Waldstatt», the historical
  name of Einsiedeln, and «Lab», the place to try things out. The about page says
  more, and how we work: sketch, pitch, prototype, trying out.
- **How a game was made.** Below the game's description, its page shows the
  original sketches, the steps with their times and pitches, and what the pitches
  decided and left out.
- **Extendable.** An event, a game and a game's making are one Markdown file each.
- **Fun.** `/fun/` lists the name candidates with a picture and a short explanation
  each. Its link stands only in the footer, beside a fly agaric, and in the
  candidates' own footers. It also holds the only direct link to the Waldstatt game.
- **Signpost and forest floor.** The navigation is a Swiss hiking signpost, the footer
  the floor under the last trees.
- **The games in the Waldstatt.** A hint beside the games says that they also lie
  hidden in the Waldstatt game, and that one can code there: `:niklaus:wirth`, with a
  link to Wikipedia's article on Niklaus Wirth.

# Security

The site stays static, without scripts on the Lab's pages, storage or requests to
other sites. Sketches are re-encoded without their photo metadata.

# Rabbit Holes

- **The forest's weight.** Drawing a whole page of trees would be heavy. One tile of
  forest repeats, and every other picture shares its lattice of trees.
- **Games of later events in the candidates.** The candidates have hand-made texts
  and art per game and would fail the build. They keep showing the games of 2026.
- **Event types.** An event's kind is free text; no templates per kind.

# No-Gos

- No playable forest; that is the Waldstatt game.
- No redesign of the name candidates.
- No date for an event that is not fixed, no registration, no news section.
