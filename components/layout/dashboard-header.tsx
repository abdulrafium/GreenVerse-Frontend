"use client"

import { Bell, Search } from "lucide-react"

export function DashboardHeader() {
  return (
    <header className="flex items-center justify-between border-b border-border bg-card px-4 lg:px-8 py-4">
      {/* Add spacing for mobile hamburger button */}
      <div className="lg:hidden w-12"></div>
      
      <div className="flex flex-1 items-center gap-4">
        <div className="relative max-w-md flex-1">
          <input
            type="search"
            placeholder="Search..."
            className="w-full rounded-lg bg-muted px-4 py-2 pl-10 text-sm lg:text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        </div>
      </div>
      <div className="flex items-center gap-2 lg:gap-4">
        <button className="relative rounded-lg p-2 text-foreground hover:bg-muted transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-destructive"></span>
        </button>
        <div className="h-8 w-8 rounded-full bg-primary"></div>
      </div>
    </header>
  )
}
