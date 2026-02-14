"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="px-4 py-20 text-center">
      <div className="text-8xl mb-6">💥</div>
      <h1 className="text-2xl font-bold font-[family-name:var(--font-poppins)] mb-3">
        Something went wrong
      </h1>
      <p className="text-white/60 mb-8 max-w-sm mx-auto">
        A splash of colour went in the wrong direction! Don&apos;t worry, let&apos;s try again.
      </p>
      <button
        onClick={reset}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-holi-pink hover:bg-holi-pink/80 text-white font-semibold transition-all duration-200 active:scale-95"
      >
        Try Again
      </button>
    </div>
  );
}
