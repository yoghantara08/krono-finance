import React from "react";

import type { Metadata } from "next";

import LayoutWrapper from "@/components/Layout/LayoutWrapper";

export const metadata: Metadata = {
  title: "Krono Finance - Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <LayoutWrapper>{children}</LayoutWrapper>;
}
