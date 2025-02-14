import React from "react";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Analytics } from "@vercel/analytics/react";

import LayoutWrapper from "@/components/Layout/LayoutWrapper";

import { Providers } from "./providers";

import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Krono Finance",
  description: "Krono Finance is Lending and Borrow DeFi Protocol!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <Providers>
          <LayoutWrapper>{children}</LayoutWrapper>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
