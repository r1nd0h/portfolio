"use client";

import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

// Pre-computed particle positions to avoid hydration mismatch
const particles = [
  { x: 12, y: 8, dur: 5.2, del: 0.3 },
  { x: 85, y: 25, dur: 6.1, del: 1.2 },
  { x: 42, y: 65, dur: 4.5, del: 2.8 },
  { x: 68, y: 12, dur: 7.3, del: 0.8 },
  { x: 25, y: 80, dur: 5.8, del: 3.5 },
  { x: 92, y: 45, dur: 6.7, del: 1.9 },
  { x: 8, y: 55, dur: 4.2, del: 4.1 },
  { x: 55, y: 90, dur: 7.1, del: 0.5 },
  { x: 78, y: 35, dur: 5.5, del: 2.3 },
  { x: 35, y: 18, dur: 6.4, del: 5.0 },
  { x: 18, y: 42, dur: 4.8, del: 1.5 },
  { x: 62, y: 72, dur: 7.6, del: 3.2 },
  { x: 48, y: 5, dur: 5.1, del: 4.7 },
  { x: 5, y: 92, dur: 6.9, del: 0.1 },
  { x: 72, y: 58, dur: 4.4, del: 2.6 },
  { x: 38, y: 30, dur: 7.8, del: 5.5 },
  { x: 88, y: 78, dur: 5.6, del: 1.0 },
  { x: 22, y: 50, dur: 6.2, del: 3.8 },
  { x: 95, y: 15, dur: 4.9, del: 4.4 },
  { x: 50, y: 85, dur: 7.0, del: 2.0 },
];

const orbs = [
  {
    size: 300,
    color: "rgba(124, 108, 240, 0.12)",
    x: "15%",
    y: "20%",
    duration: 20,
    delay: 0,
  },
  {
    size: 200,
    color: "rgba(167, 139, 250, 0.08)",
    x: "75%",
    y: "60%",
    duration: 25,
    delay: 2,
  },
  {
    size: 150,
    color: "rgba(124, 108, 240, 0.06)",
    x: "60%",
    y: "15%",
    duration: 18,
    delay: 5,
  },
  {
    size: 250,
    color: "rgba(99, 102, 241, 0.07)",
    x: "30%",
    y: "70%",
    duration: 22,
    delay: 3,
  },
];

export default function FloatingOrbs() {
  const isMobile = useIsMobile();
  if (isMobile) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-[80px]"
          style={{
            width: orb.size,
            height: orb.size,
            background: orb.color,
            left: orb.x,
            top: orb.y,
          }}
          animate={{
            x: [0, 40, -30, 20, 0],
            y: [0, -30, 20, -40, 0],
            scale: [1, 1.15, 0.9, 1.1, 1],
          }}
          transition={{
            duration: orb.duration,
            delay: orb.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Floating particles */}
      {particles.map((p, i) => (
        <motion.div
          key={`p-${i}`}
          className="absolute w-1 h-1 rounded-full bg-accent/20"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: p.dur,
            delay: p.del,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
