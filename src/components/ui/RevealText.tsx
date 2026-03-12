"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

type Props = {
  text: string;
  className?: string;
  delay?: number;
  as?: "h2" | "h3" | "p" | "span";
  staggerSpeed?: number;
};

export default function RevealText({
  text,
  className,
  delay = 0,
  as: Tag = "span",
  staggerSpeed = 0.03,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const words = text.split(" ");

  return (
    <Tag ref={ref as never} className={className} aria-label={text}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block mr-[0.3em] last:mr-0">
          {word.split("").map((char, ci) => (
            <span
              key={ci}
              className="inline-block overflow-hidden align-bottom"
            >
              <motion.span
                className="inline-block"
                initial={{ y: "120%", opacity: 0 }}
                animate={
                  isInView
                    ? { y: "0%", opacity: 1 }
                    : { y: "120%", opacity: 0 }
                }
                transition={{
                  duration: 0.7,
                  delay: delay + wi * 0.06 + ci * staggerSpeed,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {char}
              </motion.span>
            </span>
          ))}
        </span>
      ))}
    </Tag>
  );
}
