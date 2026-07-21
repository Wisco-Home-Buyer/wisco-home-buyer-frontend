import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="space-y-6 max-w-md">
        <h1 className="text-8xl font-black text-[#0B2545] tracking-tighter">
          404
        </h1>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-[#0B2545] tracking-tight">
            Page not found
          </h2>
          <p className="text-gray-500 text-sm">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or doesn&apos;t exist.
          </p>
        </div>

        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-[#0B2545] text-white rounded-xl font-medium hover:bg-blue-900 transition-colors shadow-md gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
