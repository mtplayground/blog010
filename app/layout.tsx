import type { Metadata } from "next";

import PublicShell from "@/components/public-shell";

import "./globals.css";

export const metadata: Metadata = {
  title: "blog010",
  description: "A blog built with Next.js"
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <PublicShell>{children}</PublicShell>
      </body>
    </html>
  );
}
