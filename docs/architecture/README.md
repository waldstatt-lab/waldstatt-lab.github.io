# Architecture

A static website built with Astro 7, Tailwind CSS 4 and daisyUI 5
([ADR 0001](decisions/0001-build-a-static-site-with-astro-and-daisyui.md)) and
published on GitHub Pages. It has no server, and no content depends on client-side
JavaScript; a variant may add small scripts for optional effects
([ADR 0004](decisions/0004-allow-optional-client-side-scripts-in-a-variant.md)). November Games adds
keyboard navigation and an interactive canvas background
([ADR 0005](decisions/0005-enhance-november-games-with-local-interactions.md)), and
2raben games a small canvas scene within the rules of ADR 0004. The site
is that of Waldstatt-Lab
([ADR 0011](decisions/0011-make-waldstatt-lab-the-site.md)). It also keeps one
complete version per name candidate from before the name was chosen
([ADR 0002](decisions/0002-compare-name-candidates-as-variant-routes.md)), each with
its own pages, layout and theme.
All text on the site is German, written with Swiss spelling ("ss", not "ß").
See [CONTRIBUTING.md](../../CONTRIBUTING.md) for checks.

## The Lab's site

The Lab's pages live directly in `src/pages/` and share `src/lab/`, shaped in the
[pitch](../pitches/waldstatt-lab/pitch--waldstatt-lab.md). They have no scripts. A
page is a walk through the forest of the Waldstatt game: stretches of dense forest
with wooden boards, and clearings of open ground for reading.

| Path | Contents |
| --- | --- |
| `site.ts` | Name, sentence and description, the links to GitHub and the Waldstatt game, and the command that unlocks scripts in the game |
| `Layout.astro` | HTML shell with `data-theme="waldstatt-lab"`, header and footer, icon and preview tags; passes the forest pictures' addresses to the stylesheet as custom properties |
| `forest.ts` | Draws the forest as SVG at build time |
| `Clearing.astro` | Open ground with the forest's edges above and below |
| `Flask.astro`, `Rings.astro` | The flask of the avatar, with rising bubbles; a trunk slice with one growth ring per step |
| `GameBoard.astro` | A game with its screenshot, «spielen» and «Wie es entstand» |
| `WaldstattHint.astro`, `Mushroom.astro` | A board naming the games that also lie hidden in the Waldstatt game and how to code there; the fly agaric on it and beside the footer's «Fun» |
| `styles.css`, `theme.css` | Tailwind, typography, daisyUI and the Lab's theme |
| `variants.css` | The candidates' themes, for the Fun page |
| `assets/` | The GitHub organization's avatar, and the icon made from it |

`forest.ts` draws trees on a lattice that repeats every 720 × 352 pixels, from a
fixed seed, so each build draws the same forest. `src/pages/wald/[bild].svg.ts`
serves five pictures of it, and two that repeat on their own, the footer's undergrowth
`boden` and the boards' grain `holz`. The five are the repeating forest `wald`, its lower and upper edge
`rand-unten` and `rand-oben`, and the home page's clearing with the Alp,
`lichtung-breit` and `lichtung-schmal` (below 64rem). They continue each other as
long as every background is centred horizontally and anchored at the forest's top
or bottom edge, and a forest with both edges is one tile (352 pixels) high. The
trees are our own drawing after the game's; nothing is copied from it. The flask's
bubbles stand still with reduced motion.

The navigation is a Swiss hiking signpost: yellow plates point to pages, the white one
without a point says where you are. The name hangs beside it on a board, except on the
home page, whose title it is. The footer is the forest floor under the last trees, with
links to all games.

The home page shows one clearing per event held, the newest first, then a board in the
forest for each planned event. Games with `inWaldstatt` also lie hidden in the Waldstatt
game; a hint says so on the home page, their event's page and their own page. Only the
Fun page links to the game itself. «Spiele» in the navigation
leads to the newest event with games.

### Content

