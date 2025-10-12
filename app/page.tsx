import { Hero } from '@/components/landing/Hero'
import { Features } from '@/components/landing/Features'
import { Templates } from '@/components/landing/Templates'
import { HowItWorks } from '@/components/landing/HowItWorks'
import { Pricing } from '@/components/landing/Pricing'
import { Footer } from '@/components/landing/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <Features />
      <Templates />
      <HowItWorks />
      <Pricing />
      <Footer />
    </main>
  )
}
