"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, FileText, Home, LogOut, Settings, User, Menu, X } from "lucide-react"
import { LogoutDialog } from "./logout-dialog"

interface SidebarProps {
  role?: "client" | "admin" | "cluster"
}

export function Sidebar({ role = "client" }: SidebarProps) {
  const pathname = usePathname()
  const [isLogoutOpen, setIsLogoutOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const getNavItems = () => {
    const baseItems = [{ href: `/dashboard/${role}`, label: "Dashboard", icon: Home }]

    if (role === "client") {
      return [
        ...baseItems,
        { href: "/dashboard/client/submissions", label: "My Submissions", icon: FileText },
        { href: "/dashboard/client/profile", label: "Profile", icon: User },
      ]
    } else if (role === "admin") {
      return [
        ...baseItems,
        { href: "/dashboard/admin/users", label: "Users", icon: User },
        { href: "/dashboard/admin/clusters", label: "Clusters", icon: BarChart3 },
      ]
    } else if (role === "cluster") {
      return [
        ...baseItems,
        { href: "/dashboard/cluster/orders", label: "Orders", icon: FileText },
        { href: "/dashboard/cluster/analytics", label: "Analytics", icon: BarChart3 },
      ]
    }

    return baseItems
  }

  const navItems = getNavItems()

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 rounded-xl bg-green-600 text-white shadow-lg hover:bg-green-700 transition-all duration-200 transform hover:scale-105"
      >
        {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden animate-in fade-in duration-200"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-64 flex-col border-r border-border bg-sidebar z-40 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } flex`}
      >
      {/* Logo */}
      <div className="flex items-center gap-2 border-b border-sidebar-border px-6 py-6">
        <div className="h-8 w-8 rounded-full bg-sidebar-primary"></div>
        <span className="text-lg font-bold text-sidebar-foreground">GreenVerse</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-4 py-6">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium transition ${
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50"
              }`}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="space-y-2 border-t border-sidebar-border px-4 py-4">
        <Link
          href={`/dashboard/${role}/profile`}
          className="flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent/50"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <Settings className="h-4 w-4" />
          Settings
        </Link>
        <button 
          onClick={() => {
            setIsLogoutOpen(true)
            setIsMobileMenuOpen(false)
          }}
          className="flex w-full items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent/50 transition-all duration-200"
        >
          <LogOut className="h-4 w-4" />
          Log Out
        </button>
      </div>
    </aside>

    {/* Logout Dialog */}
    <LogoutDialog isOpen={isLogoutOpen} onClose={() => setIsLogoutOpen(false)} />
    </>
  )
}
