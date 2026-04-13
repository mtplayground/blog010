"use client";

import Link from "next/link";
import { useEffect } from "react";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto flex min-h-[60vh] w-full max-w-2xl flex-col items-center justify-center px-6 py-16 text-center">
      <p className="text-sm font-medium uppercase tracking-wide text-gray-500">Something went wrong</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">Unexpected Error</h1>
      <p className="mt-3 text-base text-gray-600">An unexpected error occurred while rendering this page.</p>

      <div className="mt-8 flex items-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-700"
        >
          Try Again
        </button>
        <Link href="/" className="text-sm font-medium text-gray-600 hover:text-gray-900">
          Go Home
        </Link>
      </div>
    </main>
  );
}
