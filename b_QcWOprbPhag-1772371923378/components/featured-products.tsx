"use client"

import { ArrowRight } from "lucide-react"
import { ProductCard } from "./product-card"
import { useProducts } from "@/lib/product-context"

export function FeaturedProducts() {
  const { getFeaturedProducts } = useProducts()
  const featured = getFeaturedProducts()

  if (featured.length === 0) return null

  return (
    <section id="tienda" className="py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-12 flex flex-col items-center justify-between gap-6 md:flex-row md:items-end">
          <div className="text-center md:text-left">
            <h3 className="font-serif text-4xl font-bold text-foreground">Piezas Maestras</h3>
            <p className="mt-2 text-muted-foreground">
              Seleccionadas cuidadosamente para resaltar tu belleza natural
            </p>
          </div>
          <a
            className="flex items-center gap-2 font-bold text-primary transition-all hover:gap-4"
            href="#"
          >
            Ver toda la tienda <ArrowRight className="h-5 w-5" />
          </a>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              price={new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(product.price)}
              category={product.category}
              image={product.images[0]}
              imageAlt={product.description}
              rating={5}
              badge={product.tags.includes("combo") ? "Nuevo" : product.featured ? "Bestseller" : undefined}
              badgeColor={product.tags.includes("combo") ? "bg-primary" : "bg-accent-orange"}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
