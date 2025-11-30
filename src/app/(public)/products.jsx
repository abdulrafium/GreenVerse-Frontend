"use client"

import { useEffect, useState } from "react"
import Navbar from "../../components/navbar"
import Footer from "../../components/footer"
import { productsAPI } from "../../services/api"
import { ShoppingCart, Filter, Leaf, Package, Utensils, Box, ArrowRight } from "lucide-react"

export default function Products() {
  const [products, setProducts] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("All")
  
  useEffect(() => {
    document.title = "Products - GreenVerse"
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await productsAPI.getAll()
      setProducts(response.data.products || [])
    } catch (error) {
      console.error('Failed to fetch products:', error)
    }
  }

  const categories = ["All", "Tableware", "Utensils", "Packaging"]
  
  const filteredProducts = selectedCategory === "All" 
    ? products 
    : products.filter(p => p.category === selectedCategory)

  const productImages = {
    "Banana Fiber Plate (10\")": '/eco-friendly-plates.jpg',
    "Eco-Bowl (500ml)": '/fiber-containers.jpg',
    "Biodegradable Cutlery Set": '/bamboo-cutlery.jpg',
    "Fiber Gift Box": '/compostable-bags.jpg',
    "Banana Fiber Tray": '/eco-friendly-plates.jpg',
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      <Navbar />

      {/* Hero Section */}
      <section className="min-h-[50vh] flex items-center relative bg-gradient-to-br from-[#F6F3EB] via-[#FDFBF7] to-[#F6F3EB] overflow-hidden pt-20">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 right-20 w-32 h-32 opacity-10 animate-float">
            <Package size={120} className="text-[#3AA174]" />
          </div>
          <div className="absolute bottom-20 left-10 w-24 h-24 opacity-10 animate-float-delayed">
            <Utensils size={90} className="text-[#C8A656]" />
          </div>
          <div className="absolute top-1/2 right-1/3 w-20 h-20 opacity-10 animate-spin-slow">
            <Leaf size={75} className="text-[#3AA174]" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#3AA174]/10 text-[#0F5132] rounded-full text-sm font-semibold mb-6 animate-fade-in">
            <Leaf size={16} /> Eco-Friendly Products
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-[#0F5132] font-poppins mb-6 animate-fade-in">
            Our <span className="text-[#3AA174]">Products</span>
          </h1>
          <p className="text-xl text-stone-600 leading-relaxed max-w-3xl mx-auto animate-fade-in">
            High-quality, biodegradable products made from banana stem fibers. Sustainable, beautiful, and functional.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b border-stone-200 sticky top-16 z-40 backdrop-blur-lg bg-white/95">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 text-stone-600">
              <Filter size={20} />
              <span className="font-semibold">Filter:</span>
            </div>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-[#3AA174] text-white shadow-lg scale-105'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 bg-[#F6F3EB]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white border border-stone-200 rounded-3xl overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group">
                <div className="relative h-72 bg-gradient-to-br from-stone-100 to-stone-200 overflow-hidden">
                  <img 
                    src={productImages[product.name] || '/src/pictures/eco-friendly-plates.jpg'} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#3AA174] text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {product.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className={`text-white text-xs font-semibold px-3 py-1 rounded-full ${
                      product.stock > 10 ? 'bg-green-600' :
                      product.stock > 0 ? 'bg-yellow-600' :
                      'bg-red-600'
                    }`}>
                      {product.stock > 10 ? 'In Stock' : product.stock > 0 ? 'Low Stock' : 'Out of Stock'}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl text-[#0F5132] mb-2 group-hover:text-[#3AA174] transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-stone-600 text-sm mb-4 leading-relaxed">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-stone-200">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-3xl font-bold text-[#0F5132]">PKR {product.price}</span>
                      </div>
                      <p className="text-xs text-stone-500 mt-1">{product.stock} units available</p>
                    </div>
                    <button className="w-12 h-12 bg-[#3AA174] text-white rounded-full flex items-center justify-center hover:bg-[#0F5132] hover:scale-110 transition-all duration-300 shadow-lg">
                      <ShoppingCart size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#3AA174] to-[#2d8c5f]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-poppins">
            Bulk Orders & Custom Solutions
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Looking for wholesale pricing or custom products? Contact our team for special arrangements.
          </p>
          <button className="bg-white text-[#3AA174] px-8 py-4 rounded-full font-semibold hover:bg-[#F6F3EB] transition-all duration-300 inline-flex items-center gap-2 hover:gap-4 shadow-xl">
            Contact Sales <ArrowRight size={20} />
          </button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
