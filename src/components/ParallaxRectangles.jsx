import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

// Compiled at build time — Vite imports each image and returns its resolved URL
const imageModules = import.meta.glob("../../public/images/*.webp", {
  eager: true,
  query: "?url",
  import: "default",
});
const ALL_IMAGES = Object.values(imageModules);

const IMAGE_RECTANGLE_PERCENTAGE = 0.7;

// Rectangle px sizes were designed against a ~1440px-wide desktop viewport.
// Scale them down proportionally on narrower screens (13" laptops, phones)
// instead of leaving them fixed-size, but never grow past the designed size
// or shrink below half of it.
const REFERENCE_VIEWPORT = 1440;
function responsiveSize(px) {
  const vw = `${((px / REFERENCE_VIEWPORT) * 100).toFixed(3)}vw`;
  return `clamp(${px * 0.5}px, ${vw}, ${px}px)`;
}

// Called once on component init — picks a percentage of layer1 indices at random,
// then assigns shuffled images from the build-time list.
function withRandomImages(layer1) {
  const count = Math.round(layer1.length * IMAGE_RECTANGLE_PERCENTAGE);

  const indices = layer1.map((_, i) => i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  const chosen = new Set(indices.slice(0, count));

  const images = [...ALL_IMAGES];
  for (let i = images.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [images[i], images[j]] = [images[j], images[i]];
  }

  let imgIdx = 0;
  return layer1.map((rect, i) =>
    chosen.has(i) ? { ...rect, image: images[imgIdx++] } : rect,
  );
}

const BASE_LAYER1 = [
  // Initial viewport rectangles
  {
    id: 1,
    width: 140,
    height: 200,
    left: 10,
    top: 15,
    color: "rgba(200,200,200,0.15)",
    scrollStart: 0,
  },
  {
    id: 2,
    width: 120,
    height: 170,
    left: 75,
    top: 60,
    color: "rgba(180,180,180,0.12)",
    scrollStart: 0,
  },
  {
    id: 3,
    width: 110,
    height: 140,
    left: 20,
    top: 70,
    color: "rgba(190,190,190,0.1)",
    scrollStart: 0,
  },
  {
    id: 4,
    width: 130,
    height: 160,
    left: 85,
    top: 20,
    color: "rgba(170,170,170,0.13)",
    scrollStart: 0,
  },
  {
    id: 21,
    width: 125,
    height: 155,
    left: 45,
    top: 5,
    color: "rgba(195,195,195,0.14)",
    scrollStart: 0,
  },
  {
    id: 22,
    width: 115,
    height: 165,
    left: 55,
    top: 80,
    color: "rgba(185,185,185,0.11)",
    scrollStart: 0,
  },
  // Appear on scroll
  {
    id: 9,
    width: 150,
    height: 190,
    left: 15,
    top: 150,
    color: "rgba(195,195,195,0.14)",
    scrollStart: 500,
  },
  {
    id: 10,
    width: 115,
    height: 155,
    left: 70,
    top: 200,
    color: "rgba(175,175,175,0.11)",
    scrollStart: 800,
  },
  {
    id: 11,
    width: 125,
    height: 175,
    left: 30,
    top: 250,
    color: "rgba(185,185,185,0.12)",
    scrollStart: 1100,
  },
  {
    id: 12,
    width: 135,
    height: 165,
    left: 80,
    top: 180,
    color: "rgba(165,165,165,0.13)",
    scrollStart: 1400,
  },
  {
    id: 23,
    width: 120,
    height: 150,
    left: 50,
    top: 170,
    color: "rgba(190,190,190,0.12)",
    scrollStart: 650,
  },
  {
    id: 24,
    width: 130,
    height: 160,
    left: 40,
    top: 220,
    color: "rgba(180,180,180,0.13)",
    scrollStart: 950,
  },
  {
    id: 25,
    width: 110,
    height: 145,
    left: 60,
    top: 240,
    color: "rgba(175,175,175,0.11)",
    scrollStart: 1250,
  },
  // Extended scroll
  {
    id: 13,
    width: 120,
    height: 180,
    left: 25,
    top: 300,
    color: "rgba(190,190,190,0.11)",
    scrollStart: 1700,
  },
  {
    id: 14,
    width: 140,
    height: 160,
    left: 65,
    top: 350,
    color: "rgba(180,180,180,0.12)",
    scrollStart: 2000,
  },
  {
    id: 26,
    width: 125,
    height: 170,
    left: 35,
    top: 320,
    color: "rgba(185,185,185,0.12)",
    scrollStart: 1850,
  },
  {
    id: 27,
    width: 135,
    height: 155,
    left: 75,
    top: 380,
    color: "rgba(195,195,195,0.13)",
    scrollStart: 2300,
  },
  {
    id: 28,
    width: 115,
    height: 165,
    left: 50,
    top: 420,
    color: "rgba(170,170,170,0.11)",
    scrollStart: 2600,
  },
];

const LAYER2 = [
  // Initial viewport rectangles
  {
    id: 5,
    width: 160,
    height: 220,
    left: 15,
    top: 40,
    color: "rgba(160,160,160,0.08)",
    scrollStart: 0,
  },
  {
    id: 6,
    width: 115,
    height: 150,
    left: 70,
    top: 10,
    color: "rgba(150,150,150,0.09)",
    scrollStart: 0,
  },
  {
    id: 7,
    width: 125,
    height: 165,
    left: 25,
    top: 55,
    color: "rgba(140,140,140,0.07)",
    scrollStart: 0,
  },
  {
    id: 8,
    width: 105,
    height: 135,
    left: 80,
    top: 75,
    color: "rgba(130,130,130,0.1)",
    scrollStart: 0,
  },
  {
    id: 29,
    width: 130,
    height: 170,
    left: 50,
    top: 25,
    color: "rgba(155,155,155,0.08)",
    scrollStart: 0,
  },
  {
    id: 30,
    width: 120,
    height: 155,
    left: 40,
    top: 65,
    color: "rgba(145,145,145,0.09)",
    scrollStart: 0,
  },
  // Appear on scroll
  {
    id: 15,
    width: 145,
    height: 205,
    left: 20,
    top: 160,
    color: "rgba(155,155,155,0.09)",
    scrollStart: 600,
  },
  {
    id: 16,
    width: 130,
    height: 170,
    left: 75,
    top: 210,
    color: "rgba(145,145,145,0.08)",
    scrollStart: 900,
  },
  {
    id: 17,
    width: 110,
    height: 145,
    left: 35,
    top: 260,
    color: "rgba(135,135,135,0.07)",
    scrollStart: 1200,
  },
  {
    id: 18,
    width: 120,
    height: 160,
    left: 85,
    top: 190,
    color: "rgba(125,125,125,0.09)",
    scrollStart: 1500,
  },
  {
    id: 31,
    width: 135,
    height: 175,
    left: 55,
    top: 180,
    color: "rgba(150,150,150,0.08)",
    scrollStart: 750,
  },
  {
    id: 32,
    width: 125,
    height: 165,
    left: 45,
    top: 230,
    color: "rgba(140,140,140,0.09)",
    scrollStart: 1050,
  },
  {
    id: 33,
    width: 115,
    height: 150,
    left: 65,
    top: 250,
    color: "rgba(130,130,130,0.08)",
    scrollStart: 1350,
  },
  // Extended scroll
  {
    id: 19,
    width: 135,
    height: 185,
    left: 30,
    top: 310,
    color: "rgba(150,150,150,0.08)",
    scrollStart: 1800,
  },
  {
    id: 20,
    width: 125,
    height: 155,
    left: 70,
    top: 360,
    color: "rgba(140,140,140,0.09)",
    scrollStart: 2100,
  },
  {
    id: 34,
    width: 140,
    height: 180,
    left: 25,
    top: 330,
    color: "rgba(155,155,155,0.08)",
    scrollStart: 1950,
  },
  {
    id: 35,
    width: 130,
    height: 170,
    left: 60,
    top: 390,
    color: "rgba(145,145,145,0.09)",
    scrollStart: 2400,
  },
  {
    id: 36,
    width: 120,
    height: 160,
    left: 80,
    top: 430,
    color: "rgba(135,135,135,0.07)",
    scrollStart: 2700,
  },
];

function ParallaxRectangles() {
  const containerRef = useRef(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const layer1Refs = useRef([]);
  const layer2Refs = useRef([]);

  // Random image assignment happens once per mount (runtime), image list is compile-time
  const rectangles = useRef({
    layer1: withRandomImages(BASE_LAYER1),
    layer2: LAYER2,
  });

  useGSAP(() => {
    const ctx = gsap.context(() => {
      const handleMouseMove = (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;
        mousePosition.current = { x, y };
      };

      window.addEventListener("mousemove", handleMouseMove);

      // On touch devices there's no cursor, so drive the same parallax off
      // the phone's tilt instead. The first reading is treated as "center"
      // (rather than an absolute angle) since a comfortable holding angle
      // varies a lot from person to person.
      let orientationBaseline = null;
      const handleOrientation = (e) => {
        if (e.beta == null || e.gamma == null) return;
        if (!orientationBaseline) {
          orientationBaseline = { beta: e.beta, gamma: e.gamma };
        }
        const TILT_RANGE = 22; // degrees of tilt that reach the full -1..1 range
        const x = Math.max(
          -1,
          Math.min(1, (e.gamma - orientationBaseline.gamma) / TILT_RANGE),
        );
        const y = Math.max(
          -1,
          Math.min(1, (e.beta - orientationBaseline.beta) / TILT_RANGE),
        );
        mousePosition.current = { x, y };
      };

      const startOrientation = () =>
        window.addEventListener("deviceorientation", handleOrientation);

      const requestOrientationPermission = () => {
        window.removeEventListener("touchend", requestOrientationPermission);
        window.DeviceOrientationEvent.requestPermission()
          .then((state) => {
            if (state === "granted") startOrientation();
          })
          .catch(() => {});
      };

      if (typeof window.DeviceOrientationEvent?.requestPermission === "function") {
        // iOS 13+ only grants motion access after a user gesture.
        window.addEventListener("touchend", requestOrientationPermission, {
          once: true,
        });
      } else if (typeof window.DeviceOrientationEvent !== "undefined") {
        startOrientation();
      }

      // Entrance: rectangles/images visible at load "assemble" into place —
      // scaling up, sharpening from a blur, and converging in from just off
      // their resting spot. Staggered by distance from center so the effect
      // blooms outward, in sync with the Hero title's stagger-in.
      const entranceTargets = [
        ...rectangles.current.layer1.map((rect, i) => ({
          el: layer1Refs.current[i],
          rect,
          layerDelay: 0.05,
        })),
        ...rectangles.current.layer2.map((rect, i) => ({
          el: layer2Refs.current[i],
          rect,
          layerDelay: 0,
        })),
      ];

      entranceTargets.forEach(({ el, rect, layerDelay }) => {
        if (!el || rect.scrollStart !== 0) return;

        const dx = rect.left - 50;
        const dy = rect.top - 50;
        const dist = Math.hypot(dx, dy) || 1;
        const nx = dx / dist;
        const ny = dy / dist;

        gsap.fromTo(
          el,
          {
            scale: 0.7,
            xPercent: -nx * 55,
            yPercent: -ny * 55,
            filter: "blur(14px)",
          },
          {
            scale: 1,
            xPercent: 0,
            yPercent: 0,
            filter: "blur(0px)",
            duration: 0.7,
            ease: "power3.out",
            delay: 0.2 + dist * 0.006 + layerDelay,
          },
        );
      });

      const updateAnimation = () => {
        const scrollY = window.scrollY;

        layer1Refs.current.forEach((el, index) => {
          if (!el) return;
          const rect = rectangles.current.layer1[index];
          const scrollOffset = (scrollY - rect.scrollStart) * -0.3;
          const mouseOffsetX = mousePosition.current.x * -20;
          const mouseOffsetY = mousePosition.current.y * -20;
          gsap.to(el, {
            x: mouseOffsetX,
            y: mouseOffsetY + scrollOffset,
            autoAlpha: scrollY >= rect.scrollStart - 200 ? 1 : 0,
            duration: 0.3,
            ease: "power2.out",
            overwrite: "auto",
          });
        });

        layer2Refs.current.forEach((el, index) => {
          if (!el) return;
          const rect = rectangles.current.layer2[index];
          const scrollOffset = (scrollY - rect.scrollStart) * -0.5;
          const mouseOffsetX = mousePosition.current.x * -35;
          const mouseOffsetY = mousePosition.current.y * -35;
          gsap.to(el, {
            x: mouseOffsetX,
            y: mouseOffsetY + scrollOffset,
            autoAlpha: scrollY >= rect.scrollStart - 200 ? 1 : 0,
            duration: 0.3,
            ease: "power2.out",
            overwrite: "auto",
          });
        });
      };

      gsap.ticker.add(updateAnimation);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("deviceorientation", handleOrientation);
        window.removeEventListener("touchend", requestOrientationPermission);
        gsap.ticker.remove(updateAnimation);
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      id="parallax-rectangles"
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
    >
      {/* Layer 1 - Closest to user */}
      <div className="absolute inset-0">
        {rectangles.current.layer1.map((rect, index) => (
          <div
            key={rect.id}
            ref={(el) => (layer1Refs.current[index] = el)}
            className="absolute will-change-transform"
            style={{
              width: responsiveSize(rect.width),
              height: responsiveSize(rect.height),
              left: `${rect.left}%`,
              top: `${rect.top}%`,
              backgroundColor: rect.image ? "transparent" : rect.color,
              borderRadius: "4px",
              opacity: 0,
              overflow: "hidden",
            }}
          >
            {rect.image && (
              <img
                src={rect.image}
                alt=""
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  display: "block",
                  opacity: 0.7,
                }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Layer 2 - Faster parallax (further back) */}
      <div className="absolute inset-0">
        {rectangles.current.layer2.map((rect, index) => (
          <div
            key={rect.id}
            ref={(el) => (layer2Refs.current[index] = el)}
            className="absolute will-change-transform"
            style={{
              width: responsiveSize(rect.width),
              height: responsiveSize(rect.height),
              left: `${rect.left}%`,
              top: `${rect.top}%`,
              backgroundColor: rect.color,
              borderRadius: "4px",
              opacity: 0,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default ParallaxRectangles;

// Made with Bob
