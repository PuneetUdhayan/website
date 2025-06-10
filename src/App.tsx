import LetterAnimation from "./letter-animation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronUpIcon, ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Pondicherry from "./assets/pondicherry.jpeg";
import "./App.css";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useBreakpoint } from "./hooks/useBreakpoint";
import { Navigation } from "./components/nav-menu";

function App() {
  const nameText = "I am Puneet Udhayan";
  const intro = "I am ";
  const options = ["a software engineer.", "an artist."];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [initialRender, setInitialRender] = useState(true);
  const [nameAnimationComplete, setNameAnimationComplete] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const currentBreakpoint = useBreakpoint();
  console.log({ currentBreakpoint });
  useEffect(() => {
    // Simulate the animation duration or a condition for completion
    const animationDuration = nameText.length * 0.03 + 0.04 * 1 + 0.5; // Roughly based on your stagger and delay
    const timer = setTimeout(() => {
      setNameAnimationComplete(true);
    }, animationDuration * 1000); // Convert to milliseconds

    return () => clearTimeout(timer); // Clean up the timer
  }, [nameText, setNameAnimationComplete]);

  useEffect(() => {
    // Simulate the animation duration or a condition for completion
    const animationDuration =
      (nameText.length + intro.length + options?.[0].length) * 0.03 +
      0.04 * 1 +
      0.5; // Roughly based on your stagger and delay
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, animationDuration * 1000); // Convert to milliseconds

    return () => clearTimeout(timer); // Clean up the timer
  }, [intro, nameText, setAnimationComplete, options]);

  const textVariants = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 },
  };

  return (
    <div
      className="
        h-screen             
        overflow-y-scroll    
        snap-y              
        snap-mandatory      
        scroll-smooth
        scrollbar-hide
      "
    >
      {/* <Navigation/> */}
      <div className="grid grid-cols-1 md:grid-cols-2 snap-start">
        <div className="h-screen flex items-center">
          <motion.div>
            <div>
              <LetterAnimation text={"I am Puneet Udhayan."} />
            </div>
            {nameAnimationComplete && !animationComplete && (
              <div>
                <LetterAnimation text={intro + options?.[0]} />
              </div>
            )}
            {animationComplete && (
              // Render as regular text after animation
              <h1 className="flex items-center text-3xl md:text-3xl lg:text-4xl xl:text-6xl font-astralaga">
                {intro}&nbsp;
                <motion.div
                  initial={{ padding: "0px", margin: "0px" }}
                  animate={{ padding: "10px", margin: "10px" }}
                  transition={{ duration: 0.5 }}
                  className="relative inline-flex items-center justify-between"
                >
                  <AnimatePresence mode="wait">
                    {/* 'wait' mode ensures the old element animates out before the new one animates in */}
                    <motion.div
                      key={selectedIndex} // IMPORTANT: The key must change when the content changes
                      variants={textVariants}
                      initial={initialRender ? "animate" : "initial"}
                      animate="animate"
                      exit="exit"
                      transition={{ duration: 0.3 }} // Customize transition duration
                      // style={{ fontWeight: 'bold', fontSize: '24px', textAlign: 'center' }}
                    >
                      {options?.[selectedIndex]}
                    </motion.div>
                  </AnimatePresence>
                  <div className="inline-flex flex-col h-full justify-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-5 md:size-8"
                      disabled={selectedIndex === 0}
                      onClick={() => {
                        setInitialRender(false);
                        if (selectedIndex > 0) {
                          setSelectedIndex((i) => i - 1);
                        }
                      }}
                    >
                      <ChevronUpIcon />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-5 md:size-8"
                      disabled={selectedIndex === options.length - 1}
                      onClick={() => {
                        setInitialRender(false);
                        if (selectedIndex < options.length - 1) {
                          setSelectedIndex((i) => i + 1);
                        }
                      }}
                    >
                      <ChevronDownIcon />
                    </Button>
                  </div>

                  {/* Borders - these can remain as they are, their positioning is absolute relative to their parent */}
                  <motion.div
                    className="absolute top-0 left-0 h-1 w-full bg-gray-300"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.5, ease: "easeInOut", delay: 0 }}
                    style={{ originX: 0 }}
                  />
                  <motion.div
                    className="absolute top-0 right-0 w-1 h-full bg-gray-300"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{
                      duration: 0.5,
                      ease: "easeInOut",
                      delay: 0.5,
                    }}
                    style={{ originY: 0 }}
                  />
                  <motion.div
                    className="absolute bottom-0 right-0 h-1 w-full bg-gray-300"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.5, ease: "easeInOut", delay: 1 }}
                    style={{ originX: 1 }}
                  />
                  <motion.div
                    className="absolute bottom-0 left-0 w-1 h-full bg-gray-300"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{
                      duration: 0.5,
                      ease: "easeInOut",
                      delay: 1.5,
                    }}
                    style={{ originY: 1 }}
                  />
                </motion.div>
              </h1>
            )}
          </motion.div>
        </div>
        {animationComplete && (
          <div className="h-screen flex-column bg-secondary md:bg-white snap-start">
            <motion.h1
              initial={{ opacity: 0, y: 20 }} // Start invisible and slightly below
              animate={{ opacity: 1, y: 0 }} // Animate to fully visible and original position
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="scroll-m-20 text-3xl font-astralaga tracking-tight text-balance my-5"
            >
              What I'm upto
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }} // Start invisible and slightly below
              animate={{ opacity: 1, y: 0 }} // Animate to fully visible and original position
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <Carousel
                opts={{
                  align: "start",
                }}
                orientation={
                  ["sm", "xs"].includes(currentBreakpoint)
                    ? "horizontal"
                    : "vertical"
                }
                plugins={[
                  Autoplay({
                    delay: 2000,
                  }),
                ]}
              >
                <CarouselContent className="h-[calc(100vh-150px)]">
                  {Array.from({ length: 15 }).map((_, index) => (
                    <CarouselItem key={index} className="pt-1 md:basis-1/4">
                      <div className="p-1">
                        <Card className="h-full md:h-[200px]">
                          <CardContent className="flex items-center justify-center p-6">
                            <span className="text-3xl font-semibold">
                              {index + 1}
                            </span>
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </motion.div>
          </div>
        )}
      </div>
      <div className="min-h-screen w-full flex items-center justify-center bg-gray-900 overflow-hidden font-sans relative snap-start">
        <div className="absolute inset-0 bg-cover bg-no-repeat animate-pan-background">
          <div
            className="absolute inset-0 bg-cover bg-no-repeat"
            style={{
              backgroundImage: `url('${Pondicherry}')`,
              backgroundSize: "120% 120%", // Make the image slightly larger to allow for panning
              animation: "panBackground 30s linear infinite alternate", // Apply animation
              // Initial background position
              backgroundPosition: "0% 0%",
            }}
          ></div>
          {/* Overlay for a subtle dark tint */}
          <div className="absolute inset-0 bg-black opacity-30"></div>
          {/*
        Custom CSS for the panning animation.
        This uses a standard CSS `@keyframes` rule to move the `background-position`
        from top-left to bottom-right and back, creating a panning effect.
      */}
          <style>{`
            @keyframes panBackground {
              0% {
                background-position: 0% 0%;
              }
              100% {
                background-position: 100% 100%;
              }
            }
          `}</style>
        </div>
      </div>
    </div>
  );
}

export default App;
