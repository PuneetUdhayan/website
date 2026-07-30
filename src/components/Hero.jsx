import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import ParallaxRectangles from "./ParallaxRectangles";
import HorizontalGallery from "./HorizontalGallery";

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

  return (
    <>
      <ParallaxRectangles />
      <div
        className="h-screen flex justify-center items-center relative"
        style={{ zIndex: 1 }}
      >
        <div className="flex flex-col items-center">
          <h1 ref={heroTextRef} className="font-main text-6xl">
            I am Puneet Udhayan. I am
          </h1>
          <div
            ref={titleContainerRef}
            className="relative h-20 overflow-hidden"
          >
            {heroAnimationComplete && (
              <h1 className="title-text font-main text-6xl whitespace-nowrap">
                {titles[currentTitleIndex]}
              </h1>
            )}
          </div>
        </div>
      </div>

      {/* <HorizontalGallery /> */}
    </>
  );
}

export default Hero;

// Made with Bob
