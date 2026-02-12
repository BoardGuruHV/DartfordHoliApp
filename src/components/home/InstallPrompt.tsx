"use client";

import { useInstallPrompt } from "@/hooks/useInstallPrompt";
import { Button } from "@/components/ui/Button";

export function InstallPrompt() {
  const { canInstall, isInstalled, install } = useInstallPrompt();

  if (isInstalled || !canInstall) return null;

  return (
    <div className="mx-4 glass-card rounded-2xl p-4 flex items-center gap-4">
      <div className="text-3xl">📱</div>
      <div className="flex-1">
        <p className="font-semibold text-sm">Add to Home Screen</p>
        <p className="text-white/60 text-xs mt-0.5">Quick access — works offline!</p>
      </div>
      <Button size="sm" onClick={install}>
        Install
      </Button>
    </div>
  );
}
