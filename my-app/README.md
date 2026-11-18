# Kai’s Garden

A Next.js App Router portfolio with MDX articles, a gently swaying SVG flower bed,
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
  MDX typography, card effects, and SVG flowers all use those tokens.
- `app/layout.tsx` loads one font and owns a left-anchored page shell: 1440px
  maximum width, 24px side padding on small screens, 40px from `sm` upward.
- Body text is 16px with a 1.7 line height. `page-section` supplies standard
  vertical padding; `page-title` supplies medium-weight 30px headings.
- Home uses the smaller, mixed-case garden wordmark, a coral flower mark,
  pastel links, and an inset surface for the animated flowers.
- Navigation uses wrapping footer links; there is no top navigation bar or
  mobile popup menu. Articles share the same left edge as the wordmark.
- Use `max-w-prose` for reading widths inside the shared shell. Use `gap-*`
  rather than combining parent gaps with child margins.
- MDX uses the typography plugin with `prose max-w-none`; its colors follow
  the Moss tokens. `PostCard.module.css` owns the card’s striped accent.

## Flowers

`HomeFlowers.tsx` generates two to six SVG flowers on each visit in an 800×300
viewBox, bottom-aligned in the taller mobile panel. Count, spacing, height,
bloom size, colors, and petal forms vary, then stay stable during animation.
Home stems use accumulating random sideways steps, as in the original p5
sketch, so crookedness and lean vary independently from the animated wind.
Home and running share the petal
generator, flexible stem geometry, and damped spring in `flower-model.ts`.
Home samples one-dimensional gradient noise slowly through time to create a
gentle breeze, with a spatial offset so neighboring flowers sway together
without moving in lockstep. Wind sets the spring's target bend; velocity and
damping let each stem follow and settle naturally. Only SVG paths and head
transforms change each frame, without React rerenders or a p5 dependency.
Reduced motion shows still flowers. Animation pauses offscreen and in hidden tabs.

## Running garden

`/running` uses the approved seasonal prototype’s date-seeded flower forms and
spring/drag model. A flower represents a running day; selecting it rotates the
year and shows the recorded route outline in the center. The latest recorded
route is selected on entry. Cursor movement creates local gusts.
Reduced motion disables animated transitions. The chart stays below the text
at every screen size, in a left-aligned drawing area no wider than 560px.
The plot is pulled up by 4rem to sit closer to the controls.
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
