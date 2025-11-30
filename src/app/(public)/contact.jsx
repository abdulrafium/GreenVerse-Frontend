"use client"

import { useEffect, useState } from "react"
import Navbar from "../../components/navbar"
import Footer from "../../components/footer"
import Button from "../../components/Button"
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, Leaf } from "lucide-react"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  useEffect(() => {
    document.title = "Contact Us - GreenVerse"
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    alert("Thank you for your message! We will get back to you soon.")
    setFormData({ name: "", email: "", subject: "", message: "" })
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      <Navbar />

      {/* Hero Section */}
      <section className="min-h-[40vh] flex items-center relative bg-gradient-to-br from-[#F6F3EB] via-[#FDFBF7] to-[#F6F3EB] overflow-hidden pt-20">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-32 h-32 opacity-10 animate-float">
            <MessageCircle size={120} className="text-[#3AA174]" />
          </div>
          <div className="absolute bottom-20 left-10 w-24 h-24 opacity-10 animate-float-delayed">
            <Mail size={90} className="text-[#C8A656]" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#3AA174]/10 text-[#0F5132] rounded-full text-sm font-semibold mb-6 animate-fade-in">
            <MessageCircle size={16} /> Get In Touch
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-[#0F5132] font-poppins mb-6 animate-fade-in">
            Contact <span className="text-[#3AA174]">Us</span>
          </h1>
          <p className="text-xl text-stone-600 leading-relaxed max-w-3xl mx-auto animate-fade-in">
            Have questions about our products or want to partner with us? We'd love to hear from you!
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Info Cards */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-[#3AA174] to-[#2d8c5f] rounded-3xl p-6 text-white hover:scale-105 transition-all duration-500 group cursor-pointer">
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  <Mail size={28} className="text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2">Email Us</h3>
                <p className="text-white/90 text-sm mb-3">Send us a message anytime</p>
                <a href="mailto:greenVerse786@gmail.com" className="text-white font-semibold hover:underline">
                  greenVerse786@gmail.com
                </a>
              </div>

              <div className="bg-gradient-to-br from-[#8FCFA7] to-[#6bbf8f] rounded-3xl p-6 text-white hover:scale-105 transition-all duration-500 group cursor-pointer">
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  <Phone size={28} className="text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2">Call Us</h3>
                <p className="text-white/90 text-sm mb-3">Mon-Fri 9am to 6pm PKT</p>
                <a href="tel:+923333886321" className="text-white font-semibold hover:underline">
                  +92 333 3886321
                </a>
              </div>

              <div className="bg-gradient-to-br from-[#C8A656] to-[#b8944a] rounded-3xl p-6 text-white hover:scale-105 transition-all duration-500 group cursor-pointer">
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  <MapPin size={28} className="text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2">Visit Us</h3>
                <p className="text-white/90 text-sm mb-3">Our main office</p>
                <p className="text-white font-semibold">
                  Sukkur, Pakistan
                </p>
              </div>

              <div className="bg-[#F6F3EB] border-2 border-[#3AA174] rounded-3xl p-6 hover:shadow-xl transition-all duration-500">
                <div className="w-14 h-14 bg-[#3AA174]/10 rounded-2xl flex items-center justify-center mb-4">
                  <Clock size={28} className="text-[#3AA174]" />
                </div>
                <h3 className="text-lg font-bold text-[#0F5132] mb-2">Business Hours</h3>
                <div className="space-y-1 text-stone-600 text-sm">
                  <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p>Saturday: 10:00 AM - 4:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white border-2 border-stone-200 rounded-3xl p-8 hover:shadow-2xl transition-all duration-500">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-[#0F5132] mb-2">Send us a Message</h2>
                  <p className="text-stone-600">Fill out the form below and we'll get back to you within 24 hours</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="group">
                      <label className="block text-[#0F5132] font-semibold mb-2 group-focus-within:text-[#3AA174] transition-colors">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border-2 border-stone-200 rounded-xl focus:border-[#3AA174] focus:ring-2 focus:ring-[#3AA174]/20 outline-none transition-all duration-300"
                        placeholder="John Doe"
                      />
                    </div>

                    <div className="group">
                      <label className="block text-[#0F5132] font-semibold mb-2 group-focus-within:text-[#3AA174] transition-colors">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border-2 border-stone-200 rounded-xl focus:border-[#3AA174] focus:ring-2 focus:ring-[#3AA174]/20 outline-none transition-all duration-300"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="group">
                    <label className="block text-[#0F5132] font-semibold mb-2 group-focus-within:text-[#3AA174] transition-colors">
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-stone-200 rounded-xl focus:border-[#3AA174] focus:ring-2 focus:ring-[#3AA174]/20 outline-none transition-all duration-300"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <div className="group">
                    <label className="block text-[#0F5132] font-semibold mb-2 group-focus-within:text-[#3AA174] transition-colors">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="6"
                      className="w-full px-4 py-3 border-2 border-stone-200 rounded-xl focus:border-[#3AA174] focus:ring-2 focus:ring-[#3AA174]/20 outline-none transition-all duration-300 resize-none"
                      placeholder="Tell us more about your inquiry..."
                    ></textarea>
                  </div>

                  <Button className="w-full md:w-auto">
                    <span className="flex items-center gap-2">
                      Send Message <Send size={18} />
                    </span>
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
