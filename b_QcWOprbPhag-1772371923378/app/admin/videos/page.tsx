"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import {
  Flower,
  Plus,
  Search,
  Edit3,
  Trash2,
  Eye,
  EyeOff,
  ArrowLeft,
  Video,
  Play,
  Star,
  StarOff,
  MoreVertical,
  Filter,
  Upload,
  X,
  Clock,
  Image as ImageIcon,
  Save,
  Clapperboard,
} from "lucide-react"
import { VIDEO_CATEGORIES, type StoreVideo, type VideoCategory } from "@/lib/demo-store"
import { useProducts } from "@/lib/product-context"

export default function AdminVideosPage() {
  const { videos, addVideo, updateVideo, deleteVideo } = useProducts()
  const [view, setView] = useState<"list" | "form">("list")
  const [editVideo, setEditVideo] = useState<StoreVideo | undefined>(undefined)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterCategory, setFilterCategory] = useState<string>("todas")
  const [openMenuId, setOpenMenuId] = useState<string | null>(null)

  // Form state
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState<VideoCategory>("proceso")
  const [videoFile, setVideoFile] = useState("")
  const [thumbnailFile, setThumbnailFile] = useState("")
  const [duration, setDuration] = useState("")
  const [featured, setFeatured] = useState(false)
  const [status, setStatus] = useState<"activo" | "borrador">("borrador")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const videoInputRef = useRef<HTMLInputElement>(null)
  const thumbInputRef = useRef<HTMLInputElement>(null)

  const filteredVideos = videos.filter((v) => {
    const matchesSearch = v.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = filterCategory === "todas" || v.category === filterCategory
    return matchesSearch && matchesCategory
  })

  const totalVideos = videos.length
  const activeVideos = videos.filter((v) => v.status === "activo").length
  const featuredVideos = videos.filter((v) => v.featured).length

  function resetForm(video?: StoreVideo) {
    setTitle(video?.title ?? "")
    setDescription(video?.description ?? "")
    setCategory(video?.category ?? "proceso")
    setVideoFile(video?.videoUrl ?? "")
    setThumbnailFile(video?.thumbnailUrl ?? "")
    setDuration(video?.duration ?? "")
    setFeatured(video?.featured ?? false)
    setStatus(video?.status ?? "borrador")
    setErrors({})
  }

  function openForm(video?: StoreVideo) {
    setEditVideo(video)
    resetForm(video)
    setView("form")
  }

  function handleVideoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 50 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, video: "El video no debe superar 50MB" }))
      return
    }
    const reader = new FileReader()
    reader.onload = (ev) => {
      if (ev.target?.result) setVideoFile(ev.target.result as string)
    }
    reader.readAsDataURL(file)
    e.target.value = ""
  }

  function handleThumbnailUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      if (ev.target?.result) setThumbnailFile(ev.target.result as string)
    }
    reader.readAsDataURL(file)
    e.target.value = ""
  }

  function validate() {
    const errs: Record<string, string> = {}
    if (!title.trim()) errs.title = "El titulo es obligatorio"
    if (!thumbnailFile) errs.thumbnail = "Agrega una imagen de portada"
    if (!duration.trim()) errs.duration = "Indica la duracion"
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  function handleSave() {
    if (!validate()) return
    const data = {
      title: title.trim(),
      description: description.trim(),
      category,
      videoUrl: videoFile,
      thumbnailUrl: thumbnailFile,
      duration: duration.trim(),
      featured,
      status,
    }
    if (editVideo) {
      updateVideo(editVideo.id, data)
    } else {
      addVideo(data as Omit<StoreVideo, "id" | "createdAt">)
    }
    setView("list")
    setEditVideo(undefined)
  }

  function getCategoryLabel(cat: VideoCategory) {
    return VIDEO_CATEGORIES.find((c) => c.value === cat)?.label ?? cat
  }

  const categoryBadgeColors: Record<VideoCategory, string> = {
    proceso: "bg-accent-teal/10 text-accent-teal",
    tutorial: "bg-primary/10 text-primary",
    "detras-de-camaras": "bg-accent-gold/15 text-accent-gold",
    lookbook: "bg-accent-orange/10 text-accent-orange",
    testimonio: "bg-purple-100 text-purple-700",
  }

  const inputClass =
    "w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
  const labelClass = "mb-1.5 block text-sm font-semibold text-foreground"

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver a la tienda
            </Link>
            <div className="hidden h-6 w-px bg-border sm:block" />
            <div className="hidden items-center gap-2 sm:flex">
              <Clapperboard className="h-5 w-5 text-accent-teal" />
              <span className="font-serif text-lg font-bold text-accent-teal">
                Gestor de Videos
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/admin/productos"
              className="hidden rounded-lg border border-border px-4 py-2.5 text-sm font-semibold text-foreground transition-all hover:border-primary hover:text-primary sm:flex"
            >
              Panel de Productos
            </Link>
            {view === "list" && (
              <button
                onClick={() => openForm()}
                className="flex items-center gap-2 rounded-lg bg-accent-teal px-5 py-2.5 text-sm font-bold text-card transition-all hover:bg-accent-teal/90"
              >
                <Plus className="h-4 w-4" />
                Nuevo Video
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        {view === "form" ? (
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-6 font-serif text-3xl font-bold text-foreground">
              {editVideo ? "Editar Video" : "Nuevo Video"}
            </h2>

            <div className="flex flex-col gap-8">
              {/* Info basica */}
              <fieldset className="rounded-2xl border border-border bg-card p-6">
                <legend className="px-2 font-serif text-lg font-bold text-foreground">
                  Informacion del Video
                </legend>
                <div className="mt-2 flex flex-col gap-5">
                  <div>
                    <label htmlFor="vtitle" className={labelClass}>Titulo *</label>
                    <input
                      id="vtitle"
                      className={inputClass}
                      placeholder="Ej: Asi Nacen Nuestros Lazos de Saten"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title}</p>}
                  </div>
                  <div>
                    <label htmlFor="vdesc" className={labelClass}>Descripcion</label>
                    <textarea
                      id="vdesc"
                      className={`${inputClass} min-h-[100px] resize-y`}
                      placeholder="Describe de que trata este video..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="vcategory" className={labelClass}>Categoria</label>
                      <select
                        id="vcategory"
                        className={inputClass}
                        value={category}
                        onChange={(e) => setCategory(e.target.value as VideoCategory)}
                      >
                        {VIDEO_CATEGORIES.map((cat) => (
                          <option key={cat.value} value={cat.value}>{cat.label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="vduration" className={labelClass}>Duracion *</label>
                      <div className="relative">
                        <Clock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <input
                          id="vduration"
                          className={`${inputClass} pl-10`}
                          placeholder="Ej: 2:45"
                          value={duration}
                          onChange={(e) => setDuration(e.target.value)}
                        />
                      </div>
                      {errors.duration && <p className="mt-1 text-xs text-red-500">{errors.duration}</p>}
                    </div>
                  </div>
                </div>
              </fieldset>

              {/* Archivos multimedia */}
              <fieldset className="rounded-2xl border-2 border-accent-teal/30 bg-accent-teal/5 p-6">
                <legend className="px-2 font-serif text-lg font-bold text-foreground">
                  Archivos Multimedia
                </legend>
                <div className="mt-2 flex flex-col gap-6">
                  {/* Video file */}
                  <div>
                    <p className={labelClass}>
                      Archivo de video <span className="font-normal text-muted-foreground">(max 50MB)</span>
                    </p>
                    {videoFile ? (
                      <div className="relative overflow-hidden rounded-xl border border-border bg-muted">
                        <video src={videoFile} controls className="max-h-56 w-full object-contain" />
                        <button
                          type="button"
                          onClick={() => setVideoFile("")}
                          className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-card shadow-lg"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => videoInputRef.current?.click()}
                        className="flex w-full items-center justify-center gap-3 rounded-xl border-2 border-dashed border-accent-teal/40 bg-card py-10 text-muted-foreground transition-all hover:border-accent-teal hover:text-accent-teal"
                      >
                        <Upload className="h-8 w-8" />
                        <div className="text-left">
                          <span className="block text-sm font-bold">Subir video</span>
                          <span className="text-xs">MP4, MOV, WebM</span>
                        </div>
                      </button>
                    )}
                    {errors.video && <p className="mt-1 text-xs text-red-500">{errors.video}</p>}
                    <input
                      ref={videoInputRef}
                      type="file"
                      accept="video/mp4,video/mov,video/webm,video/*"
                      className="hidden"
                      onChange={handleVideoUpload}
                    />
                    <p className="mt-2 text-xs text-muted-foreground">
                      Tambien puedes dejar el video vacio y subir solo la portada como placeholder.
                    </p>
                  </div>

                  {/* Thumbnail */}
                  <div>
                    <p className={labelClass}>
                      Imagen de portada * <span className="font-normal text-muted-foreground">(miniatura)</span>
                    </p>
                    {thumbnailFile ? (
                      <div className="group relative aspect-video max-w-sm overflow-hidden rounded-xl border border-border bg-muted">
                        <img src={thumbnailFile} alt="Portada" className="h-full w-full object-cover" />
                        <button
                          type="button"
                          onClick={() => setThumbnailFile("")}
                          className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-card opacity-0 shadow-lg transition-opacity group-hover:opacity-100"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => thumbInputRef.current?.click()}
                        className="flex aspect-video max-w-sm items-center justify-center gap-3 rounded-xl border-2 border-dashed border-accent-teal/40 bg-card text-muted-foreground transition-all hover:border-accent-teal hover:text-accent-teal"
                      >
                        <ImageIcon className="h-8 w-8" />
                        <div className="text-left">
                          <span className="block text-sm font-bold">Subir portada</span>
                          <span className="text-xs">JPG, PNG, WebP</span>
                        </div>
                      </button>
                    )}
                    {errors.thumbnail && <p className="mt-1 text-xs text-red-500">{errors.thumbnail}</p>}
                    <input
                      ref={thumbInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleThumbnailUpload}
                    />
                  </div>
                </div>
              </fieldset>

              {/* Publicacion */}
              <fieldset className="rounded-2xl border border-border bg-card p-6">
                <legend className="px-2 font-serif text-lg font-bold text-foreground">
                  Publicacion
                </legend>
                <div className="mt-2 flex flex-col gap-5">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="vstatus" className={labelClass}>Estado</label>
                      <select
                        id="vstatus"
                        className={inputClass}
                        value={status}
                        onChange={(e) => setStatus(e.target.value as "activo" | "borrador")}
                      >
                        <option value="borrador">Borrador</option>
                        <option value="activo">Activo (visible en tienda)</option>
                      </select>
                    </div>
                    <div className="flex items-end">
                      <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-border px-4 py-3 transition-all hover:border-accent-teal">
                        <input
                          type="checkbox"
                          checked={featured}
                          onChange={(e) => setFeatured(e.target.checked)}
                          className="h-4 w-4 accent-accent-teal"
                        />
                        <span className="text-sm font-semibold text-foreground">Video destacado en pagina principal</span>
                      </label>
                    </div>
                  </div>
                </div>
              </fieldset>

              {/* Actions */}
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                <button
                  onClick={() => {
                    setView("list")
                    setEditVideo(undefined)
                  }}
                  className="rounded-lg border border-border px-6 py-3 text-sm font-bold text-foreground transition-all hover:border-primary hover:text-primary"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center justify-center gap-2 rounded-lg bg-accent-teal px-6 py-3 text-sm font-bold text-card transition-all hover:bg-accent-teal/90"
                >
                  <Save className="h-4 w-4" />
                  {editVideo ? "Actualizar video" : "Publicar video"}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Stats */}
            <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-teal/10">
                  <Video className="h-6 w-6 text-accent-teal" />
                </div>
                <div>
                  <p className="text-2xl font-black text-foreground">{totalVideos}</p>
                  <p className="text-xs text-muted-foreground">Total videos</p>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100">
                  <Eye className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <p className="text-2xl font-black text-foreground">{activeVideos}</p>
                  <p className="text-xs text-muted-foreground">Publicados</p>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-gold/20">
                  <Star className="h-6 w-6 text-accent-gold" />
                </div>
                <div>
                  <p className="text-2xl font-black text-foreground">{featuredVideos}</p>
                  <p className="text-xs text-muted-foreground">Destacados</p>
                </div>
              </div>
            </div>

            {/* Search and filter */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center rounded-lg border border-border bg-card px-4 py-2.5">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <input
                    className="ml-2 w-48 border-none bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none"
                    placeholder="Buscar videos..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2.5">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <select
                    className="border-none bg-transparent text-sm focus:outline-none"
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                  >
                    <option value="todas">Todas las categorias</option>
                    {VIDEO_CATEGORIES.map((cat) => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                {filteredVideos.length} video{filteredVideos.length !== 1 ? "s" : ""}
              </p>
            </div>

            {/* Video grid */}
            {filteredVideos.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-16">
                <Clapperboard className="mb-4 h-12 w-12 text-muted-foreground/40" />
                <p className="text-lg font-semibold text-foreground">No hay videos</p>
                <p className="mb-6 text-sm text-muted-foreground">
                  Agrega tu primer video para mostrar tus procesos y tutoriales
                </p>
                <button
                  onClick={() => openForm()}
                  className="flex items-center gap-2 rounded-lg bg-accent-teal px-5 py-2.5 text-sm font-bold text-card"
                >
                  <Plus className="h-4 w-4" />
                  Agregar video
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredVideos.map((video) => (
                  <div
                    key={video.id}
                    className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:shadow-lg"
                  >
                    {/* Thumbnail */}
                    <div className="relative aspect-video overflow-hidden bg-muted">
                      {video.thumbnailUrl ? (
                        <img
                          src={video.thumbnailUrl}
                          alt={video.title}
                          className="h-full w-full object-cover transition-transform group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <Video className="h-12 w-12 text-muted-foreground/30" />
                        </div>
                      )}
                      {/* Play overlay */}
                      <div className="absolute inset-0 flex items-center justify-center bg-foreground/0 transition-colors group-hover:bg-foreground/20">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-card/90 text-accent-teal opacity-0 shadow-xl transition-opacity group-hover:opacity-100">
                          <Play className="h-6 w-6 fill-accent-teal" />
                        </div>
                      </div>
                      {/* Duration badge */}
                      <span className="absolute bottom-3 right-3 rounded-md bg-foreground/80 px-2 py-0.5 text-xs font-bold text-card">
                        {video.duration}
                      </span>
                      {/* Featured star */}
                      {video.featured && (
                        <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-accent-gold px-2.5 py-0.5 text-[10px] font-bold text-card">
                          <Star className="h-3 w-3 fill-card" /> Destacado
                        </span>
                      )}
                      {/* Status */}
                      {video.status === "borrador" && (
                        <span className="absolute right-3 top-3 rounded-full bg-amber-500 px-2.5 py-0.5 text-[10px] font-bold text-card">
                          Borrador
                        </span>
                      )}
                    </div>

                    {/* Info */}
                    <div className="p-5">
                      <div className="mb-2 flex items-start justify-between gap-2">
                        <h3 className="text-sm font-bold text-foreground leading-snug">{video.title}</h3>
                        <div className="relative flex-shrink-0">
                          <button
                            onClick={() => setOpenMenuId(openMenuId === video.id ? null : video.id)}
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
                            aria-label="Opciones"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </button>
                          {openMenuId === video.id && (
                            <div className="absolute right-0 top-10 z-20 w-48 overflow-hidden rounded-xl border border-border bg-card shadow-xl">
                              <button
                                onClick={() => {
                                  openForm(video)
                                  setOpenMenuId(null)
                                }}
                                className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-foreground hover:bg-muted"
                              >
                                <Edit3 className="h-4 w-4" /> Editar
                              </button>
                              <button
                                onClick={() => {
                                  updateVideo(video.id, { featured: !video.featured })
                                  setOpenMenuId(null)
                                }}
                                className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-foreground hover:bg-muted"
                              >
                                {video.featured ? <StarOff className="h-4 w-4" /> : <Star className="h-4 w-4" />}
                                {video.featured ? "Quitar destacado" : "Destacar"}
                              </button>
                              <button
                                onClick={() => {
                                  updateVideo(video.id, { status: video.status === "activo" ? "borrador" : "activo" })
                                  setOpenMenuId(null)
                                }}
                                className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-foreground hover:bg-muted"
                              >
                                {video.status === "activo" ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                {video.status === "activo" ? "Ocultar" : "Publicar"}
                              </button>
                              <button
                                onClick={() => {
                                  deleteVideo(video.id)
                                  setOpenMenuId(null)
                                }}
                                className="flex w-full items-center gap-2 border-t border-border px-4 py-2.5 text-sm text-red-500 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4" /> Eliminar
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                      <p className="mb-3 line-clamp-2 text-xs leading-relaxed text-muted-foreground">{video.description}</p>
                      <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-bold ${categoryBadgeColors[video.category]}`}>
                        {getCategoryLabel(video.category)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}
