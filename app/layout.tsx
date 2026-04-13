import type { Metadata } from "next";

import PublicShell from "@/components/public-shell";

import "./globals.css";

const defaultSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:8080";
const metadataBase = (() => {
  try {
    return new URL(defaultSiteUrl);
  } catch {
    return new URL("http://localhost:8080");
  }
})();

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: "blog010",
    template: "%s | blog010"
  },
  description: "A simple blog built with Next.js and Prisma.",
  openGraph: {
    type: "website",
    siteName: "blog010",
    title: "blog010",
    description: "A simple blog built with Next.js and Prisma.",
    url: "/",
    images: [
      {
        url: "/og-default.png"
      }
    ]
  }
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