| Collection | One file per | Shown on |
| --- | --- | --- |
| [src/content/events/](../../src/content/events/) | Zukunftstag, workshop or other event | home, `/anlaesse/`, and its own page unless `planned` |
| [src/content/games/](../../src/content/games/) | game; names its event | home, the event's page, its own page, and the candidates (only the Zukunftstag 2026) |
| [src/content/making/](../../src/content/making/) | game that has a story to tell, named like the game | the game's page |

Pictures lie in `src/assets/`: `games/` holds a screenshot per game, `making/` the
sketches and further pictures. Sketches come from the game repositories' pitches,
scaled down and without the photos' metadata. Dates and times in `making` come from
those photos and from the repositories' commits.

### Adding an event or a game

1. Add `src/content/events/<slug>.md`; the slug becomes the address
   `/anlaesse/<slug>/`. With `planned: true` the event is announced and has no page.
   `date` orders the events; visitors read `when`.
2. For each game, add a screenshot to `src/assets/games/` and
   `src/content/games/<game>.md` with `event: <slug>`; `inWaldstatt: true` if the
   Waldstatt game hides it too.
3. Add `src/content/making/<game>.md` to tell how it was made, with its sketches in
   `src/assets/making/`.
4. If a game has its own Pages site, add its path to `reservedSlugs` in
   `src/variants/index.ts`.

## Variants

The name candidates from before the Lab had its name. They are kept as they were and
listed at `/fun/`. Each name candidate is an independent version of the site
([ADR 0003](decisions/0003-give-each-variant-its-own-pages-and-styles.md)) and owns
two folders named after its slug:

| Path | Contents |
| --- | --- |
| `src/pages/<slug>/` | Its pages: `index.astro`, usually `ueber-uns.astro` and `spiele/[game].astro`, and any pages only this variant has |
| `src/variants/<slug>/meta.ts` | Slug, name, tagline, and what the name means and offers (`idea`, for the Fun page) |
| `src/variants/<slug>/preview.webp` | A picture of its home page, 960 × 600, for the Fun page |
| `src/variants/<slug>/Layout.astro` | HTML shell with `data-theme="<slug>"`, navigation, footer; loads `styles.css` |
| `src/variants/<slug>/GameCard.astro` | A game card linking to the game and to its page |
| `src/variants/<slug>/styles.css` | Tailwind, typography plugin, and daisyUI without built-in themes |
| `src/variants/<slug>/theme.css` | The variant's custom daisyUI theme, named after the slug |

The first variants started from the same layout and pages, and their themes started as
copies of daisyUI's retro (Schafbock Studio), cupcake (Egg Settlers) and nord
(November Games). 2raben games was added later from
the same starting point, with its own theme from the start. A variant may add components and
modules of its own to its folder. Change a variant only inside its own folders;
never import another variant's files.

