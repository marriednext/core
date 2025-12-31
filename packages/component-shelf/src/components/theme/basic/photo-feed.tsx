"use client";

import type React from "react";
import { useState, useRef, useCallback } from "react";
import { Upload, X, ImageIcon, Loader2 } from "lucide-react";
import type { PhotoFeedProps } from "./types";

const defaultCustomization = {
  dropZoneLabel: "DROP PHOTOS HERE",
  dropZoneSubLabel: "OR CLICK TO SELECT",
  uploadingLabel: "UPLOADING...",
  photoCountLabel: "PHOTOS",
  noPhotosLabel: "NO PHOTOS YET",
  noPhotosSubLabel: "BE THE FIRST TO SHARE",
  errorLabel: "UNABLE TO LOAD PHOTOS. REFRESH TO TRY AGAIN.",
};

export function PhotoFeed({
  data,
  customization = defaultCustomization,
  onUpload,
  ImageComponent = "img",
}: PhotoFeedProps) {
  const labels = { ...defaultCustomization, ...customization };
  const photos = data.photos || [];
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<{ url: string } | null>(
    null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = useCallback(
    async (files: FileList | null) => {
      if (!files || files.length === 0 || !onUpload) return;

      setIsUploading(true);
      try {
        await onUpload(files);
      } finally {
        setIsUploading(false);
      }
    },
    [onUpload]
  );

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      handleUpload(e.dataTransfer.files);
    },
    [handleUpload]
  );

  return (
    <>
      <section className="py-12 md:py-16 border-b-2 border-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed cursor-pointer transition-all duration-300 p-12 md:p-16 flex flex-col items-center justify-center gap-6 ${
              dragActive
                ? "border-foreground bg-foreground/5"
                : "border-foreground/30 hover:border-foreground hover:bg-foreground/5"
            }`}
          >
            {isUploading ? (
              <>
                <Loader2 size={48} strokeWidth={1} className="animate-spin" />
                <span className="text-xs tracking-[0.3em]">
                  {labels.uploadingLabel}
                </span>
              </>
            ) : (
              <>
                <Upload size={48} strokeWidth={1} />
                <div className="text-center">
                  <span className="text-xs tracking-[0.3em] block">
                    {labels.dropZoneLabel}
                  </span>
                  <span className="text-xs tracking-[0.2em] opacity-50 mt-2 block">
                    {labels.dropZoneSubLabel}
                  </span>
                </div>
              </>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => handleUpload(e.target.files)}
            className="hidden"
          />
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <span className="text-xs tracking-[0.3em] opacity-50">
              {photos.length} {labels.photoCountLabel}
            </span>
          </div>

          {photos.length === 0 ? (
            <div className="border-2 border-foreground/20 p-16 md:p-24 flex flex-col items-center justify-center gap-6">
              <ImageIcon size={64} strokeWidth={0.5} className="opacity-30" />
              <p className="text-xs tracking-[0.3em] opacity-50">
                {labels.noPhotosLabel}
              </p>
              <p className="text-xs tracking-[0.2em] opacity-30">
                {labels.noPhotosSubLabel}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-foreground/20">
              {photos.map((photo, index) => (
                <button
                  key={photo.url}
                  onClick={() => setSelectedPhoto(photo)}
                  className="relative aspect-square bg-background overflow-hidden group"
                >
                  <ImageComponent
                    src={photo.url || "/placeholder.svg"}
                    alt={`Wedding photo ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors" />
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-background/95 flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <button
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-6 right-6 p-2 hover:opacity-50 transition-opacity"
            aria-label="Close"
          >
            <X size={32} strokeWidth={1} />
          </button>
          <div
            className="relative max-w-5xl max-h-[80vh] w-full h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <ImageComponent
              src={selectedPhoto.url || "/placeholder.svg"}
              alt="Wedding photo"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}
