"use server";
import { auth, signIn, signOut } from "@/features/auth/auth";
import { User } from "next-auth";

export async function getCurrentUser(): Promise<User | null> {
  try {
    const session = await auth();

    if (!session) return null;

    return session.user;
  } catch (err) {
    return null;
  }
}

export async function login(callbackUrl?: string) {
  await signIn("id-server", { redirectTo: callbackUrl }, { prompt: "login" }); // { prompt: "login" }
}

export async function logout() {
  await signOut({ redirectTo: "/" });
}
