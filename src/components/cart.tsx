"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";

export type CartItem = { variantId: string; productSlug: string; name: string; variant: string; priceCents: number; quantity: number; imageUrl?: string | null };
type CartValue = { items: CartItem[]; count: number; subtotal: number; isOpen: boolean; open: () => void; close: () => void; add: (item: Omit<CartItem, "quantity">, options?: { open?: boolean; quantity?: number }) => void; update: (id: string, quantity: number) => void; clear: () => void };
const Context = createContext<CartValue | null>(null);
const KEY = "rottava.cart.v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const hydrated = useRef(false);
  useEffect(() => {
    // A leitura acontece apenas após a hidratação para que o HTML do servidor seja estável.
    queueMicrotask(() => {
      try { setItems(JSON.parse(localStorage.getItem(KEY) || "[]")); } catch { /* armazenamento indisponível */ }
      hydrated.current = true;
    });
  }, []);
  useEffect(() => { if (hydrated.current) localStorage.setItem(KEY, JSON.stringify(items)); }, [items]);
  const value = useMemo<CartValue>(() => ({
    items, count: items.reduce((n, i) => n + i.quantity, 0), subtotal: items.reduce((n, i) => n + i.priceCents * i.quantity, 0),
    isOpen, open() { setIsOpen(true); }, close() { setIsOpen(false); },
    add(item, options) { const amount = Math.max(1, Math.min(99, options?.quantity ?? 1)); setItems((all) => { const found = all.find((i) => i.variantId === item.variantId); return found ? all.map((i) => i.variantId === item.variantId ? { ...i, quantity: Math.min(99, i.quantity + amount) } : i) : [...all, { ...item, quantity: amount }]; }); if (options?.open) setIsOpen(true); },
    update(id, quantity) { setItems((all) => quantity <= 0 ? all.filter((i) => i.variantId !== id) : all.map((i) => i.variantId === id ? { ...i, quantity: Math.min(99, quantity) } : i)); },
    clear() { setItems([]); },
  }), [items, isOpen]);
  return <Context.Provider value={value}>{children}</Context.Provider>;
}
export function useCart() { const value = useContext(Context); if (!value) throw new Error("CartProvider ausente"); return value; }
