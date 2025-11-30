import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQ() {
  const faqs = [
    {
      question: "What types of waste does GreenVerse accept?",
      answer:
        "GreenVerse accepts most industrial waste including metals, plastics, paper, textiles, electronics, and organic materials. Check our materials guide for specific details.",
    },
    {
      question: "How is the waste pricing determined?",
      answer:
        "Pricing is based on material type, quality, quantity, and current market rates. You receive an instant quote when you submit your waste details.",
    },
    {
      question: "How often can I submit waste?",
      answer:
        "You can submit waste as often as needed. Many of our clients submit daily or weekly depending on their waste generation patterns.",
    },
    {
      question: "What happens after I submit my waste?",
      answer:
        "Once submitted, our system matches you with recovery clusters. You'll receive a quote and pickup schedule within 24 hours.",
    },
    {
      question: "How long does the pickup process take?",
      answer:
        "Typical pickup scheduling is 3-7 business days after quote acceptance. Urgent pickups may be available in some regions for a premium.",
    },
    {
      question: "When will I receive payment?",
      answer:
        "Payment is processed within 5 business days after successful delivery and verification by the recovery cluster.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-24">
          <h1 className="text-4xl font-bold text-foreground mb-6">Frequently Asked Questions</h1>
          <p className="text-lg text-muted-foreground">Find answers to common questions about GreenVerse services.</p>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4 max-w-3xl">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border border-border rounded-lg px-6">
                <AccordionTrigger className="text-foreground hover:text-primary py-4">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <Footer />
    </div>
  )
}
