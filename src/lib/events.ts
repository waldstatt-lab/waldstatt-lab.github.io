import { getCollection, type CollectionEntry } from "astro:content";

export type Event = CollectionEntry<"events">;

/** All events, the newest first. */
async function getEvents(): Promise<Event[]> {
  return (await getCollection("events")).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );
}

/** The events that have been held, the newest first; each has its own page. */
export async function getHeldEvents(): Promise<Event[]> {
  return (await getEvents()).filter((event) => !event.data.planned);
}

/** The announced events, the next one first. */
export async function getPlannedEvents(): Promise<Event[]> {
  return (await getEvents()).filter((event) => event.data.planned).reverse();
}
