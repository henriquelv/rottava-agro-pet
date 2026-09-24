"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Check, ChevronDown } from "@/components/icons";

export type SelectOption = { value: string; label: string; disabled?: boolean };

export function SelectMenu({ value, options, onChange, label, className = "" }: { value: string; options: SelectOption[]; onChange: (value: string) => void; label: string; className?: string }) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const listId = useId();
  const reduced = useReducedMotion();
  const selected = options.find((option) => option.value === value) || options[0];

  useEffect(() => {
    function close(event: PointerEvent) {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    }
    function escape(event: KeyboardEvent) {
      if (event.key === "Escape") { setOpen(false); button.current?.focus(); }
    }
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", escape);
    return () => { document.removeEventListener("pointerdown", close); document.removeEventListener("keydown", escape); };
  }, []);

  function move(direction: 1 | -1) {
    const current = Math.max(0, options.findIndex((option) => option.value === value));
    let next = current;
    do { next = (next + direction + options.length) % options.length; } while (options[next]?.disabled && next !== current);
    if (!options[next]?.disabled) onChange(options[next].value);
  }

  return <div ref={root} className={`select-menu ${className}`}>
    <button ref={button} type="button" className="select-menu-trigger" aria-label={label} aria-haspopup="listbox" aria-expanded={open} aria-controls={listId} onClick={() => setOpen((current) => !current)} onKeyDown={(event) => {
      if (event.key === "ArrowDown" || event.key === "ArrowUp") { event.preventDefault(); move(event.key === "ArrowDown" ? 1 : -1); setOpen(true); }
    }}><span>{selected?.label}</span><motion.span animate={{ rotate: open ? 180 : 0 }}><ChevronDown aria-hidden="true" /></motion.span></button>
    <AnimatePresence>{open && <motion.div id={listId} role="listbox" aria-label={label} className="select-menu-popover" initial={reduced ? false : { opacity: 0, y: -6, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={reduced ? undefined : { opacity: 0, y: -4, scale: .98 }} transition={{ duration: reduced ? 0 : .16 }}>
      {options.map((option) => <button type="button" role="option" aria-selected={option.value === value} disabled={option.disabled} key={option.value} onClick={() => { onChange(option.value); setOpen(false); button.current?.focus(); }}><span>{option.label}</span>{option.value === value && <Check aria-hidden="true" />}</button>)}
    </motion.div>}</AnimatePresence>
  </div>;
}
