"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function MouseGlow() {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
    };
    const leave = () => setVisible(false);
    const enter = () => setVisible(true);

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
    };
  }, [visible]);

  // Hide on touch devices
  if (typeof window !== "undefined" && "ontouchstart" in window) return null;

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[9999] hidden md:block"
      animate={{
        x: pos.x - 200,
        y: pos.y - 200,
        opacity: visible ? 1 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 15,
        mass: 0.1,
      }}
    >
      <div className="w-[400px] h-[400px] rounded-full bg-accent/[0.04] blur-[80px]" />
    </motion.div>
  );
}
