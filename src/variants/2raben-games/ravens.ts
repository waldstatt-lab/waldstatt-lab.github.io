/**
 * What the ravens say about each game, keyed by the game's id (its file name
 * in src/content/games/). Every fact here comes from the shared game text; the
 * ravens retell it and add nothing. Review it whenever a game's text changes.
 */
import type { CollectionEntry } from "astro:content";
import { getVariantGames } from "../../lib/games";

export interface GameRavens {
  /** The pixel vignette and module icon, from scenes.ts. */
  picture: "moto" | "car";
  /** The raven's comment next to the play button. */
  says: string;
  /** Which raven speaks: the one with the scarf, or the other one. */
  scarf: boolean;
  /** The few keys to know before starting; the full table follows below. */
  keys: { keys: string[]; action: string }[];
}

export const ravens: Record<string, GameRavens> = {
  "moto-devil": {
    picture: "moto",
    says: "In Moto Devil spielen wir die Bösen: Raben im Sturzflug. Sorry! Krah!",
    scarf: true,
    keys: [
      { keys: ["W", "↑"], action: "Gas geben" },
      { keys: ["A", "D"], action: "Kippen, Salto" },
      { keys: ["Leertaste"], action: "Springen" },
      { keys: ["R"], action: "Level neu starten" },
    ],
  },
  "car-drive": {
    picture: "car",
    says: "Car Drive siehst du aus der Vogelperspektive. Also aus unserer. Von hier oben sieht man jede Lücke.",
    scarf: false,
    keys: [
      { keys: ["A", "D", "←", "→"], action: "Lenken" },
      { keys: ["Leertaste"], action: "Boost" },
      { keys: ["R"], action: "Neustart" },
    ],
  },
};

/** All games with what the ravens say; fails the build when a game has nothing. */
export async function getRavenGames(): Promise<
  { game: CollectionEntry<"games">; ravens: GameRavens }[]
> {
  return (await getVariantGames()).map((game) => {
    const entry = ravens[game.id];
    if (!entry) {
      throw new Error(
        `2raben games: game "${game.id}" has no raven copy in src/variants/2raben-games/ravens.ts`,
      );
    }
    return { game, ravens: entry };
  });
}
