import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IlmTech – Smart Home Solutions | Ilmenau",
  description:
    "Herstellerunabhängige Smart-Home-Installation auf Basis von Home Assistant. PV-Integration, Wallbox, Energiemanagement – lokale Steuerung, sicher und zukunftsfähig. Aus Ilmenau, Thüringen.",
  keywords: "Smart Home Ilmenau, Home Assistant Installation, PV Integration, Wallbox Smart Home, Energiemanagement",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
