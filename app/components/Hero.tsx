import Link from "next/link"
import { Button } from "./ui/button"

export default function Hero() {
  return (
    <section className="relative bg-blue-600 text-white py-20">
      <div className="absolute inset-0 bg-[url('/hero-background.jpg')] bg-cover bg-center opacity-20"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Revolutionizing Neurological Care Management</h1>
          <p className="text-xl mb-8">
            Hippocampi provides a seamless platform for patients and doctors to manage neurological care efficiently and
            effectively.
          </p>
          <div className="flex space-x-4">
            <Button asChild size="lg">
              <Link href="/start">Get Started</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

