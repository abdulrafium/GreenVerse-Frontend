import Navbar from "../../components/navbar"
import Footer from "../../components/footer"
import SectionHeader from "../../components/SectionHeader"
import Card from "../../components/Card"
import { Users, Building2, GraduationCap, ShoppingCart, Store, Globe, Landmark, Heart, Handshake, Package, Truck } from "lucide-react"

export default function Partners() {
  const partners = [
    { 
      name: "Banana Farmers", 
      type: "Raw Material Suppliers", 
      location: "Rural Sindh, Pakistan",
      role: "Supply raw material (banana stems)",
      icon: Users,
      color: "#3AA174"
    },
    { 
      name: "Rural Women (CPN Workers)", 
      type: "Production Partners", 
      location: "Cluster Production Networks",
      role: "Production, ownership, local leadership",
      icon: Users,
      color: "#8FCFA7"
    },
    { 
      name: "University Partners", 
      type: "Academic Partners", 
      location: "BNBWU, SIBAU, SALU",
      role: "Incubation, R&D, student engagement",
      icon: GraduationCap,
      color: "#C8A656"
    },
    { 
      name: "Institutional Clients", 
      type: "Main Buyers", 
      location: "Universities, Cafeterias, Hospitals",
      role: "Main buyers of biodegradable products",
      icon: Building2,
      color: "#3AA174"
    },
    { 
      name: "Retail Buyers", 
      type: "Secondary Buyers", 
      location: "Supermarkets, Bakeries",
      role: "Secondary buyers; brand visibility",
      icon: Store,
      color: "#8FCFA7"
    },
    { 
      name: "Export Partners", 
      type: "International Buyers", 
      location: "Middle East, Asia",
      role: "High-volume buyers for 2029-2030",
      icon: Globe,
      color: "#C8A656"
    },
    { 
      name: "Government Bodies", 
      type: "Regulatory Partners", 
      location: "SEPA, MoCC",
      role: "Environmental compliance, policy support",
      icon: Landmark,
      color: "#3AA174"
    },
    { 
      name: "Community Leaders & Elders", 
      type: "Social Partners", 
      location: "Local Communities",
      role: "Social acceptance and cluster stability",
      icon: Heart,
      color: "#8FCFA7"
    },
    { 
      name: "NGOs & Development Agencies", 
      type: "Support Partners", 
      location: "Pakistan",
      role: "Grants, training support, impact partnerships",
      icon: Handshake,
      color: "#C8A656"
    },
    { 
      name: "Suppliers", 
      type: "Equipment Suppliers", 
      location: "Pakistan",
      role: "Quality machinery and materials",
      icon: Package,
      color: "#3AA174"
    },
    { 
      name: "Logistics Providers", 
      type: "Distribution Partners", 
      location: "Pakistan",
      role: "Ensure timely delivery",
      icon: Truck,
      color: "#8FCFA7"
    },
  ]

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      <Navbar />

      <section className="py-20 bg-gradient-to-br from-[#F6F3EB] via-[#FDFBF7] to-[#F6F3EB] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#3AA174] rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#C8A656] rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#3AA174]/10 text-[#0F5132] rounded-full text-sm font-semibold mb-6">
              <Handshake size={16} /> Our Network
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-[#0F5132] font-poppins mb-6">
              Our <span className="text-[#3AA174]">Partners</span>
            </h1>
            <p className="text-xl text-stone-600 leading-relaxed max-w-3xl mx-auto">
              Building a sustainable ecosystem through strategic partnerships across the value chain
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partners.map((partner, idx) => {
              const IconComponent = partner.icon
              return (
                <div 
                  key={idx}
                  className="bg-white border-2 border-[#3AA174] rounded-3xl p-6 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group cursor-pointer relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#3AA174]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10">
                    <div 
                      className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500"
                      style={{ backgroundColor: `${partner.color}15` }}
                    >
                      <IconComponent size={28} style={{ color: partner.color }} />
                    </div>
                    
                    <h3 className="text-xl font-bold text-[#0F5132] mb-2 group-hover:text-[#3AA174] transition-colors">
                      {partner.name}
                    </h3>
                    
                    <div className="mb-3">
                      <span className="px-3 py-1 bg-[#3AA174]/10 text-[#3AA174] rounded-full text-xs font-semibold">
                        {partner.type}
                      </span>
                    </div>
                    
                    <p className="text-sm text-stone-600 mb-3 font-medium">{partner.location}</p>
                    
                    <p className="text-sm text-stone-600 leading-relaxed">
                      {partner.role}
                    </p>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#3AA174] to-[#8FCFA7] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
