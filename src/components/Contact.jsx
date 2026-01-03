import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

function Contact() {
  const bgRef = useRef(null);
  const containerRef = useRef(null);
  const cardRef = useRef(null);

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        // Set initial state - small rectangle off-screen below
        gsap.set(bgRef.current, {
          width: 135,
          height: 175,
          left: "50%",
          top: "150%",
          xPercent: -50,
          yPercent: -50,
        });

        // Hide contact card initially
        gsap.set(cardRef.current, {
          opacity: 0,
          y: 20,
        });

        // Pin the section during animation
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${window.innerHeight * 2}`,
          pin: true,
          anticipatePin: 1,
          scrub: 1,
        });

        // Animate based on scroll progress with phases
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${window.innerHeight * 2}`,
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;

            // Phase 1: Move small div to center (0 to 0.3)
            if (progress <= 0.3) {
              const phase1Progress = progress / 0.3;
              const easedProgress =
                gsap.parseEase("power2.out")(phase1Progress);
              const topPos = 150 - 100 * easedProgress; // Move from 150% to 50%

              gsap.set(bgRef.current, {
                width: 135,
                height: 175,
                left: "50%",
                top: `${topPos}%`,
                xPercent: -50,
                yPercent: -50,
              });
              gsap.set(cardRef.current, { opacity: 0, y: 20 });
            }
            // Phase 2: Expand the div (0.3 to 0.7)
            else if (progress <= 0.7) {
              const phase2Progress = (progress - 0.3) / 0.4;
              const easedProgress =
                gsap.parseEase("power1.inOut")(phase2Progress);

              // Calculate dimensions
              const startWidth = 135;
              const endWidth = window.innerWidth - 320; // 20rem = 320px
              const startHeight = 175;
              const endHeight = window.innerHeight - 320;

              const currentWidth =
                startWidth + (endWidth - startWidth) * easedProgress;
              const currentHeight =
                startHeight + (endHeight - startHeight) * easedProgress;

              gsap.set(bgRef.current, {
                width: currentWidth,
                height: currentHeight,
                left: "50%",
                top: "50%",
                xPercent: -50,
                yPercent: -50,
              });
              gsap.set(cardRef.current, { opacity: 0, y: 20 });
            }
            // Phase 3: Fade in contact card (0.7 to 1)
            else {
              const phase3Progress = (progress - 0.7) / 0.3;
              const easedProgress =
                gsap.parseEase("power2.out")(phase3Progress);

              gsap.set(bgRef.current, {
                width: "calc(100% - 20rem)",
                height: "calc(100% - 20rem)",
                left: "50%",
                top: "50%",
                xPercent: -50,
                yPercent: -50,
              });
              gsap.set(cardRef.current, {
                opacity: easedProgress,
                y: 20 - 20 * easedProgress,
              });
            }
          },
        });
      }, containerRef);

      return () => ctx.revert();
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="h-screen relative flex items-center justify-center"
    >
      <div
        ref={bgRef}
        className="absolute pointer-events-none"
        style={{
          backgroundImage: "url('/src/assets/pondicherry.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Contact card */}
      <div
        ref={cardRef}
        className="bg-white/95 backdrop-blur-sm p-12 max-w-md relative z-10 shadow-lg"
      >
        <h1 className="font-main text-5xl mb-6">Contact me</h1>
        <p className="text-gray-600 text-lg mb-8 leading-relaxed">
          Have a question, project idea, or just want to say hello? I'd love to
          hear from you.
        </p>

        {/* Social media icons */}
        <div className="flex gap-3">
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 bg-black flex items-center justify-center text-white hover:bg-gray-800 transition-colors"
            aria-label="LinkedIn"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 bg-black flex items-center justify-center text-white hover:bg-gray-800 transition-colors"
            aria-label="Instagram"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>

          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 bg-black flex items-center justify-center text-white hover:bg-gray-800 transition-colors"
            aria-label="GitHub"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>

          <a
            href="mailto:contact@example.com"
            className="w-10 h-10 bg-black flex items-center justify-center text-white hover:bg-gray-800 transition-colors"
            aria-label="Email"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Contact;

// Made with Bob
