"use client"

import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import Navbar from "../../components/navbar"
import Footer from "../../components/footer"
import Button from "../../components/Button"
import { Leaf, Recycle, Factory, Users, Eye, EyeOff, ArrowRight, CheckCircle, CheckCircle2, XCircle } from "lucide-react"
import { authAPI } from "../../services/api"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "client",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [termsAccepted, setTermsAccepted] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    document.title = "Sign Up - GreenVerse"
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    
    if (!termsAccepted) {
      const errorMsg = "Please accept the Terms & Conditions to continue"
      setError(errorMsg)
      toast.error(errorMsg, {
        position: "top-center",
        autoClose: 3000,
      })
      return
    }
    
    if (formData.password !== formData.confirmPassword) {
      const errorMsg = "Passwords do not match!"
      setError(errorMsg)
      toast.error(errorMsg, {
        position: "top-center",
        autoClose: 3000,
      })
      return
    }
    
    if (formData.password.length < 6) {
      const errorMsg = "Password must be at least 6 characters long"
      setError(errorMsg)
      toast.error(errorMsg, {
        position: "top-center",
        autoClose: 3000,
      })
      return
    }
    
    setLoading(true)
    
    try {
      const response = await authAPI.signup({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.userType
      })
      
      // Axios returns data in response.data
      const { token, user } = response.data
      
      // Store token in localStorage
      localStorage.setItem('token', token)
      
      // Store user in localStorage
      const userData = {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
      localStorage.setItem('user', JSON.stringify(userData))
      
      // Success toast
      toast.success(`Account created successfully! Welcome ${user.name}!`, {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        icon: <CheckCircle2 className="text-[#3AA174]" />,
      })
      
      // Navigate after delay
      setTimeout(() => {
        navigate("/login")
      }, 2500)
      
    } catch (err) {
      console.error('Signup error:', err)
      const errorMsg = err.response?.data?.error || "Registration failed. Please try again."
      setError(errorMsg)
      toast.error(errorMsg, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        icon: <XCircle className="text-red-500" />,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      <ToastContainer />
      <Navbar />
      
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#3AA174] via-[#2d8c5f] to-[#0F5132] pt-32 pb-16">
        {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Icons */}
        <div className="absolute top-10 left-10 w-24 h-24 opacity-10 animate-float">
          <Recycle size={90} className="text-white" />
        </div>
        <div className="absolute top-20 right-20 w-32 h-32 opacity-10 animate-float-delayed">
          <Factory size={120} className="text-white" />
        </div>
        <div className="absolute bottom-20 left-1/4 w-20 h-20 opacity-10 animate-float-slow">
          <Users size={75} className="text-white" />
        </div>
        <div className="absolute bottom-32 right-32 w-28 h-28 opacity-10 animate-spin-slow">
          <Leaf size={100} className="text-white" />
        </div>
        
        {/* Gradient Orbs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px]">
          <div className="absolute inset-0 bg-gradient-to-br from-[#8FCFA7]/20 to-transparent rounded-[40%_60%_70%_30%/60%_30%_70%_40%] animate-blob"></div>
        </div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px]">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#C8A656]/20 to-transparent rounded-[60%_40%_30%_70%/40%_70%_30%_60%] animate-blob animation-delay-2000"></div>
        </div>
        
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      {/* Register Card */}
      <div className="relative z-10 w-full max-w-lg mx-4 my-8">
        <div className="bg-white/95 backdrop-blur-xl rounded-[40px] shadow-2xl p-8 md:p-10 border border-white/60">
          {/* Logo/Brand */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center mb-4 animate-fade-in group cursor-pointer">
              <img 
                src="/logo.png" 
                alt="GreenVerse Logo" 
                className="h-20 w-auto transition-all duration-700 group-hover:scale-110 group-hover:drop-shadow-2xl"
                style={{
                  transform: 'rotateY(0deg) rotateX(0deg)',
                  transition: 'transform 0.7s ease-out'
                }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  const centerX = rect.width / 2;
                  const centerY = rect.height / 2;
                  const rotateX = ((y - centerY) / centerY) * -20;
                  const rotateY = ((x - centerX) / centerX) * 20;
                  e.currentTarget.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.15)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)';
                }}
              />
            </div>
            <h1 className="text-3xl font-bold text-[#0F5132] mb-2 font-poppins animate-fade-in">Join GreenVerse</h1>
            <p className="text-stone-600 animate-fade-in">Create your account and start making an impact</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && <div className="text-sm text-red-600 bg-red-50 border border-red-100 p-3 rounded-xl">{error}</div>}
            
            {/* Full Name */}
            <div className="group">
              <label className="block text-[#0F5132] font-semibold mb-2 group-focus-within:text-[#3AA174] transition-colors">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-stone-200 rounded-xl focus:border-[#3AA174] focus:ring-4 focus:ring-[#3AA174]/20 outline-none transition-all duration-300 bg-white"
                placeholder="John Doe"
              />
            </div>

            {/* Email */}
            <div className="group">
              <label className="block text-[#0F5132] font-semibold mb-2 group-focus-within:text-[#3AA174] transition-colors">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-stone-200 rounded-xl focus:border-[#3AA174] focus:ring-4 focus:ring-[#3AA174]/20 outline-none transition-all duration-300 bg-white"
                placeholder="you@example.com"
              />
            </div>

            {/* Account Type */}
            <div className="group">
              <label className="block text-[#0F5132] font-semibold mb-2">
                Account Type
              </label>
              <div className="grid grid-cols-1 gap-3">
                <label className={`relative cursor-pointer`}>
                  <input
                    type="radio"
                    name="userType"
                    value="client"
                    checked={formData.userType === "client"}
                    onChange={handleChange}
                    className="peer sr-only"
                  />
                  <div className="px-4 py-3 border-2 border-[#3AA174] bg-[#3AA174]/5 rounded-xl transition-all duration-300 text-center">
                    <Users size={20} className="mx-auto mb-1 text-[#3AA174]" />
                    <span className="text-sm font-semibold text-stone-700">Client</span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#3AA174] rounded-full flex items-center justify-center">
                    <CheckCircle size={16} className="text-white" />
                  </div>
                </label>
              </div>
            </div>

            {/* Password */}
            <div className="group">
              <label className="block text-[#0F5132] font-semibold mb-2 group-focus-within:text-[#3AA174] transition-colors">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 pr-12 border-2 border-stone-200 rounded-xl focus:border-[#3AA174] focus:ring-4 focus:ring-[#3AA174]/20 outline-none transition-all duration-300 bg-white"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-[#3AA174] transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="group">
              <label className="block text-[#0F5132] font-semibold mb-2 group-focus-within:text-[#3AA174] transition-colors">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 pr-12 border-2 border-stone-200 rounded-xl focus:border-[#3AA174] focus:ring-4 focus:ring-[#3AA174]/20 outline-none transition-all duration-300 bg-white"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-[#3AA174] transition-colors"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Terms & Conditions */}
            <label className="flex items-start gap-3 cursor-pointer group">
              <input 
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="mt-1 w-4 h-4 rounded border-2 border-stone-300 text-[#3AA174] focus:ring-[#3AA174] focus:ring-2 cursor-pointer"
              />
              <span className="text-sm text-stone-600 group-hover:text-[#3AA174] transition-colors leading-relaxed">
                I agree to the <span className="text-[#3AA174] font-semibold">Terms & Conditions</span> and <span className="text-[#3AA174] font-semibold">Privacy Policy</span>
              </span>
            </label>

            {/* Submit Button */}
            <Button 
              type="submit" 
              className={`w-full !py-3 text-lg group transition-all ${!termsAccepted || loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={!termsAccepted || loading}
            >
              <span className="flex items-center justify-center gap-2">
                {loading ? "Creating Account..." : "Create Account"}
                {!loading && <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />}
              </span>
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-stone-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white/95 text-stone-500">Or continue with</span>
            </div>
          </div>

          {/* Social Login Button */}
          <button className="w-full px-4 py-3 border-2 border-stone-200 rounded-xl hover:border-[#3AA174] hover:bg-[#3AA174]/5 transition-all duration-300 font-semibold text-stone-700 flex items-center justify-center gap-2">
            <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Google
          </button>

          {/* Sign In Link */}
          <p className="text-center text-stone-600 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-[#3AA174] hover:text-[#2d8c5f] font-semibold hover:underline transition-all">
              Sign in
            </Link>
          </p>
        </div>

        {/* Bottom Decoration */}
        <div className="text-center mt-6 text-white/80 text-sm">
          <p>© 2025 GreenVerse. Join 350+ farmers making a difference.</p>
        </div>
      </div>
      </div>
      
      <Footer />
    </div>
  )
}
