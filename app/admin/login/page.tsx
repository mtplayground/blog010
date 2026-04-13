import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import {
  createAdminSessionValue,
  SESSION_COOKIE_NAME,
  SESSION_MAX_AGE_SECONDS,
  verifyAdminPassword,
  verifyAdminSessionValue
} from "@/lib/auth";

type LoginPageProps = {
  searchParams?: {
    error?: string;
  };
};

async function login(formData: FormData): Promise<void> {
  "use server";

  const password = formData.get("password");
  if (typeof password !== "string" || !verifyAdminPassword(password)) {
    redirect("/admin/login?error=invalid_credentials");
  }

  const sessionValue = createAdminSessionValue();
  if (!sessionValue) {
    redirect("/admin/login?error=server_misconfigured");
  }

  cookies().set({
    name: SESSION_COOKIE_NAME,
    value: sessionValue,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS
  });

  redirect("/admin");
}

export default function AdminLoginPage({ searchParams }: LoginPageProps) {
  const existingSession = cookies().get(SESSION_COOKIE_NAME)?.value;
  if (verifyAdminSessionValue(existingSession)) {
    redirect("/admin");
  }

  const error = searchParams?.error;
  const errorMessage =
    error === "server_misconfigured"
      ? "Admin authentication is not configured."
      : error === "invalid_credentials"
        ? "Invalid password."
        : null;

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md items-center px-6 py-16">
      <section className="w-full rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-semibold text-gray-900">Admin Login</h1>
        <p className="mt-2 text-sm text-gray-600">Enter the admin password to continue.</p>

        <form action={login} className="mt-6 space-y-4">
          <label className="block text-sm font-medium text-gray-800" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm outline-none ring-blue-600 focus:ring-2"
          />

          {errorMessage ? (
            <p className="text-sm text-red-600" role="alert">
              {errorMessage}
            </p>
          ) : null}

          <button
            type="submit"
            className="inline-flex w-full items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-700"
          >
            Sign in
          </button>
        </form>
      </section>
    </main>
  );
}
