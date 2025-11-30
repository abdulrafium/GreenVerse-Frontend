"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-center p-2 text-foreground hover:bg-muted rounded-lg"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 top-16 bg-card border-b border-border p-4 space-y-3">
          <Link href="/" className="block text-foreground hover:text-primary">
            Home
          </Link>
          <Link href="/about" className="block text-foreground hover:text-primary">
            About
          </Link>
          <Link href="/how-it-works" className="block text-foreground hover:text-primary">
            How It Works
          </Link>
          <Link href="/faq" className="block text-foreground hover:text-primary">
            FAQ
          </Link>
          <Link href="/contact" className="block text-foreground hover:text-primary">
            Contact
          </Link>
          <Link href="/auth/login" className="block text-foreground hover:text-primary">
            Log In
          </Link>
          <Link href="/auth/signup" className="block bg-primary text-primary-foreground px-4 py-2 rounded-lg">
            Sign Up
          </Link>
        </div>
      )}
    </div>
  )
}
