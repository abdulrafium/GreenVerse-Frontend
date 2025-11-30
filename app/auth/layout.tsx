import type { ReactNode } from "react"

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Left side - Branding */}
      <div className="hidden flex-1 items-center justify-center bg-card lg:flex">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="h-12 w-12 rounded-full bg-primary"></div>
            <span className="text-2xl font-bold text-foreground">GreenVerse</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-4 text-balance">Transform Waste into Revenue</h1>
          <p className="text-muted-foreground max-w-md">
            Connect with recovery clusters and earn sustainable income while protecting the environment.
          </p>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex flex-1 items-center justify-center px-4">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  )
}
