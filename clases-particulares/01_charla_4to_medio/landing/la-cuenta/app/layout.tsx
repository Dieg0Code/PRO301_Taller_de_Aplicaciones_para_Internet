import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "La Cuenta · Compara precios y ahorra en Osorno",
  description:
    "Compara precios reales de los 6 supermercados de Osorno. Arma tu lista, descubre dónde te conviene comprar y cuánto puedes ahorrar.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-CL" className={`${sans.variable} ${mono.variable}`}>
      <body className="font-sans bg-white text-gray-900 antialiased">{children}</body>
    </html>
  );
}
