import type { Metadata, Viewport } from "next";
import { Geist, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import { Header, MobileDock, Footer } from "@/components/chrome";
import { AppProviders } from "@/components/app-providers";
import { getSession } from "@/lib/auth";
import { demoMode, store } from "@/lib/config";

const display = DM_Serif_Display({ subsets: ["latin"], weight: "400", variable: "--font-display" });
const body = Geist({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  title: { default: store.name, template: `%s | ${store.name}` },
  description: `Pet, casa e jardim em ${store.city}. Produtos, cuidado e banho e tosa em uma experiência próxima e segura.`,
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://rottava-pet-casa-jardim.vercel.app"),
  openGraph: { title: store.name, description: `Pet, casa e jardim em ${store.city}.`, locale: "pt_BR", type: "website" },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#e8f0f0" };

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const session = await getSession();
  return <html lang="pt-BR"><body className={`${display.variable} ${body.variable}`}>
    <AppProviders>
      <a className="skip" href="#conteudo">Pular para o conteúdo</a>
      {demoMode && <div className="demo-bar"><b>MODO DEMONSTRAÇÃO</b><span>Produtos, preços, pedidos e contas desta versão são dados de teste.</span></div>}
      <Header session={session} />
      <main id="conteudo">{children}</main>
      <Footer />
      <MobileDock session={session} />
    </AppProviders>
  </body></html>;
}
