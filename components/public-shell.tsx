"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type PublicShellProps = {
  children: React.ReactNode;
};

export default function PublicShell({ children }: PublicShellProps) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  if (isAdminRoute) {
    return children;
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-lg font-semibold tracking-tight text-gray-900 hover:text-gray-700">
            blog010
          </Link>
        </div>
      </header>

      <div className="mx-auto w-full max-w-5xl px-6 py-8">{children}</div>

      <footer className="border-t border-gray-200 bg-white">
        <div className="mx-auto w-full max-w-5xl px-6 py-5 text-sm text-gray-500">© {new Date().getFullYear()} blog010</div>
      </footer>
    </div>
  );
}
