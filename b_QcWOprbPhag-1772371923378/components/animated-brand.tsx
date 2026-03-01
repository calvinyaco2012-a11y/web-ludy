"use client"

import { useEffect, useState } from "react"

const floatingItems = [
  { char: "\u2764", color: "#f4258c", size: 16 },
  { char: "\u2728", color: "#d4af37", size: 14 },
  { char: "\u2764", color: "#e85aaa", size: 12 },
  { char: "\u2728", color: "#f7d86c", size: 16 },
  { char: "\u2764", color: "#f4258c", size: 10 },
  { char: "\u2728", color: "#d4af37", size: 12 },
]

export function AnimatedBrand({ size = "header" }: { size?: "header" | "hero" }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isHero = size === "hero"
  const logoSize = isHero ? 220 : 52

  return (
    <span
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        gap: isHero ? "0px" : "10px",
        flexDirection: isHero ? "column" : "row",
      }}
    >
      {/* Floating particles around logo */}
      {mounted &&
        floatingItems.map((item, i) => {
          const angle = (i / floatingItems.length) * 360
          const radius = isHero ? 110 : 34
          const duration = 3 + i * 0.5
          const delay = i * 0.4
          return (
            <span
              key={i}
              style={{
                position: "absolute",
                fontSize: `${item.size}px`,
                color: item.color,
                zIndex: 10,
                pointerEvents: "none",
                left: "50%",
                top: "50%",
                animation: `float-orbit-${i} ${duration}s ease-in-out infinite`,
                animationDelay: `${delay}s`,
                opacity: 0.8,
              }}
            >
              {item.char}
            </span>
          )
        })}

      {/* Animated glow behind logo */}
      <span
        style={{
          position: "absolute",
          inset: isHero ? "-20px" : "-8px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(244,37,140,0.15) 0%, rgba(212,175,55,0.1) 50%, transparent 70%)",
          animation: mounted ? "pulse-glow 3s ease-in-out infinite" : "none",
          zIndex: 0,
        }}
      />

      {/* Logo image with bounce */}
      <img
        src="/images/logo.png"
        alt="Encanto y Color - Detalles y Variedades"
        style={{
          width: `${logoSize}px`,
          height: "auto",
          position: "relative",
          zIndex: 1,
          filter: "drop-shadow(0 4px 12px rgba(244,37,140,0.2))",
          animation: mounted ? "gentle-bounce 4s ease-in-out infinite" : "none",
        }}
      />

      {/* Inject keyframes via style tag */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes gentle-bounce {
              0%, 100% { transform: translateY(0) scale(1); }
              50% { transform: translateY(${isHero ? "-8px" : "-3px"}) scale(1.03); }
            }
            @keyframes pulse-glow {
              0%, 100% { opacity: 0.5; transform: scale(1); }
              50% { opacity: 1; transform: scale(1.1); }
            }
            ${floatingItems
              .map((_, i) => {
                const radius = isHero ? 100 : 30
                const startAngle = (i / floatingItems.length) * 360
                return `
                @keyframes float-orbit-${i} {
                  0%, 100% {
                    transform: translate(
                      ${Math.cos((startAngle * Math.PI) / 180) * radius}px,
                      ${Math.sin((startAngle * Math.PI) / 180) * radius}px
                    ) scale(1);
                    opacity: 0.7;
                  }
                  25% {
                    transform: translate(
                      ${Math.cos(((startAngle + 90) * Math.PI) / 180) * (radius * 1.2)}px,
                      ${Math.sin(((startAngle + 90) * Math.PI) / 180) * (radius * 0.8)}px
                    ) scale(1.3);
                    opacity: 1;
                  }
                  50% {
                    transform: translate(
                      ${Math.cos(((startAngle + 180) * Math.PI) / 180) * radius}px,
                      ${Math.sin(((startAngle + 180) * Math.PI) / 180) * radius}px
                    ) scale(0.8);
                    opacity: 0.5;
                  }
                  75% {
                    transform: translate(
                      ${Math.cos(((startAngle + 270) * Math.PI) / 180) * (radius * 0.9)}px,
                      ${Math.sin(((startAngle + 270) * Math.PI) / 180) * (radius * 1.1)}px
                    ) scale(1.1);
                    opacity: 0.9;
                  }
                }
              `
              })
              .join("\n")}
          `,
        }}
      />
    </span>
  )
}
