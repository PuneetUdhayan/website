# AGENTS.md

This file provides guidance to agents when working with code in this repository.

## Non-Obvious Patterns

- **Lenis smooth scroll**: Custom hook [`useLenis()`](src/hooks/useLenis.js:4) must be called in App component for smooth scrolling to work. Uses specific easing function and RAF loop that must not be interrupted.

- **GSAP ticker pattern**: [`ParallaxRectangles`](src/components/ParallaxRectangles.jsx:5) uses `gsap.ticker.add()` instead of `useEffect` with RAF for performance. Single ticker updates all rectangles - do not create multiple tickers.

- **Parallax scroll triggers**: Rectangles have `scrollStart` property that controls when they appear. Layer 1 uses `-0.3` scroll multiplier, Layer 2 uses `-0.5` for depth effect.

- **ESLint unused vars**: Custom rule allows uppercase/underscore prefixed unused vars: `varsIgnorePattern: '^[A-Z_]'` in [`eslint.config.js`](eslint.config.js:26)

- **Tailwind v4**: Uses new `@tailwindcss/vite` plugin (not PostCSS). Import in [`vite.config.js`](vite.config.js:3), not in CSS.

- **GSAP context cleanup**: Always use `gsap.context()` wrapper and return `ctx.revert()` for proper cleanup in React components.
