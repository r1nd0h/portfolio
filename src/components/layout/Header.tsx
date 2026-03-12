"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const sectionIds = navItems.map((item) => item.href.slice(1));

    const onScroll = () => {
      setScrolled(window.scrollY > 50);

      // Find which section is currently in view
      const scrollY = window.scrollY + window.innerHeight / 3;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollY) {
          setActiveSection(sectionIds[i]);
          return;
        }
      }
      setActiveSection("");
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled
          ? "bg-background/70 backdrop-blur-2xl border-b border-border/50"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <a
          href="#"
          className="font-[family-name:var(--font-display)] font-bold text-sm tracking-tight"
        >
          <span className="gradient-text-accent">R.O</span>
        </a>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.slice(1);
            return (
              <li key={item.href} className="relative">
                <a
                  href={item.href}
                  className={`text-[13px] transition-colors duration-300 font-[family-name:var(--font-display)] tracking-wide ${
                    isActive
                      ? "text-foreground"
                      : "text-muted/60 hover:text-foreground"
                  }`}
                >
                  {item.label}
                </a>
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-accent"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </li>
            );
          })}
        </ul>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-muted/60 hover:text-foreground transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="メニュー"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-2xl border-b border-border/50 overflow-hidden"
          >
            <ul className="px-6 py-6 space-y-5">
              {navItems.map((item, i) => {
                const isActive = activeSection === item.href.slice(1);
                return (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <a
                      href={item.href}
                      className={`block text-sm transition-colors font-[family-name:var(--font-display)] ${
                        isActive
                          ? "text-accent"
                          : "text-muted/70 hover:text-foreground"
                      }`}
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </a>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
