import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import Navbar from "./components/Navbar";
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
  title: "HireLoop — The AI-Native Career Platform",
  description:
    "HireLoop connects top talent with world-class companies. Browse thousands of curated opportunities and land your next role.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#07070a]" suppressHydrationWarning>
        <Suspense fallback={<div className="h-16 w-full" />}>
          <Navbar />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
