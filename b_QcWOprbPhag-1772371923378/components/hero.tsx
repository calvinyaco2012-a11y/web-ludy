"use client"

import { Star } from "lucide-react"
import { useProducts } from "@/lib/product-context"
import { AnimatedBrand } from "./animated-brand"
import { useEffect, useState } from "react"

export function Hero() {
  const { getHeroProduct } = useProducts()
  const heroProduct = getHeroProduct()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const heroImage = heroProduct?.images[0] ??
    "https://lh3.googleusercontent.com/aida-public/AB6AXuASEUAPVmixt8JP_Hw_bAkKvlA0fRoBxWFsVH86U-KNQ7XbZb7w9SAurT7aT1AYBkvh73NZMQAU6eFRX6hSuQEaSEQfEahbTwJXyPJafNxWv0W9tCax43QRGCn5le8k5MCIjdsBKCvHnb-6HP4303Xm9t6qTucrlwRXXRvuhYWmrOuR8Iro869ilE2_KNzLd6fpOohZgnsMC0qlGDP9sHPfp3YHvSBaxA-iTZgxT1Fnq3KrciflR_iI0WW7JPuqrOekfnlRgvgcqTU"
  const heroName = heroProduct?.name ?? "Lazo Polka Dot Classic"
  const heroDesc = heroProduct?.description ??
    "Descubre la sofisticacion en cada detalle con nuestra coleccion exclusiva de lazos de saten y accesorios florales hechos a mano. El lujo de la tradicion colombiana en tu cabello."
  const heroPrice = heroProduct
    ? new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(heroProduct.price)
    : null

  return (
    <section className="relative overflow-hidden bg-background py-16 lg:py-24">
      {/* Animated background decorations */}
      {mounted && (
        <>
          <span style={{
            position: "absolute", top: "10%", left: "5%", fontSize: "24px", opacity: 0.15,
            animation: "hero-float-1 6s ease-in-out infinite", pointerEvents: "none",
          }}>
            {"\u2764"}
          </span>
          <span style={{
            position: "absolute", top: "20%", right: "8%", fontSize: "20px", opacity: 0.12,
            animation: "hero-float-2 7s ease-in-out infinite", pointerEvents: "none",
          }}>
            {"\u2728"}
          </span>
          <span style={{
            position: "absolute", bottom: "15%", left: "12%", fontSize: "18px", opacity: 0.1,
            animation: "hero-float-3 5s ease-in-out infinite", pointerEvents: "none",
          }}>
            {"\u{1F338}"}
          </span>
          <span style={{
            position: "absolute", top: "60%", right: "15%", fontSize: "22px", opacity: 0.12,
            animation: "hero-float-1 8s ease-in-out infinite", animationDelay: "1s", pointerEvents: "none",
          }}>
            {"\u{1F381}"}
          </span>
        </>
      )}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes hero-float-1 {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }
        @keyframes hero-float-2 {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-8deg); }
        }
        @keyframes hero-float-3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(10px, -12px) scale(1.1); }
        }
        @keyframes hero-image-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes badge-pulse {
          0%, 100% { box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
          50% { box-shadow: 0 15px 40px rgba(244,37,140,0.15); transform: translateY(-3px); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.01ms !important; }
        }
      `}} />

      <div className="pointer-events-none absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-primary/5 to-transparent" />
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Logo grande animado centrado arriba */}
        <div className="mb-12 flex justify-center" style={{
          animation: mounted ? "fade-in-up 0.8s ease-out" : "none",
        }}>
          <AnimatedBrand size="hero" />
        </div>

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="order-2 flex flex-col gap-8 lg:order-1" style={{
            animation: mounted ? "fade-in-up 0.8s ease-out 0.3s both" : "none",
          }}>
            <div className="inline-flex items-center gap-2 self-start rounded-full bg-accent-teal/10 px-4 py-1 text-accent-teal">
              <span className="text-xs font-bold uppercase tracking-widest">
                {heroProduct ? heroProduct.category : "Nueva Coleccion Primavera"}
              </span>
            </div>
            <h2 className="font-serif text-5xl font-bold leading-tight text-foreground lg:text-7xl text-balance">
              {heroProduct ? (
                heroName
              ) : (
                <>{"Artesania que "}<span className="italic text-primary">Celebra</span>{" tu Estilo"}</>
              )}
            </h2>
            <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
              {heroDesc}
            </p>
            {heroPrice && (
              <p className="text-3xl font-black text-primary">
                {heroPrice} <span className="text-base font-normal text-muted-foreground">COP</span>
              </p>
            )}
            <div className="flex flex-wrap gap-4 pt-4">
              <button
                className="group relative overflow-hidden rounded-lg bg-primary px-8 py-4 text-primary-foreground transition-all hover:shadow-xl hover:shadow-primary/20"
                style={{ animation: mounted ? "fade-in-up 0.8s ease-out 0.6s both" : "none" }}
              >
                <span className="relative z-10 font-bold tracking-wide">
                  {heroProduct ? "Comprar Ahora" : "Explorar Coleccion"}
                </span>
              </button>
              <button
                className="rounded-lg border-2 border-accent-gold px-8 py-4 font-bold text-accent-gold transition-all hover:bg-accent-gold hover:text-card"
                style={{ animation: mounted ? "fade-in-up 0.8s ease-out 0.8s both" : "none" }}
              >
                Ver Video del Proceso
              </button>
            </div>
            <div className="flex items-center gap-8 pt-6">
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-primary">100%</span>
                <span className="text-xs uppercase tracking-tighter text-muted-foreground">Hecho a Mano</span>
              </div>
              <div className="h-8 w-px bg-border" />
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-primary">Premium</span>
                <span className="text-xs uppercase tracking-tighter text-muted-foreground">{"Seda & Saten"}</span>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2" style={{
            animation: mounted ? "fade-in-up 0.8s ease-out 0.4s both" : "none",
          }}>
            <div className="relative">
              <div className="absolute -inset-4 rounded-[2rem] bg-accent-gold/10 blur-3xl" />
              <div
                className="relative aspect-square w-full overflow-hidden rounded-[2rem] border-8 border-card shadow-2xl"
                style={{ animation: mounted ? "hero-image-float 5s ease-in-out infinite" : "none" }}
              >
                <img className="h-full w-full object-cover" alt={heroName} src={heroImage} />
              </div>
              <div
                className="absolute -bottom-6 -left-6 rounded-2xl bg-card p-6 shadow-xl"
                style={{ animation: mounted ? "badge-pulse 4s ease-in-out infinite" : "none" }}
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-orange/20 text-accent-orange">
                    <Star className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">
                      {heroProduct ? "Producto Estrella" : "Edicion Limitada"}
                    </p>
                    <p className="text-xs italic text-muted-foreground">{`"${heroName}"`}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
