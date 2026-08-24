# Shirly Herscovici — Interactive Portfolio

A dual-system portfolio built with **React + TypeScript + Tailwind CSS + Framer Motion**, featuring two fully realized display modes and a tabbed "stage switcher" architecture across four project disciplines.

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

- `src/context/ModeContext.tsx` — Studio / Gaming HUD mode state, applied via `data-mode` on `<html>`.
- `src/components/Header.tsx` — top nav with the mode toggle switch.
- `src/components/Hero.tsx` — title, subtitle, and the 4 stage-selector cards.
- `src/components/StageSidebar.tsx` — sticky vertical stage indicator (desktop, `lg:` and up).
- `src/components/stages/` — one file per stage:
  - `AmyStage.tsx` — 3D-tilt album sleeve with sliding vinyl, tabbed print assets.
  - `GalgalatzStage.tsx` — phone mockup, live schedule, fully interactive audio player + equalizer.
  - `NavigatorStage.tsx` — native `<video controls>` element (no blocking overlays) + prompt spec cards + gaming-only radar HUD.
  - `PreplayStage.tsx` — animated AE-style keyframe timeline, scrubber, and expression console.

## Notes

- Both modes share all interactive logic — only the visual skin (`isGaming` from `useMode()`) changes per component.
- The Navigator video uses a small public-domain MP4 as a stand-in for the real short film; swap `VIDEO_SRC` in `NavigatorStage.tsx` for the final asset.
- All album art / app mockups / print assets are CSS/SVG-generated placeholders — swap in real production imagery when available.
