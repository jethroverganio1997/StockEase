import React from "react";
import { auth } from "@/features/auth/auth";
import { Heading } from "lucide-react";
import { Button } from "../../../components/ui/button";
import AuthTest from "./auth-test";

export default async function Session() {
  const session = await auth();

  return (
    <div className="space-y-4">
      <div className="bg-gray-800">
        <h3 className="text-lg">session data</h3>
        <pre className="whitespace-pre-wrap break-all">{JSON.stringify(session, null, 2)}</pre>
      </div>
      <AuthTest />
    </div>
  );
}
