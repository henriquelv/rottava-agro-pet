import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { Header, MobileDock, Footer } from "@/components/chrome";
import { CartProvider } from "@/components/cart";
import { getSession } from "@/lib/auth";
import { demoMode, store } from "@/lib/config";

const display = Cormorant_Garamond({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-display" });
const body = Manrope({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-body" });

export const metadata: Metadata = {
  title: { default: store.name, template: `%s | ${store.name}` },
  description: `Pet, casa e jardim em ${store.city}. Produtos, cuidado e banho e tosa em uma experiência próxima e segura.`,
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#e8f0f0" };

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const session = await getSession();
  return <html lang="pt-BR"><body className={`${display.variable} ${body.variable}`}>
    <CartProvider>
      <a className="skip" href="#conteudo">Pular para o conteúdo</a>
      {demoMode && <div className="demo-bar"><b>MODO DEMONSTRAÇÃO</b><span>Produtos, preços, pedidos e contas desta versão são dados de teste.</span></div>}
      <Header session={session} />
      <main id="conteudo">{children}</main>
      <Footer />
      <MobileDock session={session} />
    </CartProvider>
  </body></html>;
}
