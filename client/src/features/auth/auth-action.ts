"use server";
import { auth, signIn, signOut } from "@/features/auth/auth";
import { redirect } from "next/dist/server/api-utils";

export async function getCurrentUser() {
  try {
    const session = await auth();

    if (!session) return null;

    return session.user;
  } catch (err) {
    return null;
  }
}

export async function login(callbackUrl?: string) {
  await signIn("id-server", {redirectTo: callbackUrl}); // { prompt: "login" }
}

export async function logout() {
  await signOut({ redirectTo: "/" });
}
