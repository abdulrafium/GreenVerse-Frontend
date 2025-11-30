import Button from "./Button"

export default function ProductCard({ product }) {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-foreground mb-2">{product.name}</h3>
        <p className="text-muted-foreground text-sm mb-4">{product.description}</p>
        <div className="flex justify-between items-center mb-4">
          <span className="text-2xl font-bold text-primary">PKR {product.price}</span>
          <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">{product.volume}</span>
        </div>
        <Button variant="primary" size="sm" className="w-full">
          View Details
        </Button>
      </div>
    </div>
  )
}
