"use client";

import { motion } from "framer-motion";

type Props = {
  text: string;
  className?: string;
  delay?: number;
};

export default function SplitText({ text, className, delay = 0 }: Props) {
  // Split by words for more elegant reveal
  const words = text.split(" ");

  return (
    <span className={className} aria-label={text}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block mr-[0.25em] last:mr-0">
          {word.split("").map((char, ci) => (
            <span
              key={ci}
              className="inline-block overflow-hidden align-bottom"
            >
              <motion.span
                className="inline-block"
                initial={{ y: "120%", rotateZ: 8 }}
                animate={{ y: "0%", rotateZ: 0 }}
                transition={{
                  duration: 0.8,
                  delay: delay + wi * 0.08 + ci * 0.03,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {char}
              </motion.span>
            </span>
          ))}
        </span>
      ))}
    </span>
  );
}
