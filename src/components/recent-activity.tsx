import { motion } from "motion/react";
import { Carousel } from "react-responsive-carousel";
import { InstagramEmbed } from "react-social-media-embed";
import { LinkedInEmbed } from "react-social-media-embed";

export default function RecentActivity() {
  const instaUrl = [
    "https://www.instagram.com/p/DHOSDCwIma_/",
    "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7346445264938815490?collapsed=1",
    "https://www.instagram.com/p/DJdrVp4o1C-/",
    "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7343148023922704385?collapsed=1",
    "https://www.instagram.com/p/DD7XvJBoH23/",
    "https://www.instagram.com/p/DDzW_5zo2BT/",
    "https://www.instagram.com/p/DDUFoYROJUW/",
    "https://www.instagram.com/p/DBYonCatUMD/",
    "https://www.instagram.com/p/DAzg6BNygtZ/",
    "https://www.instagram.com/p/DAkEk-IzVnm/",
    "https://www.instagram.com/p/DAkEYYZImWp/",
  ];
  return (
    <div className="h-[100vh] flex justify-center items-center bg-white md:bg-transparent snap-start">
      <div className="w-full h-full max-h-170 p-10 flex flex-col">
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
          className="flex-1"
        >
          <div className="slider-container h-full">
            <Carousel
              autoPlay
              showThumbs={false}
              showStatus={false}
              showIndicators={false}
              infiniteLoop
              dynamicHeight={false}
            >
              {instaUrl.map((url) => {
                if (url.includes("instagram"))
                  return <InstagramEmbed url={url} />;
                else return <LinkedInEmbed url={url} />;
              })}
            </Carousel>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
