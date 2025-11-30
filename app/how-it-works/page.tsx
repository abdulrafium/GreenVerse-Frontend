import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { CheckCircle } from "lucide-react"

export default function HowItWorks() {
  const steps = [
    {
      number: 1,
      title: "Submit Your Waste",
      description:
        "Log into your GreenVerse account and submit details about your waste materials, including type, quantity, and location.",
    },
    {
      number: 2,
      title: "Get Matched",
      description:
        "Our system matches your waste with certified recovery clusters that can process and recycle your materials efficiently.",
    },
    {
      number: 3,
      title: "Arrange Pickup",
      description:
        "Schedule a convenient pickup time with the recovery cluster. Our logistics team ensures safe and timely transport.",
    },
    {
      number: 4,
      title: "Get Paid",
      description:
        "Receive payment based on material type and weight. Payments are processed transparently within 5 business days.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-24">
          <h1 className="text-4xl font-bold text-foreground mb-6">How It Works</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            GreenVerse makes it simple to turn your waste into revenue. Follow these four easy steps to get started.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-12">
            {steps.map((step) => (
              <div key={step.number} className="flex gap-6">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">
                  {step.number}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-lg">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-24 rounded-lg border border-border bg-card p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Key Features</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                "Real-time waste tracking and analytics",
                "Certified recovery cluster network",
                "Transparent pricing and instant quotes",
                "Secure payment processing",
                "Environmental impact reports",
                "Mobile app for easy management",
              ].map((feature) => (
                <div key={feature} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <span className="text-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
