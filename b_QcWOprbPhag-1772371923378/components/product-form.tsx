"use client"

import { useState, useRef } from "react"
import {
  X,
  Upload,
  Video,
  Image as ImageIcon,
  Plus,
  Trash2,
  Save,
  Eye,
  Tag,
} from "lucide-react"
import { CATEGORIES, PLACEMENT_OPTIONS, type Product, type ProductPlacement } from "@/lib/demo-store"

interface ProductFormProps {
  product?: Product
  onSave: (product: Omit<Product, "id" | "createdAt">) => void
  onCancel: () => void
}

export function ProductForm({ product, onSave, onCancel }: ProductFormProps) {
  const [name, setName] = useState(product?.name ?? "")
  const [description, setDescription] = useState(product?.description ?? "")
  const [price, setPrice] = useState(product?.price?.toString() ?? "")
  const [comparePrice, setComparePrice] = useState(product?.comparePrice?.toString() ?? "")
  const [category, setCategory] = useState(product?.category ?? "")
  const [stock, setStock] = useState(product?.stock?.toString() ?? "")
  const [sku, setSku] = useState(product?.sku ?? "")
  const [images, setImages] = useState<string[]>(product?.images ?? [])
  const [videoUrl, setVideoUrl] = useState(product?.videoUrl ?? "")
  const [tags, setTags] = useState<string[]>(product?.tags ?? [])
  const [tagInput, setTagInput] = useState("")
  const [status, setStatus] = useState<Product["status"]>(product?.status ?? "borrador")
  const [featured, setFeatured] = useState(product?.featured ?? false)
  const [placement, setPlacement] = useState<ProductPlacement>(product?.placement ?? "ninguna")
  const [placementOrder, setPlacementOrder] = useState(product?.placementOrder?.toString() ?? "1")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoInputRef = useRef<HTMLInputElement>(null)

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files
    if (!files) return
    Array.from(files).forEach((file) => {
      const reader = new FileReader()
      reader.onload = (ev) => {
        if (ev.target?.result) {
          setImages((prev) => [...prev, ev.target!.result as string])
        }
      }
      reader.readAsDataURL(file)
    })
    e.target.value = ""
  }

  function handleVideoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      if (ev.target?.result) {
        setVideoUrl(ev.target.result as string)
      }
    }
    reader.readAsDataURL(file)
    e.target.value = ""
  }

  function removeImage(index: number) {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  function addTag() {
    const t = tagInput.trim().toLowerCase()
    if (t && !tags.includes(t)) {
      setTags((prev) => [...prev, t])
    }
    setTagInput("")
  }

  function removeTag(tag: string) {
    setTags((prev) => prev.filter((t) => t !== tag))
  }

  function validate() {
    const errs: Record<string, string> = {}
    if (!name.trim()) errs.name = "El nombre es obligatorio"
    if (!price || Number(price) <= 0) errs.price = "Ingresa un precio valido"
    if (!category) errs.category = "Selecciona una categoria"
    if (!stock || Number(stock) < 0) errs.stock = "Ingresa un stock valido"
    if (!sku.trim()) errs.sku = "El SKU es obligatorio"
    if (images.length === 0) errs.images = "Agrega al menos una imagen"
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    onSave({
      name: name.trim(),
      description: description.trim(),
      price: Number(price),
      comparePrice: comparePrice ? Number(comparePrice) : undefined,
      category,
      stock: Number(stock),
      sku: sku.trim(),
      images,
      videoUrl: videoUrl || undefined,
      tags,
      status,
      featured,
      placement,
      placementOrder: Number(placementOrder) || 1,
    })
  }

  const inputClass =
    "w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
  const labelClass = "mb-1.5 block text-sm font-semibold text-foreground"
  const errorClass = "mt-1 text-xs text-red-500"

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      {/* Informacion basica */}
      <fieldset className="rounded-2xl border border-border bg-card p-6">
        <legend className="px-2 font-serif text-lg font-bold text-foreground">
          Informacion del Producto
        </legend>
        <div className="mt-2 flex flex-col gap-5">
          <div>
            <label htmlFor="name" className={labelClass}>Nombre del producto *</label>
            <input
              id="name"
              className={inputClass}
              placeholder="Ej: Lazo de Saten Dorado Premium"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <p className={errorClass}>{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="desc" className={labelClass}>Descripcion</label>
            <textarea
              id="desc"
              className={`${inputClass} min-h-[100px] resize-y`}
              placeholder="Describe tu producto: materiales, tamano, ocasion de uso..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="category" className={labelClass}>Categoria *</label>
              <select
                id="category"
                className={inputClass}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Seleccionar categoria</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              {errors.category && <p className={errorClass}>{errors.category}</p>}
            </div>
            <div>
              <label htmlFor="sku" className={labelClass}>SKU / Referencia *</label>
              <input
                id="sku"
                className={inputClass}
                placeholder="Ej: LAZ-DON-005"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
              />
              {errors.sku && <p className={errorClass}>{errors.sku}</p>}
            </div>
          </div>
        </div>
      </fieldset>

      {/* Precio y stock */}
      <fieldset className="rounded-2xl border border-border bg-card p-6">
        <legend className="px-2 font-serif text-lg font-bold text-foreground">
          Precio e Inventario
        </legend>
        <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div>
            <label htmlFor="price" className={labelClass}>Precio (COP) *</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">$</span>
              <input
                id="price"
                type="number"
                className={`${inputClass} pl-8`}
                placeholder="85000"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                min="0"
              />
            </div>
            {errors.price && <p className={errorClass}>{errors.price}</p>}
          </div>
          <div>
            <label htmlFor="comparePrice" className={labelClass}>Precio anterior (opcional)</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">$</span>
              <input
                id="comparePrice"
                type="number"
                className={`${inputClass} pl-8`}
                placeholder="100000"
                value={comparePrice}
                onChange={(e) => setComparePrice(e.target.value)}
                min="0"
              />
            </div>
          </div>
          <div>
            <label htmlFor="stock" className={labelClass}>Cantidad en stock *</label>
            <input
              id="stock"
              type="number"
              className={inputClass}
              placeholder="10"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              min="0"
            />
            {errors.stock && <p className={errorClass}>{errors.stock}</p>}
          </div>
        </div>
      </fieldset>

      {/* Imagenes y video */}
      <fieldset className="rounded-2xl border border-border bg-card p-6">
        <legend className="px-2 font-serif text-lg font-bold text-foreground">
          Fotos y Video
        </legend>
        <div className="mt-2 flex flex-col gap-5">
          <div>
            <p className={labelClass}>Imagenes del producto * <span className="font-normal text-muted-foreground">(max 6)</span></p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {images.map((img, i) => (
                <div key={i} className="group relative aspect-square overflow-hidden rounded-xl border border-border bg-muted">
                  <img src={img} alt={`Producto ${i + 1}`} className="h-full w-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-red-500 text-white opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
              {images.length < 6 && (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex aspect-square flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-muted/50 text-muted-foreground transition-all hover:border-primary hover:text-primary"
                >
                  <ImageIcon className="h-8 w-8" />
                  <span className="text-xs font-semibold">Agregar foto</span>
                </button>
              )}
            </div>
            {errors.images && <p className={errorClass}>{errors.images}</p>}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>

          <div>
            <p className={labelClass}>Video del producto <span className="font-normal text-muted-foreground">(opcional)</span></p>
            {videoUrl ? (
              <div className="relative overflow-hidden rounded-xl border border-border bg-muted">
                <video src={videoUrl} controls className="max-h-48 w-full object-contain" />
                <button
                  type="button"
                  onClick={() => setVideoUrl("")}
                  className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-red-500 text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => videoInputRef.current?.click()}
                className="flex w-full items-center justify-center gap-3 rounded-xl border-2 border-dashed border-border bg-muted/50 py-8 text-muted-foreground transition-all hover:border-primary hover:text-primary"
              >
                <Video className="h-8 w-8" />
                <span className="text-sm font-semibold">Subir video del producto</span>
              </button>
            )}
            <input
              ref={videoInputRef}
              type="file"
              accept="video/*"
              className="hidden"
              onChange={handleVideoUpload}
            />
          </div>
        </div>
      </fieldset>

      {/* Ubicacion en la pagina */}
      <fieldset className="rounded-2xl border-2 border-accent-gold/30 bg-accent-gold/5 p-6">
        <legend className="px-2 font-serif text-lg font-bold text-foreground">
          Ubicacion en Pagina Principal
        </legend>
        <p className="mb-4 text-sm text-muted-foreground">
          Elige donde aparecera este producto en la pagina principal de tu tienda. Puedes cambiarlo en cualquier momento.
        </p>
        <div className="mt-2 flex flex-col gap-3">
          {PLACEMENT_OPTIONS.map((opt) => (
            <label
              key={opt.value}
              className={`flex cursor-pointer items-start gap-4 rounded-xl border-2 p-4 transition-all ${
                placement === opt.value
                  ? "border-accent-gold bg-card shadow-sm"
                  : "border-border bg-card/50 hover:border-accent-gold/50"
              }`}
            >
              <input
                type="radio"
                name="placement"
                value={opt.value}
                checked={placement === opt.value}
                onChange={() => setPlacement(opt.value)}
                className="mt-1 h-4 w-4 accent-accent-gold"
              />
              <div className="flex-1">
                <span className="text-sm font-bold text-foreground">{opt.label}</span>
                {opt.value === "hero" && (
                  <span className="ml-2 inline-flex rounded-full bg-accent-gold/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-accent-gold">
                    Posicion #1
                  </span>
                )}
                <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">{opt.description}</p>
              </div>
            </label>
          ))}
        </div>
        {placement === "destacados" && (
          <div className="mt-4">
            <label htmlFor="placementOrder" className="mb-1.5 block text-sm font-semibold text-foreground">
              Orden de aparicion (1 = primero)
            </label>
            <input
              id="placementOrder"
              type="number"
              min="1"
              max="4"
              className="w-24 rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              value={placementOrder}
              onChange={(e) => setPlacementOrder(e.target.value)}
            />
            <p className="mt-1 text-xs text-muted-foreground">Maximo 4 productos en esta seccion</p>
          </div>
        )}
      </fieldset>

      {/* Etiquetas y estado */}
      <fieldset className="rounded-2xl border border-border bg-card p-6">
        <legend className="px-2 font-serif text-lg font-bold text-foreground">
          Etiquetas y Estado
        </legend>
        <div className="mt-2 flex flex-col gap-5">
          <div>
            <label htmlFor="tags" className={labelClass}>Etiquetas</label>
            <div className="flex gap-2">
              <input
                id="tags"
                className={`${inputClass} flex-1`}
                placeholder="Escribe y presiona Enter o +"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    addTag()
                  }
                }}
              />
              <button
                type="button"
                onClick={addTag}
                className="flex items-center justify-center rounded-lg bg-primary/10 px-4 text-primary transition-all hover:bg-primary/20"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>
            {tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary"
                  >
                    <Tag className="h-3 w-3" />
                    {tag}
                    <button type="button" onClick={() => removeTag(tag)} className="hover:text-red-500">
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="status" className={labelClass}>Estado</label>
              <select
                id="status"
                className={inputClass}
                value={status}
                onChange={(e) => setStatus(e.target.value as Product["status"])}
              >
                <option value="borrador">Borrador</option>
                <option value="activo">Activo (visible en tienda)</option>
                <option value="agotado">Agotado</option>
              </select>
            </div>
            <div className="flex items-end">
              <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-border px-4 py-3 transition-all hover:border-primary">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="h-4 w-4 accent-primary"
                />
                <span className="text-sm font-semibold text-foreground">Producto destacado</span>
              </label>
            </div>
          </div>
        </div>
      </fieldset>

      {/* Acciones */}
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-border px-6 py-3 text-sm font-bold text-foreground transition-all hover:border-primary hover:text-primary"
        >
          Cancelar
        </button>
        <button
          type="button"
          onClick={() => {
            if (validate()) {
              setStatus("borrador")
            }
          }}
          className="flex items-center justify-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-bold text-foreground transition-all hover:border-primary hover:text-primary"
        >
          <Eye className="h-4 w-4" />
          Guardar como borrador
        </button>
        <button
          type="submit"
          className="flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-all hover:bg-primary/90"
        >
          <Save className="h-4 w-4" />
          {product ? "Actualizar producto" : "Publicar producto"}
        </button>
      </div>
    </form>
  )
}
