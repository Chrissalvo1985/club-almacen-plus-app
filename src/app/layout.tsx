import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Club Almacén+ | Gana por compartir lo que ya haces",
  description: "Únete al Club Almacén+ y gana beneficios por compartir información de tu negocio. Mejora tu almacén, gana premios y sé parte de la red que mueve el barrio.",
  keywords: "almacén, comercio, beneficios, puntos, premios, canal tradicional, gamificación",
  authors: [{ name: "Club Almacén+" }],
  openGraph: {
    title: "Club Almacén+ | Gana por compartir lo que ya haces",
    description: "Únete al Club Almacén+ y gana beneficios por compartir información de tu negocio.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
