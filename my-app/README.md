# Kai’s Garden

A Next.js App Router portfolio with MDX articles and a p5 flower garden.

## Development

Use Node 24, then run:

```sh
npm ci
npm run dev
```

Open http://localhost:3000. Run `npm run build` to check the production build,
including lint and TypeScript checks. `npm start` serves that build.
The build downloads JetBrains Mono from Google Fonts and self-hosts it.

## Styling

Use the existing Tailwind utilities and the small shared styles in
`app/globals.css`. No extra styling library or preprocessor is needed.

- `app/layout.tsx` loads JetBrains Mono once and owns the page shell: 1024px
  maximum width, 20px side padding on small screens, 32px from `sm` upward.
- The base body style is 16px text with a 26px line height.
- `page-section` supplies standard page padding: 32px vertically, 48px from `md`.
- `page-title` supplies 30px/36px bold headings and a 24px bottom margin.
- `intro-text` supplies 18px/32px introductory copy and a 65ch reading width.
- Use `max-w-prose` for reading widths within the shared shell. Avoid adding
  another page gutter. Use `gap-*` for lists and grids instead of combining
  gaps with child margins.
- The Tailwind typography plugin styles MDX with `prose max-w-none` inside a
  `max-w-prose` article wrapper. Its base line height matches the body.
- `PostCard.module.css` contains the bespoke card border effect. The
  `.garden-canvas canvas` rule only sizes the flower canvas.

PostCSS runs Tailwind and Autoprefixer. Use Tailwind responsive prefixes or
normal CSS media queries when necessary; there is no custom mixin syntax.
