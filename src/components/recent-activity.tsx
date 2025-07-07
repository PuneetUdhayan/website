import { motion } from "motion/react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { InstagramEmbed } from "react-social-media-embed";
import { Button } from "./ui/button";

export default function RecentActivity() {
  const instaUrl = [
    "https://www.instagram.com/p/DHOSDCwIma_/",
    "https://www.instagram.com/p/DJdrVp4o1C-/",
    "https://www.instagram.com/p/DD7XvJBoH23/",
    "https://www.instagram.com/p/DDzW_5zo2BT/",
    "https://www.instagram.com/p/DDUFoYROJUW/",
    "https://www.instagram.com/p/DBYonCatUMD/",
    "https://www.instagram.com/p/DAzg6BNygtZ/",
    "https://www.instagram.com/p/DAkEk-IzVnm/",
    "https://www.instagram.com/p/DAkEYYZImWp/",
  ];
  return (
    <div className="h-[100vh] flex flex-col bg-secondary md:bg-transparent snap-start">
      <div>
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
          transition={{ duration: 1.8, ease: "easeOut" }}
          className="flex-1 overflow-hidden"
        >
          <Carousel
            plugins={[
              Autoplay({
                delay: 3000,
              }),
            ]}
            className="w-full h-full"
          >
            <CarouselContent className="h-full">
              {instaUrl.map((url, index) => (
                <CarouselItem key={index} className="h-full">
                  <div className="m-1">
                    <Card className="m-2 h-full">
                      <CardContent className="flex items-center justify-center p-6 h-full">
                        <InstagramEmbed url={url} width={350} />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </motion.div>
        <div>
          <Button>Sup</Button>
          <Button>Sup</Button>
        </div>
      </div>
    </div>
  );
}
