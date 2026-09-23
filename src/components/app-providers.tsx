"use client";

import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "sonner";
import { CartProvider } from "./cart";
import { FavoritesProvider } from "./favorites";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return <NuqsAdapter><FavoritesProvider><CartProvider>{children}<Toaster position="top-center" richColors closeButton /></CartProvider></FavoritesProvider></NuqsAdapter>;
}
