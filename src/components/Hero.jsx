import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import ParallaxRectangles from "./ParallaxRectangles";
import HorizontalGallery from "./HorizontalGallery";
import { getLenis } from "../hooks/useLenis";

function Hero() {
  const titles = ["a software engineer", "an artist"];
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [heroAnimationComplete, setHeroAnimationComplete] = useState(false);
  const titleContainerRef = useRef(null);
  const heroTextRef = useRef(null);

  // Subtle award-worthy entry animation for hero text
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split text into individual characters for staggered animation
      const text = heroTextRef.current;
      const chars = text.textContent.split("");
      text.innerHTML = chars
        .map(
          (char) =>
            `<span class="inline-block" style="opacity: 0;">${
              char === " " ? "&nbsp;" : char
            }</span>`,
        )
        .join("");

      const charElements = text.querySelectorAll("span");

      // Create subtle sophisticated staggered animation
      gsap.fromTo(
        charElements,
        {
          y: 20,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: {
            amount: 0.5,
            from: "start",
          },
          delay: 0.2,
          onComplete: () => {
            // Signal that hero animation is complete
            setHeroAnimationComplete(true);
          },
        },
      );
    }, heroTextRef);

    return () => ctx.revert();
  }, []);

  // Rotating titles animation - starts after hero text animation
  useEffect(() => {
    if (!heroAnimationComplete) return;

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        repeat: -1,
        repeatDelay: 0,
      });

      // Initial animation - fade in first title from bottom
      timeline
        .fromTo(
          ".title-text",
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
        )
        .to({}, { duration: 2 }) // Hold for 2 seconds
        .to(".title-text", {
          y: -50,
          opacity: 0,
          duration: 0.5,
          ease: "power2.in",
          onComplete: () => {
            setCurrentTitleIndex(
              (prevIndex) => (prevIndex + 1) % titles.length,
            );
          },
        });
    }, titleContainerRef);

    return () => ctx.revert();
  }, [currentTitleIndex, titles.length, heroAnimationComplete]);

  const handleScrollClick = () => {
    const lenis = getLenis();
    const offset = window.innerHeight;
    if (lenis) {
      lenis.scrollTo(offset, { duration: 1.5 });
    } else {
      window.scrollTo({ top: offset, behavior: "smooth" });
    }
  };

  return (
    <>
      <ParallaxRectangles />
      <div
        className="h-screen flex justify-center items-center relative"
        style={{ zIndex: 1 }}
      >
        <div className="flex flex-col items-center px-4 text-center">
          <h1
            ref={heroTextRef}
            className="font-main text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
          >
            I am Puneet Udhayan. I am
          </h1>
          <div
            ref={titleContainerRef}
            className="relative h-10 sm:h-14 md:h-16 lg:h-20 overflow-hidden"
          >
            {heroAnimationComplete && (
              <h1 className="title-text font-main text-3xl sm:text-4xl md:text-5xl lg:text-6xl whitespace-nowrap">
                {titles[currentTitleIndex]}
              </h1>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={handleScrollClick}
          aria-label="Scroll down"
          className={`absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 font-inter text-[9px] tracking-[0.2em] text-black/35 cursor-pointer transition-opacity duration-700 ${
            heroAnimationComplete ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-black/20">
            <svg
              className="h-4 w-4 animate-bounce"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m-6-6l6 6 6-6"
              />
            </svg>
          </span>
          SCROLL
        </button>
      </div>

      {/* <HorizontalGallery /> */}
    </>
  );
}

export default Hero;

// Made with Bob
