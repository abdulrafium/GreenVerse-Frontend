"use client"

import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import Navbar from "../../components/navbar"
import Footer from "../../components/footer"
import Button from "../../components/Button"
import { Leaf, TreePine, Recycle, Eye, EyeOff, ArrowRight, CheckCircle2, XCircle } from "lucide-react"
import { authAPI } from "../../services/api"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export default function Login({ setUser }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    document.title = "Login - GreenVerse"
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const response = await authAPI.login({ email, password })
      
      // Axios returns data in response.data
      const { token, user } = response.data
      
      // Store token in localStorage
      localStorage.setItem('token', token)
      
      // Set user context
      const userData = {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
      setUser(userData)
      
      // Store user in localStorage
      localStorage.setItem('user', JSON.stringify(userData))
      
      // Show success toast
      toast.success(`Welcome back, ${user.name}!`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        icon: <CheckCircle2 className="text-[#3AA174]" />,
      })
      
      // Navigate based on role after a short delay
      setTimeout(() => {
        if (user.role === "admin") navigate("/admin/dashboard")
        else if (user.role === "cluster") navigate("/cluster/dashboard")
        else navigate("/client/dashboard")
      }, 2000)
      
    } catch (err) {
      console.error('Login error:', err)
      const errorMsg = err.response?.data?.error || "Invalid credentials. Please try again."
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
      
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#F6F3EB] via-[#FDFBF7] to-[#F6F3EB] pt-32 pb-16">
        {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Leaves */}
        <div className="absolute top-20 left-20 w-32 h-32 opacity-10 animate-float">
          <Leaf size={120} className="text-[#3AA174]" />
        </div>
        <div className="absolute top-40 right-32 w-24 h-24 opacity-15 animate-float-delayed">
          <TreePine size={90} className="text-[#C8A656]" />
        </div>
        <div className="absolute bottom-32 left-1/4 w-20 h-20 opacity-10 animate-float-slow">
          <Leaf size={75} className="text-[#3AA174]" />
        </div>
        <div className="absolute bottom-20 right-20 w-28 h-28 opacity-10 animate-spin-slow">
          <Recycle size={100} className="text-[#8FCFA7]" />
        </div>
        
        {/* Organic Blob Shapes */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px]">
          <div className="absolute inset-0 bg-gradient-to-br from-[#3AA174]/10 to-[#C8A656]/10 rounded-[40%_60%_70%_30%/60%_30%_70%_40%] animate-blob"></div>
        </div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px]">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#8FCFA7]/10 to-[#3AA174]/10 rounded-[60%_40%_30%_70%/40%_70%_30%_60%] animate-blob animation-delay-2000"></div>
        </div>
        <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px]">
          <div className="absolute inset-0 bg-gradient-to-br from-[#C6A477]/10 to-[#C8A656]/10 rounded-[70%_30%_50%_50%/30%_60%_40%_70%] animate-blob animation-delay-4000"></div>
        </div>
      </div>

      {/* Login Card with Glassmorphism */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="bg-white/80 backdrop-blur-xl rounded-[40px] shadow-2xl p-8 md:p-10 border border-white/40">
          {/* Logo/Brand */}
          <div className="text-center mb-8">
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
            <h1 className="text-3xl font-bold text-[#0F5132] mb-2 font-poppins animate-fade-in">Welcome Back</h1>
            <p className="text-stone-600 animate-fade-in">Sign in to your GreenVerse account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && <div className="text-sm text-red-600 bg-red-50 border border-red-100 p-3 rounded">{error}</div>}
            {/* Email Field */}
            <div className="group">
              <label className="block text-[#0F5132] font-semibold mb-2 group-focus-within:text-[#3AA174] transition-colors">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border-2 border-stone-200 rounded-xl focus:border-[#3AA174] focus:ring-4 focus:ring-[#3AA174]/20 outline-none transition-all duration-300 bg-white/70 backdrop-blur-sm"
                placeholder="you@example.com"
              />
            </div>

            {/* Password Field */}
            <div className="group">
              <label className="block text-[#0F5132] font-semibold mb-2 group-focus-within:text-[#3AA174] transition-colors">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 pr-12 border-2 border-stone-200 rounded-xl focus:border-[#3AA174] focus:ring-4 focus:ring-[#3AA174]/20 outline-none transition-all duration-300 bg-white/70 backdrop-blur-sm"
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

            {/* Remember & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 rounded border-2 border-stone-300 text-[#3AA174] focus:ring-[#3AA174] focus:ring-2"
                />
                <span className="text-sm text-stone-600 group-hover:text-[#3AA174] transition-colors">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-sm text-[#3AA174] hover:text-[#2d8c5f] font-semibold transition-colors">
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full !py-3 text-lg group" disabled={loading}>
              <span className="flex items-center justify-center gap-2">
                {loading ? "Signing In..." : "Sign In"}
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
              <span className="px-4 bg-white/80 text-stone-500">Or continue with</span>
            </div>
          </div>

          {/* Social Login Button */}
          <button className="w-full px-4 py-3 border-2 border-stone-200 rounded-xl hover:border-[#3AA174] hover:bg-[#3AA174]/5 transition-all duration-300 font-semibold text-stone-700 flex items-center justify-center gap-2">
            <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Google
          </button>

          {/* Sign Up Link */}
          <p className="text-center text-stone-600 mt-6">
            Don't have an account?{" "}
            <Link to="/register" className="text-[#3AA174] hover:text-[#2d8c5f] font-semibold hover:underline transition-all">
              Sign up
            </Link>
          </p>
        </div>

        {/* Bottom Decoration */}
        <div className="text-center mt-6 text-stone-500 text-sm">
          <p>© 2025 GreenVerse. Transforming waste into worth.</p>
        </div>
      </div>
      </div>
      
      <Footer />
    </div>
  )
}
