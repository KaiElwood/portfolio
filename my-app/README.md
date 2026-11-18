# Kai’s Garden

A Next.js App Router portfolio with MDX articles, the original p5 flower garden,
and an interactive running garden.

## Development

Use Node 24, then run:

```sh
npm ci
npm run dev
```

Open http://localhost:3000. `npm run build` checks the production build,
including lint and TypeScript. `npm start` serves that build.
Next downloads JetBrains Mono at build time and self-hosts it.

## Styling

Use Tailwind and the shared styles in `app/globals.css`. PostCSS runs only
Tailwind and Autoprefixer; responsive utilities or normal media queries replace
custom mixins.

- Moss palette tokens live in `globals.css`: background, inset surface, ink,
  muted text, coral, lilac, butter, and borders. Tailwind’s `garden-*` colors,
  MDX typography, card effects, and p5 painting all use those tokens.
- `app/layout.tsx` loads one font and owns a left-anchored page shell: 1440px
  maximum width, 24px side padding on small screens, 40px from `sm` upward.
- Body text is 16px with a 1.7 line height. `page-section` supplies standard
  vertical padding; `page-title` supplies medium-weight 30px headings.
- Home uses the smaller, mixed-case garden wordmark, a coral flower mark,
  pastel links, and an inset surface for the animated canvas.
- Navigation uses wrapping footer links; there is no top navigation bar or
  mobile popup menu. Articles share the same left edge as the wordmark.
- Use `max-w-prose` for reading widths inside the shared shell. Use `gap-*`
  rather than combining parent gaps with child margins.
- MDX uses the typography plugin with `prose max-w-none`; its colors follow
  the Moss tokens. `PostCard.module.css` owns the card’s striped accent.

## Flowers

`Plants.tsx` retains the original wind, petal, and stem geometry. `FlowerSketch`
keeps the original random draws, construction parameters, and 800×300 logical
canvas. It assigns theme colors after setup and clears with the opaque panel
color every frame. CSS keeps the canvas at 8:3, bottom-aligned in the taller
mobile panel. Zero flowers is still a possible original random outcome.

## Running garden

`/running` uses the approved seasonal prototype’s date-seeded flower forms and
spring/drag model. A flower represents a running day; selecting it rotates the
year and shows the recorded route outline in the center. The latest recorded
route is selected on entry. Cursor movement creates local gusts.
Reduced motion disables animated transitions. The chart stays below the text
at every screen size, in a left-aligned drawing area no wider than 560px.
Unused viewport padding is trimmed within the full flower-motion envelope;
pointer coordinates account for that trim.

`app/running/runs.json` is a snapshot of the approved Strava export’s summary
measurements, rather than a live Strava connection. Dates use New York time;
distance and pace display in miles. Activity identifiers and raw GPS tracks remain
outside this public snapshot. `app/running/route-shapes.json` contains north-up
route outlines normalized to a unit square, preserving their aspect ratio and
start/finish points without including latitude or longitude values. The chart mounts and cleans up its own animation
frames, observers, and listeners in `RunningGarden.tsx`.

Regenerate route outlines from local import files with:

```sh
python3 scripts/export-running-route-shapes.py data/strava/runs.json data/strava/routes.local.json
```

Only export days present in the corresponding summary snapshot when refreshing
the published running data. The raw input files stay local.
