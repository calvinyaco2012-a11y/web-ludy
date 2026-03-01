import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Categories } from "@/components/categories"
import { FeaturedProducts } from "@/components/featured-products"
import { VideoShowcase } from "@/components/video-showcase"
import { Newsletter } from "@/components/newsletter"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"

export default function HomePage() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden">
      <Header />
      <main className="flex-1">
        <Hero />
        <FeaturedProducts />
        <VideoShowcase />
        <Categories />
        <Newsletter />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
