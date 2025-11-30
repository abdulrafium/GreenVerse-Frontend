const cn = (...classes) => classes.filter(Boolean).join(' ');

export default function Button({ children, variant = "primary", size = "md", className = "", onClick, ...props }) {
  const baseStyle = "font-medium transition-all duration-300 flex items-center justify-center gap-2 shadow-sm active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"

  const variantClasses = {
    primary: "bg-[#3AA174] text-white hover:bg-[#0F5132] hover:shadow-lg rounded-full",
    secondary: "bg-white text-[#3AA174] border-2 border-[#3AA174] hover:bg-[#F6F3EB] rounded-full",
    ghost: "bg-transparent text-[#0F5132] hover:bg-[#F6F3EB] rounded-full",
    danger: "bg-red-500 text-white hover:bg-red-700 rounded-full",
    outline: "border border-stone-300 text-stone-700 hover:bg-stone-50 rounded-lg",
  }

  const sizeClasses = {
    sm: "px-4 py-1.5 text-sm",
    md: "px-6 py-2 text-base",
    lg: "px-8 py-3 text-lg",
  }

  const finalClassName = cn(baseStyle, variantClasses[variant], sizeClasses[size], className)

  return (
    <button className={finalClassName} onClick={onClick} {...props}>
      {children}
    </button>
  )
}
