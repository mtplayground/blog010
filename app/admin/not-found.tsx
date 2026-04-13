import Link from "next/link";

export default function AdminNotFoundPage() {
  return (
    <section className="mx-auto flex min-h-[50vh] w-full max-w-3xl flex-col items-center justify-center px-6 py-16 text-center">
      <p className="text-sm font-medium uppercase tracking-wide text-gray-500">Admin 404</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">Admin Page Not Found</h1>
      <p className="mt-3 text-base text-gray-600">This admin resource does not exist.</p>

      <div className="mt-8 flex items-center gap-3">
        <Link
          href="/admin"
          className="inline-flex items-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-700"
        >
          Back to Dashboard
        </Link>
        <Link href="/" className="text-sm font-medium text-gray-600 hover:text-gray-900">
          View Site
        </Link>
      </div>
    </section>
  );
}
