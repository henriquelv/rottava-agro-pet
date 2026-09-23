"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";

type FavoritesValue = { ids: string[]; count: number; has: (id: string) => boolean; toggle: (id: string) => void };
const FavoritesContext = createContext<FavoritesValue | null>(null);
const KEY = "rottava.favorites.v1";

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);
  const hydrated = useRef(false);
  useEffect(() => {
    // A leitura pós-hidratação mantém o HTML do servidor estável.
    queueMicrotask(() => {
      try { setIds(JSON.parse(localStorage.getItem(KEY) || "[]")); } catch { /* armazenamento indisponível */ }
      hydrated.current = true;
    });
  }, []);
  useEffect(() => { if (hydrated.current) localStorage.setItem(KEY, JSON.stringify(ids)); }, [ids]);
  const value = useMemo<FavoritesValue>(() => ({
    ids, count: ids.length, has: (id) => ids.includes(id),
    toggle: (id) => setIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]),
  }), [ids]);
  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const value = useContext(FavoritesContext);
  if (!value) throw new Error("FavoritesProvider ausente");
  return value;
}
