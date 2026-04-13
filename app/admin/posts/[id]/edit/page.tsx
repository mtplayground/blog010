import Link from "next/link";
import { notFound } from "next/navigation";

import { updatePostAction } from "@/app/admin/posts/actions";
import { prisma } from "@/lib/prisma";

type EditPostPageProps = {
  params: {
    id: string;
  };
  searchParams?: {
    error?: string;
  };
};

export const dynamic = "force-dynamic";

export default async function EditPostPage({ params, searchParams }: EditPostPageProps) {
  const postId = Number(params.id);
  if (!Number.isInteger(postId) || postId <= 0) {
    notFound();
  }

  const post = await prisma.post.findUnique({
    where: { id: postId },
    select: {
      id: true,
      title: true,
      body: true
    }
  });

  if (!post) {
    notFound();
  }

  const error = searchParams?.error;
  const errorMessage =
    error === "missing_fields"
      ? "Title and body are required."
      : error === "save_failed"
        ? "Unable to update the post. Please try again."
        : null;

  const updateAction = updatePostAction.bind(null, post.id);

  return (
    <section className="mx-auto w-full max-w-3xl space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Edit Post</h1>
          <p className="mt-1 text-sm text-gray-600">Update post title and content.</p>
        </div>

        <Link href="/admin" className="text-sm font-medium text-gray-600 hover:text-gray-900">
          Back to Dashboard
        </Link>
      </div>

      <form action={updateAction} className="space-y-5 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-800" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            maxLength={200}
            defaultValue={post.title}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none ring-blue-600 focus:ring-2"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-800" htmlFor="body">
            Body
          </label>
          <textarea
            id="body"
            name="body"
            required
            rows={12}
            defaultValue={post.body}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none ring-blue-600 focus:ring-2"
          />
        </div>

        {errorMessage ? (
          <p className="text-sm text-red-600" role="alert">
            {errorMessage}
          </p>
        ) : null}

        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="inline-flex items-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-700"
          >
            Save Changes
          </button>
          <Link href="/admin" className="text-sm text-gray-600 hover:text-gray-900">
            Cancel
          </Link>
        </div>
      </form>
    </section>
  );
}
