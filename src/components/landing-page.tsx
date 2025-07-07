import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronUpIcon, ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBreakpoint } from "@/hooks/useBreakpoint";

import LetterAnimation from "@/letter-animation";
import RecentActivity from "./recent-activity";
import { MemoizedUnicornScene } from "./memoised-unicorn-scene";

export default function LandingPage() {
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
  }, [intro, nameText, setAnimationComplete]);

  const textVariants = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 snap-start relative">
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
                  className="absolute top-0 left-0 h-1 w-full bg-white"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.5, ease: "easeInOut", delay: 0 }}
                  style={{ originX: 0 }}
                />
                <motion.div
                  className="absolute top-0 right-0 w-1 h-full bg-white"
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
                  className="absolute bottom-0 right-0 h-1 w-full bg-white"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.5, ease: "easeInOut", delay: 1 }}
                  style={{ originX: 1 }}
                />
                <motion.div
                  className="absolute bottom-0 left-0 w-1 h-full bg-white"
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
      {animationComplete && <RecentActivity />}
      <MemoizedUnicornScene />
    </div>
  );
}
