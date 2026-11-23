# waldstatt-lab.github.io

The website of our hobby game studio. It links the games programmed at the
Nationaler Zukunftstag:

| Game | Play | Source |
| --- | --- | --- |
| Moto Devil: a stunt-bike game whose levels lie to you | <https://waldstatt-lab.github.io/moto-devil/> | [waldstatt-lab/moto-devil](https://github.com/waldstatt-lab/moto-devil) |
| Car Drive: a three-lane arcade driver through traffic | <https://waldstatt-lab.github.io/carrrgh/> | [waldstatt-lab/carrrgh](https://github.com/waldstatt-lab/carrrgh) |

The games are built and deployed from their own repositories; this site only
links to them. The site holds one complete version per name candidate: `/schafbock-studio/`,
`/egg-settlers/`, `/november-games/` and `/2raben-games/`, each with a home page,
an about page and a page per game. The page at `/` lists them all.

It is a static site built with [Astro](https://astro.build) and
[daisyUI](https://daisyui.com), in German, and published on GitHub Pages at
<https://waldstatt-lab.github.io/>.

## Run it locally

With [mise](https://mise.jdx.dev):

```sh
mise install && mise run install
mise run dev    # http://localhost:4321
```

## Documentation

- [CONTRIBUTING.md](CONTRIBUTING.md): how to shape, build, and submit changes.
- [AGENTS.md](AGENTS.md): instructions for AI coding agents.
- [Architecture](docs/architecture/README.md) and [decisions](docs/architecture/decisions/README.md).
- [Idea](docs/idea.md): project direction.
- [Pitches](docs/pitches/README.md): proposed features.
