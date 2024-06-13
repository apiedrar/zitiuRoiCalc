import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Calculadora Rendimientos de Inversión",
  description: "Construido en Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body style={{ fontFamily: "Avenir Next, Helvetica, Arial, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
