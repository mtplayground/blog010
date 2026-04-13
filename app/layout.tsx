import type { Metadata } from "next";
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
      <body>{children}</body>
    </html>
  );
}
