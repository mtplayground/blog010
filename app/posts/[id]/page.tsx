import Link from "next/link";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium"
});

type PostDetailPageProps = {
  params: {
    id: string;
  };
};

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  const postId = Number(params.id);
  if (!Number.isInteger(postId) || postId <= 0) {
    notFound();
  }

  const post = await prisma.post.findFirst({
    where: {
      id: postId,
      published: true
    },
    select: {
      id: true,
      title: true,
      body: true,
      createdAt: true
    }
  });

  if (!post) {
    notFound();
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-3xl px-6 py-12">
      <Link href="/" className="text-sm font-medium text-gray-600 hover:text-gray-900">
        Back to posts
      </Link>

      <article className="mt-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">{post.title}</h1>
        <p className="mt-2 text-sm text-gray-500">{dateFormatter.format(post.createdAt)}</p>
        <div className="mt-6 whitespace-pre-wrap text-base leading-8 text-gray-800">{post.body}</div>
      </article>
    </main>
  );
}
