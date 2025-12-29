import type { Metadata } from "next";
import localFont from "next/font/local";
import { Audiowide } from "next/font/google";

import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const righteous = Audiowide({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-righteous",
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: {
    default: "Online chord engine",
    template: "%s | Chord Engine",
  },
  description: "Chord parser engine for developers.",
  metadataBase: new URL("https://github.com/PauSala/chordparser"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${righteous.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
