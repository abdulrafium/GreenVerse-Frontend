"use client"

import { useEffect } from "react"
import Navbar from "../../components/navbar"
import Footer from "../../components/footer"
import { mockImpactData } from "../../lib/mockData"
import { TrendingUp, Trash2, Users, DollarSign, Factory, Globe, Leaf, TreePine, Recycle } from "lucide-react"

export default function Impact() {
  useEffect(() => {
    document.title = "Our Impact - GreenVerse"
  }, [])

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      <Navbar />

      {/* Hero Section */}
      <section className="min-h-[50vh] flex items-center relative bg-gradient-to-br from-[#F6F3EB] via-[#FDFBF7] to-[#F6F3EB] overflow-hidden pt-20">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-32 h-32 opacity-10 animate-float">
            <Globe size={120} className="text-[#3AA174]" />
          </div>
          <div className="absolute bottom-20 left-10 w-24 h-24 opacity-10 animate-float-delayed">
            <TreePine size={90} className="text-[#C8A656]" />
          </div>
          <div className="absolute top-1/2 right-1/3 w-20 h-20 opacity-10 animate-spin-slow">
            <Recycle size={75} className="text-[#3AA174]" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#3AA174]/10 text-[#0F5132] rounded-full text-sm font-semibold mb-6 animate-fade-in">
            <Globe size={16} /> Environmental Impact
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-[#0F5132] font-poppins mb-6 animate-fade-in">
            Our <span className="text-[#3AA174]">Impact</span>
          </h1>
          <p className="text-xl text-stone-600 leading-relaxed max-w-3xl mx-auto animate-fade-in">
            Making a measurable difference in environmental sustainability, one banana fiber product at a time.
          </p>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F5132] font-poppins mb-2">Key Metrics</h2>
            <p className="text-stone-600">Measuring our environmental footprint</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* CO2 Saved */}
            <div className="bg-white border-2 border-[#3AA174] rounded-3xl p-8 hover:shadow-2xl hover:scale-105 hover:-translate-y-2 transition-all duration-500 group cursor-pointer relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#3AA174]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="flex items-start justify-between mb-4 relative z-10">
                <div>
                  <p className="text-stone-600 text-sm font-medium mb-1">CO2 Saved</p>
                  <h3 className="text-4xl font-bold text-[#0F5132] group-hover:text-[#3AA174] transition-colors">{mockImpactData.co2Saved}kg</h3>
                </div>
                <div className="w-14 h-14 bg-[#3AA174]/10 group-hover:bg-[#3AA174] rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:rotate-12 group-hover:scale-110">
                  <Globe size={28} className="text-[#3AA174] group-hover:text-white transition-colors" />
                </div>
              </div>
              <span className="text-sm font-semibold text-[#3AA174] relative z-10">+8% this month</span>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#3AA174] to-[#8FCFA7] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </div>

            {/* Waste Diverted */}
            <div className="bg-white border-2 border-[#3AA174] rounded-3xl p-8 hover:shadow-2xl hover:scale-105 hover:-translate-y-2 transition-all duration-500 group cursor-pointer relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#8FCFA7]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="flex items-start justify-between mb-4 relative z-10">
                <div>
                  <p className="text-stone-600 text-sm font-medium mb-1">Waste Diverted</p>
                  <h3 className="text-4xl font-bold text-[#0F5132] group-hover:text-[#3AA174] transition-colors">{mockImpactData.landfillDiverted}kg</h3>
                </div>
                <div className="w-14 h-14 bg-[#8FCFA7]/10 group-hover:bg-[#8FCFA7] rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:rotate-12 group-hover:scale-110">
                  <Trash2 size={28} className="text-[#8FCFA7] group-hover:text-white transition-colors" />
                </div>
              </div>
              <span className="text-sm font-semibold text-[#3AA174] relative z-10">+15% this month</span>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#8FCFA7] to-[#3AA174] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </div>

            {/* Waste Processed */}
            <div className="bg-white border-2 border-[#3AA174] rounded-3xl p-8 hover:shadow-2xl hover:scale-105 hover:-translate-y-2 transition-all duration-500 group cursor-pointer relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#C8A656]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="flex items-start justify-between mb-4 relative z-10">
                <div>
                  <p className="text-stone-600 text-sm font-medium mb-1">Waste Processed</p>
                  <h3 className="text-4xl font-bold text-[#0F5132] group-hover:text-[#3AA174] transition-colors">{mockImpactData.wasteProcessed}kg</h3>
                </div>
                <div className="w-14 h-14 bg-[#C8A656]/10 group-hover:bg-[#C8A656] rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:rotate-12 group-hover:scale-110">
                  <Recycle size={28} className="text-[#C8A656] group-hover:text-white transition-colors" />
                </div>
              </div>
              <span className="text-sm font-semibold text-[#3AA174] relative z-10">+12% this month</span>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#C8A656] to-[#C6A477] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Metrics */}
      <section className="py-16 bg-[#F6F3EB]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F5132] font-poppins mb-2">Community Impact</h2>
            <p className="text-stone-600">Growing our ecosystem together</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Revenue */}
            <div className="bg-gradient-to-br from-[#3AA174] to-[#2d8c5f] rounded-3xl p-8 text-white hover:scale-105 transition-all duration-500 group cursor-pointer">
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                <DollarSign size={28} className="text-white" />
              </div>
              <p className="text-white/80 text-sm font-medium mb-2">Revenue Generated</p>
              <h3 className="text-4xl font-bold mb-2">PKR {mockImpactData.revenue}k</h3>
              <span className="text-sm font-semibold">+20% this month</span>
            </div>

            {/* Active Clusters */}
            <div className="bg-gradient-to-br from-[#8FCFA7] to-[#6bbf8f] rounded-3xl p-8 text-white hover:scale-105 transition-all duration-500 group cursor-pointer">
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                <Factory size={28} className="text-white" />
              </div>
              <p className="text-white/80 text-sm font-medium mb-2">Active Clusters</p>
              <h3 className="text-4xl font-bold mb-2">{mockImpactData.clusters}</h3>
              <span className="text-sm font-semibold">+2 this month</span>
            </div>

            {/* Active Users */}
            <div className="bg-gradient-to-br from-[#C8A656] to-[#b8944a] rounded-3xl p-8 text-white hover:scale-105 transition-all duration-500 group cursor-pointer">
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                <Users size={28} className="text-white" />
              </div>
              <p className="text-white/80 text-sm font-medium mb-2">Active Users</p>
              <h3 className="text-4xl font-bold mb-2">{mockImpactData.activeUsers}</h3>
              <span className="text-sm font-semibold">+32 this month</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
