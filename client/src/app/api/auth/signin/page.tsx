"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LogIn } from "lucide-react";
import { login } from "../../../../features/auth/auth-action";

export default function SignIn({
  searchParams,
}: {
  searchParams: { callbackUrl: string };
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <Card className="w-full max-w-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-center text-2xl font-bold">
            StockEase
          </CardTitle>
          <CardDescription className="text-center">
            Choose your preferred sign in method
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={() => login(searchParams.callbackUrl)}
            className="w-full"
          >
            <LogIn className="mr-2 h-4 w-4 " />
            Login
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
