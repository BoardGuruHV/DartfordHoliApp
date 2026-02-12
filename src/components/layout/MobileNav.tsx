"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ALL_SECTIONS } from "@/lib/constants";
import { NavIcon } from "./NavIcon";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Navigation menu">
      <div className="fixed inset-0 bg-black/70" onClick={onClose} />
      <nav className="fixed right-0 top-0 bottom-0 w-72 bg-holi-bg border-l border-white/10 overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <span className="font-bold text-lg">Menu</span>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center"
            aria-label="Close menu"
          >
            <NavIcon icon="x" />
          </button>
        </div>
        <div className="p-2">
          {ALL_SECTIONS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-colors min-h-[48px]",
                pathname === item.href
                  ? "bg-holi-pink/20 text-holi-pink"
                  : "hover:bg-white/10 text-white/80"
              )}
            >
              <NavIcon icon={item.icon} />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
