"use client"

import { useState, useRef, useEffect } from "react"
import { User, LogIn, Heart, Package, Settings, LogOut, PlusCircle, LayoutDashboard } from "lucide-react"
import Link from "next/link"

export function UserMenuDemo() {
  const [open, setOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-2 border-accent-gold/30 transition-all hover:border-accent-gold hover:shadow-md"
        aria-label="Menu de usuario"
      >
        {isLoggedIn ? (
          <div className="flex h-full w-full items-center justify-center bg-primary text-sm font-bold text-primary-foreground">
            MG
          </div>
        ) : (
          <User className="h-5 w-5 text-primary" />
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-12 z-50 w-72 overflow-hidden rounded-xl border border-border bg-card shadow-2xl">
          {isLoggedIn ? (
            <>
              <div className="border-b border-border bg-primary/5 px-5 py-4">
                <p className="text-sm font-bold text-foreground">Maria Garcia</p>
                <p className="text-xs text-muted-foreground">maria@encantoycolor.com</p>
                <span className="mt-1.5 inline-block rounded-full bg-accent-gold/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-accent-gold">
                  Administradora
                </span>
              </div>
              <nav className="flex flex-col py-2">
                <Link
                  href="/admin/productos"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-5 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary/5"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Panel de Productos
                </Link>
                <Link
                  href="/admin/productos"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-5 py-2.5 text-sm text-foreground transition-colors hover:bg-primary/5 hover:text-primary"
                >
                  <PlusCircle className="h-4 w-4" />
                  Agregar Producto
                </Link>
                <div className="my-1 h-px bg-border" />
                <button className="flex items-center gap-3 px-5 py-2.5 text-sm text-foreground transition-colors hover:bg-primary/5 hover:text-primary">
                  <Package className="h-4 w-4" />
                  Mis Pedidos
                </button>
                <button className="flex items-center gap-3 px-5 py-2.5 text-sm text-foreground transition-colors hover:bg-primary/5 hover:text-primary">
                  <Heart className="h-4 w-4" />
                  Mis Favoritos
                </button>
                <button className="flex items-center gap-3 px-5 py-2.5 text-sm text-foreground transition-colors hover:bg-primary/5 hover:text-primary">
                  <Settings className="h-4 w-4" />
                  Configuracion
                </button>
              </nav>
              <div className="border-t border-border py-2">
                <button
                  onClick={() => {
                    setIsLoggedIn(false)
                    setOpen(false)
                  }}
                  className="flex w-full items-center gap-3 px-5 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-red-50 hover:text-red-600"
                >
                  <LogOut className="h-4 w-4" />
                  Cerrar Sesion
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col gap-3 p-5">
              <p className="text-center text-sm text-muted-foreground">
                Inicia sesion para administrar tu tienda
              </p>
              <button
                onClick={() => {
                  setIsLoggedIn(true)
                  setOpen(false)
                }}
                className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-bold text-primary-foreground transition-all hover:bg-primary/90"
              >
                <LogIn className="h-4 w-4" />
                Iniciar Sesion (Demo)
              </button>
              <button
                onClick={() => setOpen(false)}
                className="rounded-lg border border-border px-4 py-3 text-sm font-bold text-foreground transition-all hover:border-primary hover:text-primary"
              >
                Crear Cuenta (Demo)
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
