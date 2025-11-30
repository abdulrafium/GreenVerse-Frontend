const cn = (...classes) => classes.filter(Boolean).join(' ');

export default function Card({ children, className = "" }) {
  return (
    <div className={cn("bg-white rounded-[20px] shadow-sm border border-stone-100 p-6 hover:shadow-md transition-all duration-300", className)}>
      {children}
    </div>
  )
}
