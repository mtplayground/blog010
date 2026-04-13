import type { MetadataRoute } from "next";

import { prisma } from "@/lib/prisma";

function getSiteUrl(): string {
  const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:8080";

  try {
    return new URL(configuredSiteUrl).toString().replace(/\/$/, "");
  } catch {
    return "http://localhost:8080";
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const fallbackEntry: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1
    }
  ];

  if (!process.env.DATABASE_URL) {
    return fallbackEntry;
  }

  let posts: { id: number; updatedAt: Date }[] = [];
  try {
    posts = await prisma.post.findMany({
      where: {
        published: true
      },
      select: {
        id: true,
        updatedAt: true
      },
      orderBy: {
        createdAt: "desc"
      }
    });
  } catch {
    return fallbackEntry;
  }

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteUrl}/posts/${post.id}`,
    lastModified: post.updatedAt,
    changeFrequency: "weekly",
    priority: 0.7
  }));

  return [...fallbackEntry, ...postEntries];
}