Waldstatt Games was a variant too, until it grew into a building game and moved
to its own repository, [waldstatt-lab/waldstatt](https://github.com/waldstatt-lab/waldstatt),
published at <https://waldstatt-lab.ch/waldstatt/>
([ADR 0010](decisions/0010-move-waldstatt-games-into-its-own-repository.md)).
Of the Lab's pages, only the Fun page links to the game.

### Schafbock Studio

A pop-art comic starring a superhero ram, shaped in the
[pitch](../pitches/schafbock-studio/pitch--pop-art-superhero.md). Its own theme
replaces the retro copy, and the comic face Bangers comes self-hosted from
`@fontsource/bangers`. Its folder `src/variants/schafbock-studio/` adds:

| Path | Contents |
| --- | --- |
| `Ram.astro`, `RamHead.astro` | The ram as SVG in four poses: landing (home), moto (Moto Devil), car (Car Drive), sketch (Über uns) |
| `Burst.astro`, `Icon.astro` | Sound-effect bursts and small comic icons |
| `comics.ts` | The variant's comic retelling of each game, keyed by game id; `getComicGames()` fails the build when a game has none |
| `MotoTour.astro`, `CarRoad.astro` | Charts of each game's facts: Moto Devil's countries, Car Drive's road and levels |
| `MotoDemo.astro`, `CarDemo.astro` | Key demos for each game's controls; hidden until their script runs |
| `effects.ts` | Optional effects on pointer movement, clicks and typing ([ADR 0004](decisions/0004-allow-optional-client-side-scripts-in-a-variant.md)) |

The game pages show the variant's comic copy first and the shared game Markdown
below it. Running text sits on flat backgrounds; halftone dots only appear behind
shapes and large display headings.

### November Games

November Games has a dark synthwave theme with pink, sunset and cyan accents.
Its home and about pages explain the Nationaler Zukunftstag and the participating
school levels; the world-saving motto is studio copy, not a claim about game
content. Game pages retain the shared Markdown and existing play/source links.
The Fun page uses its theme and tagline.

The variant owns `Horizon.astro` (SVG landscape), `landmarks.ts` (the projected
monastery model, river, label layout and scene placement), `panorama.ts`
(generated skyline and summit data) and its generator `tools/panorama.mjs`,
`GameArtwork.astro` (decorative SVG game
illustrations), `GamePreview.astro` with `preview.ts`, `previewMoto.ts` and
`previewCar.ts` (the game previews), `SynthwaveScene.astro` (fixed full-viewport canvas with SVG fallback
on every November Games page), `KeyboardControls.astro`, `interactions.ts` and
`scene.ts`. No game assets, external
fonts, rendering libraries or remote services are loaded. The numeric November
motif has been removed. See the
[implemented pitch](../pitches/november-games/pitch--zukunftstag-cyberpunk.md).

All links work without JavaScript. With JavaScript, a visible Navigation button
or Alt+K opens a native modal dialog. Up/Down and Home/End select its links;
Enter follows a link and Escape closes the dialog and restores focus. Left/Right
and Home/End move between header links or between the same action on each game
card. Tab keeps its native order throughout. Shortcuts ignore editing fields,
composition and unrelated modifier combinations. A skip link and visible focus
are available on every page.

The full-screen background reacts to pointer movement across the document and
clicks/taps outside interactive controls. It never captures pointer events or
keyboard focus itself. The visible «Szene steuern» button accepts arrow keys;
its native click, Enter and Space activation send a light impulse. Tab continues
to the next control. A hint appears when that button is focused or hovered.
Game artwork still tilts towards the pointer, and focused games are highlighted.

Each game page shows a preview («Probefahrt») below its heading: a neon canvas
with simplified rules from the game's text, not the game itself. Moto Devil's
follows the 2raben games key warm-up: the motorbike accelerates, brakes, tilts
into a salto, jumps over a ramp, fires the jet while Space is held after a jump,
turns round, restarts and crashes back to the start on a bad landing. Car
Drive's follows the Egg Settlers practice road: three lanes with traffic both
ways, cars that blink before changing lanes, levels every 1000 m, trucks from
4000 m, hearts, a shield, coins and the boost gauge. Both rule sets were copied
into this variant and redrawn; nothing is imported from another variant. A
demonstration plays while the preview is on screen until somebody presses a key
from the controls table or an on-screen key; after eight idle seconds it takes
over again. Keys are handled only while the preview has focus, Escape leaves
it, and the on-screen keys work by pointer and touch, held while pressed. A live
region announces actions while somebody plays. There is no demonstration with
reduced motion or with the effects switched off. The loop runs at about 30
frames per second, only while the preview is on screen and moving. Without
JavaScript or a 2D canvas the preview stays hidden; clicks in it send no
impulse to the background.

The landscape is a synthwave composition of a real view. The mountain panorama
is generated from swisstopo elevation data and swissNAMES3D summit names as seen
from about 450 m above the Klosterplatz Einsiedeln, looking south-west towards
the Mythen. It is drawn in four depth bands with heights exaggerated 2.2 times
over headings 140° to 252°, easing down into the plain over the outer 12° at
both ends, and labels each visible summit outside those ends with its official
height. `panorama.ts` records
the viewpoint and is not edited by hand: `node
src/variants/november-games/tools/panorama.mjs` downloads the data from
api3.geo.admin.ch into `node_modules/.cache/november-games-panorama/` (about
3000 requests on the first run; later runs fetch only what is missing) and
regenerates it. The script holds the viewpoint, the drawing parameters and the
labelled summits with their names and heights. The site itself never contacts
swisstopo. The monastery is a simplified 3D model
of the west front after photographs and measured from them: corner pavilions
with turrets, four-storey wings, the twin towers with their stages, clocks,
belfries and copper domes over a square plan with lanterns, and the convex
church front with its attic, niche and statues, about 145 m in all, and the
north wing with the north-east pavilion behind, about 105 m deep after the
abbey's outline in OpenStreetMap; the east and south wings stay out of sight. The main
tower clocks show the time in Einsiedeln (Europe/Zurich) with an hour and a
minute hand, the upper ones a single minute hand across the dial, as on the
real towers; the canvas redraws them every minute, and the static SVG shows
ten past ten. It is projected so that its
lines meet the floor grid's vanishing point, where the sun sets. Where the page
leaves a margin of at least 200 px left of its text column (from 105rem), the
monastery stands in that margin instead: further away, turned towards the
viewer at 45°, close enough that the near tower stands larger than the far
one, and drawn 1.15 times taller so that it does not look squat from the front
(`abbeyPose()` in `landmarks.ts`); its lines meet the horizon at their own
point. About 54° off the centre of the view, a flat projection would stretch it
sideways by 1.7 times, so it is projected as if looked at straight on and then
moved to where its heading lies on the screen; it keeps its proportions and size
while the view turns. The Alp is drawn freely, from below Grosser Mythen
across the floor towards the viewer. On its far bank, on the right, stand the
ski jumps of Einsiedeln, drawn freely after a photograph and facing left
towards the monastery: the large and the medium hill with in-runs on concrete
pillars, the start tower on the hilltop, landing hills with distance marks and
floodlights, the judges' tower between them, and a small hill behind. Canvas and fallback SVG share these drawings
in "scene units" whose origin is the vanishing point. Chrome ignores CSS geometry
on nested SVG elements, so `Horizon.astro` renders the wide and narrow placements
as attributes and switches between them with a media query; the about-page card
always uses the narrow placement. The wide placement holds both monasteries, the
one in the margin computed for 1920 × 1080, and the same media query picks one.
From 105rem the shade behind the home-page text follows the text column instead
of the screen's left edge.

Arrow keys on «Szene steuern» turn the view between 35° left and 20° right, and
mouse movement turns it slightly. The tele panorama and the sun pan by the turn.
The floor grid, monastery and river are projected in 3D from a near-field camera
(`viewFor()` in `landmarks.ts`): turning left orbits it around the church front
by 1.5 times the turn, as in a 3D map, so that the west front is seen more and
more from the front; turning right turns it in place. Its painting order holds
while the camera stays north of the towers. Around the monastery in the margin,
hundreds of metres away, such an orbit would swing the camera across the floor,
the river and the ski jumps, so there turning left only turns the camera, like
turning right, and the monastery moves with the view, behind the text if need
be. The river's distant part bends to meet the
Alptal in the panorama while the valley is near; when a turn pans the valley
far away, the bend lets go instead of dragging the river across the floor. Summit labels behind the home-page headline are
dimmed.
The home page leaves space to see the landscape; longer content uses translucent
dark surfaces. Visual reference sources are recorded in the
[pitch](../pitches/november-games/pitch--zukunftstag-cyberpunk.md#solution).

The effects button pauses movement, remembering the choice in optional session
storage. Reduced-motion preferences always disable movement; navigation still
works. The renderer caps pixel density at 2, raster size at approximately three
million pixels and drawing at 30 fps, limits concurrent impulses, and suspends
its animation loop in hidden tabs. Glowing landmarks are drawn into offscreen
canvases once per size, and the monastery and ski jumps again whenever the view
turns by a tenth of a degree, cut to the screen so that a drawing turned far to
the side never grows past it; each frame only copies them and redraws the floor and river. The fixed canvas remains visible when the page scrolls. A static SVG remains if JavaScript or the 2D context is unavailable;
the unavailable scene control stays hidden. Phone layouts retain readable game
controls without promising mobile game support.

### Egg Settlers

A strategy-game interface in which the settlers build a giant egg, shaped in the
[pitch](../pitches/egg-settlers/pitch--egg-settlers.md). The pages lie on a
pixel-art meadow, and the illustrations are top-down pixel art in the manner of
1990s settlement games, drawn for this variant and copied from none. Text sits
on parchment, stone and wooden panels; headings use Cinzel, self-hosted from
`@fontsource/cinzel`. The header is a resource bar whose "Spiele" counter counts
the game collection; the other counters are jokes. Its folder
`src/variants/egg-settlers/` adds:

| Path | Contents |
| --- | --- |
| `pixel.ts`, `Paths.astro` | The pixel-art renderer: drawings as color grids from hand-drawn rows or seeded generators (grass, paths, trees, huts, the egg), output as one SVG path per color with crisp edges |
| `sprites.ts` | Detailed sprites on top of the renderer: houses in an oblique view with walls, gables and tiled, thatched or slate roofs; the monastery of Einsiedeln with arcades and fountain, the dam, towers, windmill, crane, ships; settlers, men and women, in two frames; animals, goods and a building site |
| `map.ts` | The home page's 480 × 300 map, computed at build time and loosely after Einsiedeln: the Sihlsee with its dam, the Sihl and the Alp with bridges, the monastery square, roads, plaza, fields, buildings, seeded woods, settlers at work and on the roads, the walkers' keyframes, the water names, and the grid of cells where visitors may have houses built |
| `Settlement.astro`, `Thing.astro` | The map as the home page's fixed fullscreen background, with the giant egg in six rings of shell inside a wooden frame, and over it the intro and a command bar with progress, status, "Bauen", "Haus bauen" and the settler |
| `settlement.ts` | The optional interactions ([ADR 0004](decisions/0004-allow-optional-client-side-scripts-in-a-variant.md)): building the egg ring by ring, the settler's replies, and crews that walk to a clicked spot of meadow, fell its trees and build a house |
| `Settler.astro` | The foreman's portrait, a settler woman with a calm and a grumpy face |
| `Building.astro`, `buildings.ts`, `vehicles.ts` | Each game's picture, keyed by game id: Moto Devil's stunt track in side view (bike, ramp, spikes, loop, raven, gravestone, goal) and Car Drive's three-lane road from above (traffic, truck, pickups, hearts, boost, garage); a house for any game without an entry |
| `MotoPractice.astro`, `CarPractice.astro`, `practice.ts`, `motoPractice.ts`, `carPractice.ts`, `motoCourse.ts`, `carRoad.ts` | The practice grounds on the game pages: small simulations with simplified rules from each game's text, driven by the keys of its controls table or on-screen buttons, with a demonstration that plays until somebody takes over |
| `TechIcon.astro` | The icons of the name's tech tree on the about page: Ei, siedeln, Ei-siedeln, Egg Settlers |
| `ResourceIcon.astro` | The resource bar's icons |

The pixel art is generated at build time, so the same build always draws the
same picture; `Layout.astro` sets the grass tile as the page background. On the
home page the map lies fixed behind the page (`main` isolates its stacking
context) and is cropped around the egg on narrow screens; on phones it moves
down behind the taller resource bar. On wide screens the intro sits beside the
command bar at the bottom, leaving the top of the map free. Sprites are defined
once and placed with `<use>`; two-frame sprites alternate through CSS, and
walkers follow keyframes that `map.ts` writes into the SVG. The home page weighs
about 150 kB gzipped.

The map follows Einsiedeln's water loosely: the Sihl leaves the Sihlsee's dam at
the north end and the Alp flows from the south through the village into it. The
lake lies west of the village, not east as in reality, to keep the picture's
composition. The monastery is a simplified drawing without religious symbols.
The names of the lake and the rivers are SVG text, not drawn letters.

Without JavaScript the egg stands with its first ring, its planned outline and
the status "Im Bau"; the buttons and the settler stay hidden, and so do the
practice grounds. The scripts read their text from the page's data attributes
or their own source, create sprites with `createElementNS` and never set HTML
from strings; they store nothing, and a reload starts over. A click on the map
reaches it through the overlay, whose empty parts ignore the pointer; "Haus
bauen" offers the same for keyboards. The practice grounds run only while on
screen. Reduced motion stops every animation of the map, which then shows each
sprite's first frame; houses then appear at once, and the practice grounds play
no demonstration but still respond to input.

### 2raben games

A funny pixel-art version, shaped in the
[pitch](../pitches/2raben-games/pitch--pixel-raben.md): two ravens, a nod to the
two ravens in the Einsiedeln coat of arms, host the site. They are our own
drawings; the site shows neither the coat of arms nor a shield. The theme pairs
cream paper with raven black and red, with square corners. The header is red with
the ravens in black, the colours of the district's arms; its crest of two flying
ravens, one above the other and flapping in turn, is larger than the bar and hangs
out of it. The pixel face Jersey 10
comes self-hosted from `@fontsource/jersey-10` and is used only for short text;
running text stays in the default sans-serif. Its folder
`src/variants/2raben-games/` adds:

| Path | Contents |
| --- | --- |
| `pixels.ts` | The one source of all pixel art: palette, raven poses and scarf, props, the stage scenery (`composeBackdrop`: sky, sun, mountains, hills, monastery, firs, clouds), the 3×5 bubble font |
| `scenes.ts` | Static pictures composed from it: the stage's still frames, the header crest, the perched pair, vignettes, module icons, the about picture |
| `PixelArt.astro` | Renders a picture as crisp SVG at build time |
| `RavenStage.astro`, `stage.ts` | The home page's hero with the raven stage as its background: still SVG, replaced by the canvas scene when the script runs |
| `GameModule.astro` | A game as a cartridge with its vignette, «Spielen!» and «Mehr erfahren» |
| `ravens.ts` | The ravens' comment, picture and key summary per game, keyed by game id; `getRavenGames()` fails the build when a game has none |
| `Keycaps.astro` | The key summary as pixel keys |
| `KeyDrill.astro`, `drill.ts` | The key warm-up («Probefahrt») on each game page: a pixel canvas driven by the game's keys; hidden until its script runs |

Game pages show a vignette, the raven's comment and the play button first, then
the key summary, the key warm-up and the shared game Markdown. The warm-up, like
Schafbock Studio's key demos, is not the game: no traps, no traffic, no score.
Focused, it handles the keys from the game's controls table, except Car Drive's
brake and the second keys for boost and restart, which came later. In Moto Devil's, the
motorbike accelerates, brakes, tilts into a salto, jumps over a ramp, fires the
jet while Space is held, turns round and restarts, and crashes back to the start
on a bad landing. In Car Drive's, the car changes between three lanes, boosts and
restarts, and follows a mouse pointer's lane. A raven comments in the bubble font,
and a live region announces each action. The on-screen keys work by pointer and
touch, held as long as they are pressed. The scene only moves while the warm-up
has focus. The comments only retell the
games' documentation: Moto Devil's ravens in a dive, Car Drive's bird's-eye view.

The stage fills the hero behind the title, the intro and the buttons; the content
lets clicks through to the sky, and the stage is a sibling of the content, so keys
on its buttons never reach the scene. A soil strip closes the hero. The stage draws
at a low resolution (about 140 pixels high and at least 120 wide) and is scaled up
by a whole number, so pixels stay sharp. Two ravens start one above the other, then
fly to perches (ground, monastery roof and towers, firs); the second follows a
wing length behind and lands next to the first or on the ground below. Idle, they
blink, peck, call «Krah!» and bump each other. A click or tap sends the first
raven there; tapping a raven makes it call. «Raben steuern» moves focus to the
stage (`role="application"`), where arrow keys or WASD fly and Space calls;
Escape returns to the button and Tab leaves normally. Keys are only handled while
the stage has focus. «Pause» stops the scene. The loop runs at about 30 frames
per second and stops while paused, off-screen or in a hidden tab. With reduced
motion, without script or without a 2D canvas, the still picture stays (one for
wide and one for tall screens) and the controls stay hidden; the header crest
stops flapping with reduced motion. Nothing is stored or sent.

### Adding a variant

1. Copy `src/pages/<existing>/` and `src/variants/<existing>/` to the new slug.
2. Replace the old slug in the copied imports, set `meta.ts`, and rename the theme
   in `theme.css` to the new slug.
3. Replace `preview.webp` with a picture of its home page.
4. List the variant in `src/variants/index.ts` and import its `theme.css` in
   `src/lab/variants.css`.

## Routes

| Route | Page | Source |
| --- | --- | --- |
| `/` | The Lab: what it is, the events with their games, planned events | [src/pages/index.astro](../../src/pages/index.astro) |
| `/ueber-uns/` | The name, how the Lab began, how we work | [src/pages/ueber-uns.astro](../../src/pages/ueber-uns.astro) |
| `/anlaesse/` | All events, planned ones first | [src/pages/anlaesse/index.astro](../../src/pages/anlaesse/index.astro) |
| `/anlaesse/<event>/` | An event held, with its games | `src/pages/anlaesse/[anlass].astro` |
| `/spiele/<game>/` | A game: idea, what to expect, controls, play link, and how it was made | `src/pages/spiele/[game].astro` |
| `/fun/` | The name candidates, each card in its theme, and the Waldstatt game; linked from the footer | [src/pages/fun.astro](../../src/pages/fun.astro) |
| `/wald/<picture>.svg` | The forest's pictures | `src/pages/wald/[bild].svg.ts` |
| `/<slug>/` | Home: name, tagline, game cards | `src/pages/<slug>/index.astro` |
| `/<slug>/ueber-uns/` | About the studio | `src/pages/<slug>/ueber-uns.astro` |
| `/<slug>/spiele/<game>/` | Game idea, what to expect, controls, play link | `src/pages/<slug>/spiele/[game].astro` |

`/waldstatt-games/` is a redirect to <https://waldstatt-lab.ch/waldstatt/>,
configured in [astro.config.mjs](../../astro.config.mjs), for links and installed
apps from the time Waldstatt Games was a variant
([ADR 0010](decisions/0010-move-waldstatt-games-into-its-own-repository.md)).

`/moto-devil/`, `/carrrgh/`, `/waldstatt/` and `/waldstatt-go/` on the same domain
belong to the games' own Pages sites and take precedence; no route of this site may use them.

## Shared modules

| Path | Responsibility |
| --- | --- |
| [src/variants/index.ts](../../src/variants/index.ts) | Lists the variants for the Fun page; fails the build on unlisted page folders, missing pages, or reserved slugs |
| [src/variants/types.ts](../../src/variants/types.ts) | `VariantMeta`: slug, name, tagline, idea |
| [src/content.config.ts](../../src/content.config.ts) | The schemas of the collections `events`, `games` and `making` |
| [src/content/games/](../../src/content/games/) | One Markdown file per game; the file name is the route segment |
| [src/lib/games.ts](../../src/lib/games.ts) | `getGames()`: all games in display order; `getEventGames()`: those of an event; `getVariantGames()`: those the variants show |
| [src/lib/events.ts](../../src/lib/events.ts) | `getHeldEvents()` and `getPlannedEvents()` |
| [src/lib/url.ts](../../src/lib/url.ts) | `href()`: prefixes internal paths with the base path |
| [astro.config.mjs](../../astro.config.mjs) | Site URL and base path from `SITE_URL` / `BASE_PATH`, trailing slashes, Tailwind |

## Conventions

- Link internal pages with `href("/path/")`, never a bare `/path/`, so the site
  works under a base path. URLs end with a slash (`trailingSlash: "always"`).
- Game links point to the games' deployments (`playUrl`); this site never copies
  game builds. When the organization is renamed, update every `playUrl` and
  `sourceUrl`.
- Style with daisyUI components and Tailwind utilities and the variant's theme
  colors (`bg-base-100`, `btn-primary`, and so on), so a theme change restyles the
  whole variant.

## Deployment

[pages.yml](../../.github/workflows/pages.yml) builds and deploys `dist/` on every
push to `main`; [ci.yml](../../.github/workflows/ci.yml) runs `mise run check` on
pull requests. The repository name decides the address: a repository named
`<owner>.github.io` is served at `https://<owner>.github.io/`; any other name at
`https://<owner>.github.io/<repository>/`. On the free organization plan the
repository must be public, and Pages must use "GitHub Actions" as its source.
