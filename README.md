# Shirly Herscovici — Interactive Portfolio

A portfolio built with **React + TypeScript + Tailwind CSS + Framer Motion**: a homepage hub of four project cards that each open into a full-screen case-study modal.

## Run it

```bash
npm install
npm run dev
```

Then open the printed local URL (default `http://localhost:5173`).

```bash
npm run build    # production build to dist/
npm run preview  # preview the production build
```

## Structure

- `src/components/hub/PortfolioHub.tsx` — the homepage hub: header, nav, and the four project cards.
- `src/components/hub/ProjectModules.tsx` — the card content for each of the four disciplines (Amy, Galgalatz, AI Rescue, People In Motion).
- `src/components/modal/` — one full-screen case-study component per project:
  - `AmyCaseStudy.tsx` / `AmyRosterGrid.tsx` / `AmyBeforeAfterPhone.tsx` — album art restoration case study.
  - `GalgalatzCaseStudy.tsx` — radio station key-art & UX case study.
  - `AiRescueCaseStudy.tsx` — AI-assisted rescue-film case study.
  - `PeopleMotionCaseStudy.tsx` — motion/rigging case study.
- `src/lib/asset.ts` — prefixes `/public` asset paths with Vite's configured `base`, since `base` only rewrites bundler-processed imports, not plain string-literal `src`/`href` values.

## Deployment

Pushing to `main` triggers [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which builds the site and deploys `dist/` to GitHub Pages at `https://shirlyherscovici.github.io/shirly-portfolio/`. This requires the repo's **Settings → Pages → Build and deployment → Source** to be set to **GitHub Actions**.

## Notes

- All public assets referenced via string literals (not bundler imports) must be wrapped in the `asset()` helper from `src/lib/asset.ts` so they resolve correctly under the `/shirly-portfolio/` base path on GitHub Pages.
