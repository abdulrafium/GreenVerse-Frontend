import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-24">
          <h1 className="text-4xl font-bold text-foreground mb-6">About GreenVerse</h1>
          <div className="prose prose-invert max-w-3xl">
            <p className="text-lg text-muted-foreground">
              GreenVerse is a sustainable waste management platform designed to connect waste producers with certified
              recovery clusters. Our mission is to transform how businesses handle waste—turning it from a liability
              into a revenue stream while protecting the environment.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Our Mission</h2>
              <p className="text-muted-foreground mb-4">
                To eliminate landfill waste by creating a transparent, efficient, and profitable waste recovery
                ecosystem where businesses and recovery clusters thrive together.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Our Vision</h2>
              <p className="text-muted-foreground mb-4">
                A world where waste is valued as a resource, circular economy principles drive business decisions, and
                every organization has the tools to measure and reduce environmental impact.
              </p>
            </div>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            <div className="rounded-lg border border-border bg-card p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">10K+</div>
              <p className="text-muted-foreground">Waste Producers Onboarded</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <p className="text-muted-foreground">Recovery Clusters Connected</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">50K+</div>
              <p className="text-muted-foreground">Tons Waste Diverted from Landfills</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
