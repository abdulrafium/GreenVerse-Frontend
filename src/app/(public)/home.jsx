"use client"

import { useEffect, useState } from "react"
import Navbar from "../../components/navbar"
import Footer from "../../components/footer"
import Button from "../../components/Button"
import Card from "../../components/Card"
import { Link } from "react-router-dom"
import { 
  Recycle, Leaf, Settings, CheckCircle, TrendingUp, Trash2, Users, 
  DollarSign, ShoppingCart, ArrowRight, Sprout, Droplets, Factory, 
  Package, Truck, TreePine
} from "lucide-react"
import { dashboardAPI, productsAPI } from "../../services/api"

export default function Home() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0,
    totalClusters: 0,
    plasticSaved: 0,
    partnerFarmers: 0,
    impactMetrics: {
      co2_avoided_kg: 850,
      water_saved_liters: 12500,
      energy_saved_kwh: 450,
      waste_diverted_kg: 3200
    }
  })
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    document.title = "GreenVerse - From Waste To Worth"
    fetchDashboardStats()
    fetchProducts()
  }, [])

  const fetchDashboardStats = async () => {
    try {
      const response = await dashboardAPI.getStats()
      console.log('Dashboard stats response:', response)
      // API returns { stats: { ...data } }
      const apiStats = response.data?.stats || {}
      setStats({
        totalOrders: apiStats.totalOrders || 0,
        totalUsers: apiStats.activeUsers || 0,
        totalRevenue: parseFloat(apiStats.totalRevenue || 0),
        totalClusters: apiStats.activeClusters || 0,
        plasticSaved: apiStats.landfillDiverted || 12000,
        partnerFarmers: apiStats.farmersSupported || 350,
        userGrowth: apiStats.userGrowth || '+8%',
        revenueGrowth: apiStats.revenueGrowth || '+20%',
        clusterGrowth: apiStats.clusterGrowth || '+2 this month',
        co2Growth: apiStats.co2Growth || '+8%',
        wasteGrowth: apiStats.wasteGrowth || '+12%',
        impactMetrics: {
          co2_avoided_kg: apiStats.co2Saved || 4500,
          water_saved_liters: 12500,
          energy_saved_kwh: 450,
          waste_diverted_kg: apiStats.landfillDiverted || 12000
        }
      })
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error)
      // Use default stats if API fails
    } finally {
      setLoading(false)
    }
  }

  const fetchProducts = async () => {
    try {
      const response = await productsAPI.getAll()
      console.log('Products response:', response)
      setProducts(response.data?.products || [])
    } catch (error) {
      console.error('Failed to fetch products:', error)
    }
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      <Navbar />

      {/* Hero Section */}
      <section className="min-h-screen flex items-center relative bg-[#F6F3EB] overflow-hidden pt-20">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating Leaves Animation */}
          <div className="absolute top-20 right-20 w-32 h-32 opacity-20 animate-float">
            <Leaf size={120} className="text-[#3AA174]" />
          </div>
          <div className="absolute top-40 left-10 w-24 h-24 opacity-15 animate-float-delayed">
            <Leaf size={90} className="text-[#C8A656]" />
          </div>
          <div className="absolute bottom-32 right-40 w-20 h-20 opacity-20 animate-float-slow">
            <Leaf size={75} className="text-[#3AA174]" />
          </div>
          
          {/* Organic Blob Shapes */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px]">
            <div className="absolute inset-0 bg-gradient-to-br from-[#3AA174]/10 to-[#C8A656]/10 rounded-[40%_60%_70%_30%/60%_30%_70%_40%] animate-blob"></div>
          </div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px]">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#8FCFA7]/10 to-[#3AA174]/10 rounded-[60%_40%_30%_70%/40%_70%_30%_60%] animate-blob animation-delay-2000"></div>
          </div>
          <div className="absolute top-1/2 left-1/4 w-[300px] h-[300px]">
            <div className="absolute inset-0 bg-gradient-to-br from-[#C6A477]/10 to-[#C8A656]/10 rounded-[70%_30%_50%_50%/30%_60%_40%_70%] animate-blob animation-delay-4000"></div>
          </div>
          
          {/* Recycling Icons */}
          <div className="absolute bottom-20 left-20 opacity-10 animate-spin-slow">
            <Recycle size={80} className="text-[#3AA174]" />
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-6 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#3AA174]/10 text-[#0F5132] rounded-full text-sm font-semibold">
              <Recycle size={16} /> Sustainable Future
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-[#0F5132] font-poppins leading-tight">
              From <span className="text-[#3AA174]">Waste</span> <br/> To <span className="text-[#C8A656]">Worth</span>.
            </h1>
            <p className="text-lg md:text-xl text-[#0F5132] leading-relaxed max-w-lg font-medium bg-white/60 backdrop-blur-sm px-6 py-4 rounded-2xl shadow-lg border border-[#3AA174]/20 hover:shadow-2xl hover:shadow-[#3AA174]/30 hover:border-[#3AA174]/40 hover:bg-white/80 hover:scale-[1.02] transition-all duration-500 cursor-pointer group">
              We transform discarded banana stems into <span className="text-[#3AA174] font-bold group-hover:text-[#2d8c5f] transition-colors">eco-friendly, biodegradable</span> plates and packaging, <span className="text-[#C8A656] font-bold group-hover:text-[#b8944a] transition-colors">empowering farmers</span> and <span className="text-[#3AA174] font-bold group-hover:text-[#2d8c5f] transition-colors">saving the planet</span>.
            </p>
            <div className="flex items-center gap-4 pt-4">
              <Link to="/products">
                <Button>Explore Products</Button>
              </Link>
              <Link to="/process">
                <Button variant="secondary">How It Works</Button>
              </Link>
            </div>
            
            <div className="pt-12 flex items-center gap-8">
              <div>
                <h4 className="text-3xl font-bold text-[#0F5132]">
                  {loading ? "..." : `${(stats.plasticSaved / 1000).toFixed(1)}K+`}
                </h4>
                <p className="text-stone-500">Plastic Saved (kg)</p>
              </div>
              <div className="w-px h-12 bg-stone-300"></div>
              <div>
                <h4 className="text-3xl font-bold text-[#0F5132]">
                  {loading ? "..." : `${stats.partnerFarmers}+`}
                </h4>
                <p className="text-stone-500">Partner Farmers</p>
              </div>
            </div>
          </div>

          {/* Hero Image / Graphic */}
          <div className="relative h-[500px] w-full flex items-center justify-center">
            <div className="absolute w-[400px] h-[400px] bg-[#3AA174] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
            <div className="relative bg-white p-6 rounded-[40px] shadow-2xl transform rotate-3 hover:rotate-0 transition-all duration-500 border border-stone-100">
               <div className="h-64 w-64 md:h-80 md:w-80 rounded-2xl overflow-hidden">
                 <img 
                   src="/nao-banana.png" 
                   alt="Banana Fiber Plate" 
                   className="w-full h-full object-cover"
                 />
               </div>
               <div className="mt-4">
                 <h3 className="font-bold text-xl text-[#0F5132]">Banana Fiber Plate</h3>
                 <p className="text-stone-500">100% Biodegradable • Chemical Free</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Impact Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F5132] font-poppins mb-2">Our Impact</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* CO2 Avoided */}
            <div className="bg-white border-2 border-[#3AA174] rounded-3xl p-6 hover:shadow-xl hover:scale-105 hover:-translate-y-2 transition-all duration-500 group cursor-pointer relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#3AA174]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="flex items-start justify-between mb-3 relative z-10">
                <div>
                  <p className="text-stone-600 text-sm font-medium mb-1">CO2 Avoided</p>
                  <h3 className="text-3xl font-bold text-[#0F5132] group-hover:text-[#3AA174] transition-colors">
                    {loading ? "..." : `${(stats.impactMetrics.co2_avoided_kg / 1000).toFixed(1)}K kg`}
                  </h3>
                </div>
                <div className="w-12 h-12 bg-[#3AA174]/10 group-hover:bg-[#3AA174] rounded-full flex items-center justify-center transition-all duration-500 group-hover:rotate-12 group-hover:scale-110">
                  <TrendingUp size={24} className="text-[#3AA174] group-hover:text-white transition-colors" />
                </div>
              </div>
              <span className="text-sm font-semibold text-[#3AA174] relative z-10">{loading ? "..." : stats.co2Growth || "+8%"}</span>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#3AA174] to-[#8FCFA7] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </div>

            {/* Waste Diverted */}
            <div className="bg-white border-2 border-[#3AA174] rounded-3xl p-6 hover:shadow-xl hover:scale-105 hover:-translate-y-2 transition-all duration-500 group cursor-pointer relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#8FCFA7]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="flex items-start justify-between mb-3 relative z-10">
                <div>
                  <p className="text-stone-600 text-sm font-medium mb-1">Waste Diverted</p>
                  <h3 className="text-3xl font-bold text-[#0F5132] group-hover:text-[#3AA174] transition-colors">
                    {loading ? "..." : `${(stats.impactMetrics.waste_diverted_kg / 1000).toFixed(1)}K kg`}
                  </h3>
                </div>
                <div className="w-12 h-12 bg-[#8FCFA7]/10 group-hover:bg-[#8FCFA7] rounded-full flex items-center justify-center transition-all duration-500 group-hover:rotate-12 group-hover:scale-110">
                  <Trash2 size={24} className="text-[#8FCFA7] group-hover:text-white transition-colors" />
                </div>
              </div>
              <span className="text-sm font-semibold text-[#3AA174] relative z-10">{loading ? "..." : stats.wasteGrowth || "+12%"}</span>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#8FCFA7] to-[#3AA174] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </div>

            {/* Jobs Created */}
            <div className="bg-white border-2 border-[#3AA174] rounded-3xl p-6 hover:shadow-xl hover:scale-105 hover:-translate-y-2 transition-all duration-500 group cursor-pointer relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#C8A656]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="flex items-start justify-between mb-3 relative z-10">
                <div>
                  <p className="text-stone-600 text-sm font-medium mb-1">Total Users</p>
                  <h3 className="text-3xl font-bold text-[#0F5132] group-hover:text-[#3AA174] transition-colors">
                    {loading ? "..." : stats.totalUsers}
                  </h3>
                </div>
                <div className="w-12 h-12 bg-[#C8A656]/10 group-hover:bg-[#C8A656] rounded-full flex items-center justify-center transition-all duration-500 group-hover:rotate-12 group-hover:scale-110">
                  <Users size={24} className="text-[#C8A656] group-hover:text-white transition-colors" />
                </div>
              </div>
              <span className="text-sm font-semibold text-[#3AA174] relative z-10">{loading ? "..." : stats.userGrowth || "+8%"}</span>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#C8A656] to-[#C6A477] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </div>

            {/* Revenue */}
            <div className="bg-[#3AA174] rounded-3xl p-6 hover:shadow-2xl hover:scale-105 hover:-translate-y-2 transition-all duration-500 text-white group cursor-pointer relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="flex items-start justify-between mb-3 relative z-10">
                <div>
                  <p className="text-white/80 text-sm font-medium mb-1">Revenue</p>
                  <h3 className="text-3xl font-bold group-hover:scale-110 transition-transform">
                    {loading ? "..." : `PKR ${stats.totalRevenue >= 1000 ? (stats.totalRevenue / 1000).toFixed(1) + 'K' : stats.totalRevenue.toFixed(0)}`}
                  </h3>
                </div>
                <div className="w-12 h-12 bg-white/20 group-hover:bg-white rounded-full flex items-center justify-center transition-all duration-500 group-hover:rotate-12 group-hover:scale-110">
                  <DollarSign size={24} className="text-white group-hover:text-[#3AA174] transition-colors" />
                </div>
              </div>
              <span className="text-sm font-semibold relative z-10">{loading ? "..." : stats.revenueGrowth || "+20%"}</span>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-[#F6F3EB]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F5132] font-poppins">How It Works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Step 1: Collect */}
            <div className="bg-white border-2 border-[#3AA174] rounded-3xl p-6 hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 group cursor-pointer relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#3AA174]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Step Number with Animation */}
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[#3AA174] to-[#2d8c5f] text-white rounded-2xl flex items-center justify-center text-2xl font-bold mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                  1
                </div>
                {/* Icon Badge */}
                <div className="absolute -top-2 -right-2 w-10 h-10 bg-[#8FCFA7] rounded-full flex items-center justify-center group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
                  <Sprout size={20} className="text-white" />
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-[#0F5132] mb-2 group-hover:text-[#3AA174] transition-colors">Collect</h3>
              <p className="text-stone-600">Gather agricultural waste from banana farms</p>
              
              {/* Bottom Progress Bar */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#3AA174] to-[#8FCFA7] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </div>

            {/* Step 2: Process */}
            <div className="bg-white border-2 border-[#3AA174] rounded-3xl p-6 hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 group cursor-pointer relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#8FCFA7]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[#3AA174] to-[#2d8c5f] text-white rounded-2xl flex items-center justify-center text-2xl font-bold mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                  2
                </div>
                <div className="absolute -top-2 -right-2 w-10 h-10 bg-[#C8A656] rounded-full flex items-center justify-center group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
                  <Droplets size={20} className="text-white" />
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-[#0F5132] mb-2 group-hover:text-[#3AA174] transition-colors">Process</h3>
              <p className="text-stone-600">Clean and process fiber through natural methods</p>
              
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#C8A656] to-[#C6A477] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </div>

            {/* Step 3: Create */}
            <div className="bg-white border-2 border-[#3AA174] rounded-3xl p-6 hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 group cursor-pointer relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#C6A477]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[#3AA174] to-[#2d8c5f] text-white rounded-2xl flex items-center justify-center text-2xl font-bold mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                  3
                </div>
                <div className="absolute -top-2 -right-2 w-10 h-10 bg-[#3AA174] rounded-full flex items-center justify-center group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
                  <Factory size={20} className="text-white" />
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-[#0F5132] mb-2 group-hover:text-[#3AA174] transition-colors">Create</h3>
              <p className="text-stone-600">Manufacture eco-friendly products with precision</p>
              
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#3AA174] to-[#0F5132] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </div>

            {/* Step 4: Deliver */}
            <div className="bg-white border-2 border-[#3AA174] rounded-3xl p-6 hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 group cursor-pointer relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#0F5132]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[#3AA174] to-[#2d8c5f] text-white rounded-2xl flex items-center justify-center text-2xl font-bold mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                  4
                </div>
                <div className="absolute -top-2 -right-2 w-10 h-10 bg-[#8FCFA7] rounded-full flex items-center justify-center group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
                  <Truck size={20} className="text-white" />
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-[#0F5132] mb-2 group-hover:text-[#3AA174] transition-colors">Deliver</h3>
              <p className="text-stone-600">Supply sustainable products to customers</p>
              
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#8FCFA7] to-[#3AA174] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F5132] font-poppins">Featured Products</h2>
            <Link to="/products" className="text-[#3AA174] font-semibold flex items-center gap-2 hover:gap-3 transition-all">
              View All <ArrowRight size={20} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {products.slice(0, 4).map((product) => {
              // Map product names to images
              const imageMap = {
                "Banana Fiber Tray": '/eco-friendly-plates.jpg',
                "Banana Fiber Plate (10\")": '/eco-friendly-plates.jpg',
                "Eco-Bowl (500ml)": '/fiber-containers.jpg',
                "Biodegradable Cutlery Set": '/bamboo-cutlery.jpg',
                "Fiber Gift Box": '/compostable-bags.jpg'
              };
              
              const productImage = imageMap[product.name] || '/eco-friendly-plates.jpg';
              
              return (
                <div key={product.id} className="bg-white border border-stone-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 group">
                  <div className="relative h-64 bg-gradient-to-br from-stone-100 to-stone-200 overflow-hidden">
                    <img 
                      src={productImage} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-[#3AA174] text-white text-xs font-semibold px-3 py-1 rounded-full">
                        {product.category}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className={`text-white text-xs font-semibold px-3 py-1 rounded-full ${
                        product.stock > 10 ? "bg-green-600" :
                        product.stock > 0 ? "bg-yellow-600" :
                        "bg-red-600"
                      }`}>
                        {product.stock > 10 ? "In Stock" : product.stock > 0 ? "Low Stock" : "Out of Stock"}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-lg text-[#0F5132] mb-2 group-hover:text-[#3AA174] transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-stone-600 text-sm mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <span className="text-2xl font-bold text-[#0F5132]">PKR {product.price}</span>
                      </div>
                      <button className="w-10 h-10 bg-[#3AA174] text-white rounded-full flex items-center justify-center hover:bg-[#0F5132] transition-colors">
                        <ShoppingCart size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How We Do It Steps - OLD SECTION REMOVED */}
      {/* Benefits Section */}
      <section className="py-24 bg-[#F6F3EB]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F5132] font-poppins">Why Choose GreenVerse?</h2>
            <p className="text-stone-600 mt-4">Join the eco-revolution with sustainable alternatives</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <div className="w-16 h-16 bg-[#3AA174]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Leaf size={32} className="text-[#3AA174]" />
              </div>
              <h3 className="text-xl font-bold text-[#0F5132] mb-2">100% Biodegradable</h3>
              <p className="text-stone-600">
                Our products naturally decompose within 60-90 days, leaving zero harmful residue.
              </p>
            </Card>
            <Card className="text-center">
              <div className="w-16 h-16 bg-[#C8A656]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🌾</span>
              </div>
              <h3 className="text-xl font-bold text-[#0F5132] mb-2">Farmer Empowerment</h3>
              <p className="text-stone-600">
                Direct partnership with 350+ farmers, creating sustainable income from agricultural waste.
              </p>
            </Card>
            <Card className="text-center">
              <div className="w-16 h-16 bg-[#C6A477]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">♻️</span>
              </div>
              <h3 className="text-xl font-bold text-[#0F5132] mb-2">Plastic-Free Future</h3>
              <p className="text-stone-600">
                Help us eliminate 12,500+ kg of plastic waste annually with every purchase.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#3AA174] to-[#2d8c5f] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-poppins">Ready to Make an Impact?</h2>
          <p className="text-lg md:text-xl mb-10 opacity-95 max-w-3xl mx-auto leading-relaxed">
            Join hundreds of businesses and individuals choosing sustainable alternatives. Together, we can create a plastic-free future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/register">
              <button className="px-8 py-4 bg-white text-[#3AA174] hover:bg-stone-50 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 min-w-[200px]">
                Partner With Us
              </button>
            </Link>
            <Link to="/products">
              <button className="px-8 py-4 bg-transparent text-white border-2 border-white hover:bg-white hover:text-[#3AA174] rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 min-w-[200px]">
                Shop Now
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
