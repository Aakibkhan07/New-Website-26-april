import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Trade Metrix AI - Institutional Trading Infrastructure",
  description:
    "Advanced AI-powered trading infrastructure for institutional traders. Automate strategies, analyze market data in real-time, and execute with confidence.",
  keywords:
    "algorithmic trading, trading automation, institutional trading, AI trading, market analysis",
  openGraph: {
    title: "Trade Metrix AI - Institutional Trading Infrastructure",
    description:
      "Advanced AI-powered trading infrastructure for institutional traders.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#0a0a0a",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} bg-background`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
