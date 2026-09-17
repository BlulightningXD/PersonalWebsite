import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import CyberSpotlight from "@/components/CyberSpotlight";
import CommandPalette from "@/components/CommandPalette";
import { ThemeProvider } from "@/context/ThemeContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AdiOS",
  description: "My World.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col font-sans bg-neutral-950 text-neutral-200 antialiased relative selection:bg-[var(--cyber-primary)] selection:text-black">
        <ThemeProvider>
          <CyberSpotlight />
          <CommandPalette />
          <Navbar />
          <main className="flex-grow max-w-3xl mx-auto w-full px-4 sm:px-6 py-8 flex">
            <PageTransition>
              {children}
            </PageTransition>
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
