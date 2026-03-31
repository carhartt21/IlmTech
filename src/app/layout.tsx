import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | IlmTech",
    default: "IlmTech – Smart-Home-Lösungen | Ilmenau",
  },
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  description:
    "Herstellerunabhängige Smart-Home-Installation auf Basis von Home Assistant. PV-Integration, Wallbox, Energiemanagement – lokale Steuerung, sicher und zukunftsfähig. Aus Ilmenau, Thüringen.",
  keywords: "Smart Home Ilmenau, Home Assistant Installation, PV Integration, Wallbox Smart Home, Energiemanagement",
  metadataBase: new URL("https://ilmtech.de"),
  openGraph: {
    type: "website",
    siteName: "IlmTech",
    locale: "de_DE",
    alternateLocale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${inter.variable} h-full antialiased`} data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
