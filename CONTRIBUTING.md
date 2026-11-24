# Contributing

Keep changes focused and explain the problem, resulting behavior, and validation
in the pull request. Start with the [architecture documentation](docs/architecture/README.md)
and [architectural decision records](docs/architecture/decisions/README.md).
AI coding agents also follow [AGENTS.md](AGENTS.md).

## Shaping work

Shape substantial features before implementation: describe the problem, rough
solution, risks, and excluded work. Small fixes and documentation corrections do
not need a pitch. Bound each pitch by a useful, testable experiment; add an
appetite or deadline only if the work needs one.

Save pitches as `docs/pitches/<topic>/pitch--<slug>.md` using the
[pitch template](docs/pitches/README.md#template), and add them to the pitch index.
Use the sections Problem, Solution, Security, Rabbit Holes, and No-Gos. Explain
relevant security concerns or why none apply. Keep Excalidraw breadboards and rough
sketches beside the pitch and link them from Solution when they help explain
interactions or layout.

Pitches describe intent. Architecture documentation describes implemented behavior
and conventions; ADRs preserve significant choices and tradeoffs. Update the
relevant documents with implementation changes. Do not treat the broader
[project idea](docs/idea.md) as a commitment to implement every direction it lists.

## Branches and commits

Use short-lived branches and reviewed pull requests. The default branch is `main`;
use the intended integration branch as the PR base. Prefer `feature/<slug>` or
`bugfix/<slug>`, including an issue ID when useful. Link the relevant issue or
pitch and use a draft PR for early feedback.

Use Conventional Commits: `<type>[optional scope][!]: <description>`. Common types
are `feat`, `fix`, `docs`, `refactor`, `test`, `build`, `ci`, and `chore`. Use a concise
description and separate optional bodies and footers with blank lines. Mark
breaking changes with `!` or a `BREAKING CHANGE:` footer and explain migration
requirements. Squash commit messages follow the same convention.

```text
feat(nav): add a mobile menu
fix(contact): keep form input after a failed submit
docs: describe the deployment
```

## Setup and validation

Install [mise](https://mise.jdx.dev), then run from the repository root:

```sh
mise install        # Node.js as pinned in .mise/config.toml
mise run install    # npm ci: dependencies exactly as in package-lock.json
mise run dev        # http://localhost:4321 with live reload
```

`mise tasks` lists every task; each wraps an npm script in
[package.json](package.json), so mise stays optional. Keep dependency and Node.js
changes deliberate, update `package.json` and `package-lock.json` together, and
explain such changes in the PR. To use Claude Code, run
`mise run agents:init-claude` once to link `CLAUDE.md` to `AGENTS.md`.

Run for code and content changes:

```sh
mise run check
```

which runs:

```sh
prettier --check .
astro check
astro build
```

`mise run fmt` applies Prettier. Project Markdown in the repository root and
`docs/` keeps its hand-wrapped style and is not formatted.

CI ([.github/workflows/ci.yml](.github/workflows/ci.yml)) runs `mise run check` on
every pull request. Every push to `main` runs
[.github/workflows/pages.yml](.github/workflows/pages.yml): it builds the site with
the origin and base path of the repository's Pages settings and publishes `dist/`
to GitHub Pages. Pages must use "GitHub Actions" as its source in the repository
settings, and on the free organization plan the repository must be public. The
workflows have read-only rights by default; only the deploy job may write Pages.

For visual or content changes, also check the result in a browser with
`mise run dev`, or `mise run build` and `mise run preview` for the built site:

- every page of the Lab and every variant the change affects, at desktop width and
  at a phone width of about 390 pixels, without horizontal scrolling;
- the navigation, the links to and from the variants, and the "Spielen" links to the games;
- readable text in light and dark themes;
- keyboard navigation with Tab shows a visible focus.

Record what was checked; if no browser is available, report that limitation.

For documentation-only changes, verify relative links and claims against source,
then run `git diff --check`; a full build is unnecessary. Report checks actually
run, failures, and skipped coverage in the PR. Avoid unrelated formatting and
changes to generated files.

## Architecture decisions

Use the [ADR workflow and index](docs/architecture/decisions/README.md) for lasting
choices such as the framework, hosting and deployment, or the route structure.
Copy the [template](docs/architecture/decisions/_adr-template.md),
explain the alternatives and consequences, and identify how reviewers can detect
drift. Routine implementation details do not need an ADR.
