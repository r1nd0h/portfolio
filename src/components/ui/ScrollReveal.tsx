"use client";

import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
  blur?: boolean;
  scale?: boolean;
};

export default function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = "up",
  distance = 60,
  blur = true,
  scale = false,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const directionMap = {
    up: { x: 0, y: distance },
    down: { x: 0, y: -distance },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 },
  };

  const initial = {
    ...directionMap[direction],
    opacity: 0,
    filter: blur ? "blur(12px)" : "blur(0px)",
    scale: scale ? 0.9 : 1,
  };

  const animate = isInView
    ? { x: 0, y: 0, opacity: 1, filter: "blur(0px)", scale: 1 }
    : initial;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={initial}
      animate={animate}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
