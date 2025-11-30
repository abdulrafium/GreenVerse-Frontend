"use client"

import { useEffect } from "react"
import Navbar from "../../components/navbar"
import Footer from "../../components/footer"
import { Sprout, Scissors, Factory, Package, Truck, Store, Leaf, ArrowRight, CheckCircle } from "lucide-react"

export default function Process() {
  useEffect(() => {
    document.title = "Our Process - GreenVerse"
  }, [])

  const steps = [
    {
      number: "1",
      title: "Harvest & Collection",
      description: "After banana harvest, we collect discarded stems from partner farms across Kerala, Tamil Nadu, and Karnataka",
      icon: Sprout,
      color: "#3AA174"
    },
    {
      number: "2",
      title: "Fiber Extraction",
      description: "Stems are processed to extract high-quality fibers using eco-friendly mechanical methods, no chemicals",
      icon: Scissors,
      color: "#8FCFA7"
    },
    {
      number: "3",
      title: "Manufacturing",
      description: "Extracted fibers are transformed into plates, bowls, and packaging through heat-press molding technology",
      icon: Factory,
      color: "#C8A656"
    },
    {
      number: "4",
      title: "Quality Check",
      description: "Every product undergoes rigorous quality testing for strength, biodegradability, and food safety standards",
      icon: Package,
      color: "#C6A477"
    },
    {
      number: "5",
      title: "Distribution",
      description: "Products are packaged and distributed to retail partners, restaurants, and direct consumers nationwide",
      icon: Truck,
      color: "#3AA174"
    },
    {
      number: "6",
      title: "Market Ready",
      description: "Eco-friendly products reach customers, completing the circular economy and supporting farmer livelihoods",
      icon: Store,
      color: "#2d8c5f"
    },
  ]

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      <Navbar />

      {/* Hero Section */}
      <section className="min-h-[50vh] flex items-center relative bg-gradient-to-br from-[#F6F3EB] via-[#FDFBF7] to-[#F6F3EB] overflow-hidden pt-20">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-32 h-32 opacity-10 animate-float">
            <Factory size={120} className="text-[#3AA174]" />
          </div>
          <div className="absolute bottom-20 left-10 w-24 h-24 opacity-10 animate-float-delayed">
            <Sprout size={90} className="text-[#C8A656]" />
          </div>
          <div className="absolute top-1/2 right-1/3 w-20 h-20 opacity-10 animate-spin-slow">
            <Leaf size={75} className="text-[#3AA174]" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#3AA174]/10 text-[#0F5132] rounded-full text-sm font-semibold mb-6 animate-fade-in">
            <Factory size={16} /> Our Process
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-[#0F5132] font-poppins mb-6 animate-fade-in">
            From <span className="text-[#3AA174]">Waste</span> to <span className="text-[#C8A656]">Product</span>
          </h1>
          <p className="text-xl text-stone-600 leading-relaxed max-w-3xl mx-auto animate-fade-in">
            Discover how we transform discarded banana stems into beautiful, eco-friendly products through our sustainable 6-step process.
          </p>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((step, idx) => {
              const Icon = step.icon
              return (
                <div 
                  key={idx} 
                  className="bg-white border-2 border-stone-200 rounded-3xl p-8 hover:border-[#3AA174] hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 group cursor-pointer relative overflow-hidden"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  {/* Background Icon */}
                  <div className="absolute top-4 right-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Icon size={100} className="text-[#3AA174]" />
                  </div>

                  {/* Step Number */}
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg text-white"
                    style={{ backgroundColor: step.color }}
                  >
                    {step.number}
                  </div>

                  {/* Icon Badge */}
                  <div 
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-500"
                    style={{ backgroundColor: `${step.color}15` }}
                  >
                    <Icon size={28} style={{ color: step.color }} />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-[#0F5132] mb-3 group-hover:text-[#3AA174] transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-stone-600 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Arrow Connector (except last item) */}
                  {idx < steps.length - 1 && (
                    <div className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
                      <div className="w-8 h-8 bg-[#3AA174] rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                        <ArrowRight size={16} className="text-white" />
                      </div>
                    </div>
                  )}

                  {/* Progress Bar */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#3AA174] to-[#8FCFA7] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-[#F6F3EB]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F5132] font-poppins mb-2">Why Our Process Matters</h2>
            <p className="text-stone-600">Environmental and social impact of our manufacturing process</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-[#3AA174]/10 rounded-xl flex items-center justify-center mb-4">
                <CheckCircle size={24} className="text-[#3AA174]" />
              </div>
              <h4 className="text-lg font-bold text-[#0F5132] mb-2">100% Chemical-Free</h4>
              <p className="text-stone-600">No harmful chemicals used in processing, ensuring safe food contact</p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-[#8FCFA7]/10 rounded-xl flex items-center justify-center mb-4">
                <CheckCircle size={24} className="text-[#8FCFA7]" />
              </div>
              <h4 className="text-lg font-bold text-[#0F5132] mb-2">Zero Waste</h4>
              <p className="text-stone-600">Every part of the banana stem is utilized, creating circular economy</p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-[#C8A656]/10 rounded-xl flex items-center justify-center mb-4">
                <CheckCircle size={24} className="text-[#C8A656]" />
              </div>
              <h4 className="text-lg font-bold text-[#0F5132] mb-2">Farmer Income</h4>
              <p className="text-stone-600">Additional revenue stream for farmers from agricultural waste</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
