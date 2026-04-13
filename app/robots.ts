import type { MetadataRoute } from "next";

function getSiteUrl(): string {
  const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:8080";

  try {
    return new URL(configuredSiteUrl).toString().replace(/\/$/, "");
  } catch {
    return "http://localhost:8080";
  }
}

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/"]
      }
    ],
    sitemap: `${siteUrl}/sitemap.xml`
  };
}
