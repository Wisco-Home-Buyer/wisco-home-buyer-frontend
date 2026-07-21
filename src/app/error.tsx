"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="space-y-6 max-w-md">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto">
          <svg className="w-10 h-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        
        <h1 className="text-3xl font-bold text-[#0B2545] tracking-tight">Something went wrong!</h1>
        <p className="text-gray-500 text-sm">
          We apologize for the inconvenience. An unexpected error has occurred.
        </p>

        <div className="flex items-center justify-center gap-4 pt-4">
          <button
            onClick={() => reset()}
            className="px-6 py-2.5 bg-[#0B2545] text-white rounded-xl font-medium hover:bg-blue-900 transition-colors shadow-md"
          >
            Try again
          </button>
          <Link
            href="/"
            className="px-6 py-2.5 bg-white text-[#0B2545] border border-gray-200 rounded-xl font-medium hover:bg-gray-50 transition-colors shadow-sm"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
