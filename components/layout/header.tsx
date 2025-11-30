import { MobileMenu } from "@/components/mobile-menu"
import Link from "next/link"

export function Header() {
  return (
    <header className="border-b border-border bg-card sticky top-0 z-50">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-primary"></div>
          <span className="text-lg font-semibold text-foreground">GreenVerse</span>
        </div>
        <nav className="hidden gap-6 md:flex">
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition">
            Home
          </Link>
          <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition">
            About
          </Link>
          <Link href="/how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition">
            How It Works
          </Link>
          <Link href="/faq" className="text-sm text-muted-foreground hover:text-foreground transition">
            FAQ
          </Link>
          <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition">
            Contact
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <div className="hidden md:flex gap-3">
            <Link href="/auth/login" className="text-sm font-medium text-foreground hover:text-primary transition">
              Log in
            </Link>
            <Link
              href="/auth/signup"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition"
            >
              Sign up
            </Link>
          </div>
          <MobileMenu />
        </div>
      </div>
    </header>
  )
}
