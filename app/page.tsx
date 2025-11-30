import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ArrowRight, Leaf, TrendingUp, Users } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-24">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                Turn your waste into revenue
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                Connect with recovery clusters. Prevent landfill waste. Earn sustainable income. Join GreenVerse today
                and transform how your business handles waste.
              </p>
              <div className="mt-8 flex gap-4">
                <a
                  href="/signup"
                  className="flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground hover:opacity-90"
                >
                  Get Started <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="/how-it-works"
                  className="flex items-center gap-2 rounded-lg border border-border px-6 py-3 font-medium text-foreground hover:bg-muted"
                >
                  Learn More <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
            <div className="flex h-96 items-center justify-center rounded-lg bg-muted">
              <img
                src="/waste-recovery-circular-economy.jpg"
                alt="Waste transformation"
                className="h-full w-full object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">Why GreenVerse?</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-lg border border-border bg-card p-6">
              <Leaf className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-foreground">Reduce Waste</h3>
              <p className="mt-2 text-muted-foreground">
                Keep waste out of landfills and contribute to a circular economy with proven recovery solutions.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6">
              <TrendingUp className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-foreground">Earn Revenue</h3>
              <p className="mt-2 text-muted-foreground">
                Get paid for your waste materials through our transparent pricing model and recovery clusters.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6">
              <Users className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-foreground">Join a Network</h3>
              <p className="mt-2 text-muted-foreground">
                Connect with recovery clusters, waste managers, and sustainability-focused businesses worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border bg-card">
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Ready to start transforming waste?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join hundreds of businesses that are already saving costs and reducing environmental impact with GreenVerse.
          </p>
          <a
            href="/signup"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3 font-medium text-primary-foreground hover:opacity-90"
          >
            Create Account <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}
