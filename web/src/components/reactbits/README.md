# reactbits/

Components adapted from **react-bits** (https://github.com/DavidHDev/react-bits, MIT) — the
TypeScript + Tailwind variants, trimmed to what this site uses and made
`prefers-reduced-motion`-aware. No new npm dependencies: they use plain React/Canvas/CSS or
`motion` (already a project dependency).

| file | react-bits source | used for |
|------|-------------------|----------|
| `CountUp.tsx` | Text Animations › Count Up (motion variant) | the two `.ms-stats` bands (via `../StatNumber.tsx`) |
| `SpotlightCard.tsx` | Components › Spotlight Card | cursor-follow purple glow on card grids (`useSpotlight` + `Spotlight*` wrappers) |
| `ShinyText.tsx` | Text Animations › Shiny Text | subtle sheen on eyebrow / badge labels |
| `ClickSpark.tsx` | Animations › Click Spark | global click feedback (fixed-overlay variant) |

Adaptations: fixed-overlay canvas for ClickSpark (no layout wrapper); `useSpotlight` hook so the
glow composes with the existing `motion` stagger/hover on cards; accent colour wired to
`--ms-accent` / `--ms-accent-rgb`; every component degrades to a static form under reduced motion.
