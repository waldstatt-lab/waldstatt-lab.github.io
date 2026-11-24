/**
 * The forest, drawn at build time as SVG: rows of firs seen from above at an
 * angle, as in the Waldstatt game, but our own drawing. All pictures share one
 * lattice of trees that repeats every TILE.w by TILE.h pixels, so they continue
 * each other without a seam:
 *
 * - `tile`: dense forest, repeated as a background;
 * - `edgeOut`: the forest's last rows above open ground (below a forest);
 * - `edgeIn`: the first treetops above a forest (below open ground);
 * - `clearing`: the home page's clearing with the Alp running past it.
 *
 * `undergrowth` (the footer's ferns and mushrooms) and `wood` (the boards'
 * grain) repeat on their own.
 *
 * The lattice's origin lies at a forest's horizontal centre and at its top or
 * bottom edge; see the backgrounds in styles.css.
 */

export const TILE = { w: 720, h: 352 };
const COLS = 10;
const ROWS = 16;
const DX = TILE.w / COLS;
const DY = TILE.h / ROWS;
/** How far a crown reaches above the tree's foot, and to its sides. */
const REACH = { up: 132, side: 40 };

/** A seeded random generator, so every build draws the same forest. */
function random(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = Math.imul(s ^ (s >>> 15), s | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const n = (value: number) => String(Math.round(value * 10) / 10);

// --- Trees ------------------------------------------------------------------

const firs = [
  { light: "#57934f", mid: "#2d6238", deep: "#163a25", height: 104, seed: 3 },
  { light: "#4a8852", mid: "#265a3d", deep: "#12352a", height: 112, seed: 14 },
  { light: "#669a50", mid: "#376a38", deep: "#1b4224", height: 95, seed: 25 },
  { light: "#3f7c50", mid: "#1f5139", deep: "#0f3025", height: 118, seed: 36 },
];
const broadleaves = [
  { light: "#a9c95f", mid: "#75a143", dark: "#48702c", seed: 47 },
  { light: "#8fc05c", mid: "#5b9540", dark: "#38692c", seed: 58 },
];

function firSymbol(fir: (typeof firs)[number], index: number): string {
  const rnd = random(fir.seed);
  const tiers = 6;
  const step = fir.height / tiers;
  let body = `<path d="M-3-18H3V0H-3Z" fill="#553821"/><path d="M0-18H3V0H0Z" fill="#392414"/>`;
  for (let i = 0; i < tiers; i++) {
    const t = i / (tiers - 1);
    const top = -14 - fir.height + i * step * 0.84;
    const height = step * 1.62;
    const half = 6 + t * 23;
    const bottom = top + height;
    const right: string[] = [];
    const left: string[] = [];
    for (let k = 1; k <= 4; k++) {
      const f = k / 4;
      const bulge = half * f * (0.8 + 0.2 * f);
      right.push(
        `${n(bulge + (rnd() - 0.5) * 2)} ${n(top + height * f * 0.9)}`,
      );
      left.unshift(
        `${n(-bulge + (rnd() - 0.5) * 2)} ${n(top + height * f * 0.9)}`,
      );
    }
    const teeth = 7 + Math.round(t * 2);
    const rim: string[] = [];
    for (let k = teeth; k >= 0; k--) {
      const x = -half + (2 * half * k) / teeth;
      rim.push(`${n(x)} ${n(bottom - (k % 2 ? 4 + rnd() * 3 : rnd() * 2))}`);
    }
    body += `<path d="M0 ${n(top)}L${right.join(" ")} ${rim.join(" ")} ${left.join(" ")}Z" fill="url(#f${index})"/>`;
    // Needles: light strokes on the lit left side, dark ones on the right.
    let lit = "";
    let shaded = "";
    for (let k = 0; k < 9 + i * 4; k++) {
      const f = 0.25 + rnd() * 0.75;
      const x = (rnd() * 2 - 1) * half * f * 0.9;
      const y = top + height * f * 0.86;
      const stroke = `M${n(x)} ${n(y)}l${x < 0 ? -3 : 3} 4`;
      if (x < -half * 0.05) lit += stroke;
      else shaded += stroke;
    }
    body += `<path d="${lit}" stroke="#b9dc8c" stroke-opacity=".34" fill="none"/><path d="${shaded}" stroke="#06180d" stroke-opacity=".36" fill="none"/>`;
  }
  return `<linearGradient id="f${index}" x1="0" y1=".2" x2="1" y2=".8"><stop stop-color="${fir.light}"/><stop offset=".55" stop-color="${fir.mid}"/><stop offset="1" stop-color="${fir.deep}"/></linearGradient><g id="t${index}">${body}</g>`;
}

function broadleafSymbol(
  tree: (typeof broadleaves)[number],
  index: number,
): string {
  const rnd = random(tree.seed);
  let body = `<path d="M-3 0L-2-30H2L3 0Z" fill="#5e4128"/>`;
  const blobs = Array.from({ length: 9 }, () => {
    const angle = rnd() * Math.PI * 2;
    const distance = rnd() * 17;
    return {
      x: Math.cos(angle) * distance * 1.15,
      y: -48 + Math.sin(angle) * distance * 0.85,
      r: 12 + rnd() * 6,
    };
  }).sort((a, b) => a.y - b.y);
  for (const { x, y, r } of blobs) {
    body += `<circle cx="${n(x)}" cy="${n(y)}" r="${n(r)}" fill="url(#f${index})"/>`;
  }
  let leaves = "";
  for (let k = 0; k < 40; k++) {
    const angle = rnd() * Math.PI * 2;
    const distance = rnd() * 25;
    leaves += `M${n(Math.cos(angle) * distance)} ${n(-50 + Math.sin(angle) * distance * 0.8)}h2`;
  }
  body += `<path d="${leaves}" stroke="#e6f5b0" stroke-opacity=".4" stroke-width="2" fill="none"/>`;
  return `<radialGradient id="f${index}" cx=".32" cy=".28" r=".8"><stop stop-color="${tree.light}"/><stop offset=".6" stop-color="${tree.mid}"/><stop offset="1" stop-color="${tree.dark}"/></radialGradient><g id="t${index}">${body}</g>`;
}

const SHADOW = `<radialGradient id="s"><stop stop-color="#06140b" stop-opacity=".6"/><stop offset="1" stop-color="#06140b" stop-opacity="0"/></radialGradient><ellipse id="sh" rx="36" ry="13" fill="url(#s)"/>`;

const DEFS = `<defs>${SHADOW}${firs.map(firSymbol).join("")}${broadleaves
  .map((tree, i) => broadleafSymbol(tree, firs.length + i))
  .join("")}</defs>`;

const FLOOR = "#152b1c";

// --- The lattice ------------------------------------------------------------

interface Tree {
  x: number;
  y: number;
  kind: number;
}

const wrap = (value: number, size: number) => ((value % size) + size) % size;

/** The tree at a lattice position; positions one tile apart are the same tree. */
function treeAt(col: number, row: number): Tree {
  const c = wrap(col, COLS);
  const r = wrap(row, ROWS);
  const rnd = random(c * 7919 + r * 104729 + 17);
  return {
    x: (col + (r % 2 ? 0.5 : 0)) * DX + (rnd() - 0.5) * 20,
    y: row * DY + (rnd() - 0.5) * 9,
    kind: Math.floor(rnd() * firs.length),
  };
}

interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
}

/** Every tree that can be seen in the box, from back to front. */
function treesIn(box: Box): Tree[] {
  const trees: Tree[] = [];
  const lastRow = Math.ceil((box.y + box.h + REACH.up) / DY) + 1;
  const lastCol = Math.ceil((box.x + box.w + REACH.side) / DX) + 1;
  for (let row = Math.floor(box.y / DY) - 2; row <= lastRow; row++) {
    for (
      let col = Math.floor((box.x - REACH.side) / DX) - 1;
      col <= lastCol;
      col++
    ) {
      trees.push(treeAt(col, row));
    }
  }
  return trees.sort((a, b) => a.y - b.y);
}

function drawTrees(trees: Tree[]): string {
  const at = (id: string, { x, y }: Tree, dx = 0) =>
    `<use href="#${id}" x="${n(x + dx)}" y="${n(y)}"/>`;
  return (
    trees.map((tree) => at("sh", tree, 8)).join("") +
    trees.map((tree) => at(`t${tree.kind}`, tree)).join("")
  );
}

function svg(box: Box, body: string): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${box.w}" height="${box.h}" viewBox="${box.x} ${box.y} ${box.w} ${box.h}">${DEFS}${body}</svg>`;
}

