"use client"

import { useState } from "react"
import { Play, X, Clock, Clapperboard } from "lucide-react"
import { useProducts } from "@/lib/product-context"
import { VIDEO_CATEGORIES, type VideoCategory } from "@/lib/demo-store"

export function VideoShowcase() {
  const { getFeaturedVideos } = useProducts()
  const videos = getFeaturedVideos()
  const [activeVideo, setActiveVideo] = useState<string | null>(null)

  if (videos.length === 0) return null

  function getCategoryLabel(cat: VideoCategory) {
    return VIDEO_CATEGORIES.find((c) => c.value === cat)?.label ?? cat
  }

  const categoryColors: Record<VideoCategory, string> = {
    proceso: "bg-accent-teal/10 text-accent-teal",
    tutorial: "bg-primary/10 text-primary",
    "detras-de-camaras": "bg-accent-gold/15 text-accent-gold",
    lookbook: "bg-accent-orange/10 text-accent-orange",
    testimonio: "bg-purple-100 text-purple-700",
  }

  return (
    <section className="bg-muted py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full bg-accent-teal/10 px-4 py-1.5">
            <Clapperboard className="h-4 w-4 text-accent-teal" />
            <span className="text-xs font-bold uppercase tracking-widest text-accent-teal">
              Nuestro Mundo
            </span>
          </div>
          <h2 className="font-serif text-4xl font-bold text-foreground lg:text-5xl text-balance">
            Conoce Nuestro Proceso
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Descubre como nacen nuestras piezas artesanales, aprende a combinarlas y conoce las manos que las crean.
          </p>
        </div>

        {/* Video grid */}
        <div className={`grid gap-6 ${videos.length === 1 ? "grid-cols-1 max-w-2xl mx-auto" : videos.length === 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"}`}>
          {videos.map((video, index) => (
            <div
              key={video.id}
              className={`group cursor-pointer overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:shadow-xl ${
                index === 0 && videos.length >= 3 ? "sm:col-span-2 lg:col-span-1" : ""
              }`}
              onClick={() => video.videoUrl ? setActiveVideo(video.id) : undefined}
              role={video.videoUrl ? "button" : undefined}
              tabIndex={video.videoUrl ? 0 : undefined}
              aria-label={video.videoUrl ? `Reproducir: ${video.title}` : undefined}
            >
              {/* Thumbnail */}
              <div className="relative aspect-video overflow-hidden bg-foreground/5">
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/0 to-foreground/0" />
                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-card/90 text-accent-teal shadow-2xl transition-transform group-hover:scale-110">
                    <Play className="h-7 w-7 fill-accent-teal" />
                  </div>
                </div>
                {/* Duration */}
                <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-md bg-foreground/80 px-2 py-0.5">
                  <Clock className="h-3 w-3 text-card" />
                  <span className="text-xs font-bold text-card">{video.duration}</span>
                </div>
                {/* Category */}
                <span className={`absolute left-3 top-3 rounded-full px-2.5 py-0.5 text-[10px] font-bold ${categoryColors[video.category]}`} style={{ backgroundColor: "rgba(255,255,255,0.9)" }}>
                  {getCategoryLabel(video.category)}
                </span>
              </div>

              {/* Info */}
              <div className="p-5">
                <h3 className="text-base font-bold text-foreground leading-snug">{video.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{video.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video modal */}
      {activeVideo && (() => {
        const video = videos.find((v) => v.id === activeVideo)
        if (!video?.videoUrl) return null
        return (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/80 p-4"
            onClick={() => setActiveVideo(null)}
            role="dialog"
            aria-label={`Reproduciendo: ${video.title}`}
          >
            <div
              className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-card shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveVideo(null)}
                className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-foreground/60 text-card transition-colors hover:bg-foreground/80"
                aria-label="Cerrar video"
              >
                <X className="h-5 w-5" />
              </button>
              <video
                src={video.videoUrl}
                controls
                autoPlay
                className="aspect-video w-full"
              />
              <div className="p-5">
                <h3 className="font-serif text-lg font-bold text-foreground">{video.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{video.description}</p>
              </div>
            </div>
          </div>
        )
      })()}
    </section>
  )
}
