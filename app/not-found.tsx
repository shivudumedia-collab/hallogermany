import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page-container py-16">
      <div className="mx-auto max-w-2xl rounded-2xl border border-black bg-white p-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#dc2626]">Page not found</p>
        <h1 className="mt-3 text-3xl font-bold text-black">This URL does not exist</h1>
        <p className="mt-3 text-sm text-black">
          You are on a 404 route. Use the button below to return to the main application.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex rounded-md border border-[#ff7a00] bg-[#ff7a00] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#dc2626]"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
}
