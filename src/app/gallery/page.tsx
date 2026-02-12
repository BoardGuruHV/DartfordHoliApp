"use client";

import { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { generateId } from "@/lib/utils";
import type { GalleryPhoto } from "@/types";

export default function GalleryPage() {
  const [photos, setPhotos] = useLocalStorage<GalleryPhoto[]>("holi-gallery", []);
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);

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
            <span className="text-xs text-white/50 block mt-1">Photos are stored on your device only</span>
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
          <div className="text-center py-12 text-white/40">
            <p className="text-4xl mb-3">🎨</p>
            <p>No photos yet. Take some colourful snaps!</p>
          </div>
        )}
      </div>

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
              <span className="text-xs text-white/50">
                {new Date(selectedPhoto.timestamp).toLocaleString()}
              </span>
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
        )}
      </Modal>
    </div>
  );
}
