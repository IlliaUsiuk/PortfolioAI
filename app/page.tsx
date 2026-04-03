import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Cases from '@/components/Cases'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'
import CustomCursor from '@/components/CustomCursor'
import { getAllCases } from '@/lib/cases'

export default function Home() {
  const activeCasesEn = getAllCases('en')
  const activeCasesUk = getAllCases('uk')

  return (
    <>
      <CustomCursor />
      <Nav />
      <main className="flex-1">
        <Hero />
        <Cases activeCasesEn={activeCasesEn} activeCasesUk={activeCasesUk} />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
