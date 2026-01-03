import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

function ParallaxRectangles() {
  const containerRef = useRef(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const layer1Refs = useRef([]);
  const layer2Refs = useRef([]);

  // Generate more rectangles distributed across different scroll positions
  const rectangles = useRef({
    layer1: [
      // Initial viewport rectangles
      {
        id: 1,
        width: 140,
        height: 200,
        left: 10,
        top: 15,
        color: "rgba(200, 200, 200, 0.15)",
        scrollStart: 0,
      },
      {
        id: 2,
        width: 120,
        height: 170,
        left: 75,
        top: 60,
        color: "rgba(180, 180, 180, 0.12)",
        scrollStart: 0,
      },
      {
        id: 3,
        width: 110,
        height: 140,
        left: 20,
        top: 70,
        color: "rgba(190, 190, 190, 0.1)",
        scrollStart: 0,
      },
      {
        id: 4,
        width: 130,
        height: 160,
        left: 85,
        top: 20,
        color: "rgba(170, 170, 170, 0.13)",
        scrollStart: 0,
      },
      {
        id: 21,
        width: 125,
        height: 155,
        left: 45,
        top: 5,
        color: "rgba(195, 195, 195, 0.14)",
        scrollStart: 0,
      },
      {
        id: 22,
        width: 115,
        height: 165,
        left: 55,
        top: 80,
        color: "rgba(185, 185, 185, 0.11)",
        scrollStart: 0,
      },

      // Rectangles that appear on scroll (positioned below viewport)
      {
        id: 9,
        width: 150,
        height: 190,
        left: 15,
        top: 120,
        color: "rgba(195, 195, 195, 0.14)",
        scrollStart: 300,
      },
      {
        id: 10,
        width: 115,
        height: 155,
        left: 70,
        top: 140,
        color: "rgba(175, 175, 175, 0.11)",
        scrollStart: 400,
      },
      {
        id: 11,
        width: 125,
        height: 175,
        left: 30,
        top: 160,
        color: "rgba(185, 185, 185, 0.12)",
        scrollStart: 500,
      },
      {
        id: 12,
        width: 135,
        height: 165,
        left: 80,
        top: 130,
        color: "rgba(165, 165, 165, 0.13)",
        scrollStart: 600,
      },
      {
        id: 23,
        width: 120,
        height: 150,
        left: 50,
        top: 125,
        color: "rgba(190, 190, 190, 0.12)",
        scrollStart: 350,
      },
      {
        id: 24,
        width: 130,
        height: 160,
        left: 40,
        top: 145,
        color: "rgba(180, 180, 180, 0.13)",
        scrollStart: 450,
      },
      {
        id: 25,
        width: 110,
        height: 145,
        left: 60,
        top: 155,
        color: "rgba(175, 175, 175, 0.11)",
        scrollStart: 550,
      },

      // More rectangles for extended scrolling
      {
        id: 13,
        width: 120,
        height: 180,
        left: 25,
        top: 180,
        color: "rgba(190, 190, 190, 0.11)",
        scrollStart: 800,
      },
      {
        id: 14,
        width: 140,
        height: 160,
        left: 65,
        top: 200,
        color: "rgba(180, 180, 180, 0.12)",
        scrollStart: 900,
      },
      {
        id: 26,
        width: 125,
        height: 170,
        left: 35,
        top: 190,
        color: "rgba(185, 185, 185, 0.12)",
        scrollStart: 850,
      },
      {
        id: 27,
        width: 135,
        height: 155,
        left: 75,
        top: 210,
        color: "rgba(195, 195, 195, 0.13)",
        scrollStart: 950,
      },
      {
        id: 28,
        width: 115,
        height: 165,
        left: 50,
        top: 220,
        color: "rgba(170, 170, 170, 0.11)",
        scrollStart: 1050,
      },
    ],
    layer2: [
      // Initial viewport rectangles
      {
        id: 5,
        width: 160,
        height: 220,
        left: 15,
        top: 40,
        color: "rgba(160, 160, 160, 0.08)",
        scrollStart: 0,
      },
      {
        id: 6,
        width: 115,
        height: 150,
        left: 70,
        top: 10,
        color: "rgba(150, 150, 150, 0.09)",
        scrollStart: 0,
      },
      {
        id: 7,
        width: 125,
        height: 165,
        left: 25,
        top: 55,
        color: "rgba(140, 140, 140, 0.07)",
        scrollStart: 0,
      },
      {
        id: 8,
        width: 105,
        height: 135,
        left: 80,
        top: 75,
        color: "rgba(130, 130, 130, 0.1)",
        scrollStart: 0,
      },
      {
        id: 29,
        width: 130,
        height: 170,
        left: 50,
        top: 25,
        color: "rgba(155, 155, 155, 0.08)",
        scrollStart: 0,
      },
      {
        id: 30,
        width: 120,
        height: 155,
        left: 40,
        top: 65,
        color: "rgba(145, 145, 145, 0.09)",
        scrollStart: 0,
      },

      // Rectangles that appear on scroll
      {
        id: 15,
        width: 145,
        height: 205,
        left: 20,
        top: 130,
        color: "rgba(155, 155, 155, 0.09)",
        scrollStart: 350,
      },
      {
        id: 16,
        width: 130,
        height: 170,
        left: 75,
        top: 150,
        color: "rgba(145, 145, 145, 0.08)",
        scrollStart: 450,
      },
      {
        id: 17,
        width: 110,
        height: 145,
        left: 35,
        top: 170,
        color: "rgba(135, 135, 135, 0.07)",
        scrollStart: 550,
      },
      {
        id: 18,
        width: 120,
        height: 160,
        left: 85,
        top: 140,
        color: "rgba(125, 125, 125, 0.09)",
        scrollStart: 650,
      },
      {
        id: 31,
        width: 135,
        height: 175,
        left: 55,
        top: 135,
        color: "rgba(150, 150, 150, 0.08)",
        scrollStart: 400,
      },
      {
        id: 32,
        width: 125,
        height: 165,
        left: 45,
        top: 155,
        color: "rgba(140, 140, 140, 0.09)",
        scrollStart: 500,
      },
      {
        id: 33,
        width: 115,
        height: 150,
        left: 65,
        top: 165,
        color: "rgba(130, 130, 130, 0.08)",
        scrollStart: 600,
      },

      // More rectangles for extended scrolling
      {
        id: 19,
        width: 135,
        height: 185,
        left: 30,
        top: 190,
        color: "rgba(150, 150, 150, 0.08)",
        scrollStart: 850,
      },
      {
        id: 20,
        width: 125,
        height: 155,
        left: 70,
        top: 210,
        color: "rgba(140, 140, 140, 0.09)",
        scrollStart: 950,
      },
      {
        id: 34,
        width: 140,
        height: 180,
        left: 25,
        top: 200,
        color: "rgba(155, 155, 155, 0.08)",
        scrollStart: 900,
      },
      {
        id: 35,
        width: 130,
        height: 170,
        left: 60,
        top: 220,
        color: "rgba(145, 145, 145, 0.09)",
        scrollStart: 1000,
      },
      {
        id: 36,
        width: 120,
        height: 160,
        left: 80,
        top: 230,
        color: "rgba(135, 135, 135, 0.07)",
        scrollStart: 1100,
      },
    ],
  });

  // GSAP animations setup
  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Mouse movement handler
      const handleMouseMove = (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;
        mousePosition.current = { x, y };
      };

      window.addEventListener("mousemove", handleMouseMove);

      // Single ticker for all animations
      const updateAnimation = () => {
        const scrollY = window.scrollY;

        // Update layer 1 rectangles
        layer1Refs.current.forEach((el, index) => {
          if (!el) return;

          const rect = rectangles.current.layer1[index];
          const mouseOffsetMultiplier = -20;
          const scrollMultiplier = -0.3;

          // Calculate positions
          const scrollOffset = (scrollY - rect.scrollStart) * scrollMultiplier;
          const mouseOffsetX = mousePosition.current.x * mouseOffsetMultiplier;
          const mouseOffsetY = mousePosition.current.y * mouseOffsetMultiplier;

          // Show/hide based on scroll position
          const shouldShow = scrollY >= rect.scrollStart - 200;

          // Apply transforms with GSAP for smooth interpolation
          gsap.to(el, {
            x: mouseOffsetX,
            y: mouseOffsetY + scrollOffset,
            autoAlpha: shouldShow ? 1 : 0,
            duration: 0.3,
            ease: "power2.out",
            overwrite: "auto",
          });
        });

        // Update layer 2 rectangles
        layer2Refs.current.forEach((el, index) => {
          if (!el) return;

          const rect = rectangles.current.layer2[index];
          const mouseOffsetMultiplier = -35;
          const scrollMultiplier = -0.5;

          // Calculate positions
          const scrollOffset = (scrollY - rect.scrollStart) * scrollMultiplier;
          const mouseOffsetX = mousePosition.current.x * mouseOffsetMultiplier;
          const mouseOffsetY = mousePosition.current.y * mouseOffsetMultiplier;

          // Show/hide based on scroll position
          const shouldShow = scrollY >= rect.scrollStart - 200;

          // Apply transforms with GSAP for smooth interpolation
          gsap.to(el, {
            x: mouseOffsetX,
            y: mouseOffsetY + scrollOffset,
            autoAlpha: shouldShow ? 1 : 0,
            duration: 0.3,
            ease: "power2.out",
            overwrite: "auto",
          });
        });
      };

      // Add single ticker
      gsap.ticker.add(updateAnimation);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        gsap.ticker.remove(updateAnimation);
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
    >
      {/* Layer 1 - Slower parallax */}
      <div className="absolute inset-0">
        {rectangles.current.layer1.map((rect, index) => (
          <div
            key={rect.id}
            ref={(el) => (layer1Refs.current[index] = el)}
            className="absolute will-change-transform"
            style={{
              width: `${rect.width}px`,
              height: `${rect.height}px`,
              left: `${rect.left}%`,
              top: `${rect.top}%`,
              backgroundColor: rect.color,
              borderRadius: "4px",
              opacity: 0,
            }}
          />
        ))}
      </div>

      {/* Layer 2 - Faster parallax */}
      <div className="absolute inset-0">
        {rectangles.current.layer2.map((rect, index) => (
          <div
            key={rect.id}
            ref={(el) => (layer2Refs.current[index] = el)}
            className="absolute will-change-transform"
            style={{
              width: `${rect.width}px`,
              height: `${rect.height}px`,
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
