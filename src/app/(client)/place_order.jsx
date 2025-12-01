import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from "../../components/sidebar"
import Button from "../../components/Button"
import Card from "../../components/Card"
import { Loader2, ShoppingCart, Plus, Minus, Trash2, Package } from 'lucide-react'
import { toast, ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import "./dashboard.css"
import api from '../../services/api'

export default function PlaceOrder() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])
  const [quantities, setQuantities] = useState({})
  const [placing, setPlacing] = useState(false)

  useEffect(() => {
    document.title = 'Place Order - GreenVerse'
    fetchProducts()
  }, [])

  const getProductImage = (productName) => {
    const imageMap = {
      'Banana Fiber Plate': '/nao-banana.png',
      'Eco-Bowl': '/eco-friendly-plates.jpg',
      'Biodegradable Cutlery Set': '/bamboo-cutlery.jpg',
      'Fiber Gift Box': '/fiber-containers.jpg',
      'Banana Fiber Tray': '/compostable-bags.jpg'
    }
    
    for (let key in imageMap) {
      if (productName?.includes(key)) {
        return imageMap[key]
      }
    }
    return '/placeholder.jpg'
  }

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await fetch('http://localhost:5000/api/products')
      const data = await response.json()
      setProducts(data.products || [])
    } catch (error) {
      console.error('Error fetching products:', error)
      toast.error('Failed to load products')
    } finally {
      setLoading(false)
    }
  }

  const handleQuantityChange = (productId, value) => {
    const qty = parseInt(value) || 0
    setQuantities(prev => ({ ...prev, [productId]: qty }))
  }

  const addToCart = (product) => {
    const quantity = quantities[product.id] || 1

    if (quantity <= 0) {
      toast.error('Please enter a valid quantity')
      return
    }

    if (quantity > product.stock) {
      toast.error(`Only ${product.stock} units available`)
      return
    }

    // Check if product already in cart
    const existingIndex = cart.findIndex(item => item.product.id === product.id)

    if (existingIndex >= 0) {
      // Update quantity
      const newCart = [...cart]
      newCart[existingIndex].quantity = quantity
      setCart(newCart)
      toast.success(`Updated ${product.name} quantity to ${quantity}`)
    } else {
      // Add new item
      setCart([...cart, { product, quantity }])
      toast.success(`Added ${product.name} to cart`)
    }

    // Reset quantity input
    setQuantities(prev => ({ ...prev, [product.id]: 1 }))
  }

  const updateCartQuantity = (index, delta) => {
    const newCart = [...cart]
    const newQty = newCart[index].quantity + delta

    if (newQty <= 0) {
      removeFromCart(index)
      return
    }

    if (newQty > newCart[index].product.stock) {
      toast.error(`Only ${newCart[index].product.stock} units available`)
      return
    }

    newCart[index].quantity = newQty
    setCart(newCart)
  }

  const removeFromCart = (index) => {
    const newCart = cart.filter((_, i) => i !== index)
    setCart(newCart)
    toast.info('Item removed from cart')
  }

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
  }

  const handlePlaceOrder = async () => {
    if (cart.length === 0) {
      toast.error('Your cart is empty')
      return
    }

    try {
      setPlacing(true)
      const token = localStorage.getItem('token')

      // Check profile completion first
      const profileCheck = await fetch('http://localhost:5000/api/profile/check', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const profileData = await profileCheck.json()

      if (!profileData.isComplete) {
        toast.error('Please complete your profile before placing an order', {
          autoClose: 5000
        })
        setTimeout(() => navigate('/client/profile'), 2000)
        return
      }

      // Place order
      const items = cart.map(item => ({
        product_id: item.product.id,
        quantity: item.quantity
      }))

      const response = await fetch('http://localhost:5000/api/orders/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ items })
      })

      const data = await response.json()

      if (response.ok) {
        toast.success('Order placed successfully! 🎉')
        setCart([])
        setQuantities({})
        setTimeout(() => navigate('/client/orders'), 2000)
      } else {
        if (data.profileIncomplete) {
          toast.error('Please complete your profile first')
          setTimeout(() => navigate('/client/profile'), 2000)
        } else {
          toast.error(data.error || 'Failed to place order')
        }
      }
    } catch (error) {
      console.error('Place order error:', error)
      toast.error('Failed to place order')
    } finally {
      setPlacing(false)
    }
  }

  if (loading) {
    return (
      <div className="dashboard-layout" style={{ backgroundColor: '#FDFBF7' }}>
        <Sidebar role="client" />
        <main className="dashboard-content flex items-center justify-center" style={{ backgroundColor: '#FDFBF7' }}>
          <Loader2 className="w-8 h-8 animate-spin text-[#3AA174]" />
        </main>
      </div>
    )
  }

  return (
    <div className="dashboard-layout" style={{ backgroundColor: '#FDFBF7' }}>
      <ToastContainer position="top-center" autoClose={3000} />
      <Sidebar role="client" />

      <main className="dashboard-content" style={{ backgroundColor: '#FDFBF7' }}>
        <div className="dashboard-header mb-4 sm:mb-6">
          <h1 style={{ fontSize: 'clamp(1.5rem, 5vw, 2rem)', fontWeight: 'bold', color: '#0F5132' }}>Place Order</h1>
          <div className="flex items-center gap-2 text-[#3AA174] font-semibold text-sm sm:text-base">
            <ShoppingCart size={20} className="sm:w-6 sm:h-6" />
            <span>{cart.length} item{cart.length !== 1 ? 's' : ''} in cart</span>
          </div>
        </div>

        {/* Product Grid */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-[#0F5132] mb-4">Available Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {products.map((product) => (
              <Card 
                key={product.id} 
                className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
                style={{ animation: 'fadeIn 0.5s ease-out' }}
              >
                <div className="aspect-square bg-gradient-to-br from-[#F6F3EB] to-[#E7E5E4] rounded-lg mb-4 overflow-hidden group-hover:scale-105 transition-transform duration-300">
                  <img 
                    src={getProductImage(product.name)} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = '/placeholder.jpg'
                    }}
                  />
                </div>
                
                <h3 className="text-base sm:text-lg font-bold text-[#0F5132] mb-2 line-clamp-2">{product.name}</h3>
                <p className="text-xs sm:text-sm text-stone-600 mb-3">{product.category}</p>
                
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3">
                  <span className="text-xl sm:text-2xl font-bold text-[#3AA174]">
                    PKR {product.price}
                  </span>
                  <span className="text-xs sm:text-sm text-stone-600">
                    Stock: {product.stock}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 mb-3">
                  <input
                    type="number"
                    min="1"
                    max={product.stock}
                    value={quantities[product.id] || 1}
                    onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                    className="w-full sm:w-20 px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3AA174] text-center text-sm"
                  />
                  <Button
                    onClick={() => addToCart(product)}
                    variant="primary"
                    disabled={product.stock === 0}
                    className="flex-1 py-2 text-xs sm:text-sm font-semibold"
                  >
                    <ShoppingCart size={16} className="hidden sm:inline" />
                    <span className="sm:hidden">Add</span>
                    <span className="hidden sm:inline">Add to Cart</span>
                  </Button>
                </div>

                {product.stock === 0 && (
                  <p className="text-xs text-red-500 font-semibold">Out of Stock</p>
                )}
              </Card>
            ))}
          </div>
        </div>

        {/* Cart Summary */}
        {cart.length > 0 && (
          <Card className="sticky bottom-4 shadow-2xl border-2 border-[#3AA174]">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0F5132] mb-4 flex items-center gap-2">
              <ShoppingCart size={24} className="text-[#3AA174]" />
              Cart Summary
            </h2>

            <div className="overflow-x-auto -mx-4 sm:mx-0 mb-4">
              <div className="min-w-full inline-block align-middle">
                <div className="overflow-hidden" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                <table className="min-w-full">
                  <thead className="bg-stone-50 sticky top-0 z-10">
                    <tr className="border-b-2 border-stone-200">
                      <th className="text-left py-3 px-2 sm:px-4 text-stone-600 font-semibold text-xs sm:text-sm">Product</th>
                      <th className="text-left py-3 px-2 sm:px-4 text-stone-600 font-semibold text-xs sm:text-sm whitespace-nowrap">Unit Price</th>
                      <th className="text-left py-3 px-2 sm:px-4 text-stone-600 font-semibold text-xs sm:text-sm">Qty</th>
                      <th className="text-left py-3 px-2 sm:px-4 text-stone-600 font-semibold text-xs sm:text-sm whitespace-nowrap">Total</th>
                      <th className="text-left py-3 px-2 sm:px-4 text-stone-600 font-semibold text-xs sm:text-sm">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item, index) => (
                      <tr key={index} className="border-b border-stone-100 hover:bg-[#F6F3EB]/50 transition-colors">
                        <td className="py-3 px-2 sm:px-4 text-[#0F5132] font-medium text-xs sm:text-sm">
                          <span className="line-clamp-2">{item.product.name}</span>
                        </td>
                        <td className="py-3 px-2 sm:px-4 text-stone-700 text-xs sm:text-sm whitespace-nowrap">PKR {item.product.price}</td>
                        <td className="py-3 px-2 sm:px-4">
                          <div className="flex items-center gap-1 sm:gap-2">
                            <button
                              onClick={() => updateCartQuantity(index, -1)}
                              className="p-1 hover:bg-stone-200 rounded transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="font-semibold text-xs sm:text-sm w-6 sm:w-8 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateCartQuantity(index, 1)}
                              className="p-1 hover:bg-stone-200 rounded transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        </td>
                        <td className="py-3 px-2 sm:px-4 text-[#3AA174] font-bold text-xs sm:text-sm whitespace-nowrap">
                          PKR {(item.product.price * item.quantity).toLocaleString()}
                        </td>
                        <td className="py-3 px-2 sm:px-4">
                          <button
                            onClick={() => removeFromCart(index)}
                            className="p-1 sm:p-2 hover:bg-red-100 rounded-lg transition-colors text-red-600"
                            title="Remove"
                            aria-label="Remove item"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t-2 border-stone-200">
              <div className="text-xl sm:text-2xl font-bold text-[#0F5132] text-center sm:text-left">
                Grand Total: <span className="text-[#3AA174]">PKR {calculateTotal().toLocaleString()}</span>
              </div>
              <Button
                onClick={handlePlaceOrder}
                variant="primary"
                disabled={placing}
                className="px-6 sm:px-8 py-3 text-base sm:text-lg font-bold w-full sm:w-auto"
              >
                {placing ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    <span className="hidden sm:inline">Placing Order...</span>
                    <span className="sm:hidden">Placing...</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart size={20} />
                    Place Order
                  </>
                )}
              </Button>
            </div>
          </Card>
        )}

        {cart.length === 0 && !loading && (
          <Card className="text-center py-8 sm:py-12">
            <ShoppingCart size={48} className="sm:w-16 sm:h-16 mx-auto text-stone-300 mb-4" />
            <p className="text-lg sm:text-xl text-stone-500 mb-2">Your cart is empty</p>
            <p className="text-xs sm:text-sm text-stone-400">Add products to your cart to place an order</p>
          </Card>
        )}
      </main>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