function rect(box: Box, fill: string): string {
  return `<rect x="${box.x}" y="${box.y}" width="${box.w}" height="${box.h}" fill="${fill}"/>`;
}

// --- The pictures -----------------------------------------------------------

/** Dense forest; repeats in both directions. */
export function tile(): string {
  const box = { x: 0, y: 0, ...TILE };
  return svg(box, rect(box, FLOOR) + drawTrees(treesIn(box)));
}

const EDGE_OUT = 220;
const EDGE_IN = 150;

/** The forest's last rows, with open ground showing below them. */
export function edgeOut(): string {
  const box = { x: 0, y: 0, w: TILE.w, h: EDGE_OUT };
  // No further up than a crown reaches: the trees left out must not have begun
  // in the picture above.
  const line = (x: number) =>
    155 +
    14 * Math.sin((x / TILE.w) * Math.PI * 4) +
    9 * Math.sin((x / TILE.w) * Math.PI * 10 + 1);
  const trees = treesIn(box).filter((tree) => tree.y < line(tree.x));
  const ground = `<linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset=".4" stop-color="${FLOOR}"/><stop offset="1" stop-color="${FLOOR}" stop-opacity="0"/></linearGradient>${rect({ ...box, h: 190 }, "url(#g)")}`;
  return svg(box, ground + drawTrees(trees));
}

