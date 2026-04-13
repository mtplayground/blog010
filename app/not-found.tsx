import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="mx-auto flex min-h-[60vh] w-full max-w-2xl flex-col items-center justify-center px-6 py-16 text-center">
      <p className="text-sm font-medium uppercase tracking-wide text-gray-500">404</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">Page Not Found</h1>
      <p className="mt-3 text-base text-gray-600">The page you requested does not exist or has been moved.</p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-700"
      >
        Back to Homepage
      </Link>
    </main>
  );
}
