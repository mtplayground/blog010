import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium"
});

function buildExcerpt(body: string, maxLength = 180): string {
  const normalized = body.replace(/\s+/g, " ").trim();
  if (normalized.length <= maxLength) {
    return normalized;
  }

  return `${normalized.slice(0, maxLength).trimEnd()}...`;
}

export default async function HomePage() {
  const posts = await prisma.post.findMany({
    where: {
      published: true
    },
    orderBy: {
      createdAt: "desc"
    },
    select: {
      id: true,
      title: true,
      body: true,
      createdAt: true
    }
  });

  return (
    <main className="mx-auto min-h-screen w-full max-w-3xl px-6 py-12">
      <header className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">blog010</h1>
        <p className="mt-3 text-base text-gray-600">Published posts</p>
      </header>

      {posts.length > 0 ? (
        <section className="space-y-6">
          {posts.map((post) => (
            <article key={post.id} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-gray-900">{post.title}</h2>
              <p className="mt-1 text-sm text-gray-500">{dateFormatter.format(post.createdAt)}</p>
              <p className="mt-4 text-sm leading-7 text-gray-700">{buildExcerpt(post.body)}</p>
            </article>
          ))}
        </section>
      ) : (
        <p className="rounded-lg border border-dashed border-gray-300 px-6 py-10 text-center text-sm text-gray-500">
          No published posts yet.
        </p>
      )}
    </main>
  );
}
