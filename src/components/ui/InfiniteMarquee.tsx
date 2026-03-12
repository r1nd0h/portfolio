"use client";

import { motion } from "framer-motion";

type Props = {
  text: string;
  speed?: number;
  className?: string;
  reverse?: boolean;
};

export default function InfiniteMarquee({
  text,
  speed = 30,
  className = "",
  reverse = false,
}: Props) {
  const repeated = Array(4).fill(text);

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div
        className="inline-flex"
        animate={{ x: reverse ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {repeated.map((t, i) => (
          <span
            key={i}
            className="inline-block px-8 font-[family-name:var(--font-display)] text-6xl sm:text-8xl md:text-9xl font-bold text-foreground/[0.03] select-none tracking-tight"
          >
            {t}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
