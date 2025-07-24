import Pondicherry from "../assets/pondicherry.jpeg";
import { Button } from "@/components/ui/button";
import { Linkedin, Instagram, Youtube, Mail } from "lucide-react";
import { motion, useInView } from "motion/react"; // Import useInView
import { useRef } from "react"; // Import useRef

export default function ContactMe() {
  const ref = useRef(null); // Create a ref for the div we want to observe
  const isInView = useInView(ref, { once: true, amount: 0.5 }); // Detect when 50% of the element is in view, and only trigger once

  return (
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

        <motion.div className="relative z-10 flex flex-col justify-center h-full p-5 ">
          {/* Animated div for the contact content */}
          <motion.div
            ref={ref} // Attach the ref to the motion.div
            initial={{ opacity: 0, y: 50 }} // Always start from here
            // Animate based on whether the element is in view
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, ease: "easeOut" }} // Smooth transition
            className="bg-white/80 w-full max-w-3xl p-6 shadow-xl"
          >
            <h1 className="text-5xl font-bold font-astralaga mb-3">
              Contact me
            </h1>
            <div className="text-muted-foreground font-thin text-xl md:text-2xl xl:text-3xl py-3">
              Have a question, project idea, or just want to say hello? I'd love
              to hear from you.
            </div>
            <div className="flex py-3 ">
              <Button size="icon" variant="default" className="size-12 mr-2">
                <a
                  href="https://www.linkedin.com/in/puneet-udhayan"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile"
                >
                  <Linkedin />
                </a>
              </Button>
              <Button size="icon" variant="default" className="size-12 mr-2">
                <a
                  href="https://www.instagram.com/puneets_art/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram page"
                >
                  <Instagram />
                </a>
              </Button>
              <Button size="icon" variant="default" className="size-12 mr-2">
                <a
                  href="https://www.youtube.com/@PuneetUdhayan"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Youtube channel"
                >
                  <Youtube />
                </a>
              </Button>
              <Button size="icon" variant="default" className="size-12 mr-2">
                <a
                  href="mailto:puneetudhayan@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Send me an email"
                >
                  <Mail />
                </a>
              </Button>
            </div>
          </motion.div>
        </motion.div>

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
  );
}
