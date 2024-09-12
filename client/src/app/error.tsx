"use client";
import { AlertTriangle, MailIcon, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

// Error boundaries must be Client Components

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const handleRefresh = () => {
    window.location.reload();
  };

  const handleContactSupport = () => {
    window.location.href = "mailto:support@example.com";
  };

  return (
    <html>
      <body>
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br bg-gray-100 p-4">
          <div className="w-full max-w-md overflow-hidden rounded-lg bg-white shadow-xl">
            <div className="p-6 sm:p-8">
              <div className="flex justify-center">
                <AlertTriangle className="h-16 w-16 text-red-500" />
              </div>
              <h2 className="mt-4 text-center text-2xl font-bold text-gray-800">
                Oops! Something went wrong
              </h2>
              <p className="mt-2 text-center text-gray-600">
                We're experiencing some technical difficulties. Our team has
                been notified and is working on a fix.
              </p>
              <div className="mt-6 space-y-4">
                <Button
                  onClick={handleRefresh}
                  className="flex w-full items-center justify-center"
                  variant="outline"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Refresh Page
                </Button>
                <Button
                  onClick={handleContactSupport}
                  className="flex w-full items-center justify-center"
                >
                  <MailIcon className="mr-2 h-4 w-4" />
                  Contact Support
                </Button>
              </div>
            </div>
            <div className="border-t border-gray-100 bg-gray-50 px-6 py-4">
              <p className="text-center text-xs text-gray-500">
                Error Code: 500 | If the problem persists, please contact our
                support team.
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
