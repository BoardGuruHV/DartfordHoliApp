"use client";

import { useState } from "react";
import Link from "next/link";
import { MobileNav } from "./MobileNav";
import { NavIcon } from "./NavIcon";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 glass-card border-b border-white/10">
        <div className="flex items-center justify-between px-4 h-14">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🎨</span>
            <span className="font-bold text-lg gradient-text">Holi Fest</span>
          </Link>
          <button
            onClick={() => setMenuOpen(true)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center"
            aria-label="Open menu"
          >
            <NavIcon icon="menu" />
          </button>
        </div>
      </header>
      <MobileNav isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
