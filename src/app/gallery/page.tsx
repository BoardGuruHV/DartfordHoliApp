"use client";

import { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { ShareButton } from "@/components/ui/ShareButton";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { QRCodeSVG } from "qrcode.react";
import { generateId, cn } from "@/lib/utils";
import type { GalleryPhoto } from "@/types";

type Tab = "my-photos" | "community";

export default function GalleryPage() {
  const [photos, setPhotos] = useLocalStorage<GalleryPhoto[]>("holi-gallery", []);
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);
  const [tab, setTab] = useState<Tab>("my-photos");
  const [showQR, setShowQR] = useState(false);

  const galleryUrl = typeof window !== "undefined" ? `${window.location.origin}/gallery` : "";

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const newPhoto: GalleryPhoto = {
          id: generateId(),
          src: ev.target?.result as string,
          timestamp: new Date().toISOString(),
        };
        setPhotos((prev) => [newPhoto, ...prev]);
      };
      reader.readAsDataURL(file);
    });
    e.target.value = "";
  };

  return (
    <div>
      <PageHeader title="Photo Gallery" subtitle="Share your Holi moments!" />

      <div className="px-4">
        {/* Tab switcher */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setTab("my-photos")}
            className={cn(
              "flex-1 py-2 rounded-xl text-sm font-medium transition-colors",
              tab === "my-photos"
                ? "bg-holi-pink text-white"
                : "bg-holi-surface text-white/60 hover:text-white"
            )}
          >
            📱 My Photos {photos.length > 0 && `(${photos.length})`}
          </button>
          <button
            onClick={() => setTab("community")}
            className={cn(
              "flex-1 py-2 rounded-xl text-sm font-medium transition-colors",
              tab === "community"
                ? "bg-holi-purple text-white"
                : "bg-holi-surface text-white/60 hover:text-white"
            )}
          >
            🌍 Community
          </button>
        </div>

        {tab === "my-photos" && (
          <>
            {/* Upload button */}
            <label className="block mb-4">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleUpload}
                className="hidden"
              />
              <div className="glass-card rounded-xl p-4 text-center cursor-pointer hover:bg-white/5 transition-colors">
                <span className="text-3xl block mb-2">📸</span>
                <span className="text-sm font-medium">Tap to add photos</span>
                <span className="text-xs text-white/60 block mt-1">Photos are stored on your device only</span>
              </div>
            </label>

            {/* Photo grid */}
            {photos.length > 0 ? (
              <div className="grid grid-cols-3 gap-2">
                {photos.map((photo) => (
                  <button
                    key={photo.id}
                    className="aspect-square rounded-xl overflow-hidden hover:opacity-80 transition-opacity"
                    onClick={() => setSelectedPhoto(photo)}
                  >
                    <img
                      src={photo.src}
                      alt={photo.caption || "Festival photo"}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-white/60">
                <p className="text-4xl mb-3">🎨</p>
                <p>No photos yet. Take some colourful snaps!</p>
              </div>
            )}
          </>
        )}

        {tab === "community" && (
          <div className="space-y-4">
            {/* QR Code section */}
            <div className="glass-card rounded-xl p-6 text-center">
              <h3 className="font-semibold mb-2">Scan to Upload Photos</h3>
              <p className="text-xs text-white/60 mb-4">
                Share this QR code with friends at the festival so they can upload their photos too!
              </p>

              <button
                onClick={() => setShowQR(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-holi-purple/30 border border-holi-purple/30 text-sm font-medium hover:bg-holi-purple/40 transition-colors"
              >
                📱 Show QR Code
              </button>
            </div>

            {/* Community info */}
            <div className="glass-card rounded-xl p-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🌍</span>
                <div>
                  <h3 className="font-semibold text-sm">Community Photo Wall</h3>
                  <p className="text-xs text-white/60 mt-1 leading-relaxed">
                    A shared photo wall will be displayed at the festival venue near the Information Tent.
                    Upload your best shots and they may appear on the big screen!
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-xl p-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">📤</span>
                <div>
                  <h3 className="font-semibold text-sm">Share Your Gallery</h3>
                  <p className="text-xs text-white/60 mt-1 leading-relaxed">
                    Tag your photos with <strong className="text-holi-pink">#DartfordHoli</strong> on Instagram and we&apos;ll feature the best ones!
                  </p>
                  <div className="mt-3">
                    <ShareButton
                      title="Dartford Holi Festival Gallery"
                      text="Check out my photos from the Dartford Holi Festival! 🎨🪔 #DartfordHoli"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* QR Code Modal */}
      <Modal isOpen={showQR} onClose={() => setShowQR(false)}>
        <div className="text-center py-4">
          <h3 className="font-semibold text-lg mb-4">Scan to Open Gallery</h3>
          <div className="flex flex-col items-center gap-3">
            <div className="bg-white p-3 rounded-xl">
              <QRCodeSVG
                value={galleryUrl || "https://dartford-holi.vercel.app/gallery"}
                size={160}
                level="M"
                fgColor="#1a0a2e"
                imageSettings={{
                  src: "",
                  height: 0,
                  width: 0,
                  excavate: false,
                }}
              />
            </div>
            <p className="text-xs text-white/60 break-all max-w-[200px]">{galleryUrl}</p>
          </div>
          <p className="text-xs text-white/60 mt-4">
            Point your phone camera at this QR code to open the photo gallery
          </p>
          <Button
            variant="secondary"
            size="sm"
            className="mt-4"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(galleryUrl);
              } catch {
                // fallback handled
              }
            }}
          >
            📋 Copy Link
          </Button>
        </div>
      </Modal>

      {/* Lightbox */}
      <Modal isOpen={!!selectedPhoto} onClose={() => setSelectedPhoto(null)}>
        {selectedPhoto && (
          <div>
            <img
              src={selectedPhoto.src}
              alt={selectedPhoto.caption || "Festival photo"}
              className="w-full rounded-xl"
            />
            <div className="flex justify-between items-center mt-3">
              <span className="text-xs text-white/60">
                {new Date(selectedPhoto.timestamp).toLocaleString()}
              </span>
              <div className="flex items-center gap-2">
                <ShareButton
                  title="Holi Festival Photo"
                  text="Check out this photo from the Dartford Holi Festival! 🎨"
                />
                <Button
                variant="danger"
                size="sm"
                onClick={() => {
                  setPhotos((prev) => prev.filter((p) => p.id !== selectedPhoto.id));
                  setSelectedPhoto(null);
                }}
              >
                Delete
              </Button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
