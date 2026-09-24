"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronDown, ImageIcon } from "@/components/icons";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { Product } from "@/lib/catalog-types";

export function ProductGallery({ product }: { product: Product }) {
  const [selected, setSelected] = useState(0);
  const reduced = useReducedMotion();
  const images = product.images.length ? product.images : [];
  if (!images.length) return <div className="premium-gallery empty"><div className="gallery-fallback"><ImageIcon aria-hidden="true" /><span>Imagem em preparação</span><b>{product.name}</b></div></div>;
  return <div className="premium-gallery">
    <div className="gallery-thumbnails" aria-label="Imagens do produto">{images.map((source, index) => <button key={`${source}-${index}`} className={selected === index ? "active" : ""} onClick={() => setSelected(index)} aria-label={`Ver imagem ${index + 1} de ${images.length}`} aria-pressed={selected === index}><Image src={source} alt="" fill sizes="72px" /></button>)}</div>
    <div className="gallery-stage"><AnimatePresence mode="wait" initial={false}><motion.div key={images[selected]} initial={reduced ? false : { opacity: 0, scale: 1.025 }} animate={{ opacity: 1, scale: 1 }} exit={reduced ? undefined : { opacity: 0, scale: .985 }} transition={{ duration: .32, ease: [.2, .75, .25, 1] }}><Image src={images[selected]} alt={`${product.name} — imagem ${selected + 1}`} fill priority sizes="(max-width: 800px) 100vw, 54vw" /></motion.div></AnimatePresence><span className="gallery-counter">{selected + 1} / {images.length}</span></div>
  </div>;
}

type Detail = { title: string; content: string };
export function ProductDetails({ details }: { details: Detail[] }) {
  const [open, setOpen] = useState(0);
  const reduced = useReducedMotion();
  return <div className="product-detail-list">{details.map((detail, index) => <section key={detail.title} className={open === index ? "open" : ""}><button onClick={() => setOpen(open === index ? -1 : index)} aria-expanded={open === index}><span>{detail.title}</span><motion.span animate={{ rotate: open === index ? 180 : 0 }} transition={{ duration: reduced ? 0 : .22 }}><ChevronDown aria-hidden="true" /></motion.span></button><AnimatePresence initial={false}>{open === index && <motion.div initial={reduced ? false : { height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={reduced ? undefined : { height: 0, opacity: 0 }} transition={{ duration: .28, ease: [.2, .75, .25, 1] }}><p>{detail.content}</p></motion.div>}</AnimatePresence></section>)}</div>;
}
