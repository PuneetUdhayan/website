import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

function HorizontalGallery() {
  const containerRef = useRef(null);

  // Gallery items data
  const galleryItems = [
    {
      id: 1,
      title: "Project Alpha",
      description:
        "A revolutionary web application built with React and Node.js",
      color: "bg-gradient-to-br from-blue-500 to-purple-600",
      link: "#project-alpha",
    },
    {
      id: 2,
      title: "Design System",
      description: "Comprehensive UI component library for modern applications",
      color: "bg-gradient-to-br from-green-500 to-teal-600",
      link: "#design-system",
    },
    {
      id: 3,
      title: "Mobile App",
      description: "Cross-platform mobile experience with React Native",
      color: "bg-gradient-to-br from-orange-500 to-red-600",
      link: "#mobile-app",
    },
    {
      id: 4,
      title: "AI Integration",
      description:
        "Machine learning powered features for enhanced user experience",
      color: "bg-gradient-to-br from-pink-500 to-rose-600",
      link: "#ai-integration",
    },
    {
      id: 5,
      title: "Cloud Platform",
      description: "Scalable infrastructure for enterprise solutions",
      color: "bg-gradient-to-br from-indigo-500 to-blue-600",
      link: "#cloud-platform",
    },
  ];

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        const items = containerRef.current.querySelectorAll(".gallery-item");
        const totalItems = items.length;

        // Create scroll trigger for the entire section
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${window.innerHeight * totalItems * 1.5}`,
          pin: true,
          anticipatePin: 1,
          scrub: 1,
        });

        // Set initial states for all items
        items.forEach((item) => {
          const imageDiv = item.querySelector(".gallery-image");
          const textDiv = item.querySelector(".gallery-text");
          const buttonDiv = item.querySelector(".gallery-button");

          // All items start off-screen to the right and small
          gsap.set(imageDiv, { x: window.innerWidth, scale: 0.3 });
          gsap.set(textDiv, { opacity: 0, y: 20 });
          gsap.set(buttonDiv, { opacity: 0, y: 20 });
        });

        // Animate each item
        items.forEach((item, index) => {
          const imageDiv = item.querySelector(".gallery-image");
          const textDiv = item.querySelector(".gallery-text");
          const buttonDiv = item.querySelector(".gallery-button");

          // Calculate scroll progress for this item
          const startProgress = index / totalItems;
          const endProgress = (index + 1) / totalItems;

          // Animate based on scroll progress
          ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top top",
            end: () => `+=${window.innerHeight * totalItems * 1.5}`,
            scrub: 1,
            onUpdate: (self) => {
              const progress = self.progress;
              const itemProgress =
                (progress - startProgress) / (endProgress - startProgress);

              // Only animate when this item is in its range
              if (progress >= startProgress && progress <= endProgress) {
                // Normalize progress for this item (0 to 1)
                const normalizedProgress = Math.max(
                  0,
                  Math.min(1, itemProgress)
                );

                // Phase 1: Enter from right (0 to 0.15) - slide in from right to center and scale up
                if (normalizedProgress <= 0.15) {
                  const phase1Progress = normalizedProgress / 0.15;
                  // Apply easing for smoother animation
                  const easedProgress =
                    gsap.parseEase("power2.out")(phase1Progress);
                  const xPos =
                    window.innerWidth - window.innerWidth * easedProgress;
                  gsap.set(imageDiv, {
                    x: xPos,
                    scale: 0.3 + 0.7 * easedProgress,
                  });
                  gsap.set(textDiv, { opacity: 0, y: 20 });
                  gsap.set(buttonDiv, { opacity: 0, y: 20 });
                }
                // Phase 2: Text appear (0.15 to 0.35) - stay in position, show text
                else if (normalizedProgress <= 0.35) {
                  const phase2Progress = (normalizedProgress - 0.15) / 0.2;
                  const easedProgress =
                    gsap.parseEase("power2.out")(phase2Progress);
                  gsap.set(imageDiv, { x: 0, scale: 1 });
                  gsap.set(textDiv, {
                    opacity: easedProgress,
                    y: 20 - 20 * easedProgress,
                  });
                  gsap.set(buttonDiv, { opacity: 0, y: 20 });
                }
                // Phase 2.5: Button appear (0.35 to 0.45) - show button after text
                else if (normalizedProgress <= 0.45) {
                  const phase25Progress = (normalizedProgress - 0.35) / 0.1;
                  const easedProgress =
                    gsap.parseEase("power2.out")(phase25Progress);
                  gsap.set(imageDiv, { x: 0, scale: 1 });
                  gsap.set(textDiv, { opacity: 1, y: 0 });
                  gsap.set(buttonDiv, {
                    opacity: easedProgress,
                    y: 20 - 20 * easedProgress,
                  });
                }
                // Phase 3: Wait with text and button visible (0.45 to 0.7)
                else if (normalizedProgress <= 0.7) {
                  gsap.set(imageDiv, { x: 0, scale: 1 });
                  gsap.set(textDiv, { opacity: 1, y: 0 });
                  gsap.set(buttonDiv, { opacity: 1, y: 0 });
                }
                // Phase 4: Text and button fade out (0.7 to 0.85)
                else if (normalizedProgress <= 0.85) {
                  const phase4Progress = (normalizedProgress - 0.7) / 0.15;
                  const easedProgress =
                    gsap.parseEase("power2.in")(phase4Progress);
                  gsap.set(imageDiv, { x: 0, scale: 1 });
                  gsap.set(textDiv, {
                    opacity: 1 - easedProgress,
                    y: -20 * easedProgress,
                  });
                  gsap.set(buttonDiv, {
                    opacity: 1 - easedProgress,
                    y: -20 * easedProgress,
                  });
                }
                // Phase 5: Exit to left (0.85 to 1) - shrink and move left
                else {
                  const phase5Progress = (normalizedProgress - 0.85) / 0.15;
                  // Apply easing for smoother exit
                  const easedProgress =
                    gsap.parseEase("power2.in")(phase5Progress);
                  const xPos = -window.innerWidth * easedProgress;
                  gsap.set(imageDiv, {
                    x: xPos,
                    scale: 1 - 0.7 * easedProgress,
                  });
                  gsap.set(textDiv, { opacity: 0, y: -20 });
                  gsap.set(buttonDiv, { opacity: 0, y: -20 });
                }
              } else if (progress < startProgress) {
                // Before this item's range - off-screen right and small
                gsap.set(imageDiv, { x: window.innerWidth, scale: 0.3 });
                gsap.set(textDiv, { opacity: 0, y: 20 });
                gsap.set(buttonDiv, { opacity: 0, y: 20 });
              } else {
                // After this item's range - off-screen left and small
                gsap.set(imageDiv, { x: -window.innerWidth, scale: 0.3 });
                gsap.set(textDiv, { opacity: 0, y: -20 });
                gsap.set(buttonDiv, { opacity: 0, y: -20 });
              }
            },
          });
        });
      }, containerRef);

      return () => ctx.revert();
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="h-screen overflow-hidden relative"
      style={{ zIndex: 10 }}
    >
      {galleryItems.map((item) => (
        <div
          key={item.id}
          className="gallery-item absolute inset-0 flex items-center justify-center"
        >
          <div className="relative flex items-center gap-12">
            <div
              className={`gallery-image ${item.color} w-[500px] h-[500px] flex items-center justify-center`}
            >
              <div className="text-black text-9xl font-bold opacity-30">
                {item.id}
              </div>
            </div>
            <div className="gallery-text w-[400px] opacity-0">
              <h2 className="font-main text-4xl mb-3 black-white">
                {item.title}
              </h2>
              <p className="font-main text-gray-400 text-xl mb-6">
                {item.description}
              </p>
              {/* <div className="gallery-button opacity-0 pointer-events-auto">
                <a
                  href={item.link}
                  className="group relative inline-flex items-center gap-3 px-8 py-4 border-2 border-cyan-400 text-cyan-400 font-inter font-semibold text-sm tracking-wider uppercase overflow-hidden transition-colors duration-500 hover:text-white cursor-pointer"
                  style={{ isolation: "isolate" }}
                >
                  <span
                    className="absolute inset-0 bg-black -translate-x-full transition-transform duration-500 ease-out group-hover:translate-x-0"
                    style={{ zIndex: -1 }}
                  />
                  <span className="relative z-10 transition-transform duration-500 group-hover:translate-x-1">
                    Learn More
                  </span>
                  <svg
                    className="relative z-10 w-4 h-4 transition-transform duration-500 group-hover:translate-x-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </a>
              </div> */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default HorizontalGallery;

// Made with Bob
