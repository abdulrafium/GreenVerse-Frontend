"use client"

import { useEffect, useState } from "react"
import Navbar from "../../components/navbar"
import Footer from "../../components/footer"
import Card from "../../components/Card"
import { dashboardAPI } from "../../services/api"
import { Leaf, Users, Target, Heart, Award, TreePine, Recycle, TrendingUp, Globe } from "lucide-react"

export default function About() {
  const [stats, setStats] = useState({
    farmers: 0,
    co2Saved: 0,
    wasteDiverted: 0,
    productsSold: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    document.title = "About Us - GreenVerse"
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await dashboardAPI.getStats()
      const apiStats = response.data?.stats || {}
      
      setStats({
        farmers: apiStats.farmersSupported || 350,
        co2Saved: apiStats.co2Saved || 0,
        wasteDiverted: apiStats.landfillDiverted || 0,
        productsSold: apiStats.totalProductsSold || 0
      })
    } catch (error) {
      console.error('Failed to fetch stats:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      <Navbar />

      {/* Hero Section */}
      <section className="min-h-[60vh] flex items-center relative bg-gradient-to-br from-[#F6F3EB] via-[#FDFBF7] to-[#F6F3EB] overflow-hidden pt-20">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-32 h-32 opacity-10 animate-float">
            <TreePine size={120} className="text-[#3AA174]" />
          </div>
          <div className="absolute bottom-20 left-10 w-24 h-24 opacity-10 animate-float-delayed">
            <Leaf size={90} className="text-[#C8A656]" />
          </div>
          <div className="absolute top-1/2 right-1/4 w-20 h-20 opacity-10 animate-spin-slow">
            <Recycle size={75} className="text-[#3AA174]" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#3AA174]/10 text-[#0F5132] rounded-full text-sm font-semibold mb-6 animate-fade-in">
            <Heart size={16} /> Our Story
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-[#0F5132] font-poppins mb-6 animate-fade-in">
            About <span className="text-[#3AA174]">GreenVerse</span>
          </h1>
          <p className="text-xl text-stone-600 leading-relaxed max-w-3xl mx-auto animate-fade-in">
            Transforming agricultural waste into sustainable products, empowering farmers, and creating a greener future for generations to come.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-to-br from-[#3AA174] to-[#2d8c5f] rounded-3xl p-8 text-white hover:scale-105 transition-all duration-500 group cursor-pointer relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 opacity-10 group-hover:opacity-20 transition-opacity">
                <Target size={120} className="text-white" />
              </div>
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                <Target size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-white/90 leading-relaxed">
                To create a circular economy by transforming banana stem waste into eco-friendly products, preventing landfill waste while generating sustainable revenue for farming communities.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-[#C8A656] to-[#b8944a] rounded-3xl p-8 text-white hover:scale-105 transition-all duration-500 group cursor-pointer relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 opacity-10 group-hover:opacity-20 transition-opacity">
                <Globe size={120} className="text-white" />
              </div>
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                <Globe size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-white/90 leading-relaxed">
                A world where agricultural waste is valued as a resource, farmers profit from sustainable practices, and environmental impact is measured in positive outcomes for our planet.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-[#F6F3EB]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F5132] font-poppins mb-2">Our Values</h2>
            <p className="text-stone-600">The principles that guide everything we do</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white border-2 border-[#3AA174] rounded-3xl p-8 hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 group cursor-pointer">
              <div className="w-16 h-16 bg-[#3AA174]/10 group-hover:bg-[#3AA174] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                <Leaf size={32} className="text-[#3AA174] group-hover:text-white transition-colors" />
              </div>
              <h4 className="text-xl font-bold text-[#0F5132] mb-3 group-hover:text-[#3AA174] transition-colors">Sustainability</h4>
              <p className="text-stone-600 leading-relaxed">
                Every decision prioritizes environmental impact and long-term ecological health for future generations.
              </p>
            </div>
            
            <div className="bg-white border-2 border-[#3AA174] rounded-3xl p-8 hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 group cursor-pointer">
              <div className="w-16 h-16 bg-[#8FCFA7]/10 group-hover:bg-[#8FCFA7] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                <Award size={32} className="text-[#8FCFA7] group-hover:text-white transition-colors" />
              </div>
              <h4 className="text-xl font-bold text-[#0F5132] mb-3 group-hover:text-[#3AA174] transition-colors">Transparency</h4>
              <p className="text-stone-600 leading-relaxed">
                Clear communication and honest metrics build trust with all stakeholders in our ecosystem.
              </p>
            </div>
            
            <div className="bg-white border-2 border-[#3AA174] rounded-3xl p-8 hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 group cursor-pointer">
              <div className="w-16 h-16 bg-[#C8A656]/10 group-hover:bg-[#C8A656] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                <TrendingUp size={32} className="text-[#C8A656] group-hover:text-white transition-colors" />
              </div>
              <h4 className="text-xl font-bold text-[#0F5132] mb-3 group-hover:text-[#3AA174] transition-colors">Innovation</h4>
              <p className="text-stone-600 leading-relaxed">
                Continuous improvement in technology and processes drives our mission forward.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F5132] font-poppins mb-2">Our Impact</h2>
            <p className="text-stone-600">Making a difference, one plate at a time</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-[#F6F3EB] rounded-2xl hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-[#3AA174] rounded-full flex items-center justify-center mx-auto mb-4">
                <Users size={32} className="text-white" />
              </div>
              <h4 className="text-3xl font-bold text-[#0F5132] mb-2">{loading ? "..." : `${stats.farmers}+`}</h4>
              <p className="text-stone-600 font-medium">Farmers Empowered</p>
            </div>
            
            <div className="text-center p-6 bg-[#F6F3EB] rounded-2xl hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-[#8FCFA7] rounded-full flex items-center justify-center mx-auto mb-4">
                <TreePine size={32} className="text-white" />
              </div>
              <h4 className="text-3xl font-bold text-[#0F5132] mb-2">{loading ? "..." : `${(stats.co2Saved / 1000).toFixed(1)}K`}</h4>
              <p className="text-stone-600 font-medium">kg CO2 Saved</p>
            </div>
            
            <div className="text-center p-6 bg-[#F6F3EB] rounded-2xl hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-[#C8A656] rounded-full flex items-center justify-center mx-auto mb-4">
                <Recycle size={32} className="text-white" />
              </div>
              <h4 className="text-3xl font-bold text-[#0F5132] mb-2">{loading ? "..." : `${(stats.wasteDiverted / 1000).toFixed(1)}K`}</h4>
              <p className="text-stone-600 font-medium">kg Waste Diverted</p>
            </div>
            
            <div className="text-center p-6 bg-[#F6F3EB] rounded-2xl hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-[#C6A477] rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf size={32} className="text-white" />
              </div>
              <h4 className="text-3xl font-bold text-[#0F5132] mb-2">
                {loading ? "..." : stats.productsSold >= 1000 ? `${(stats.productsSold / 1000).toFixed(1)}K+` : `${stats.productsSold}+`}
              </h4>
              <p className="text-stone-600 font-medium">Products Sold</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Management Section */}
      <section className="py-16 bg-gradient-to-br from-[#F6F3EB] via-[#FDFBF7] to-[#F6F3EB] relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#3AA174] rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#C8A656] rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#3AA174]/10 text-[#0F5132] rounded-full text-sm font-semibold mb-6">
              <Users size={16} /> Meet Our Team
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F5132] font-poppins mb-4">Team Management</h2>
            <p className="text-stone-600 text-lg max-w-2xl mx-auto">
              Passionate leaders and innovators driving GreenVerse towards a sustainable future
            </p>
          </div>

          {/* Team Falcon - Executive Team */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-1 w-12 bg-gradient-to-r from-[#3AA174] to-[#8FCFA7] rounded"></div>
              <div>
                <h3 className="text-2xl font-bold text-[#0F5132]">Team Falcon</h3>
                <p className="text-sm text-[#3AA174] font-semibold">Executive Leadership</p>
              </div>
              <div className="h-1 flex-1 bg-gradient-to-r from-[#8FCFA7] to-transparent rounded"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* CEO */}
              <div className="group bg-white rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-2 border-transparent hover:border-[#3AA174]">
                <div className="relative h-48 bg-gradient-to-br from-[#3AA174] to-[#2d8c5f] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="w-40 h-40 bg-white rounded-full border-4 border-white overflow-hidden mx-auto shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                      <img 
                        src="/CEO-profile.jpg" 
                        alt="Dr. Noor Ahmed Brohi" 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  </div>
                </div>
                <div className="p-6 text-center">
                  <div className="mb-2">
                    <span className="px-3 py-1 bg-[#3AA174]/10 text-[#3AA174] rounded-full text-xs font-semibold">
                      Chief Executive Officer
                    </span>
                  </div>
                  <h4 className="text-xl font-bold text-[#0F5132] mb-1">Dr. Noor Ahmed Brohi</h4>
                  <p className="text-sm text-[#3AA174] font-semibold mb-3">BNBWU, Sukkur</p>
                  <p className="text-sm text-stone-600 leading-relaxed">
                    Provides strategic direction, oversees growth, and ensures alignment with GreenVerse's mission and sustainability goals.
                  </p>
                </div>
              </div>

              {/* CTO */}
              <div className="group bg-white rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-2 border-transparent hover:border-[#8FCFA7]">
                <div className="relative h-48 bg-gradient-to-br from-[#8FCFA7] to-[#6bbf8f] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="w-40 h-40 bg-white rounded-full border-4 border-white overflow-hidden mx-auto shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                      <img 
                        src="/mhm-profile.jpg" 
                        alt="Dr. Muhammad Hussain Mughal" 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  </div>
                </div>
                <div className="p-6 text-center">
                  <div className="mb-2">
                    <span className="px-3 py-1 bg-[#8FCFA7]/10 text-[#2d8c5f] rounded-full text-xs font-semibold">
                      Chief Technology Officer
                    </span>
                  </div>
                  <h4 className="text-xl font-bold text-[#0F5132] mb-1">Dr. Muhammad Hussain Mughal</h4>
                  <p className="text-sm text-[#3AA174] font-semibold mb-3">Sukkur IBA University</p>
                  <p className="text-sm text-stone-600 leading-relaxed">
                    Leads technological innovation, product R&D, and process automation for fiber extraction and molding.
                  </p>
                </div>
              </div>

              {/* Head of Marketing */}
              <div className="group bg-white rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-2 border-transparent hover:border-[#C8A656]">
                <div className="relative h-48 bg-gradient-to-br from-[#C8A656] to-[#b8944a] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="w-40 h-40 bg-white rounded-full border-4 border-white overflow-hidden mx-auto shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                      <img 
                        src="/Raza-profile.jpg" 
                        alt="Dr. Ali Raza Lashari" 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  </div>
                </div>
                <div className="p-6 text-center">
                  <div className="mb-2">
                    <span className="px-3 py-1 bg-[#C8A656]/10 text-[#b8944a] rounded-full text-xs font-semibold">
                      Head of Marketing & Sales
                    </span>
                  </div>
                  <h4 className="text-xl font-bold text-[#0F5132] mb-1">Dr. Ali Raza Lashari</h4>
                  <p className="text-sm text-[#3AA174] font-semibold mb-3">SALU, Khairpur</p>
                  <p className="text-sm text-stone-600 leading-relaxed">
                    Develops marketing strategies, sales plans, and manages institutional partnerships and B2B client relations.
                  </p>
                </div>
              </div>

              {/* Head of Media */}
              <div className="group bg-white rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-2 border-transparent hover:border-[#3AA174]">
                <div className="relative h-48 bg-gradient-to-br from-[#3AA174] to-[#2d8c5f] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="w-40 h-40 bg-white rounded-full border-4 border-white overflow-hidden mx-auto shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                      <img 
                        src="/Mujeeb-profile.jpg" 
                        alt="Dr. Mujeeb-ur Rehman" 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  </div>
                </div>
                <div className="p-6 text-center">
                  <div className="mb-2">
                    <span className="px-3 py-1 bg-[#3AA174]/10 text-[#3AA174] rounded-full text-xs font-semibold">
                      Head of Media & PR
                    </span>
                  </div>
                  <h4 className="text-xl font-bold text-[#0F5132] mb-1">Dr. Mujeeb-ur Rehman</h4>
                  <p className="text-sm text-[#3AA174] font-semibold mb-3">SALU, Khairpur</p>
                  <p className="text-sm text-stone-600 leading-relaxed">
                    Manages media presence, public outreach, CSR initiatives, and community engagement campaigns.
                  </p>
                </div>
              </div>

              {/* Managing Director */}
              <div className="group bg-white rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-2 border-transparent hover:border-[#8FCFA7]">
                <div className="relative h-48 bg-gradient-to-br from-[#8FCFA7] to-[#6bbf8f] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="w-40 h-40 bg-white rounded-full border-4 border-white overflow-hidden mx-auto shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                      <img 
                        src="/Nabiha-profile.jpg" 
                        alt="Dr. Nabiha" 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  </div>
                </div>
                <div className="p-6 text-center">
                  <div className="mb-2">
                    <span className="px-3 py-1 bg-[#8FCFA7]/10 text-[#2d8c5f] rounded-full text-xs font-semibold">
                      Managing Director
                    </span>
                  </div>
                  <h4 className="text-xl font-bold text-[#0F5132] mb-1">Dr. Nabiha</h4>
                  <p className="text-sm text-[#3AA174] font-semibold mb-3">BNBWU, Sukkur</p>
                  <p className="text-sm text-stone-600 leading-relaxed">
                    Oversees internal operations, HR, budgeting, and organizational development.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Tech Team */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="h-1 w-12 bg-gradient-to-r from-[#C8A656] to-[#b8944a] rounded"></div>
              <h3 className="text-2xl font-bold text-[#0F5132]">Tech Team</h3>
              <div className="h-1 flex-1 bg-gradient-to-r from-[#b8944a] to-transparent rounded"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {/* Frontend Developer */}
              <div className="group relative bg-white rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#3AA174]/10 to-transparent rounded-bl-full"></div>
                <div className="p-8 relative">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#3AA174] to-[#8FCFA7] rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                      UF
                    </div>
                    <div className="flex-1">
                      <div className="mb-2">
                        <span className="px-3 py-1 bg-[#3AA174]/10 text-[#3AA174] rounded-full text-xs font-semibold">
                          Frontend Developer
                        </span>
                      </div>
                      <h4 className="text-xl font-bold text-[#0F5132] mb-1">Urooj Fatima</h4>
                      <p className="text-sm text-stone-600">Computer Scientist</p>
                    </div>
                  </div>
                  <div className="pl-24">
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-[#F6F3EB] text-[#0F5132] rounded-full text-xs font-medium">React</span>
                      <span className="px-3 py-1 bg-[#F6F3EB] text-[#0F5132] rounded-full text-xs font-medium">UI/UX</span>
                      <span className="px-3 py-1 bg-[#F6F3EB] text-[#0F5132] rounded-full text-xs font-medium">Design</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Full Stack Developer */}
              <div className="group relative bg-white rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#C8A656]/10 to-transparent rounded-bl-full"></div>
                <div className="p-8 relative">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#C8A656] to-[#b8944a] rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                      AR
                    </div>
                    <div className="flex-1">
                      <div className="mb-2">
                        <span className="px-3 py-1 bg-[#C8A656]/10 text-[#b8944a] rounded-full text-xs font-semibold">
                          Full Stack Developer
                        </span>
                      </div>
                      <h4 className="text-xl font-bold text-[#0F5132] mb-1">Abdul Rafiu</h4>
                      <p className="text-sm text-stone-600">Computer Scientist</p>
                    </div>
                  </div>
                  <div className="pl-24">
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-[#F6F3EB] text-[#0F5132] rounded-full text-xs font-medium">Backend</span>
                      <span className="px-3 py-1 bg-[#F6F3EB] text-[#0F5132] rounded-full text-xs font-medium">Database</span>
                      <span className="px-3 py-1 bg-[#F6F3EB] text-[#0F5132] rounded-full text-xs font-medium">APIs</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
