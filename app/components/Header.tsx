import Link from "next/link";
import { Button } from "./ui/button";

export default function Header() {
    return (
        <header className = "big-white shadow-sm stick top-0 z-50">
            <nav className = "container mx-auto px-4 py-4 flex justify-between items-center">
                <Link href="/" className = "text-2x1 font-bold text-blue-600">
                    Hippocampi
                </Link>
                <ul className="hidden md:flex space-x-6">
                    <li>
                        <Link href="/" className="text-gray-600 hover:text-blue-600">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link href="/services" className="text-gray-600 hover:text-blue-600">
                            Services
                        </Link>
                    </li>
                    <li>
                        <Link href="/contact" className="text-gray-600 hover:text-blue-600">
                            Contact
                        </Link>
                    </li>
                </ul>
                <div className="flex space-x-4">
                    <Button asChild variant = "outline">
                        <Link href="/login">Login</Link>
                    </Button>
                    <Button asChild>
                        <Link href="/start">Get Started</Link>
                    </Button>
                </div>
            </nav>
        </header>
    )
}