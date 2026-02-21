"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Keep a log in dev/prod for debugging unexpected runtime failures.
    console.error(error);
  }, [error]);

  return (
    <div className="page-container py-12">
      <div className="mx-auto max-w-xl rounded-2xl border border-black bg-white p-6 text-black">
        <h2 className="text-2xl font-bold">Something went wrong</h2>
        <p className="mt-2 text-sm">
          A runtime error occurred while loading this page. Please try again.
        </p>
        <button
          type="button"
          onClick={() => reset()}
          className="mt-5 rounded-md border border-[#ff7a00] bg-[#ff7a00] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#dc2626]"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
