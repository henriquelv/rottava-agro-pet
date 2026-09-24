"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ArrowDown, ArrowRight } from "@/components/icons";
import { motion, type MotionValue, useReducedMotion, useScroll, useTransform } from "motion/react";

const letters = "ROTTAVA".split("");

function GlyphLetter({ letter, index, progress }: { letter: string; index: number; progress: MotionValue<number> }) {
  const y = useTransform(progress, [0, .3], [0, index % 2 ? -70 : 70]);
  return <motion.span style={{ y }}>{letter}</motion.span>;
}

export function GlyphPortalHero() {
  const stage = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: stage, offset: ["start start", "end end"] });
  const portalScale = useTransform(scrollYProgress, [0, .34], reduced ? [1, 1] : [.055, 1]);
  const portalRadius = useTransform(scrollYProgress, [0, .34], reduced ? ["0%", "0%"] : ["42%", "0%"]);
  const wordScale = useTransform(scrollYProgress, [0, .28], reduced ? [1, 1] : [1, 1.18]);
  const wordOpacity = useTransform(scrollYProgress, [0, .22, .34], reduced ? [0, 0, 0] : [1, .9, 0]);
  const introOpacity = useTransform(scrollYProgress, [0, .18], reduced ? [0, 0] : [1, 0]);
  const copyOpacity = useTransform(scrollYProgress, reduced ? [0, 1] : [.34, .54], reduced ? [1, 1] : [0, 1]);
  const copyX = useTransform(scrollYProgress, reduced ? [0, 1] : [.34, .58], reduced ? [0, 0] : [-32, 0]);
  const shadeOpacity = useTransform(scrollYProgress, [.25, .52], [.08, 1]);

  return <section ref={stage} className="glyph-stage" aria-label="Rottava, cuidado para pet, casa e jardim">
    <div className="glyph-sticky">
      <motion.div className="glyph-image-portal" style={{ scale: portalScale, borderRadius: portalRadius }}>
        <Image src="/images/hero-rottava.png" fill priority fetchPriority="high" sizes="100vw" alt="Cão e gato descansando juntos em uma varanda cercada por plantas" />
        <motion.div className="glyph-image-shade" style={{ opacity: shadeOpacity }} />
      </motion.div>
      <motion.div className="glyph-intro" style={{ opacity: introOpacity }}>
        <span>Pet · casa · jardim · Caçador</span>
        <p>Role para entrar</p>
      </motion.div>
      <motion.div className="glyph-word" aria-hidden="true" style={{ scale: wordScale, opacity: wordOpacity }}>
        {letters.map((letter, index) => <GlyphLetter key={`${letter}-${index}`} letter={letter} index={index} progress={scrollYProgress} />)}
      </motion.div>
      <motion.div className="glyph-copy" style={{ opacity: copyOpacity, x: copyX }}>
        <span className="eyebrow">CUIDADO QUE PARTICIPA DA ROTINA</span>
        <h1>Da primeira tigela<br />ao quintal inteiro.</h1>
        <p>Produtos para quem divide a casa, o passeio e os pequenos rituais com você.</p>
        <div className="hero-actions"><Link className="button light" href="/produtos">Ver produtos <ArrowRight aria-hidden="true" /></Link><Link className="button outline-light" href="/banho-e-tosa">Banho & tosa</Link></div>
      </motion.div>
      <motion.a className="glyph-scroll-cue" href="#descobrir" style={{ opacity: introOpacity }}>Descobrir <ArrowDown aria-hidden="true" /></motion.a>
    </div>
  </section>;
}
