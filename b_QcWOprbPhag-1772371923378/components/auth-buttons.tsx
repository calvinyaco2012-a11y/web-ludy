"use client"

import { useState, useRef, useEffect } from "react"
import {
  User,
  ShieldCheck,
  LogIn,
  Heart,
  Package,
  Settings,
  LogOut,
  PlusCircle,
  LayoutDashboard,
  ShoppingBag,
  Star,
  MapPin,
  ChevronDown,
  Clapperboard,
} from "lucide-react"
import Link from "next/link"

type UserRole = "none" | "customer" | "admin"

interface DemoUser {
  name: string
  email: string
  role: UserRole
  initials: string
}

const DEMO_USERS: Record<Exclude<UserRole, "none">, DemoUser> = {
  customer: {
    name: "Carolina Reyes",
    email: "carolina@gmail.com",
    role: "customer",
    initials: "CR",
  },
  admin: {
    name: "Maria Garcia",
    email: "maria@encantoycolor.com",
    role: "admin",
    initials: "MG",
  },
}

export function AuthButtons() {
  const [loginOpen, setLoginOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState<DemoUser | null>(null)
  const loginRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (loginRef.current && !loginRef.current.contains(event.target as Node)) {
        setLoginOpen(false)
      }
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  function handleLogin(role: Exclude<UserRole, "none">) {
    setCurrentUser(DEMO_USERS[role])
    setLoginOpen(false)
  }

  function handleLogout() {
    setCurrentUser(null)
    setUserMenuOpen(false)
  }

  // --- Logged-in state: single avatar button with role-specific menu ---
  if (currentUser) {
    return (
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setUserMenuOpen(!userMenuOpen)}
          className="flex items-center gap-2 rounded-full border-2 transition-all hover:shadow-md"
          style={{
            borderColor: currentUser.role === "admin" ? "#d4af37" : "#f4258c",
          }}
          aria-label="Menu de usuario"
          aria-expanded={userMenuOpen}
          aria-haspopup="true"
        >
          <div
            className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold"
            style={{
              backgroundColor: currentUser.role === "admin" ? "#1a0a12" : "#f4258c",
              color: "#ffffff",
            }}
          >
            {currentUser.initials}
          </div>
        </button>

        {userMenuOpen && (
          <div className="absolute right-0 top-14 z-50 w-80 overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
            {/* User info */}
            <div
              className="px-5 py-4"
              style={{
                backgroundColor:
                  currentUser.role === "admin"
                    ? "rgba(26, 10, 18, 0.05)"
                    : "rgba(244, 37, 140, 0.05)",
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold"
                  style={{
                    backgroundColor: currentUser.role === "admin" ? "#1a0a12" : "#f4258c",
                    color: "#ffffff",
                  }}
                >
                  {currentUser.initials}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-foreground">{currentUser.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{currentUser.email}</p>
                </div>
              </div>
              <span
                className="mt-2 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider"
                style={{
                  backgroundColor:
                    currentUser.role === "admin"
                      ? "rgba(212, 175, 55, 0.15)"
                      : "rgba(244, 37, 140, 0.1)",
                  color: currentUser.role === "admin" ? "#d4af37" : "#f4258c",
                }}
              >
                {currentUser.role === "admin" ? (
                  <>
                    <ShieldCheck className="h-3 w-3" />
                    Administradora
                  </>
                ) : (
                  <>
                    <ShoppingBag className="h-3 w-3" />
                    Clienta
                  </>
                )}
              </span>
            </div>

            {/* Menu items */}
            <nav className="flex flex-col py-2">
              {currentUser.role === "admin" ? (
                <>
                  <Link
                    href="/admin/productos"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-3 px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-muted"
                    style={{ color: "#1a0a12" }}
                  >
                    <LayoutDashboard className="h-4 w-4 text-accent-gold" />
                    Panel de Productos
                  </Link>
                  <Link
                    href="/admin/productos"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-3 px-5 py-2.5 text-sm transition-colors hover:bg-muted"
                  >
                    <PlusCircle className="h-4 w-4 text-accent-gold" />
                    Agregar Producto
                  </Link>
                  <Link
                    href="/admin/videos"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-3 px-5 py-2.5 text-sm transition-colors hover:bg-muted"
                  >
                    <Clapperboard className="h-4 w-4 text-accent-teal" />
                    Gestor de Videos
                  </Link>
                  <button className="flex items-center gap-3 px-5 py-2.5 text-sm transition-colors hover:bg-muted">
                    <Package className="h-4 w-4 text-accent-gold" />
                    Gestionar Pedidos
                  </button>
                  <button className="flex items-center gap-3 px-5 py-2.5 text-sm transition-colors hover:bg-muted">
                    <Star className="h-4 w-4 text-accent-gold" />
                    Productos Destacados
                  </button>
                  <button className="flex items-center gap-3 px-5 py-2.5 text-sm transition-colors hover:bg-muted">
                    <Settings className="h-4 w-4 text-accent-gold" />
                    Configuracion Tienda
                  </button>
                </>
              ) : (
                <>
                  <button className="flex items-center gap-3 px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-muted">
                    <Package className="h-4 w-4 text-primary" />
                    Mis Pedidos
                  </button>
                  <button className="flex items-center gap-3 px-5 py-2.5 text-sm transition-colors hover:bg-muted">
                    <Heart className="h-4 w-4 text-primary" />
                    Mis Favoritos
                  </button>
                  <button className="flex items-center gap-3 px-5 py-2.5 text-sm transition-colors hover:bg-muted">
                    <MapPin className="h-4 w-4 text-primary" />
                    Mis Direcciones
                  </button>
                  <button className="flex items-center gap-3 px-5 py-2.5 text-sm transition-colors hover:bg-muted">
                    <Settings className="h-4 w-4 text-primary" />
                    Mi Cuenta
                  </button>
                </>
              )}
            </nav>

            <div className="border-t border-border py-2">
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 px-5 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-red-50 hover:text-red-600"
              >
                <LogOut className="h-4 w-4" />
                Cerrar Sesion
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }

  // --- Logged-out state: login button with role selection dropdown ---
  return (
    <div className="relative" ref={loginRef}>
      <button
        onClick={() => setLoginOpen(!loginOpen)}
        className="flex items-center gap-2 rounded-full border-2 border-primary/20 px-3 py-1.5 text-sm font-semibold text-primary transition-all hover:border-primary hover:bg-primary/5 sm:px-4 sm:py-2"
        aria-label="Iniciar sesion"
        aria-expanded={loginOpen}
        aria-haspopup="true"
      >
        <User className="h-4 w-4" />
        <span className="hidden sm:inline">Ingresar</span>
        <ChevronDown className="hidden h-3.5 w-3.5 sm:block" />
      </button>

      {loginOpen && (
        <div className="absolute right-0 top-14 z-50 w-80 overflow-hidden rounded-2xl border border-border bg-card shadow-2xl sm:w-96">
          <div className="border-b border-border px-6 py-5 text-center">
            <p className="font-serif text-lg font-bold text-foreground text-balance">
              Bienvenida a Encanto & Color
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Elige como deseas ingresar
            </p>
          </div>

          <div className="flex flex-col gap-4 p-6">
            {/* Customer Login Button */}
            <button
              onClick={() => handleLogin("customer")}
              className="group relative flex items-center gap-4 rounded-xl border-2 border-primary/20 p-4 text-left transition-all hover:border-primary hover:bg-primary/5 hover:shadow-md"
              role="option"
              aria-label="Acceso de cliente"
            >
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 transition-colors group-hover:bg-primary/20">
                <ShoppingBag className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">
                  Acceso Cliente
                </p>
                <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                  Compra, guarda favoritos y sigue tus pedidos
                </p>
              </div>
              <LogIn className="ml-auto h-4 w-4 flex-shrink-0 text-primary opacity-0 transition-opacity group-hover:opacity-100" />
            </button>

            {/* Admin Login Button */}
            <button
              onClick={() => handleLogin("admin")}
              className="group relative flex items-center gap-4 rounded-xl border-2 border-accent-gold/20 p-4 text-left transition-all hover:border-accent-gold hover:shadow-md"
              style={{ backgroundColor: "transparent" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "rgba(212, 175, 55, 0.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "transparent")
              }
              role="option"
              aria-label="Acceso de administrador"
            >
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full transition-colors" style={{ backgroundColor: "rgba(26, 10, 18, 0.08)" }}>
                <ShieldCheck className="h-6 w-6" style={{ color: "#1a0a12" }} />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">
                  Acceso Administrador
                </p>
                <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                  Gestiona productos, pedidos y la tienda
                </p>
              </div>
              <LogIn className="ml-auto h-4 w-4 flex-shrink-0 opacity-0 transition-opacity group-hover:opacity-100" style={{ color: "#d4af37" }} />
            </button>
          </div>

          <div className="border-t border-border bg-muted/30 px-6 py-3">
            <p className="text-center text-[11px] text-muted-foreground">
              Modo demostracion &middot; No requiere contrasena
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
