"use client"

import { useEffect, useRef, useState } from "react"

const categories = [
  {
    name: "Lazos de Seda",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBfRbTCPZjcnkKDK1jK0-f19_I5C-BX_i2k70sL0UYqPhwixkCY8y2vfLnoeO-JDphGH_OYapD_h_clfi7Dm9JA0isDWpRIZIuScvyWbhjnRHe-6NsnlQ2BoekNfqYtq_XUMw6s1JD_pBhPSDdQnWwRiUh3dWLLXKK21n6NX2rCHzE7UqGx6akh-Aaix0zwh-8crlbizDFcKkE3nDMKjQNCcckuttpang91MKTOECMdYWdOrcpGl9QpVgvaaYE9caoSteV4UZLYKaM",
    imageAlt: "Rollos de cinta de seda en colores pastel suaves",
  },
  {
    name: "Coleccion Floral",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDbrSeAn2ClB_zvvV5n9V42a8aQgr9wAwI_d1mqNEBL-yGpsoFjW8Dw3zzfUYHvXw5skb-v_saT25HDpzNRLDLsChbtm0bwUjPWSXRfXBV2qtf0JPEfg3eSJ8TfjSea96Non4CED4yGeA-hm7fbNITvrBIZMw3p8ljLHfNayxPck9vbbmFyGpJy0cBcrIj7AA2DFZdkTNm0nQhdK9wEw0oRzjSQrfqSueZQ8N1sEvFPv4HCxV1V8jLDgPPX-onmnzj9L3OyuLII5bg",
    imageAlt: "Detalles de accesorios florales con bordado",
  },
  {
    name: "Diademas Premium",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC51v1g1c6BEbCAp8BM78vp37aiMuoIuqR1rlhWYKGb4K_NLaLah6qezWKn-om-HZKc1iVhsW9BaAyEnbCMa4KZt-BB2qmlvz0SI1XNF4IwvtOVF5wmTzdScT8qpUEigWWA8UQmREox8GUGVZAARQ5Cj8-Auir2dH4a0y1EQiJyQBcO6XiZWAPBaY3tG1HheubUykp9nd6_YV_Wr487j44lBM9FJCWZnCM2Yl-NRvOQkdbUYLaF-2b6EWgilsMVvm-6PwFN8H2ei2M",
    imageAlt: "Elegante diadema de terciopelo en un exhibidor",
  },
  {
    name: "Linea Infantil",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD01vdRN6CFrBgS09ky5DakqlL6XekMJXOwlEJTQsDE7PhFSlim-xw6XkaSxy1HhGVE7wWr6A2fkBf5rug71KMEXiYkKr4jznrKv8TvpLat-VtRbOCh7kp4MRdbSpI4dhVj_6dbn4hPtXLxxMmj6Qshe7L_3ks0Uf9drW-tC0lo5wbKpCnf19vYtt_pWHgUlMRs1lWSY4wL1msGZ1MDLEMIDCgWOeofi_pk_ijpOwlQmbOE6cR_Uj-7SjvARknEmkzCCrufV07R4Dk",
    imageAlt: "Nina usando accesorios artesanales coloridos",
  },
]

export function Categories() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="categorias" className="mx-auto max-w-7xl px-6 py-24" ref={sectionRef}>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes cat-fade-in {
          from { opacity: 0; transform: translateY(30px) scale(0.9); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes cat-border-spin {
          0% { border-color: rgba(212,175,55,0.3); }
          33% { border-color: rgba(244,37,140,0.3); }
          66% { border-color: rgba(0,128,128,0.3); }
          100% { border-color: rgba(212,175,55,0.3); }
        }
      `}} />
      <div className="mb-16 flex flex-col items-center">
        <h3 className="mb-2 text-sm font-bold uppercase tracking-[0.5em] text-accent-gold">
          Categorias
        </h3>
        <div className="h-px w-12 bg-accent-gold/50" />
      </div>
      <div className="grid grid-cols-2 gap-12 md:grid-cols-4">
        {categories.map((cat, i) => (
          <a
            key={cat.name}
            className="group flex flex-col items-center text-center"
            href="#"
            style={{
              opacity: visible ? 1 : 0,
              animation: visible ? `cat-fade-in 0.6s ease-out ${i * 0.15}s both` : "none",
            }}
          >
            <div
              className="mb-6 size-40 overflow-hidden rounded-full border-2 p-2 transition-all duration-500 group-hover:scale-105 md:size-52"
              style={{
                animation: visible ? `cat-border-spin 6s linear infinite` : "none",
                animationDelay: `${i * 1.5}s`,
              }}
            >
              <div
                className="h-full w-full rounded-full bg-cover bg-center grayscale transition-all duration-700 group-hover:grayscale-0"
                style={{ backgroundImage: `url('${cat.image}')` }}
                role="img"
                aria-label={cat.imageAlt}
              />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-foreground transition-colors group-hover:text-primary">
              {cat.name}
            </span>
          </a>
        ))}
      </div>
    </section>
  )
}
