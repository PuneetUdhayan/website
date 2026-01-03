# Plan Mode Rules

## Non-Obvious Architecture Constraints

- **Animation performance**: Single GSAP ticker pattern required for all frame-based animations. Multiple tickers cause performance degradation with many elements.

- **Smooth scroll dependency**: Lenis smooth scroll must be initialized in App root before any scroll-dependent components render. Order matters.

- **Parallax layer system**: Two-layer architecture with different scroll multipliers (`-0.3` and `-0.5`) creates depth illusion. Changing multipliers breaks visual effect.

- **Rectangle visibility timing**: `scrollStart` property controls when rectangles appear, with 200px buffer for smooth transitions. Tight coupling between scroll position and visibility.

- **GSAP context requirement**: All GSAP animations must use context wrapper for proper cleanup. React's useEffect cleanup alone insufficient - causes memory leaks.

- **Tailwind v4 architecture**: Vite plugin integration (not PostCSS) affects build pipeline and configuration approach. Different from v3 patterns.
