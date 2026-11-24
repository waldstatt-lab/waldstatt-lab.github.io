import { defineCollection, reference } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

/**
 * One Markdown file per event: a Zukunftstag, a workshop, a campaign. The file
 * name is the route segment of its page; a planned event has no page yet.
 */
const events = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/events" }),
  schema: z.object({
    title: z.string(),
    /** What sort of event it is, for example "Zukunftstag" or "Workshop". */
    kind: z.string(),
    /** For the order of the events, newest first; `when` is what visitors read. */
    date: z.coerce.date(),
    when: z.string(),
    place: z.string().optional(),
    /** One or two sentences for the home page and the list of events. */
    summary: z.string(),
    /** Announced, but not held yet. */
    planned: z.boolean().default(false),
  }),
});

/** One Markdown file per game: the game idea, what to expect and the controls. */
const games = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/games" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      /** One sentence for cards and the top of the game page. */
      tagline: z.string(),
      /** The game's GitHub Pages deployment. */
      playUrl: z.url(),
      /** The game's repository. */
      sourceUrl: z.url(),
      /** Position in game lists, lowest first. */
      order: z.number(),
      /** The event the game was made at. */
      event: reference("events"),
      /** A picture of the running game, with a description of what it shows. */
      screenshot: image(),
      screenshotAlt: z.string(),
      /** Whether the game also lies hidden in the Waldstatt game's forest. */
      inWaldstatt: z.boolean().default(false),
    }),
});

/**
 * How a game was made, told after its repository: the sketches it began with,
 * the steps that followed, the pitches, and in the Markdown what is worth
 * telling beyond that. The file is named like the game's; a game without one
 * has no such section on its page.
 */
const making = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/making" }),
  schema: ({ image }) => {
    const picture = z.object({
      src: image(),
      alt: z.string(),
      caption: z.string().optional(),
    });
    return z.object({
      intro: z.string(),
      sketches: z.array(picture).default([]),
      steps: z.array(
        z.object({
          /** When it happened, as the commit or the photo records it. */
          when: z.string(),
          title: z.string(),
          text: z.string(),
          picture: picture.optional(),
          pitch: z.url().optional(),
        }),
      ),
    });
  },
});

export const collections = { events, games, making };
