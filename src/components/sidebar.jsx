import { Link, useLocation } from "react-router-dom"
import { useState } from "react"
import { 
  Leaf, BarChart3, ShoppingBag, Users, Package, 
  Factory, DollarSign, Settings, LogOut, Truck,
  FileText, TrendingUp, Calendar, Wrench, GraduationCap, Menu, X, ShoppingCart, User
} from "lucide-react"
import LogoutDialog from "./LogoutDialog"

const cn = (...classes) => classes.filter(Boolean).join(' ');

export default function Sidebar({ role = "client" }) {
  const location = useLocation()
  const [isLogoutOpen, setIsLogoutOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const getMenuItems = () => {
    const roleMenus = {
      client: [
        { label: "Dashboard", path: "/client/dashboard", icon: BarChart3 },
        { label: "Place Order", path: "/client/place-order", icon: ShoppingCart },
        { label: "My Orders", path: "/client/orders", icon: ShoppingBag },
        { label: "Invoices", path: "/client/invoices", icon: DollarSign },
        { label: "Profile", path: "/client/profile", icon: User },
        { label: "My Impact", path: "/client/impact", icon: Leaf },
      ],
      admin: [
        { label: "Overview", path: "/admin/dashboard", icon: BarChart3 },
        { label: "Orders", path: "/admin/orders", icon: ShoppingBag },
        { label: "Inventory", path: "/admin/inventory", icon: Package },
        { label: "Clusters", path: "/admin/clusters", icon: Factory },
        { label: "Production", path: "/admin/production", icon: Settings },
        { label: "Sales", path: "/admin/sales", icon: TrendingUp },
        { label: "HR & Users", path: "/admin/hr", icon: Users },
        { label: "Finance", path: "/admin/finance", icon: DollarSign },
        { label: "Impact", path: "/admin/impact", icon: Leaf },
      ],
      cluster: [
        { label: "Dashboard", path: "/cluster/dashboard", icon: BarChart3 },
        { label: "Production", path: "/cluster/production", icon: Factory },
        { label: "Materials", path: "/cluster/materials", icon: Package },
        { label: "Attendance", path: "/cluster/attendance", icon: Users },
        { label: "Maintenance", path: "/cluster/maintenance", icon: Wrench },
        { label: "Training", path: "/cluster/training", icon: GraduationCap },
      ],
    }

    return roleMenus[role] || []
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden p-3 rounded-xl bg-[#3AA174] text-white shadow-lg hover:bg-[#2d8a5f] transition-all duration-200 transform hover:scale-105"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
          style={{
            animation: 'fadeIn 0.2s ease-out'
          }}
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideIn {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
      `}</style>

      {/* Sidebar */}
      <aside 
        className={`h-screen w-64 bg-[#0F5132] text-white fixed left-0 top-0 flex flex-col shadow-2xl z-40 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
      <div className="p-6 pb-4">
        <div className="flex items-center justify-center group cursor-pointer mb-3">
          <img 
            src="/logo.png" 
            alt="GreenVerse Logo" 
            className="h-16 w-auto brightness-0 invert transition-all duration-700 group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.9)]"
            style={{
              transform: 'rotateY(0deg)',
              transition: 'transform 0.7s ease-out, filter 0.7s ease-out'
            }}
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const centerX = rect.width / 2;
              const rotateY = ((x - centerX) / centerX) * 15;
              e.currentTarget.style.transform = `perspective(800px) rotateY(${rotateY}deg) scale(1.1)`;
              e.currentTarget.style.filter = 'brightness(0) invert(1) drop-shadow(0 0 15px rgba(255,255,255,0.9))';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'perspective(800px) rotateY(0deg) scale(1)';
              e.currentTarget.style.filter = 'brightness(0) invert(1)';
            }}
          />
        </div>
        <div className="flex items-center justify-center gap-1.5 mb-2">
          <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-white"></div>
          <span className="text-sm font-bold text-white whitespace-nowrap tracking-wide">
            GreenVerse
          </span>
          <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-white"></div>
        </div>
      </div>

      <div className="flex-1 px-4 py-4 flex flex-col gap-2 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:border-2 [&::-webkit-scrollbar-thumb]:border-transparent hover:[&::-webkit-scrollbar-thumb]:bg-[#3AA174]/50 [&::-webkit-scrollbar-thumb]:transition-colors">
        <div className="px-4 mb-2">
          <p className="text-xs font-semibold text-[#8FCFA7] uppercase tracking-wider mb-2">
            {role} Portal
          </p>
          <div className="h-[2px] w-16 bg-white rounded-full"></div>
        </div>
        {getMenuItems().map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium",
                isActive 
                  ? "bg-[#3AA174] text-white shadow-lg translate-x-1" 
                  : "text-stone-300 hover:bg-white/10 hover:text-white"
              )}
            >
              {Icon && <Icon size={20} />}
              {item.label}
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-white/10">
        <button
          onClick={() => {
            setIsLogoutOpen(true)
            setIsMobileMenuOpen(false)
          }}
          className="flex items-center gap-3 px-4 py-3 text-stone-300 hover:text-white hover:bg-white/10 rounded-xl w-full transition-colors"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>

    {/* Logout Dialog */}
    <LogoutDialog isOpen={isLogoutOpen} onClose={() => setIsLogoutOpen(false)} />
    </>
  )
}