/** The treetops of a forest that begins below. */
export function edgeIn(): string {
  const box = { x: 0, y: -EDGE_IN, w: TILE.w, h: EDGE_IN };
  const trees = treesIn(box).filter((tree) => tree.y > -34);
  const ground = `<linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop stop-color="${FLOOR}" stop-opacity="0"/><stop offset=".45" stop-color="${FLOOR}"/></linearGradient>${rect({ ...box, y: -56, h: 56 }, "url(#g)")}`;
  return svg(box, ground + drawTrees(trees));
}

/** What grows on the forest floor above the footer: ferns, grass, mushrooms. */
export function undergrowth(): string {
  const box = { x: 0, y: 0, w: TILE.w, h: 110 };
  const rnd = random(7);
  const fern = (x: number, y: number, size: number, color: string) => {
    let d = "";
    for (const lean of [-1, -0.55, -0.15, 0.25, 0.65, 1]) {
      const [tx, ty] = [x + lean * size, y - size * (1.05 - 0.5 * lean * lean)];
      const [mx, my] = [x + lean * size * 0.3, y - size * 0.75];
      d += `M${n(x)} ${n(y)}Q${n(mx)} ${n(my)} ${n(tx)} ${n(ty)}`;
      for (let k = 2; k <= 8; k++) {
        const s = k / 9;
        const px = (1 - s) ** 2 * x + 2 * s * (1 - s) * mx + s * s * tx;
        const py = (1 - s) ** 2 * y + 2 * s * (1 - s) * my + s * s * ty;
        const leaf = size * 0.2 * (1.1 - s);
        d += `M${n(px - leaf)} ${n(py + leaf * 0.5)}L${n(px)} ${n(py)}L${n(px + leaf)} ${n(py + leaf * 0.5)}`;
      }
    }
    return `<path d="${d}" fill="none" stroke="${color}" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>`;
  };
  const mushroom = (x: number, y: number, s: number) =>
    `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-4 0L-3-15H3L4 0Q0 2.5-4 0Z" fill="#efe3c6"/><path d="M0-15H3L4 0Q2 1.5 0 1.5Z" fill="#c9b68f"/><path d="M-14-13Q-12-29 0-29T14-13Q0-9-14-13Z" fill="#c23a2b"/><path d="M0-29Q12-29 14-13Q7-11 2-11Q9-20 0-29Z" fill="#8f2419"/><g fill="#fff6e3"><circle cx="-6" cy="-19" r="2.2"/><circle cx="1" cy="-24" r="1.8"/><circle cx="5" cy="-17" r="2"/><circle cx="-1" cy="-15" r="1.2"/></g></g>`;
  let body = "";
  for (let i = 0; i < 26; i++) {
    const x = 20 + rnd() * (box.w - 40);
    const y = 45 + rnd() * 60;
    body += `<path d="M${n(x)} ${n(y)}l-4-8m4 8l-1-11m1 11l3-10m-3 10l6-6" stroke="${i % 2 ? "#2d6238" : "#3f7c50"}" stroke-width="1.5" fill="none" stroke-linecap="round"/>`;
  }
  const ferns: [number, number, number, string][] = [
    [76, 72, 44, "#2d6238"],
    [132, 86, 32, "#4a8852"],
    [270, 66, 36, "#265a3d"],
    [424, 84, 46, "#376a38"],
    [486, 70, 32, "#265a3d"],
    [606, 90, 38, "#3f7c50"],
    [662, 66, 34, "#265a3d"],
  ];
  body += ferns.map((f) => fern(...f)).join("");
  body += mushroom(196, 92, 0.95) + mushroom(217, 99, 0.6);
  body += mushroom(546, 80, 0.75);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${box.w}" height="${box.h}" viewBox="0 0 ${box.w} ${box.h}">${body}</svg>`;
}

