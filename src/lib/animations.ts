// src/lib/animations.ts
import { Variants } from "framer-motion";

// Spring config for natural, organic feel
export const spring = {
  type: "spring" as const,
  stiffness: 60,
  damping: 20,
};

export const springFast = {
  type: "spring" as const,
  stiffness: 100,
  damping: 22,
};

// Fade up with spring — use on individual elements
export const fadeUpSpring = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: spring,
};

// Section header entrance — slightly scale in
export const sectionHeader = {
  initial: { opacity: 0, y: 40, scale: 0.97 },
  whileInView: { opacity: 1, y: 0, scale: 1 },
  viewport: { once: true },
  transition: { ...spring, stiffness: 50 },
};

// Container that staggers its children
export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

// Card entrance — used as child of staggerContainer
export const cardEntrance: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: spring,
  },
};

// Micro-interaction: subtle lift on hover
export const hoverLift = {
  whileHover: { y: -5, transition: { duration: 0.2, ease: "easeOut" } },
};

// Image entrance — scale + fade
export const imageEntrance = {
  initial: { opacity: 0, scale: 0.96 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true },
  transition: { ...spring, stiffness: 40, damping: 18 },
};
