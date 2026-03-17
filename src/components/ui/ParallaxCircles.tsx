"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";

type Circle = {
  x: string;
  y: string;
  size: number;
  color: string;
  speed: number;
};

const defaultCircles: Circle[] = [
  { x: "15%", y: "20%", size: 400, color: "rgba(124, 108, 240, 0.06)", speed: 0.3 },
  { x: "75%", y: "60%", size: 350, color: "rgba(167, 139, 250, 0.05)", speed: -0.2 },
  { x: "50%", y: "80%", size: 300, color: "rgba(124, 108, 240, 0.04)", speed: 0.15 },
];

type Props = {
  circles?: Circle[];
};

function ParallaxCircle({ circle }: { circle: Circle }) {
  const isMobile = useIsMobile();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, isMobile ? 0 : circle.speed * 300]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      ref={ref}
      className="absolute rounded-full pointer-events-none"
      style={{
        left: circle.x,
        top: circle.y,
        width: circle.size,
        height: circle.size,
        background: circle.color,
        filter: isMobile ? "blur(40px)" : "blur(80px)",
        y,
        scale,
        opacity,
        transform: "translate(-50%, -50%)",
      }}
    />
  );
}

export default function ParallaxCircles({ circles = defaultCircles }: Props) {
  const isMobile = useIsMobile();
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {(isMobile ? circles.slice(0, 2) : circles).map((circle, i) => (
        <ParallaxCircle key={i} circle={circle} />
      ))}
    </div>
  );
}
