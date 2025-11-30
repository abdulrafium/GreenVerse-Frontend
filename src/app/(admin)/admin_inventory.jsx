import { useState, useEffect } from "react"
import Sidebar from "../../components/sidebar"
import Card from "../../components/Card"
import { productsAPI } from "../../services/api"
import { Loader2, X } from "lucide-react"
import { toast } from "react-toastify"
import "../(client)/dashboard.css"

export default function AdminInventory() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    document.title = 'Inventory Management - GreenVerse'
  }, [])
  const [error, setError] = useState("")
  const [editingProduct, setEditingProduct] = useState(null)
  const [newPrice, setNewPrice] = useState('')
  const [updating, setUpdating] = useState(false)

  useEffect(() => {
    fetchInventory()
  }, [])

  const fetchInventory = async () => {
    try {
      setLoading(true)
      const response = await productsAPI.getAll()
      setProducts(response.data.products || [])
      setError("")
    } catch (err) {
      console.error('Error fetching inventory:', err)
      setError('Failed to load inventory')
    } finally {
      setLoading(false)
    }
  }

  const getStockStatus = (stock) => {
    if (stock === 0) return { label: 'Out of Stock', color: 'bg-red-100 text-red-700' }
    if (stock >= 1 && stock <= 10) return { label: 'Low Stock', color: 'bg-yellow-100 text-yellow-700' }
    return { label: 'In Stock', color: 'bg-green-100 text-green-700' }
  }

  const handleEditPrice = (product) => {
    setEditingProduct(product)
    setNewPrice(product.price)
  }

  const handleUpdatePrice = async () => {
    if (!editingProduct || !newPrice) return

    try {
      setUpdating(true)
      await productsAPI.update(editingProduct.id, { price: parseFloat(newPrice) })
      
      toast.success(`Price updated to PKR ${newPrice}!`)
      setEditingProduct(null)
      setNewPrice('')
      
      // Refresh products
      await fetchInventory()
    } catch (error) {
      console.error('Error updating price:', error)
      toast.error('Failed to update price')
    } finally {
      setUpdating(false)
    }
  }

  return (
    <div className="dashboard-layout" style={{ backgroundColor: '#FDFBF7' }}>
      <Sidebar role="admin" />

      <main className="dashboard-content" style={{ backgroundColor: '#FDFBF7' }}>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#0F5132' }}>Inventory Management</h1>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <Card>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-12 h-12 animate-spin text-[#3AA174]" />
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12 text-stone-500">
              <p>No products found in inventory</p>
            </div>
          ) : (
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <div className="min-w-full" style={{ maxHeight: '600px', overflowY: 'auto' }}>
            <table className="min-w-full">
              <thead className="bg-stone-50 sticky top-0 z-10">
                <tr className="border-b-2 border-stone-200">
                  <th className="text-left py-3 px-4 text-stone-600 font-semibold text-sm whitespace-nowrap">Product</th>
                  <th className="text-left py-3 px-4 text-stone-600 font-semibold text-sm">Category</th>
                  <th className="text-left py-3 px-4 text-stone-600 font-semibold text-sm">Stock</th>
                  <th className="text-left py-3 px-4 text-stone-600 font-semibold text-sm">Unit</th>
                  <th className="text-left py-3 px-4 text-stone-600 font-semibold text-sm whitespace-nowrap">Price</th>
                  <th className="text-left py-3 px-4 text-stone-600 font-semibold text-sm">Status</th>
                  <th className="text-left py-3 px-4 text-stone-600 font-semibold text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => {
                  const status = getStockStatus(product.stock || 0)
                  return (
                    <tr key={product.id} className="border-b border-stone-100 hover:bg-[#F6F3EB]/50 transition-colors">
                      <td className="py-3 px-4 text-[#0F5132] font-medium text-sm whitespace-nowrap">{product.name || 'N/A'}</td>
                      <td className="py-3 px-4 text-stone-600 text-sm">{product.category || 'N/A'}</td>
                      <td className="py-3 px-4 text-stone-700 font-semibold text-sm">{product.stock || 0}</td>
                      <td className="py-3 px-4 text-stone-600 text-sm">{product.unit || 'units'}</td>
                      <td className="py-3 px-4 text-stone-700 font-semibold text-sm whitespace-nowrap">PKR {parseFloat(product.price || 0).toLocaleString()}</td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${status.color}`}>
                          {status.label}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <button 
                          onClick={() => handleEditPrice(product)}
                          className="text-[#3AA174] hover:text-[#0F5132] font-semibold text-sm transition-colors whitespace-nowrap"
                        >
                          Edit Price
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
              </div>
            </div>
          )}
        </Card>
      </main>
    </div>
  )
}
