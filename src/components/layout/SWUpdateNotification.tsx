"use client";

import { useState, useEffect } from "react";

export function SWUpdateNotification() {
  const [showUpdate, setShowUpdate] = useState(false);

  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    const handleControllerChange = () => {
      setShowUpdate(true);
    };

    navigator.serviceWorker.addEventListener("controllerchange", handleControllerChange);

    // Also check for waiting service worker on load
    navigator.serviceWorker.ready.then((registration) => {
      if (registration.waiting) {
        setShowUpdate(true);
      }

      registration.addEventListener("updatefound", () => {
        const newWorker = registration.installing;
        if (!newWorker) return;
        newWorker.addEventListener("statechange", () => {
          if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
            setShowUpdate(true);
          }
        });
      });
    });

    return () => {
      navigator.serviceWorker.removeEventListener("controllerchange", handleControllerChange);
    };
  }, []);

  if (!showUpdate) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-holi-purple text-white text-center py-3 px-4 text-sm font-medium shadow-lg">
      <span>A new version is available!</span>
      <button
        onClick={() => window.location.reload()}
        className="ml-3 underline font-bold hover:text-holi-yellow transition-colors"
      >
        Refresh
      </button>
    </div>
  );
}
