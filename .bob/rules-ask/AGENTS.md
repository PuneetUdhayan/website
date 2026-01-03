# Ask Mode Rules

## Non-Obvious Documentation Context

- **Animation architecture**: Project uses two-layer parallax system with GSAP ticker (not useEffect RAF). Single ticker updates all rectangles for performance.

- **Smooth scroll setup**: Lenis smooth scroll requires hook call in App root with specific easing: `(t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))`. Not configurable per-component.

- **Tailwind v4 integration**: Uses new Vite plugin architecture (`@tailwindcss/vite`), not PostCSS. Different from Tailwind v3 setup guides.

- **Rectangle visibility logic**: Parallax rectangles appear based on `scrollStart` property minus 200px buffer. Layer 1 and Layer 2 have different scroll multipliers for depth.

- **GSAP context pattern**: All GSAP animations wrapped in `gsap.context()` for proper cleanup. Standard useEffect cleanup insufficient for GSAP.
