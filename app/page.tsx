import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Cases from '@/components/Cases'
import SocialProof from '@/components/SocialProof'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'
import CustomCursor from '@/components/CustomCursor'
import { getAllCases } from '@/lib/cases'

export default function Home() {
  const activeCases = getAllCases('en')

  return (
    <>
      <CustomCursor />
      <Nav />
      <main className="flex-1">
        <Hero />
        <Cases activeCases={activeCases} />
        <SocialProof />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
