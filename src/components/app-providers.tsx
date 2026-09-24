"use client";

import { NuqsAdapter } from "nuqs/adapters/next/app";
import { CartProvider } from "./cart";
import { FavoritesProvider } from "./favorites";
import { FeedbackProvider } from "./feedback";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return <NuqsAdapter><FeedbackProvider><FavoritesProvider><CartProvider>{children}</CartProvider></FavoritesProvider></FeedbackProvider></NuqsAdapter>;
}
