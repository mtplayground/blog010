import Link from "next/link";

import { createPostAction } from "@/app/admin/posts/actions";

type NewPostPageProps = {
  searchParams?: {
    error?: string;
  };
};

export default function NewPostPage({ searchParams }: NewPostPageProps) {
  const error = searchParams?.error;
  const errorMessage =
    error === "missing_fields"
      ? "Title and body are required."
      : error === "save_failed"
        ? "Unable to save the post. Please try again."
        : null;

  return (
    <section className="mx-auto w-full max-w-3xl space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Create New Post</h1>
          <p className="mt-1 text-sm text-gray-600">Write a draft to publish later.</p>
        </div>

        <Link href="/admin" className="text-sm font-medium text-gray-600 hover:text-gray-900">
          Back to Dashboard
        </Link>
      </div>

      <form action={createPostAction} className="space-y-5 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
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
            Save Draft
          </button>
          <Link href="/admin" className="text-sm text-gray-600 hover:text-gray-900">
            Cancel
          </Link>
        </div>
      </form>
    </section>
  );
}
