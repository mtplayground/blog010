import Link from "next/link";

import { deletePostAction, togglePostPublishedAction } from "@/app/admin/posts/actions";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeStyle: "short"
});

export default async function AdminDashboardPage() {
  const posts = await prisma.post.findMany({
    orderBy: {
      updatedAt: "desc"
    },
    select: {
      id: true,
      title: true,
      published: true,
      updatedAt: true
    }
  });

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Posts</h1>
          <p className="mt-1 text-sm text-gray-600">Manage drafts and published content.</p>
        </div>

        <Link
          href="/admin/posts/new"
          className="inline-flex items-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-700"
        >
          Create New Post
        </Link>
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600">Title</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600">Status</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600">Updated</th>
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-600">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {posts.length > 0 ? (
              posts.map((post) => (
                <tr key={post.id}>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{post.title}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    <span
                      className={
                        post.published
                          ? "inline-flex rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800"
                          : "inline-flex rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700"
                      }
                    >
                      {post.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">{dateFormatter.format(post.updatedAt)}</td>
                  <td className="px-4 py-3 text-right text-sm">
                    <div className="inline-flex items-center gap-3">
                      <form action={togglePostPublishedAction.bind(null, post.id)} className="inline">
                        <input type="hidden" name="nextPublished" value={post.published ? "false" : "true"} />
                        <button type="submit" className="font-medium text-amber-700 hover:text-amber-900">
                          {post.published ? "Unpublish" : "Publish"}
                        </button>
                      </form>
                      <Link href={`/admin/posts/${post.id}/edit`} className="font-medium text-blue-700 hover:text-blue-900">
                        Edit
                      </Link>
                      <form action={deletePostAction.bind(null, post.id)} className="inline">
                        <input type="hidden" name="confirmation" value="delete" />
                        <button type="submit" className="font-medium text-red-600 hover:text-red-800">
                          Delete
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-4 py-10 text-center text-sm text-gray-500" colSpan={4}>
                  No posts yet. Create your first post to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
