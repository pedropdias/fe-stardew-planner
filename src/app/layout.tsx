import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";
import {AppProvider} from "@/providers/AppContextProvider";
import localFont from "next/font/local";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const outfit = Outfit({
  weight: ["100", "200", "400", "700"],
  subsets: ["latin"],
  variable: "--font-outfit",
});

const stardewSimpleFont = localFont({
  src: [
    {
      path: "../fonts/stardew-valley-simple.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-stardew-simple",
});

const stardewMainFont = localFont({
  src: [
    {
      path: "../fonts/stardew-valley-main.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-stardew-main",
});

export const metadata: Metadata = {
  title: "Stardew Planner",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} ${stardewSimpleFont.variable} ${stardewMainFont.variable} antialiased text-[#000]`}
      >
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
