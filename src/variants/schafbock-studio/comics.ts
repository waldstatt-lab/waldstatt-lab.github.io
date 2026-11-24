/**
 * This variant's own comic retelling of each game, keyed by the game's id (its
 * file name in src/content/games/). Every fact here comes from that shared
 * game text; the comic retells it and adds nothing. Review it whenever a
 * game's text changes.
 */
import type { CollectionEntry } from "astro:content";
import { getVariantGames } from "../../lib/games";

/** The ram's poses, as Ram.astro draws them. */
export type RamPose = "landing" | "moto" | "car" | "sketch";

export interface GameComic {
  /** The ram's pose on the game's panel and page. */
  pose: RamPose;
  /** One or two sentences on the home page panel. */
  teaser: string;
  /** Short facts for the stat stickers. */
  stats: { value: string; label: string }[];
  /** The comic strip at the top of the game page. */
  strip: { caption: string; text: string; sfx: string }[];
  /** Words the key demo shouts, by action. */
  sfx: Record<string, string>;
}

export const comics: Record<string, GameComic> = {
  "moto-devil": {
    pose: "moto",
    teaser:
      "Die Strecke lügt! Stacheln schiessen aus dem Boden, Säulen krachen von der Decke – und das Ziel fährt einfach davon.",
    stats: [
      { value: "5", label: "Länder" },
      { value: "15", label: "Levels" },
      { value: "3", label: "Trainingslevels" },
    ],
    strip: [
      {
        caption: "Die Mission",
        text: "Ein Stuntbike in Seitenansicht. Rampen, Loopings, Saltos. Klingt harmlos?",
        sfx: "WRUMM!",
      },
      {
        caption: "Die Falle",
        text: "Das Level legt dich rein: Stacheln, eine krachende Säule, ein Ziel, das davonfährt.",
        sfx: "KRACH!",
      },
      {
        caption: "Der Dickschädel",
        text: "Stürzen, lachen, nochmal – sofort ab dem letzten Checkpoint, um einen Trick schlauer.",
        sfx: "NOCHMAL!",
      },
    ],
    sfx: {
      gas: "WRUMM!",
      brake: "QUIETSCH!",
      flip: "SALTO!",
      jump: "HOPP!",
      jet: "FFFUUUSCH!",
      turn: "WENDE!",
      restart: "NOCHMAL!",
    },
  },
  "car-drive": {
    pose: "car",
    teaser:
      "Drei Spuren, dichter Verkehr, drei Herzen. Dein Auto fährt von selbst – aber wann zündest du den Boost?",
    stats: [
      { value: "3", label: "Spuren" },
      { value: "3", label: "Herzen" },
      { value: "1000 m", label: "pro Level" },
    ],
    strip: [
      {
        caption: "Die Mission",
        text: "Dein Auto fährt von selbst. Du lenkst durch den Verkehr und suchst die Lücke.",
        sfx: "TUUT!",
      },
      {
        caption: "Die Gefahr",
        text: "Gegenverkehr rast heran, ab Level 3 auf jeder Spur. Ab 4000 Metern kommen Lastwagen dazu.",
        sfx: "HUUUP!",
      },
      {
        caption: "Die Superkraft",
        text: "Boost im richtigen Moment! Ein Treffer kostet ein Herz, danach bist du kurz geschützt.",
        sfx: "BOOST!",
      },
    ],
    sfx: {
      left: "ZACK!",
      right: "ZACK!",
      boost: "BOOST!",
      restart: "NEUSTART!",
    },
  },
};

/** All games with their comic copy; fails the build when a game has none. */
export async function getComicGames(): Promise<
  { game: CollectionEntry<"games">; comic: GameComic }[]
> {
  return (await getVariantGames()).map((game) => {
    const comic = comics[game.id];
    if (!comic) {
      throw new Error(
        `Schafbock Studio: game "${game.id}" has no comic copy in src/variants/schafbock-studio/comics.ts`,
      );
    }
    return { game, comic };
  });
}
