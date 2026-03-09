import type { Metadata } from "next";
import { Space_Grotesk, Inter, Space_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cinzel",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-rajdhani",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-orbitron",
});

export const metadata: Metadata = {
  title: "Danish Raimi | Portfolio",
  description:
    "Computer Science Student | Data Science Major | Full Stack & AI Engineer",
  keywords: [
    "Danish Raimi",
    "Portfolio",
    "Computer Science",
    "Data Science",
    "Full Stack Developer",
    "Machine Learning",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${spaceMono.variable}`}
    >
      <body className="bg-dmc-black text-dmc-silver font-rajdhani antialiased">
        {/* Global scanlines overlay for DMC aesthetic */}
        <div className="scanlines-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
