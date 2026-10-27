import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ChromeGate from "@/components/ChromeGate";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ValeCred Empreendimentos Imobiliários",
  description: "Imóveis para comprar e alugar, lançamentos e empreendimentos ValeCred.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} antialiased`}>
        <ChromeGate><Header /></ChromeGate>
        <main>{children}</main>
        <ChromeGate><Footer /></ChromeGate>
        <ChromeGate><WhatsAppButton /></ChromeGate>
      </body>
    </html>
  );
}
