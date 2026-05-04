import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";

const display = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ink Pulse Studio · Tatuajes en Santiago",
  description:
    "Studio de tatuajes en Santiago. Artistas especializados, diseño personalizado y reserva online simple.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-CL" className={`${display.variable} ${body.variable}`}>
      <body className="font-body bg-ink-black text-ink-bone">{children}</body>
    </html>
  );
}
