import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";

export default function RecentActivity({ kind }: { kind: string }) {
  const data = [
    {
      id: 1,
      title: "ZOI",
      description: "Painted my first date with my wife",
      link: "https://www.instagram.com/p/DHOSDCwIma_/",
      kind: "a",
    },
    {
      id: 2,
      title: "Orchestrating Data Pipelines with Large Language Models",
      description:
        "An article that describes a technique for using AI agents to solve a real world problem",
      link: "https://www.linkedin.com/pulse/orchestrating-data-pipelines-large-languagemodels-puneet-udhayan-wumsc/",
      kind: "b",
    },
    {
      id: 3,
      title: "Turle's farmhouse",
      description: "A painting of the airbnb we stayed at in Hosur",
      link: "https://www.instagram.com/p/DJdrVp4o1C-/",
      kind: "a",
    },
    {
      id: 4,
      title: "Why write?",
      description: "My first ever article",
      link: "https://www.linkedin.com/pulse/why-write-puneet-udhayan-1bsic/",
      kind: "b",
    },
    {
      id: 5,
      title: "Pen and ink",
      description: "A reel of some pen and ink drawings i made",
      link: "https://www.instagram.com/p/DD7XvJBoH23/",
      kind: "a",
    },
    {
      id: 6,
      title: "Gouache",
      description: "My first attempt of painting with Gouache",
      link: "https://www.instagram.com/p/DDzW_5zo2BT/",
      kind: "a",
    },
    {
      id: 7,
      title: "Sabha",
      description: "Painting of a renovated heritage building",
      link: "https://www.instagram.com/p/DDUFoYROJUW/",
      kind: "a",
    },
    {
      id: 8,
      title: "Coromandel cafe",
      description: "Painting of a cafe in Pondicherry",
      link: "https://www.instagram.com/p/DBYonCatUMD/",
      kind: "a",
    },
    {
      id: 9,
      title: "A hundred hands",
      description:
        "Painting of a scene from a festival celebrating hand made goods",
      link: "https://www.instagram.com/p/DAzg6BNygtZ/",
      kind: "a",
    },
    {
      id: 10,
      title: "Fraser town",
      description: "Paintings of some interesting locations in Fraser town",
      link: "https://www.instagram.com/p/DAkEk-IzVnm/",
      kind: "a",
    },
    {
      id: 11,
      title: "State central library",
      description: "A painting of Sheshadri Iyer Memorial Hall in Cubbon park",
      link: "https://www.instagram.com/p/DAkEYYZImWp/",
      kind: "a",
    },
    {
      id: 12,
      title: "Dad",
      description: "A pencil sketch of my dad for his 60th birthday",
      link: "https://www.instagram.com/puneets_art/p/DMCJucYJZa-/",
      kind: "a",
    },
  ];
  const [items, setItems] = useState([]);

  useEffect(() => {
    console.log({ kind });
    if (kind === "") {
      setItems(data);
    } else {
      setItems(data.filter((i) => i.kind === kind));
    }
  }, [kind]);

  return (
    <div className="h-[100vh] flex justify-center items-center bg-white md:bg-transparent snap-start">
      <div className="w-full h-full max-h-170 p-10 flex flex-col overflow-hidden">
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
              {items.map((item) => (
                <div
                  className={
                    "h-full overflow-hidden w-full flex flex-col justify-end bg-secondary bg-no-repeat bg-contain bg-cover bg-center hover:scale-105 transition-all duration-300 ease-in-out"
                  }
                  style={{
                    backgroundImage: `url('posts/${item.id}.png')`,
                  }}
                  onClick={() => window.open(item.link, "_blank")}
                >
                  <div className="bg-white/70 p-8 text-left">
                    <h1 className="scroll-m-20 text-xl uppercase font-bold tracking-tight text-balance mb-1">
                      {item.title}
                    </h1>

                    <p className="text-xl font-thin">{item.description}</p>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
