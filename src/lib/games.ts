import { getCollection, type CollectionEntry } from "astro:content";

export type Game = CollectionEntry<"games">;

/** All games in their display order. */
export async function getGames(): Promise<Game[]> {
  return (await getCollection("games")).sort(
    (a, b) => a.data.order - b.data.order,
  );
}

/** The games made at an event, in their display order. */
export async function getEventGames(eventId: string): Promise<Game[]> {
  return (await getGames()).filter((game) => game.data.event.id === eventId);
}

/**
 * The games the name candidates show. The candidates were made for these and
 * stay as they are; games of later events appear only on the Lab's own pages.
 */
export async function getVariantGames(): Promise<Game[]> {
  return getEventGames("zukunftstag-2026");
}
