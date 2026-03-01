import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import { ProductProvider } from "@/lib/product-context"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  title: "Encanto & Color | Accesorios Artesanales Premium",
  description:
    "Descubre la sofisticacion en cada detalle con nuestra coleccion exclusiva de lazos de saten y accesorios florales hechos a mano.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <ProductProvider>
          {children}
        </ProductProvider>
      </body>
    </html>
  )
}
