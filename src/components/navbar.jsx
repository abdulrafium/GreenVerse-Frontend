"use client"

import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { Menu, X, Leaf } from "lucide-react"
import Button from "./Button"

const cn = (...classes) => classes.filter(Boolean).join(' ');

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Impact', path: '/impact' },
    { name: 'Process', path: '/process' },
    { name: 'Contact Us', path: '/contact' },
    { name: 'About', path: '/about' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300", 
      scrolled ? "bg-white/90 backdrop-blur-md shadow-md py-3" : "bg-transparent py-5"
    )}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="group relative flex items-center gap-2">
          <div className="relative">
            <img 
              src="/logo.png" 
              alt="GreenVerse Logo" 
              className="h-12 w-auto transition-all duration-500 group-hover:scale-105" 
            />
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-500">
              <div className="h-[1px] w-6 bg-gradient-to-r from-transparent to-[#3AA174]"></div>
              <span className="text-[10px] font-bold text-[#3AA174] whitespace-nowrap">
                GreenVerse
              </span>
              <div className="h-[1px] w-6 bg-gradient-to-l from-transparent to-[#3AA174]"></div>
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <Link 
              key={link.name}
              to={link.path}
              className={cn(
                "relative font-semibold transition-all duration-300 group",
                isActive(link.path) 
                  ? "text-[#3AA174] scale-110" 
                  : "text-stone-700 hover:text-[#3AA174]"
              )}
            >
              <span className="relative">
                {link.name}
                {isActive(link.path) && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#3AA174] rounded-full animate-pulse"></span>
                )}
              </span>
              <span className={cn(
                "absolute bottom-0 left-0 h-0.5 bg-[#3AA174] transition-all duration-300",
                isActive(link.path) ? "w-full" : "w-0 group-hover:w-full"
              )}></span>
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link to="/login">
            <button className="relative px-6 py-2.5 bg-white text-[#3AA174] font-bold rounded-xl overflow-hidden group shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-[#3AA174]">
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">Log In</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#3AA174] to-[#2d8c5f] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </button>
          </Link>
          <Link to="/register">
            <button className="relative px-6 py-2.5 bg-white text-[#3AA174] font-bold rounded-xl overflow-hidden group shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-[#3AA174]">
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">Partner With Us</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#3AA174] to-[#2d8c5f] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-stone-600" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-t border-stone-100 p-6 flex flex-col gap-4 shadow-lg md:hidden animate-fade-in">
          {navLinks.map(link => (
            <Link 
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={cn(
                "text-left font-medium py-2 px-4 rounded-lg transition-all duration-300 relative",
                isActive(link.path)
                  ? "text-[#3AA174] bg-[#3AA174]/10 font-bold border-l-4 border-[#3AA174]"
                  : "text-stone-600 hover:text-[#3AA174] hover:bg-[#3AA174]/5 hover:translate-x-1"
              )}
            >
              <span className="flex items-center gap-2">
                {isActive(link.path) && (
                  <span className="w-2 h-2 bg-[#3AA174] rounded-full animate-pulse"></span>
                )}
                {link.name}
              </span>
            </Link>
          ))}
          <div className="h-px bg-stone-100 my-2"></div>
          <Link to="/login" onClick={() => setIsOpen(false)}>
            <button className="relative w-full px-6 py-3 bg-white text-[#3AA174] font-bold rounded-xl overflow-hidden group shadow-lg border-2 border-[#3AA174]">
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">Log In</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#3AA174] to-[#2d8c5f] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </button>
          </Link>
          <Link to="/register" onClick={() => setIsOpen(false)}>
            <button className="relative w-full px-6 py-3 bg-white text-[#3AA174] font-bold rounded-xl overflow-hidden group shadow-lg border-2 border-[#3AA174]">
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">Partner With Us</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#3AA174] to-[#2d8c5f] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </button>
          </Link>
        </div>
      )}
    </nav>
  )
}
