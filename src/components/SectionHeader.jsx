export default function SectionHeader({ title, description, className = "" }) {
  return (
    <div className={`mb-12 ${className}`}>
      <h2 className="text-3xl font-bold text-foreground mb-3">{title}</h2>
      {description && <p className="text-muted-foreground text-lg">{description}</p>}
    </div>
  )
}
