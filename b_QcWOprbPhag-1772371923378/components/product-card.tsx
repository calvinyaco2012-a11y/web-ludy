"use client"

import { Heart, ShoppingCart, Star, StarHalf } from "lucide-react"

interface ProductCardProps {
  name: string
  price: string
  category: string
  image: string
  imageAlt: string
  rating: number
  badge?: string
  badgeColor?: string
}

export function ProductCard({
  name,
  price,
  category,
  image,
  imageAlt,
  rating,
  badge,
  badgeColor = "bg-primary",
}: ProductCardProps) {
  const fullStars = Math.floor(rating)
  const hasHalf = rating % 1 !== 0

  return (
    <div className="group flex flex-col gap-4 rounded-2xl bg-card p-4 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-square overflow-hidden rounded-xl bg-muted">
        <img
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          alt={imageAlt}
          src={image}
        />
        {badge && (
          <span
            className={`absolute left-3 top-3 rounded-full ${badgeColor} px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary-foreground`}
          >
            {badge}
          </span>
        )}
        <button className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-card/90 text-primary opacity-0 transition-all hover:bg-primary hover:text-primary-foreground group-hover:opacity-100">
          <Heart className="h-5 w-5" />
        </button>
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-widest text-accent-teal">
            {category}
          </span>
          <div className="flex text-accent-gold">
            {Array.from({ length: fullStars }).map((_, i) => (
              <Star key={i} className="h-3.5 w-3.5 fill-accent-gold" />
            ))}
            {hasHalf && <StarHalf className="h-3.5 w-3.5 fill-accent-gold" />}
          </div>
        </div>
        <h4 className="text-lg font-bold text-foreground">{name}</h4>
        <p className="text-xl font-black text-primary">
          {price} <span className="text-xs font-normal text-muted-foreground">COP</span>
        </p>
      </div>
      <button className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-foreground py-3 text-sm font-bold text-background transition-all hover:bg-primary">
        <ShoppingCart className="h-4 w-4" />
        Anadir al Carrito
      </button>
    </div>
  )
}
