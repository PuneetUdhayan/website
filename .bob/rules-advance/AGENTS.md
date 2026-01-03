# Advanced Mode Rules

## Non-Obvious Coding Patterns

- **Lenis initialization**: Must call [`useLenis()`](../../src/hooks/useLenis.js:4) in App component root - smooth scroll won't work otherwise. RAF loop in hook must not be interrupted.

- **GSAP ticker usage**: Use `gsap.ticker.add()` for animations that need to run every frame (see [`ParallaxRectangles`](../../src/components/ParallaxRectangles.jsx:425)). Do not create multiple tickers - use single ticker for all updates.

- **Parallax implementation**: Rectangles use `scrollStart` property to control appearance timing. Layer 1 multiplier: `-0.3`, Layer 2: `-0.5`. Do not modify these values without understanding depth effect.

- **GSAP cleanup**: Always wrap GSAP code in `gsap.context()` and return `ctx.revert()` in cleanup function. Missing this causes memory leaks.

- **Tailwind v4 setup**: Import `@tailwindcss/vite` in [`vite.config.js`](../../vite.config.js:3), not in CSS files. PostCSS not used.

- **Browser/MCP tools**: Available in this mode for testing and external integrations.
