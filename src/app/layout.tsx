import type { Metadata, Viewport } from "next";
import { Geist, Instrument_Serif } from "next/font/google";
import "./globals.css";
import "./quality.css";
import "./brand.css";
import { Header, MobileDock, Footer } from "@/components/chrome";
import { AppProviders } from "@/components/app-providers";
import { getSession } from "@/lib/auth";
import { store } from "@/lib/config";
import { RouteTransition } from "@/components/motion-ui";

const body = Geist({ subsets: ["latin"], variable: "--font-body" });
const editorial = Instrument_Serif({ weight: "400", subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = {
  title: { default: store.name, template: `%s | ${store.name}` },
  description: `Pet, casa e jardim em ${store.city}. Produtos, cuidado e banho e tosa em uma experiência próxima e segura.`,
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://rottava-pet-casa-jardim.vercel.app"),
  openGraph: { title: store.name, description: `Pet, casa e jardim em ${store.city}.`, locale: "pt_BR", type: "website" },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#e8f0f0" };

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const session = await getSession();
  return <html lang="pt-BR"><body className={`${body.variable} ${editorial.variable}`}>
    <AppProviders>
      <a className="skip" href="#conteudo">Pular para o conteúdo</a>
      <Header session={session} />
      <main id="conteudo"><RouteTransition>{children}</RouteTransition></main>
      <Footer />
      <MobileDock session={session} />
    </AppProviders>
  </body></html>;
}
