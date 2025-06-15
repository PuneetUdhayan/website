import { motion } from "motion/react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export default function RecentActivity() {
  return (
    <div className="h-screen bg-secondary md:bg-white snap-start">
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
        className="h-full"
      >
        <Carousel
          opts={{
            align: "start",
          }}
          plugins={[
            Autoplay({
              delay: 3000,
            }),
          ]}
          className="h-full"
        >
          <CarouselContent className="h-full">
            {Array.from({ length: 15 }).map((_, index) => (
              <CarouselItem key={index} className="pt-1 h-full">
                <div className="p-1 h-full">
                  <Card className="m-2 h-full">
                    <CardContent className="flex items-center justify-center p-6">
                      <span className="text-3xl my-15 font-semibold">
                        {index + 1}
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </motion.div>
    </div>
  );
}
