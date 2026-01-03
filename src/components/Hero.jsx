import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import ParallaxRectangles from "./ParallaxRectangles";

function Hero() {
  const titles = ["a computer engineer", "an artist"];
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const titleContainerRef = useRef(null);

  useEffect(() => {
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
          { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
        )
        .to({}, { duration: 2 }) // Hold for 2 seconds
        .to(".title-text", {
          y: -50,
          opacity: 0,
          duration: 0.5,
          ease: "power2.in",
          onComplete: () => {
            setCurrentTitleIndex(
              (prevIndex) => (prevIndex + 1) % titles.length
            );
          },
        });
    }, titleContainerRef);

    return () => ctx.revert();
  }, [currentTitleIndex, titles.length]);

  return (
    <>
      <ParallaxRectangles />
      <div
        className="h-screen flex justify-center items-center relative"
        style={{ zIndex: 1 }}
      >
        <div className="flex flex-col items-center">
          <h1 className="font-main text-6xl">I am Puneet Udhayan. I am</h1>
          <div
            ref={titleContainerRef}
            className="relative h-20 overflow-hidden"
          >
            <h1 className="title-text font-main text-6xl whitespace-nowrap">
              {titles[currentTitleIndex]}
            </h1>
          </div>
        </div>
      </div>

      <div className="h-screen">
        <h1 className="font-main text-6xl">Here is what I am upto</h1>
      </div>
      <div className="h-screen bg-red">
        <h1 className="font-main text-6xl">Contact me</h1>
      </div>
    </>
  );
}

export default Hero;
