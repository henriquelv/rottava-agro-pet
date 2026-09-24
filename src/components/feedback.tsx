"use client";

import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { X } from "@/components/icons";

type Notice = { id: number; message: string; action?: { label: string; onClick: () => void } };
type FeedbackContextValue = { notify: (message: string, action?: Notice["action"]) => void };

const FeedbackContext = createContext<FeedbackContextValue | null>(null);

export function FeedbackProvider({ children }: { children: React.ReactNode }) {
  const [notices, setNotices] = useState<Notice[]>([]);
  const counter = useRef(0);
  const reduced = useReducedMotion();
  const dismiss = useCallback((id: number) => setNotices((current) => current.filter((item) => item.id !== id)), []);
  const notify = useCallback((message: string, action?: Notice["action"]) => {
    const id = ++counter.current;
    setNotices((current) => [...current.slice(-2), { id, message, action }]);
    window.setTimeout(() => dismiss(id), 4600);
  }, [dismiss]);
  const value = useMemo(() => ({ notify }), [notify]);

  return <FeedbackContext.Provider value={value}>{children}<div className="feedback-region" aria-live="polite" aria-label="Notificações">
    <AnimatePresence>{notices.map((notice) => <motion.div key={notice.id} className="feedback-notice" initial={reduced ? false : { opacity: 0, y: -14, scale: .97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={reduced ? undefined : { opacity: 0, x: 20 }} transition={{ type: "spring", stiffness: 430, damping: 34 }}>
      <span>{notice.message}</span>{notice.action && <button onClick={() => { notice.action?.onClick(); dismiss(notice.id); }}>{notice.action.label}</button>}<button className="feedback-close" onClick={() => dismiss(notice.id)} aria-label="Fechar notificação"><X /></button>
    </motion.div>)}</AnimatePresence>
  </div></FeedbackContext.Provider>;
}

export function useFeedback() {
  const context = useContext(FeedbackContext);
  if (!context) throw new Error("useFeedback precisa estar dentro de FeedbackProvider");
  return context;
}
