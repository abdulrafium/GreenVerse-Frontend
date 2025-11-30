import { useState, useEffect } from "react"
import Sidebar from "../../components/sidebar"
import Card from "../../components/Card"
import { ordersAPI } from "../../services/api"
import { Loader2 } from "lucide-react"
import "../(client)/dashboard.css"

export default function AdminOrders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    document.title = 'Orders Management - GreenVerse'
  }, [])
  const [error, setError] = useState("")

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const response = await ordersAPI.getAll()
      setOrders(response.data.orders || [])
      setError("")
    } catch (err) {
      console.error('Error fetching orders:', err)
      setError('Failed to load orders')
    } finally {
      setLoading(false)
    }
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
    const userName = order.user?.name || 'User'
    const nameParts = userName.split(' ')
    const initials = nameParts.length > 1 
      ? `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase()
      : userName.substring(0, 2).toUpperCase()
    
    const orderNum = String(index + 1).padStart(2, '0')
    return `GV-${initials}-${orderNum}`
  }

  return (
    <div className="dashboard-layout" style={{ backgroundColor: '#FDFBF7' }}>
      <Sidebar role="admin" />

      <main className="dashboard-content" style={{ backgroundColor: '#FDFBF7' }}>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#0F5132' }}>Orders Management</h1>
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
          ) : orders.length === 0 ? (
            <div className="text-center py-12 text-stone-500">
              <p>No orders found</p>
            </div>
          ) : (
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <div className="min-w-full" style={{ maxHeight: '600px', overflowY: 'auto' }}>
            <table className="min-w-full">
              <thead className="bg-stone-50 sticky top-0 z-10">
                <tr className="border-b-2 border-stone-200">
                  <th className="text-left py-3 px-4 text-stone-600 font-semibold text-sm whitespace-nowrap">Order ID</th>
                  <th className="text-left py-3 px-4 text-stone-600 font-semibold text-sm whitespace-nowrap">Client</th>
                  <th className="text-left py-3 px-4 text-stone-600 font-semibold text-sm">Product</th>
                  <th className="text-left py-3 px-4 text-stone-600 font-semibold text-sm">Quantity</th>
                  <th className="text-left py-3 px-4 text-stone-600 font-semibold text-sm whitespace-nowrap">Amount</th>
                  <th className="text-left py-3 px-4 text-stone-600 font-semibold text-sm">Date</th>
                  <th className="text-left py-3 px-4 text-stone-600 font-semibold text-sm">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={order.id} className="border-b border-stone-100 hover:bg-[#F6F3EB]/50 transition-colors">
                    <td className="py-3 px-4 font-mono text-sm font-semibold text-[#3AA174] whitespace-nowrap">{formatOrderId(order, index)}</td>
                    <td className="py-3 px-4 text-[#0F5132] font-medium text-sm whitespace-nowrap">{order.user?.name || 'N/A'}</td>
                    <td className="py-3 px-4 text-stone-600 text-sm">{order.product?.name || 'N/A'}</td>
                    <td className="py-3 px-4 text-stone-600 text-sm">{order.quantity} units</td>
                    <td className="py-3 px-4 text-stone-700 font-semibold text-sm whitespace-nowrap">PKR {parseFloat(order.amount || 0).toLocaleString()}</td>
                    <td className="py-3 px-4 text-stone-600 text-sm whitespace-nowrap">{new Date(order.created_at).toLocaleDateString()}</td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status || 'Pending'}
                      </span>
                    </td>
                  </tr>
                ))}
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
