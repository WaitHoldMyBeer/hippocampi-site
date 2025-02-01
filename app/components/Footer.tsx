import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Hippocampi</h3>
            <p className="text-sm">Advanced patient and doctor management platform for neurological care.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/services" className="text-sm hover:underline">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm hover:underline">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-sm hover:underline">
                    Login
                </Link>
              </li>
              </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <p className="text-sm">Email: support@hippocampi.com</p>
            <p className="text-sm">Phone: (123) 456-7890</p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p className="text-sm">&copy; 2023 Hippocampi. All rights reserved.</p>
        </div>
      </div>
    </footer>
    )
}