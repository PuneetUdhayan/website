import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

// Compiled at build time — Vite imports each image and returns its resolved URL
const imageModules = import.meta.glob("../../public/images/*.webp", {
  eager: true,
  query: "?url",
  import: "default",
});
const ALL_IMAGES = Object.values(imageModules);

const PAGE_SIZE = 8;
const PAGES = [];
for (let i = 0; i < ALL_IMAGES.length; i += PAGE_SIZE) {
  PAGES.push(ALL_IMAGES.slice(i, i + PAGE_SIZE));
}

const EASE = "power3.out";

function ArtGallery() {
  const [page, setPage] = useState(0);
  const [hovered, setHovered] = useState(null);
  const [openIndex, setOpenIndex] = useState(null);
  const gridRef = useRef(null);

  const goToPage = (p) => {
    if (p === page) return;
    setPage(Math.max(0, Math.min(PAGES.length - 1, p)));
    setHovered(null);
  };

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "Escape") {
        setOpenIndex(null);
        return;
      }
      if (openIndex !== null) return;
      if (e.key === "ArrowRight") goToPage(page + 1);
      if (e.key === "ArrowLeft") goToPage(page - 1);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  useGSAP(
    () => {
      const tiles = gridRef.current?.querySelectorAll(".art-tile");
      if (!tiles) return;
      gsap.fromTo(
        tiles,
        { opacity: 0, y: 26, scaleY: 0.94 },
        {
          opacity: 1,
          y: 0,
          scaleY: 1,
          duration: 0.7,
          ease: EASE,
          stagger: 0.06,
        },
      );
    },
    { dependencies: [page], scope: gridRef },
  );

  const tiles = PAGES[page] || [];

  return (
    <div className="min-h-screen bg-[#fdfdfc] text-[#111111] flex flex-col">
      <div className="flex-1 flex items-center justify-center px-6 sm:px-10 pt-36 pb-20">
        <div
          ref={gridRef}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-10 lg:gap-14 max-w-5xl w-full"
        >
          {tiles.map((src, i) => {
            const isHovered = hovered === i;
            const number = page * PAGE_SIZE + i + 1;
            return (
              <div
                key={src}
                className="art-tile relative aspect-[150/191] bg-[#1b1b1b] overflow-hidden cursor-pointer"
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(i)}
                onBlur={() => setHovered(null)}
                onClick={() => setOpenIndex(i)}
                tabIndex={0}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    style={{
                      position: "relative",
                      width: isHovered ? "100%" : "46%",
                      height: isHovered ? "100%" : "46%",
                      filter: isHovered ? "grayscale(0)" : "grayscale(0.35)",
                      transition: `width 700ms cubic-bezier(.16,1,.3,1), height 700ms cubic-bezier(.16,1,.3,1), filter 700ms cubic-bezier(.16,1,.3,1)`,
                    }}
                  >
                    <img
                      src={src}
                      alt={`Artwork ${number}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
                <div
                  className="absolute inset-x-0 bottom-0 px-3 pb-3 pt-6 pointer-events-none font-inter text-[#fdfdfc]"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(10,10,10,0.72), rgba(10,10,10,0))",
                    opacity: isHovered ? 1 : 0,
                    transform: isHovered ? "none" : "translateY(8px)",
                    transition: `opacity 500ms ${EASE} ${
                      isHovered ? "150ms" : "0ms"
                    }, transform 500ms ${EASE} ${isHovered ? "150ms" : "0ms"}`,
                  }}
                >
                  <div className="text-[10px] tracking-[0.18em] opacity-80">
                    {String(number).padStart(2, "0")}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {PAGES.length > 1 && (
        <footer className="flex flex-col items-center gap-6 pb-12">
          <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-[#e9e9e7]">
            {PAGES.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to page ${i + 1}`}
                onClick={() => goToPage(i)}
                className="rounded-full cursor-pointer"
                style={{
                  width: 11,
                  height: 11,
                  background: i === page ? "#141414" : "#b9b9b6",
                  transform: i === page ? "scale(1.12)" : "scale(1)",
                  transition:
                    "background 400ms ease, transform 400ms ease",
                }}
              />
            ))}
          </div>
          <div className="font-inter text-[10px] tracking-[0.22em] text-[#9a9a97]">
            {String(page + 1).padStart(2, "0")} / {String(PAGES.length).padStart(2, "0")}
          </div>
        </footer>
      )}

      {openIndex !== null && tiles[openIndex] && (
        <div
          className="fixed inset-0 z-[60] bg-[#0b0b0b] flex items-center justify-center cursor-pointer"
          onClick={() => setOpenIndex(null)}
        >
          <img
            src={tiles[openIndex]}
            alt={`Artwork ${page * PAGE_SIZE + openIndex + 1}`}
            className="max-w-[90vw] max-h-[85vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <div className="absolute right-6 bottom-6 sm:right-11 sm:bottom-11 font-inter text-[9px] tracking-[0.2em] text-white/35">
            CLICK ANYWHERE TO CLOSE — ESC
          </div>
        </div>
      )}
    </div>
  );
}

export default ArtGallery;
