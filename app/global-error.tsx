"use client";

export default function GlobalError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-black">
        <div className="page-container py-12">
          <div className="mx-auto max-w-xl rounded-2xl border border-black bg-white p-6">
            <h2 className="text-2xl font-bold">Application error</h2>
            <p className="mt-2 text-sm">
              The app hit an unexpected error. Please refresh or try again.
            </p>
            <p className="mt-2 text-xs text-black/70">{error.message}</p>
            <button
              type="button"
              onClick={() => reset()}
              className="mt-5 rounded-md border border-[#ff7a00] bg-[#ff7a00] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#dc2626]"
            >
              Retry
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
