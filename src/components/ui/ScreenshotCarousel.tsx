"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Screenshot } from "@/types";

type Props = {
  screenshots: Screenshot[];
};

export default function ScreenshotCarousel({ screenshots }: Props) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const paginate = useCallback(
    (dir: number) => {
      setDirection(dir);
      setCurrent((prev) => {
        const next = prev + dir;
        if (next < 0) return screenshots.length - 1;
        if (next >= screenshots.length) return 0;
        return next;
      });
    },
    [screenshots.length]
  );

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 200 : -200, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -200 : 200, opacity: 0 }),
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* iPhone mockup — constrained to viewport height */}
      <div className="relative">
        <div className="iphone-frame w-[220px] sm:w-[250px] max-h-[70dvh] flex flex-col">
          <div className="iphone-screen aspect-[9/19.5] relative bg-black max-h-[calc(70dvh-24px)]">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={screenshots[current].src}
                  alt={screenshots[current].alt}
                  fill
                  className="object-cover"
                  sizes="280px"
                  priority={current === 0}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Nav buttons */}
        <button
          onClick={() => paginate(-1)}
          className="absolute left-[-48px] top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-muted hover:text-foreground hover:border-accent/40 transition-all hidden sm:flex"
          aria-label="前へ"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={() => paginate(1)}
          className="absolute right-[-48px] top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-muted hover:text-foreground hover:border-accent/40 transition-all hidden sm:flex"
          aria-label="次へ"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Caption + Dot indicators */}
      <motion.p
        key={current}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xs text-muted text-center"
      >
        {screenshots[current].caption}
      </motion.p>

      <div className="flex items-center gap-2">
        {screenshots.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setDirection(idx > current ? 1 : -1);
              setCurrent(idx);
            }}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === current
                ? "w-6 bg-accent"
                : "w-2 bg-muted/30 hover:bg-muted/50"
            }`}
            aria-label={`スクリーンショット ${idx + 1}`}
          />
        ))}
      </div>

      {/* Mobile swipe hint */}
      <div className="sm:hidden flex gap-4">
        <button
          onClick={() => paginate(-1)}
          className="px-4 py-2 text-sm text-muted border border-border rounded-lg hover:border-accent/40 transition-colors"
        >
          <ChevronLeft size={16} className="inline" /> 前
        </button>
        <button
          onClick={() => paginate(1)}
          className="px-4 py-2 text-sm text-muted border border-border rounded-lg hover:border-accent/40 transition-colors"
        >
          次 <ChevronRight size={16} className="inline" />
        </button>
      </div>
    </div>
  );
}
