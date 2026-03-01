"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Flower,
  Plus,
  Search,
  Edit3,
  Trash2,
  Eye,
  ArrowLeft,
  Package,
  DollarSign,
  Archive,
  Star,
  MoreVertical,
  Filter,
  LayoutDashboard,
  ArrowUpDown,
} from "lucide-react"
import { type Product, PLACEMENT_OPTIONS } from "@/lib/demo-store"
import { useProducts } from "@/lib/product-context"
import { ProductForm } from "@/components/product-form"

export default function AdminProductsPage() {
  const { products, addProduct, updateProduct, deleteProduct, setProductPlacement } = useProducts()
  const [view, setView] = useState<"list" | "form">("list")
  const [editProduct, setEditProduct] = useState<Product | undefined>(undefined)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("todos")
  const [openMenuId, setOpenMenuId] = useState<string | null>(null)

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === "todos" || p.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const totalProducts = products.length
  const activeProducts = products.filter((p) => p.status === "activo").length
  const totalStock = products.reduce((sum, p) => sum + p.stock, 0)
  const totalValue = products.reduce((sum, p) => sum + p.price * p.stock, 0)

  function handleSave(data: Omit<Product, "id" | "createdAt">) {
    if (editProduct) {
      updateProduct(editProduct.id, data)
    } else {
      addProduct(data)
    }
    setView("list")
    setEditProduct(undefined)
  }

  function handleDelete(id: string) {
    deleteProduct(id)
    setOpenMenuId(null)
  }

  function handleEdit(product: Product) {
    setEditProduct(product)
    setView("form")
    setOpenMenuId(null)
  }

  function formatPrice(n: number) {
    return new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(n)
  }

  const statusBadge = (s: Product["status"]) => {
    const styles: Record<string, string> = {
      activo: "bg-emerald-100 text-emerald-700",
      borrador: "bg-amber-100 text-amber-700",
      agotado: "bg-red-100 text-red-700",
    }
    const labels: Record<string, string> = {
      activo: "Activo",
      borrador: "Borrador",
      agotado: "Agotado",
    }
    return (
      <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-bold ${styles[s]}`}>
        {labels[s]}
      </span>
    )
  }

  const placementBadge = (p: Product) => {
    if (p.placement === "hero") {
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-accent-gold/20 px-2.5 py-0.5 text-xs font-bold text-accent-gold">
          <LayoutDashboard className="h-3 w-3" /> Banner
        </span>
      )
    }
    if (p.placement === "destacados") {
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary">
          <Star className="h-3 w-3" /> Destacado #{p.placementOrder}
        </span>
      )
    }
    return (
      <span className="inline-flex rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground">
        Solo tienda
      </span>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header admin */}
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
              <Flower className="h-5 w-5 text-primary" />
              <span className="font-serif text-lg font-bold text-primary">Panel de Productos</span>
            </div>
          </div>
          {view === "list" && (
            <button
              onClick={() => {
                setEditProduct(undefined)
                setView("form")
              }}
              className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition-all hover:bg-primary/90"
            >
              <Plus className="h-4 w-4" />
              Nuevo Producto
            </button>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        {view === "form" ? (
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-6 font-serif text-3xl font-bold text-foreground">
              {editProduct ? "Editar Producto" : "Nuevo Producto"}
            </h2>
            <ProductForm
              product={editProduct}
              onSave={handleSave}
              onCancel={() => {
                setView("list")
                setEditProduct(undefined)
              }}
            />
          </div>
        ) : (
          <>
            {/* Stats */}
            <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
              <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <Package className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-black text-foreground">{totalProducts}</p>
                  <p className="text-xs text-muted-foreground">Total productos</p>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100">
                  <Eye className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <p className="text-2xl font-black text-foreground">{activeProducts}</p>
                  <p className="text-xs text-muted-foreground">Activos</p>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-gold/20">
                  <Archive className="h-6 w-6 text-accent-gold" />
                </div>
                <div>
                  <p className="text-2xl font-black text-foreground">{totalStock}</p>
                  <p className="text-xs text-muted-foreground">Unidades en stock</p>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-teal/10">
                  <DollarSign className="h-6 w-6 text-accent-teal" />
                </div>
                <div>
                  <p className="text-2xl font-black text-foreground">{formatPrice(totalValue)}</p>
                  <p className="text-xs text-muted-foreground">Valor inventario</p>
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
                    placeholder="Buscar por nombre o SKU..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2.5">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <select
                    className="border-none bg-transparent text-sm focus:outline-none"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    <option value="todos">Todos</option>
                    <option value="activo">Activos</option>
                    <option value="borrador">Borradores</option>
                    <option value="agotado">Agotados</option>
                  </select>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                {filteredProducts.length} producto{filteredProducts.length !== 1 ? "s" : ""}
              </p>
            </div>

            {/* Product list */}
            {filteredProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-16">
                <Package className="mb-4 h-12 w-12 text-muted-foreground/40" />
                <p className="text-lg font-semibold text-foreground">No hay productos</p>
                <p className="mb-6 text-sm text-muted-foreground">
                  {searchQuery || filterStatus !== "todos"
                    ? "No se encontraron productos con esos filtros"
                    : "Agrega tu primer producto para comenzar"}
                </p>
                {!searchQuery && filterStatus === "todos" && (
                  <button
                    onClick={() => {
                      setEditProduct(undefined)
                      setView("form")
                    }}
                    className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground"
                  >
                    <Plus className="h-4 w-4" />
                    Agregar producto
                  </button>
                )}
              </div>
            ) : (
              <div className="overflow-hidden rounded-2xl border border-border bg-card">
                {/* Table header */}
                <div className="hidden border-b border-border bg-muted/50 px-6 py-3 md:grid md:grid-cols-12 md:gap-4">
                  <span className="col-span-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Producto</span>
                  <span className="col-span-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">Precio</span>
                  <span className="col-span-1 text-xs font-bold uppercase tracking-wider text-muted-foreground">Stock</span>
                  <span className="col-span-1 text-xs font-bold uppercase tracking-wider text-muted-foreground">Estado</span>
                  <span className="col-span-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">Ubicacion</span>
                  <span className="col-span-2 text-xs font-bold uppercase tracking-wider text-muted-foreground text-right">Acciones</span>
                </div>
                {/* Rows */}
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex flex-col gap-4 border-b border-border px-6 py-4 last:border-b-0 md:grid md:grid-cols-12 md:items-center md:gap-4"
                  >
                    <div className="col-span-4 flex items-center gap-4">
                      <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-xl bg-muted">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold text-foreground">{product.name}</p>
                        <p className="text-xs text-muted-foreground">{product.category} &middot; {product.sku}</p>
                      </div>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm font-bold text-foreground">{formatPrice(product.price)}</p>
                      {product.comparePrice && (
                        <p className="text-xs text-muted-foreground line-through">{formatPrice(product.comparePrice)}</p>
                      )}
                    </div>
                    <div className="col-span-1">
                      <p className={`text-sm font-bold ${product.stock <= 5 ? "text-red-500" : "text-foreground"}`}>
                        {product.stock}
                      </p>
                    </div>
                    <div className="col-span-1">{statusBadge(product.status)}</div>
                    <div className="col-span-2">{placementBadge(product)}</div>
                    <div className="col-span-2 flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-all hover:border-primary hover:text-primary"
                        aria-label="Editar producto"
                      >
                        <Edit3 className="h-4 w-4" />
                      </button>
                      <div className="relative">
                        <button
                          onClick={() => setOpenMenuId(openMenuId === product.id ? null : product.id)}
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-all hover:border-primary hover:text-primary"
                          aria-label="Mas opciones"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </button>
                        {openMenuId === product.id && (
                          <div className="absolute right-0 top-11 z-20 w-52 overflow-hidden rounded-xl border border-border bg-card shadow-xl">
                            <button
                              onClick={() => {
                                updateProduct(product.id, {
                                  status: product.status === "activo" ? "borrador" : "activo",
                                })
                                setOpenMenuId(null)
                              }}
                              className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-foreground hover:bg-muted"
                            >
                              <Eye className="h-4 w-4" />
                              {product.status === "activo" ? "Desactivar" : "Activar"}
                            </button>
                            <div className="border-t border-border px-4 py-2">
                              <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Mover a:</p>
                              {PLACEMENT_OPTIONS.map((opt) => (
                                <button
                                  key={opt.value}
                                  onClick={() => {
                                    setProductPlacement(product.id, opt.value)
                                    setOpenMenuId(null)
                                  }}
                                  className={`flex w-full items-center gap-2 rounded px-2 py-1.5 text-xs transition-colors ${
                                    product.placement === opt.value
                                      ? "bg-primary/10 font-bold text-primary"
                                      : "text-foreground hover:bg-muted"
                                  }`}
                                >
                                  {opt.value === "hero" && <LayoutDashboard className="h-3 w-3" />}
                                  {opt.value === "destacados" && <Star className="h-3 w-3" />}
                                  {opt.value === "ninguna" && <ArrowUpDown className="h-3 w-3" />}
                                  {opt.label}
                                </button>
                              ))}
                            </div>
                            <button
                              onClick={() => handleDelete(product.id)}
                              className="flex w-full items-center gap-2 border-t border-border px-4 py-2.5 text-sm text-red-500 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                              Eliminar
                            </button>
                          </div>
                        )}
                      </div>
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
