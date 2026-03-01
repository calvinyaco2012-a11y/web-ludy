"use client"

import { useState } from "react"
import { Search, ShoppingBag, Menu, X } from "lucide-react"
import Link from "next/link"
import { AuthButtons } from "./auth-buttons"
import { AnimatedBrand } from "./animated-brand"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <div className="flex items-center gap-12">
          <div className="flex flex-col items-start gap-1.5">
            <Link href="/" className="flex items-center">
              <AnimatedBrand size="header" />
            </Link>
            <span
              className="inline-flex items-center gap-1.5 rounded-full bg-accent-gold px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest text-card"
              style={{
                animation: "excelencia-shimmer 3s ease-in-out infinite",
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
              Excelencia Artesanal
            </span>
          </div>
          <nav className="hidden items-center gap-8 lg:flex">
            <Link href="/" className="text-sm font-semibold transition-colors hover:text-primary">
              Inicio
            </Link>
            <Link
              href="#tienda"
              className="border-b-2 border-primary text-sm font-semibold transition-colors hover:text-primary"
            >
              Tienda
            </Link>
            <Link href="#categorias" className="text-sm font-semibold transition-colors hover:text-primary">
              Categorias
            </Link>
            <Link href="#nosotros" className="text-sm font-semibold transition-colors hover:text-primary">
              Sobre Nosotros
            </Link>
            <Link href="#contacto" className="text-sm font-semibold transition-colors hover:text-primary">
              Contacto
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden items-center rounded-full border border-border bg-primary/5 px-4 py-2 sm:flex">
            <Search className="h-5 w-5 text-primary" />
            <input
              className="w-40 border-none bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-0"
              placeholder="Buscar elegancia..."
              type="text"
            />
          </div>
          <button className="relative flex items-center justify-center rounded-full p-2 text-primary transition-all hover:bg-primary/10">
            <ShoppingBag className="h-6 w-6" />
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent-gold text-[10px] font-bold text-card">
              2
            </span>
          </button>
          <AuthButtons />
          <button
            className="flex items-center justify-center rounded-full p-2 text-primary transition-all hover:bg-primary/10 lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="border-t border-border bg-background px-6 py-4 lg:hidden">
          <nav className="flex flex-col gap-4">
            <Link href="/" className="text-sm font-semibold transition-colors hover:text-primary">
              Inicio
            </Link>
            <Link href="#tienda" className="text-sm font-semibold text-primary">
              Tienda
            </Link>
            <Link href="#categorias" className="text-sm font-semibold transition-colors hover:text-primary">
              Categorias
            </Link>
            <Link href="#nosotros" className="text-sm font-semibold transition-colors hover:text-primary">
              Sobre Nosotros
            </Link>
            <Link href="#contacto" className="text-sm font-semibold transition-colors hover:text-primary">
              Contacto
            </Link>
          </nav>
        </div>
      )}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes excelencia-shimmer {
          0%, 100% { filter: brightness(1); transform: scale(1); }
          50% { filter: brightness(1.2); transform: scale(1.03); }
        }
      `}} />
    </header>
  )
}
