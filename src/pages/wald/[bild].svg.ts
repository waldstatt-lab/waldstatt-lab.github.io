import type { APIRoute, GetStaticPaths } from "astro";
import {
  clearing,
  edgeIn,
  edgeOut,
  tile,
  undergrowth,
  wood,
} from "../../lab/forest";

/** The forest's pictures, drawn at build time; see src/lab/forest.ts. */
const pictures: Record<string, () => string> = {
  wald: tile,
  "rand-unten": edgeOut,
  "rand-oben": edgeIn,
  "lichtung-breit": () => clearing("wide"),
  "lichtung-schmal": () => clearing("narrow"),
  boden: undergrowth,
  holz: wood,
};

export const getStaticPaths = (() =>
  Object.keys(pictures).map((bild) => ({
    params: { bild },
  }))) satisfies GetStaticPaths;

export const GET: APIRoute = ({ params }) =>
  new Response(pictures[params.bild ?? ""](), {
    headers: { "Content-Type": "image/svg+xml" },
  });
