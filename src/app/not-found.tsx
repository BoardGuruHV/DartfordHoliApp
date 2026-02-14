import Link from "next/link";

export default function NotFound() {
  return (
    <div className="px-4 py-20 text-center">
      <div className="text-8xl mb-6">🎨</div>
      <h1 className="text-3xl font-bold font-[family-name:var(--font-poppins)] mb-3">
        Page Not Found
      </h1>
      <p className="text-white/60 mb-8 max-w-sm mx-auto">
        Looks like this page got lost in the colour clouds! Let&apos;s get you back to the festival.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-holi-pink hover:bg-holi-pink/80 text-white font-semibold transition-all duration-200 active:scale-95"
      >
        Back to Home
      </Link>
    </div>
  );
}
