"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";

export function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: .48, delay, ease: [.2, .75, .25, 1] }}>{children}</motion.div>;
}

export function PageFade({ children }: { children: React.ReactNode }) {
  return <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .24 }}>{children}</motion.div>;
}

export function RouteTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  return <AnimatePresence mode="wait" initial={false}><motion.div key={pathname} initial={reduced ? false : { opacity: 0, scale: .997 }} animate={{ opacity: 1, scale: 1 }} exit={reduced ? undefined : { opacity: 0 }} transition={{ duration: reduced ? 0 : .22, ease: [.2, .75, .25, 1] }}>{children}</motion.div></AnimatePresence>;
}
