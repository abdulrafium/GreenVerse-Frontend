import { Link } from "react-router-dom"
import { Leaf, ChevronRight, Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-[#0F5132] text-white py-16 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#3AA174] rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#3AA174] rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-2 mb-4 group cursor-pointer">
              <div className="relative perspective-1000">
                <img 
                  src="/logo.png" 
                  alt="GreenVerse Logo" 
                  className="h-12 w-auto brightness-0 invert transition-all duration-700 group-hover:scale-110 group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.8)]"
                  style={{
                    transform: 'rotateY(0deg) rotateX(0deg)',
                    transition: 'transform 0.7s ease-out, filter 0.7s ease-out'
                  }}
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    const rotateX = ((y - centerY) / centerY) * -15;
                    const rotateY = ((x - centerX) / centerX) * 15;
                    e.currentTarget.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.1)`;
                    e.currentTarget.style.filter = 'brightness(0) invert(1) drop-shadow(0 0 12px rgba(255,255,255,0.8))';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)';
                    e.currentTarget.style.filter = 'brightness(0) invert(1)';
                  }}
                />
              </div>
            </div>
            <p className="text-stone-300 text-sm mb-6 leading-relaxed">
              Turning waste into worth for a sustainable tomorrow.
            </p>
            {/* Social Media Icons */}
            <div className="flex gap-3">
              <a href="#facebook" className="w-10 h-10 bg-white/10 hover:bg-[#3AA174] rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:-translate-y-1">
                <Facebook size={18} />
              </a>
              <a href="#twitter" className="w-10 h-10 bg-white/10 hover:bg-[#3AA174] rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:-translate-y-1">
                <Twitter size={18} />
              </a>
              <a href="#instagram" className="w-10 h-10 bg-white/10 hover:bg-[#3AA174] rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:-translate-y-1">
                <Instagram size={18} />
              </a>
              <a href="#linkedin" className="w-10 h-10 bg-white/10 hover:bg-[#3AA174] rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:-translate-y-1">
                <Linkedin size={18} />
              </a>
              <a href="#youtube" className="w-10 h-10 bg-white/10 hover:bg-[#3AA174] rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:-translate-y-1">
                <Youtube size={18} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-6 text-lg">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/products" className="text-stone-300 hover:text-[#3AA174] transition-colors duration-200 flex items-center gap-2 group">
                  <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>Products</span>
                </Link>
              </li>
              <li>
                <Link to="/impact" className="text-stone-300 hover:text-[#3AA174] transition-colors duration-200 flex items-center gap-2 group">
                  <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>Impact</span>
                </Link>
              </li>
              <li>
                <Link to="/partners" className="text-stone-300 hover:text-[#3AA174] transition-colors duration-200 flex items-center gap-2 group">
                  <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>Partners</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-stone-300 hover:text-[#3AA174] transition-colors duration-200 flex items-center gap-2 group">
                  <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>About</span>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="font-bold mb-6 text-lg">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-stone-300 hover:text-[#3AA174] transition-colors duration-200">
                <Mail size={18} className="mt-0.5 flex-shrink-0" />
                <a href="mailto:greenVerse786@gmail.com">greenVerse786@gmail.com</a>
              </li>
              <li className="flex items-start gap-3 text-stone-300 hover:text-[#3AA174] transition-colors duration-200">
                <Phone size={18} className="mt-0.5 flex-shrink-0" />
                <a href="tel:+923333886321">+92 333 3886321</a>
              </li>
              <li className="flex items-start gap-3 text-stone-300">
                <MapPin size={18} className="mt-0.5 flex-shrink-0" />
                <span>Sukkur, Pakistan</span>
              </li>
              <li className="pt-2">
                <Link to="/contact" className="text-[#3AA174] hover:text-[#8FCFA7] transition-colors duration-200 font-semibold flex items-center gap-1">
                  Contact Form <ChevronRight size={16} />
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h4 className="font-bold mb-4 text-lg">Newsletter</h4>
            <p className="text-stone-300 text-sm mb-4">Stay updated with our impact</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-white/10 px-4 py-3 rounded-lg border border-white/20 text-sm w-full focus:outline-none focus:ring-2 focus:ring-[#3AA174] text-white placeholder:text-stone-400 transition-all" 
              />
              <button className="px-4 py-3 bg-[#3AA174] hover:bg-[#2d8c5f] rounded-lg transition-all duration-300 transform hover:scale-105">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-stone-400 text-sm">
            © {new Date().getFullYear()} GreenVerse Inc. All rights reserved.
          </p>
          <div className="flex gap-6 text-stone-400 text-sm">
            <a href="#privacy" className="hover:text-[#3AA174] transition-colors duration-200">Privacy Policy</a>
            <a href="#terms" className="hover:text-[#3AA174] transition-colors duration-200">Terms of Service</a>
            <a href="#cookies" className="hover:text-[#3AA174] transition-colors duration-200">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
