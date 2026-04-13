"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";

export async function createPostAction(formData: FormData): Promise<void> {
  const titleInput = formData.get("title");
  const bodyInput = formData.get("body");

  const title = typeof titleInput === "string" ? titleInput.trim() : "";
  const body = typeof bodyInput === "string" ? bodyInput.trim() : "";

  if (!title || !body) {
    redirect("/admin/posts/new?error=missing_fields");
  }

  try {
    await prisma.post.create({
      data: {
        title,
        body
      }
    });
  } catch {
    redirect("/admin/posts/new?error=save_failed");
  }

  revalidatePath("/admin");
  redirect("/admin");
}

export async function updatePostAction(postId: number, formData: FormData): Promise<void> {
  if (!Number.isInteger(postId) || postId <= 0) {
    redirect("/admin?error=invalid_post");
  }

  const titleInput = formData.get("title");
  const bodyInput = formData.get("body");

  const title = typeof titleInput === "string" ? titleInput.trim() : "";
  const body = typeof bodyInput === "string" ? bodyInput.trim() : "";

  if (!title || !body) {
    redirect(`/admin/posts/${postId}/edit?error=missing_fields`);
  }

  try {
    await prisma.post.update({
      where: { id: postId },
      data: {
        title,
        body
      }
    });
  } catch {
    redirect(`/admin/posts/${postId}/edit?error=save_failed`);
  }

  revalidatePath("/admin");
  revalidatePath(`/admin/posts/${postId}/edit`);
  redirect("/admin");
}
