"use client"

import { useEffect, useRef, useState } from "react"

export function Newsletter() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10" ref={ref}>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes newsletter-in {
          from { opacity: 0; transform: translateY(40px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes dot-move {
          0% { background-position: 0 0; }
          100% { background-position: 40px 40px; }
        }
      `}} />
      <div
        className="relative overflow-hidden rounded-[2.5rem] bg-foreground px-8 py-20 text-center"
        style={{
          animation: visible ? "newsletter-in 0.8s ease-out both" : "none",
        }}
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, #f4258c 1px, transparent 0)",
            backgroundSize: "40px 40px",
            animation: visible ? "dot-move 20s linear infinite" : "none",
          }}
        />
        <div className="relative z-10 mx-auto max-w-2xl">
          <h2 className="font-serif text-4xl font-bold text-background lg:text-5xl text-balance">
            Unete a la Elegancia
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Subscribete para recibir noticias sobre nuestras colecciones limitadas, lanzamientos
            exclusivos y secretos de estilo directamente en tu bandeja.
          </p>
          <form
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              className="w-full max-w-xs rounded-lg border-none bg-background/10 px-6 py-4 text-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary sm:w-80"
              placeholder="Tu correo electronico"
              type="email"
            />
            <button
              type="submit"
              className="w-full rounded-lg bg-primary px-8 py-4 font-bold text-primary-foreground transition-all hover:scale-105 hover:bg-primary/90 active:scale-95 sm:w-auto"
            >
              Suscribirse
            </button>
          </form>
          <p className="mt-4 text-xs text-muted-foreground">
            Al suscribirte aceptas nuestra politica de privacidad.
          </p>
        </div>
      </div>
    </section>
  )
}
