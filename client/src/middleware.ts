export { auth as middleware } from "@/features/auth/auth";

export const config = {
  matcher: ["/((?!api|_next|static|favicon.ico).*)"],
  pages: {
    signIn: "api/auth/signin",
  },
};