/** A board's grain; repeats in both directions. */
export function wood(): string {
  const w = 640;
  const h = 128;
  const rnd = random(21);
  let grain = "";
  for (let i = 0; i < 32; i++) {
    const y = (i + rnd() * 0.8) * 4;
    const [a, b] = [1 + rnd() * 2, rnd() * 1.4];
    const [p, q] = [rnd() * 6.28, rnd() * 6.28];
    let d = "";
    for (let x = 0; x <= w; x += 20) {
      const t = (x / w) * Math.PI * 2;
      d += `${x ? "L" : "M"}${x} ${n(y + a * Math.sin(t + p) + b * Math.sin(t * 4 + q))}`;
    }
    const light = i % 3 === 0;
    grain += `<path d="${d}" fill="none" stroke="${light ? "#8a5d36" : "#1a0e05"}" stroke-opacity="${n(light ? 0.2 : 0.3)}" stroke-width="${n(0.7 + rnd() * 1.2)}"/>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><rect width="${w}" height="${h}" fill="#432c18"/>${grain}</svg>`;
}

interface Clearing {
  box: Box;
  /** The open ground's centre and half axes, around the box's centre line. */
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  /** The Alp's course as points from its upper end. */
  river: [number, number][];
}

/** The tile's centre is the pictures' centre, so x = TILE.w / 2 is the middle. */
const MID = TILE.w / 2;

const clearings: Record<"wide" | "narrow", Clearing> = {
  wide: {
    box: { x: MID - 800, y: -880, w: 1600, h: 880 },
    cx: MID + 10,
    cy: -405,
    rx: 500,
    ry: 258,
    river: [
      [MID + 690, -1000],
      [MID + 640, -800],
      [MID + 470, -660],
      [MID + 545, -520],
      [MID + 440, -400],
      [MID + 500, -290],
      [MID + 330, -205],
      [MID + 40, -165],
      [MID - 300, -185],
      [MID - 620, -120],
      [MID - 900, -150],
    ],
  },
  narrow: {
    box: { x: MID - 400, y: -880, w: 800, h: 880 },
    cx: MID - 4,
    cy: -410,
    rx: 190,
    ry: 305,
    river: [
      [MID + 330, -1000],
      [MID + 290, -820],
      [MID + 205, -730],
      [MID + 232, -600],
      [MID + 206, -430],
      [MID + 225, -270],
      [MID + 90, -165],
      [MID - 150, -150],
      [MID - 420, -180],
    ],
  },
};

/** A smooth path through the points (Catmull-Rom as cubic curves). */
function smooth(points: [number, number][]): string {
  let d = `M${points[0].join(" ")}`;
  for (let i = 0; i < points.length - 1; i++) {
    const [p0, p1, p2, p3] = [-1, 0, 1, 2].map(
      (k) => points[Math.min(points.length - 1, Math.max(0, i + k))],
    );
    d += `C${n(p1[0] + (p2[0] - p0[0]) / 6)} ${n(p1[1] + (p2[1] - p0[1]) / 6)} ${n(p2[0] - (p3[0] - p1[0]) / 6)} ${n(p2[1] - (p3[1] - p1[1]) / 6)} ${p2[0]} ${p2[1]}`;
  }
  return d;
}

/** The same curve as close points, to keep trees off the water. */
function sample(points: [number, number][]): [number, number][] {
  const samples: [number, number][] = [];
  for (let i = 0; i < points.length - 1; i++) {
    const [p0, p1, p2, p3] = [-1, 0, 1, 2].map(
      (k) => points[Math.min(points.length - 1, Math.max(0, i + k))],
    );
    for (let s = 0; s < 14; s++) {
      const t = s / 14;
      const at = (a: 0 | 1) =>
        0.5 *
        (2 * p1[a] +
          (p2[a] - p0[a]) * t +
          (2 * p0[a] - 5 * p1[a] + 4 * p2[a] - p3[a]) * t * t +
          (3 * p1[a] - p0[a] - 3 * p2[a] + p3[a]) * t * t * t);
      samples.push([at(0), at(1)]);
    }
  }
  return samples;
}

/** The home page's clearing, in the forest the tile continues around it. */
export function clearing(layout: "wide" | "narrow"): string {
  const { box, cx, cy, rx, ry, river } = clearings[layout];
  const rnd = random(99);
  const wobble = (angle: number) =>
    layout === "wide"
      ? 1 + 0.04 * Math.sin(angle * 3 + 1) + 0.03 * Math.sin(angle * 7)
      : 1 + 0.02 * Math.sin(angle * 5 + 1);
  /** 1 on the clearing's edge, less inside; a rounded rectangle's shape. */
  const reach = (x: number, y: number) => {
    const u = (x - cx) / rx;
    const v = (y - cy) / ry;
    return (
      (Math.abs(u) ** 3.2 + Math.abs(v) ** 3.2) ** (1 / 3.2) /
      wobble(Math.atan2(v, u))
    );
  };
  const water = sample(river);
  const toWater = (x: number, y: number) =>
    Math.min(...water.map(([wx, wy]) => Math.hypot(wx - x, (wy - y) * 1.5)));

  const outline = Array.from({ length: 96 }, (_, i) => {
    const angle = (i / 96) * Math.PI * 2;
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    const size =
      wobble(angle) / (Math.abs(c) ** 3.2 + Math.abs(s) ** 3.2) ** (1 / 3.2);
    const jag = 1 + (rnd() - 0.5) * 0.035;
    return `${n(cx + c * rx * size * jag)} ${n(cy + s * ry * size * jag)}`;
  }).join(" ");

  let tufts = "";
  let flowers = "";
  for (let i = 0; i < (layout === "wide" ? 330 : 190); i++) {
    const x = cx + (rnd() * 2 - 1) * rx;
    const y = cy + (rnd() * 2 - 1) * ry;
    if (reach(x, y) > 0.95 || toWater(x, y) < 34) continue;
    if (i % 12 === 0) {
      flowers += `<circle cx="${n(x)}" cy="${n(y)}" r="2" fill="${["#fff6d8", "#f3d05a", "#fff6d8"][i % 3]}"/>`;
    } else {
      tufts += `M${n(x)} ${n(y)}l-2.5-5m3.5 5l.5-6m.5 6l3-5`;
    }
  }

  let patches = "";
  for (let i = 0; i < 26; i++) {
    const x = cx + (rnd() * 2 - 1) * rx * 0.8;
    const y = cy + (rnd() * 2 - 1) * ry * 0.8;
    patches += `<ellipse cx="${n(x)}" cy="${n(y)}" rx="${n(26 + rnd() * 60)}" ry="${n(9 + rnd() * 16)}" fill="${i % 2 ? "#d3e69a" : "#5f8f41"}" fill-opacity=".16"/>`;
  }

  const course = smooth(river);
  const stroke = (color: string, width: number, extra = "") =>
    `<path d="${course}" fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round" ${extra}/>`;
  const ground =
    rect(box, FLOOR) +
    `<radialGradient id="m" cx=".45" cy=".42" r=".7"><stop stop-color="#b5d27c"/><stop offset=".6" stop-color="#98bd62"/><stop offset="1" stop-color="#6b9546"/></radialGradient>` +
    `<polygon points="${outline}" fill="url(#m)" stroke="#48703a" stroke-width="10" stroke-linejoin="round"/>` +
    patches +
    `<path d="${tufts}" stroke="#55823b" stroke-opacity=".55" stroke-width="1.2" fill="none" stroke-linecap="round"/>${flowers}` +
    stroke("#a88a5c", 58) +
    stroke("#8c7048", 50) +
    stroke("#2b6fb5", 42) +
    stroke("#4191dc", 26) +
    stroke("#8fc6f2", 3, 'stroke-dasharray="26 46 12 60" stroke-opacity=".8"');

  const trees = treesIn(box)
    .filter((tree) => {
      const distance = reach(tree.x, tree.y);
      if (distance < 1.03) return false;
      // Further off, the forest closes over the water.
      return toWater(tree.x, tree.y) > 46 || (distance > 1.5 && tree.x < cx);
    })
    .map((tree) => {
      // A few broadleaf trees where the light reaches: by the water's edge.
      const near = toWater(tree.x, tree.y) < 92 && reach(tree.x, tree.y) < 1.5;
      return near && tree.kind < 2
        ? { ...tree, kind: firs.length + (tree.kind % 2) }
        : tree;
    });
  return svg(box, ground + drawTrees(trees));
}
