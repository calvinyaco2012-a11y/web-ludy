"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import { DEMO_PRODUCTS, DEMO_VIDEOS, type Product, type ProductPlacement, type StoreVideo } from "./demo-store"

interface ProductContextType {
  products: Product[]
  addProduct: (product: Omit<Product, "id" | "createdAt">) => void
  updateProduct: (id: string, data: Partial<Product>) => void
  deleteProduct: (id: string) => void
  getHeroProduct: () => Product | undefined
  getFeaturedProducts: () => Product[]
  setProductPlacement: (id: string, placement: ProductPlacement, order?: number) => void
  videos: StoreVideo[]
  addVideo: (video: Omit<StoreVideo, "id" | "createdAt">) => void
  updateVideo: (id: string, data: Partial<StoreVideo>) => void
  deleteVideo: (id: string) => void
  getFeaturedVideos: () => StoreVideo[]
}

const ProductContext = createContext<ProductContextType | null>(null)

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(DEMO_PRODUCTS)
  const [videos, setVideos] = useState<StoreVideo[]>(DEMO_VIDEOS)

  const addProduct = useCallback((data: Omit<Product, "id" | "createdAt">) => {
    const newProduct: Product = {
      ...data,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split("T")[0],
    }

    setProducts((prev) => {
      let updated = [newProduct, ...prev]
      // Si el nuevo producto va al hero, quitar hero de los demas
      if (data.placement === "hero") {
        updated = updated.map((p) =>
          p.id !== newProduct.id && p.placement === "hero"
            ? { ...p, placement: "destacados" as ProductPlacement, placementOrder: 99 }
            : p
        )
      }
      // Si va a destacados, limitar a 4
      const featured = updated.filter((p) => p.placement === "destacados" && p.status === "activo")
      if (featured.length > 4 && data.placement === "destacados") {
        const sorted = featured.sort((a, b) => a.placementOrder - b.placementOrder)
        const toRemove = sorted[sorted.length - 1]
        updated = updated.map((p) =>
          p.id === toRemove.id ? { ...p, placement: "ninguna" as ProductPlacement } : p
        )
      }
      return updated
    })
  }, [])

  const updateProduct = useCallback((id: string, data: Partial<Product>) => {
    setProducts((prev) => {
      let updated = prev.map((p) => (p.id === id ? { ...p, ...data } : p))
      // Si cambiaron placement a hero, quitar hero de los demas
      if (data.placement === "hero") {
        updated = updated.map((p) =>
          p.id !== id && p.placement === "hero"
            ? { ...p, placement: "destacados" as ProductPlacement, placementOrder: 99 }
            : p
        )
      }
      return updated
    })
  }, [])

  const deleteProduct = useCallback((id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id))
  }, [])

  const getHeroProduct = useCallback(() => {
    return products.find((p) => p.placement === "hero" && p.status === "activo")
  }, [products])

  const getFeaturedProducts = useCallback(() => {
    return products
      .filter((p) => p.placement === "destacados" && p.status === "activo")
      .sort((a, b) => a.placementOrder - b.placementOrder)
      .slice(0, 4)
  }, [products])

  const setProductPlacement = useCallback((id: string, placement: ProductPlacement, order?: number) => {
    setProducts((prev) => {
      let updated = prev.map((p) =>
        p.id === id ? { ...p, placement, placementOrder: order ?? p.placementOrder } : p
      )
      if (placement === "hero") {
        updated = updated.map((p) =>
          p.id !== id && p.placement === "hero"
            ? { ...p, placement: "destacados" as ProductPlacement, placementOrder: 99 }
            : p
        )
      }
      return updated
    })
  }, [])

  const addVideo = useCallback((data: Omit<StoreVideo, "id" | "createdAt">) => {
    const newVideo: StoreVideo = {
      ...data,
      id: `vid-${Date.now()}`,
      createdAt: new Date().toISOString().split("T")[0],
    }
    setVideos((prev) => [newVideo, ...prev])
  }, [])

  const updateVideo = useCallback((id: string, data: Partial<StoreVideo>) => {
    setVideos((prev) => prev.map((v) => (v.id === id ? { ...v, ...data } : v)))
  }, [])

  const deleteVideo = useCallback((id: string) => {
    setVideos((prev) => prev.filter((v) => v.id !== id))
  }, [])

  const getFeaturedVideos = useCallback(() => {
    return videos.filter((v) => v.featured && v.status === "activo").slice(0, 4)
  }, [videos])

  return (
    <ProductContext.Provider
      value={{ products, addProduct, updateProduct, deleteProduct, getHeroProduct, getFeaturedProducts, setProductPlacement, videos, addVideo, updateVideo, deleteVideo, getFeaturedVideos }}
    >
      {children}
    </ProductContext.Provider>
  )
}

export function useProducts() {
  const ctx = useContext(ProductContext)
  if (!ctx) throw new Error("useProducts debe usarse dentro de ProductProvider")
  return ctx
}
