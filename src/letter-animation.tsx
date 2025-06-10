import { motion } from 'motion/react';
import type React from 'react';

interface LetterAnimationProps {
  text: string;
}

const LetterAnimation: React.FC<LetterAnimationProps> = ({text}) => {
  const letters = Array.from(text);

  // Variants for the container
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.04 * i },
    }),
  };

  // Variants for each letter
  const child = {
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { type: "spring", damping: 12, stiffness: 100 },
    },
    hidden: {
      opacity: 0,
      x: -20,
      y: 10,
      transition: { type: "spring", damping: 12, stiffness: 100 },
    },
  };

  return (
    <motion.h1
      variants={container}
      initial="hidden"
      animate="visible"
      className="flex text-3xl md:text-3xl lg:text-4xl xl:text-6xl font-astralaga"
    >
      {letters.map((letter, index) => (
        <motion.span variants={child} key={index}>
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.h1>
  );
};

export default LetterAnimation;