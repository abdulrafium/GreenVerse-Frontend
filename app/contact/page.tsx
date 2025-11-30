import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Mail, MessageSquare, Phone } from "lucide-react"

export default function Contact() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-24">
          <h1 className="text-4xl font-bold text-foreground mb-6">Get in Touch</h1>
          <p className="text-lg text-muted-foreground">Have questions? We'd love to hear from you.</p>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 md:grid-cols-3">
            <div className="rounded-lg border border-border bg-card p-8 text-center">
              <Mail className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Email</h3>
              <a href="mailto:support@greenverse.com" className="text-primary hover:underline">
                support@greenverse.com
              </a>
            </div>
            <div className="rounded-lg border border-border bg-card p-8 text-center">
              <Phone className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Phone</h3>
              <a href="tel:+1234567890" className="text-primary hover:underline">
                +1 (234) 567-890
              </a>
            </div>
            <div className="rounded-lg border border-border bg-card p-8 text-center">
              <MessageSquare className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Chat</h3>
              <button className="text-primary hover:underline">Start Live Chat</button>
            </div>
          </div>

          <div className="mt-16 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Send us a Message</h2>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Message</label>
                <textarea
                  rows={5}
                  className="w-full px-4 py-2 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Your message..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground hover:opacity-90"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
