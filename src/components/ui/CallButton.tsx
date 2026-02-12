import { cn } from "@/lib/utils";

interface CallButtonProps {
  number: string;
  label: string;
  variant?: "emergency" | "normal";
  className?: string;
}

export function CallButton({ number, label, variant = "normal", className }: CallButtonProps) {
  return (
    <a
      href={`tel:${number}`}
      className={cn(
        "flex items-center gap-3 rounded-xl p-4 min-h-[48px] font-semibold transition-all active:scale-95",
        variant === "emergency"
          ? "bg-red-600 hover:bg-red-700 text-white"
          : "bg-holi-surface hover:bg-holi-surface-light text-white border border-white/10",
        className
      )}
      aria-label={`Call ${label}`}
    >
      <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
      <div className="flex-1">
        <div className="text-sm">{label}</div>
        <div className="text-lg">{number}</div>
      </div>
    </a>
  );
}
