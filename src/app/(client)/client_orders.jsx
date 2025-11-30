import { useState, useEffect } from "react"
import Sidebar from "../../components/sidebar"
import Button from "../../components/Button"
import Card from "../../components/Card"
import { ordersAPI } from "../../services/api"
import { Loader2, ChevronDown, ChevronUp, Package } from "lucide-react"
import "./dashboard.css"

export default function ClientOrders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [expandedOrders, setExpandedOrders] = useState(new Set())

  useEffect(() => {
    document.title = 'My Orders - GreenVerse'
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const response = await ordersAPI.getAll()
      setOrders(response.data.orders || [])
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleExpand = (orderId) => {
    const newExpanded = new Set(expandedOrders)
    if (newExpanded.has(orderId)) {
      newExpanded.delete(orderId)
    } else {
      newExpanded.add(orderId)
    }
    setExpandedOrders(newExpanded)
  }

  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'delivered': return 'bg-green-100 text-green-700'
      case 'processing': return 'bg-blue-100 text-blue-700'
      case 'shipped': return 'bg-purple-100 text-purple-700'
      case 'pending': return 'bg-yellow-100 text-yellow-700'
      case 'cancelled': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const formatOrderId = (order, index) => {
    // Get client initials (first 2 letters of first and last name)
    const userName = order.user?.name || 'User'
    const nameParts = userName.split(' ')
    const initials = nameParts.length > 1 
      ? `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase()
      : userName.substring(0, 2).toUpperCase()
    
    // Format: GV-[Initials]-[OrderNumber]
    const orderNum = String(index + 1).padStart(2, '0')
    return `GV-${initials}-${orderNum}`
  }

  return (
    <div className="dashboard-layout" style={{ backgroundColor: '#FDFBF7' }}>
      <Sidebar role="client" />

      <main className="dashboard-content" style={{ backgroundColor: '#FDFBF7' }}>
        <div className="dashboard-header">
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#0F5132' }}>My Orders</h1>
        </div>

        <Card>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-12 h-12 animate-spin text-[#3AA174]" />
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-12 text-stone-500">
              <p>No orders yet. Place your first order to get started!</p>
            </div>
          ) : (
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <div className="min-w-full" style={{ maxHeight: '600px', overflowY: 'auto' }}>
            <table className="min-w-full">
              <thead className="bg-stone-50 sticky top-0 z-10">
                <tr className="border-b-2 border-stone-200">
                  <th className="text-left py-3 px-4 text-stone-600 font-semibold text-sm whitespace-nowrap">Order ID</th>
                  <th className="text-left py-3 px-4 text-stone-600 font-semibold text-sm">Items</th>
                  <th className="text-left py-3 px-4 text-stone-600 font-semibold text-sm whitespace-nowrap">Total Amount</th>
                  <th className="text-left py-3 px-4 text-stone-600 font-semibold text-sm whitespace-nowrap">Date</th>
                  <th className="text-left py-3 px-4 text-stone-600 font-semibold text-sm">Status</th>
                  <th className="text-left py-3 px-4 text-stone-600 font-semibold text-sm">Details</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => {
                  const isExpanded = expandedOrders.has(order.id)
                  const hasItems = order.items && order.items.length > 0
                  
                  return (
                    <>
                      <tr key={order.id} className="border-b border-stone-100 hover:bg-[#F6F3EB]/50 transition-colors">
                        <td className="py-3 px-4 font-mono text-sm font-semibold text-[#3AA174] whitespace-nowrap">
                          {formatOrderId(order, index)}
                        </td>
                        <td className="py-3 px-4 text-[#0F5132] font-medium text-sm">
                          {hasItems ? (
                            <div className="flex items-center gap-2">
                              <Package size={16} className="text-[#3AA174]" />
                              <span>{order.items.length} product{order.items.length > 1 ? 's' : ''}</span>
                            </div>
                          ) : (
                            order.product?.name || 'N/A'
                          )}
                        </td>
                        <td className="py-3 px-4 text-stone-700 font-semibold text-sm whitespace-nowrap">
                          PKR {parseFloat(order.amount || 0).toLocaleString()}
                        </td>
                        <td className="py-3 px-4 text-stone-600 text-sm whitespace-nowrap">
                          {new Date(order.created_at).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                            {order.status || 'Pending'}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          {hasItems && (
                            <button
                              onClick={() => toggleExpand(order.id)}
                              className="p-2 hover:bg-stone-200 rounded-lg transition-colors"
                              title={isExpanded ? "Hide details" : "Show details"}
                            >
                              {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                            </button>
                          )}
                        </td>
                      </tr>
                      
                      {/* Expanded Items View */}
                      {isExpanded && hasItems && (
                        <tr key={`${order.id}-items`}>
                          <td colSpan="6" className="py-4 px-8 bg-[#F6F3EB]/30">
                            <div className="text-sm font-semibold text-[#0F5132] mb-3">Order Items:</div>
                            <table className="w-full text-sm">
                              <thead>
                                <tr className="border-b border-stone-300">
                                  <th className="text-left py-2 px-3 text-stone-600 font-medium">Product</th>
                                  <th className="text-left py-2 px-3 text-stone-600 font-medium">Quantity</th>
                                  <th className="text-left py-2 px-3 text-stone-600 font-medium">Unit Price</th>
                                  <th className="text-left py-2 px-3 text-stone-600 font-medium">Total</th>
                                </tr>
                              </thead>
                              <tbody>
                                {order.items.map((item, idx) => (
                                  <tr key={idx} className="border-b border-stone-200 last:border-0">
                                    <td className="py-2 px-3 text-[#0F5132] font-medium">
                                      {item.product?.name || 'N/A'}
                                    </td>
                                    <td className="py-2 px-3 text-stone-700">{item.quantity}</td>
                                    <td className="py-2 px-3 text-stone-700">
                                      PKR {parseFloat(item.unit_price || 0).toLocaleString()}
                                    </td>
                                    <td className="py-2 px-3 text-[#3AA174] font-semibold">
                                      PKR {parseFloat(item.total_price || 0).toLocaleString()}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      )}
                    </>
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
