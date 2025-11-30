export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-primary"></div>
              <span className="font-semibold text-foreground">GreenVerse</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Transform waste into revenue and build a circular economy.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Product</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="/how-it-works" className="hover:text-foreground">
                  How It Works
                </a>
              </li>
              <li>
                <a href="/pricing" className="hover:text-foreground">
                  Pricing
                </a>
              </li>
              <li>
                <a href="/features" className="hover:text-foreground">
                  Features
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Company</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="/about" className="hover:text-foreground">
                  About
                </a>
              </li>
              <li>
                <a href="/blog" className="hover:text-foreground">
                  Blog
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-foreground">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Legal</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="/privacy" className="hover:text-foreground">
                  Privacy
                </a>
              </li>
              <li>
                <a href="/terms" className="hover:text-foreground">
                  Terms
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 GreenVerse. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
