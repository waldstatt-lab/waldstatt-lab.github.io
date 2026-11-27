import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// The Pages workflow sets SITE_URL and BASE_PATH from the repository's Pages
// settings, so the build works both as the organization site (base "/") and as
// a project site (base "/<repository>/"). Locally the defaults apply.
const site = process.env.SITE_URL || "https://waldstatt-lab.github.io";

export default defineConfig({
  site,
  base: process.env.BASE_PATH || "/",
  trailingSlash: "always",
  // Waldstatt Games moved to its own repository, waldstatt-lab/waldstatt, and is
  // published at https://waldstatt-lab.ch/waldstatt/ (ADR 0010).
  redirects: {
    "/waldstatt-games/": "https://waldstatt-lab.ch/waldstatt/",
  },
  vite: {
    plugins: [tailwindcss()],
  },
  devToolbar: { enabled: false },
});
