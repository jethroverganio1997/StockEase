import { permanentRedirect } from "next/navigation";

export default async function RootPage() {
  permanentRedirect("/dashboard");
}
