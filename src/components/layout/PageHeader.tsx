"use client";

import { useRouter } from "next/navigation";
import { NavIcon } from "./NavIcon";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  const router = useRouter();

  return (
    <div className="px-4 pt-4 pb-2">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-white/60 hover:text-white mb-3 min-h-[48px] transition-colors"
        aria-label="Go back"
      >
        <NavIcon icon="arrow-left" />
        <span className="text-sm">Back</span>
      </button>
      <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)]">{title}</h1>
      {subtitle && <p className="text-white/60 mt-1">{subtitle}</p>}
    </div>
  );
}
