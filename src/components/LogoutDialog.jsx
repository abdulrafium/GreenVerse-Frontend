import { X, LogOut } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function LogoutDialog({ isOpen, onClose }) {
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const navigate = useNavigate()

  const handleLogout = async () => {
    setIsLoggingOut(true)
    
    // Simulate logout delay for smooth animation
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Clear auth token
    localStorage.removeItem('token')
    
    // Redirect to login
    navigate('/login')
  }

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      style={{
        animation: 'fadeIn 0.2s ease-out'
      }}
      onClick={onClose}
    >
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes zoomIn {
          from { 
            opacity: 0;
            transform: scale(0.95);
          }
          to { 
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
      
      <div 
        className="relative bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4"
        style={{
          animation: 'zoomIn 0.3s ease-out'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          disabled={isLoggingOut}
          className="absolute right-4 top-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="h-5 w-5 text-gray-500" />
        </button>

        {/* Icon */}
        <div className="mb-6 flex justify-center">
          <div className="relative">
            <div 
              className="absolute inset-0 bg-[#3AA174]/20 rounded-full blur-xl"
              style={{
                animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
              }}
            ></div>
            <div className="relative bg-gradient-to-br from-[#3AA174] to-[#0F5132] rounded-full p-4">
              <LogOut className="h-8 w-8 text-white" />
            </div>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-3 text-gray-900">
          Confirm Logout
        </h2>

        {/* Message */}
        <p className="text-center text-gray-600 mb-8">
          Are you sure you want to logout from your account?
        </p>

        {/* Loading animation */}
        {isLoggingOut && (
          <div className="mb-6 flex justify-center">
            <div className="flex items-center gap-3">
              <div className="relative">
                {/* Outer ring */}
                <div className="w-12 h-12 border-4 border-[#E8F5E9] rounded-full"></div>
                {/* Spinning ring */}
                <div 
                  className="absolute top-0 left-0 w-12 h-12 border-4 border-transparent border-t-[#3AA174] border-r-[#3AA174] rounded-full"
                  style={{
                    animation: 'spin 1s linear infinite'
                  }}
                ></div>
                {/* Inner dot */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-[#3AA174] rounded-full"
                  style={{
                    animation: 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                  }}
                ></div>
              </div>
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={isLoggingOut}
            className="flex-1 px-6 py-3 rounded-xl font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
          >
            Cancel
          </button>
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex-1 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-[#3AA174] to-[#0F5132] hover:from-[#2d8a5f] hover:to-[#0a3d24] transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
          >
            {isLoggingOut ? "Logging out..." : "Yes, Logout"}
          </button>
        </div>
      </div>
    </div>
  )
}
