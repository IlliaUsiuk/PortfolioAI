import Link from 'next/link'
import Nav from '@/components/Nav'

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <p className="text-text-disabled text-sm mb-4">404</p>
        <h1 className="font-bold text-text-primary text-3xl mb-3">Page not found</h1>
        <p className="text-text-secondary text-sm mb-8 max-w-sm">
          This page doesn't exist or the case isn't public yet.
        </p>
        <Link
          href="/"
          className="px-6 py-3 rounded-full bg-accent text-white text-sm font-medium hover:bg-[#5B3EEF] transition-colors duration-150"
        >
          Back to home
        </Link>
      </main>
    </>
  )
}
