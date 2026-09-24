"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { X } from "@/components/icons";

type SheetProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  className?: string;
  side?: "right" | "bottom";
  children: React.ReactNode;
};

export function Sheet({ open, onClose, title, description, className = "", side = "right", children }: SheetProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    previousFocus.current = document.activeElement as HTMLElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    function keydown(event: KeyboardEvent) { if (event.key === "Escape") onClose(); }
    window.addEventListener("keydown", keydown);
    return () => {
      window.removeEventListener("keydown", keydown);
      document.body.style.overflow = previousOverflow;
      previousFocus.current?.focus();
    };
  }, [open, onClose]);

  const hidden = side === "bottom" ? { y: "100%" } : { x: "100%" };
  return <AnimatePresence>{open && <div className="sheet-layer">
    <motion.button className="sheet-backdrop" aria-label="Fechar" onClick={onClose} initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={reduced ? undefined : { opacity: 0 }} />
    <motion.section className={`sheet-panel sheet-${side} ${className}`} role="dialog" aria-modal="true" aria-labelledby="sheet-title" aria-describedby={description ? "sheet-description" : undefined} initial={reduced ? undefined : hidden} animate={{ x: 0, y: 0 }} exit={reduced ? undefined : hidden} transition={{ type: "spring", stiffness: 360, damping: 37 }}>
      <header className="sheet-header"><div><h2 id="sheet-title">{title}</h2>{description && <p id="sheet-description">{description}</p>}</div><button ref={closeRef} onClick={onClose} aria-label="Fechar"><X /></button></header>
      {children}
    </motion.section>
  </div>}</AnimatePresence>;
}
