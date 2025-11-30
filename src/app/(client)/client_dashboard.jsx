import { useState, useEffect } from "react"
import Sidebar from "../../components/sidebar"
import Button from "../../components/Button"
import StatCard from "../../components/StatCard"
import Card from "../../components/Card"
import Chart from "../../components/Chart"
import { ordersAPI, productsAPI, dashboardAPI } from "../../services/api"
import { ShoppingCart, Download, TrendingUp, Leaf, Loader2 } from "lucide-react"
import { toast, ToastContainer } from "react-toastify"
import { generateInvoicePDF } from "../../utils/invoiceGenerator"
import "react-toastify/dist/ReactToastify.css"
import "./dashboard.css"

export default function ClientDashboard() {
  const [orderForm, setOrderForm] = useState({ product: "", quantity: "", deliveryDate: "" })
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    document.title = 'Client Dashboard - GreenVerse'
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      const [productsRes, ordersRes, statsRes] = await Promise.all([
        productsAPI.getAll(),
        ordersAPI.getAll(),
        dashboardAPI.getStats()
      ])
      
      setProducts(productsRes.data.products || [])
      setOrders(ordersRes.data.orders || [])
      
      // Calculate client-specific stats (only from delivered orders)
      const clientOrders = ordersRes.data.orders || []
      const deliveredOrders = clientOrders.filter(o => o.status === 'Delivered')
      const totalSpent = deliveredOrders.reduce((sum, order) => sum + parseFloat(order.amount || 0), 0)
      const activeOrders = clientOrders.filter(o => o.status !== 'Delivered' && o.status !== 'Cancelled').length
      const totalQuantity = deliveredOrders.reduce((sum, order) => sum + parseInt(order.quantity || 0), 0)
      
      setStats({
        totalOrders: clientOrders.length,
        totalSpent: totalSpent.toFixed(2),
        activeOrders: activeOrders,
        totalQuantity: totalQuantity,
        impactMetrics: {
          plasticSaved: statsRes.data.stats.wasteProcessed || 125,
          co2Reduced: statsRes.data.stats.co2Saved || 45,
          farmersSupported: statsRes.data.stats.farmersSupported || 12
        }
      })
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
      toast.error('Failed to load dashboard data')
    } finally {
      setLoading(false)
    }
  }

  const handleOrderSubmit = async (e) => {
    e.preventDefault()
    
    if (!orderForm.product || !orderForm.quantity || !orderForm.deliveryDate) {
      toast.error('Please fill all fields')
      return
    }

    try {
      setSubmitting(true)
      const selectedProduct = products.find(p => p.id == orderForm.product)
      
      if (!selectedProduct) {
        toast.error('Please select a valid product')
        console.log('Product not found:', orderForm.product, 'Available products:', products)
        return
      }

      const orderData = {
        product_id: selectedProduct.id,
        quantity: parseInt(orderForm.quantity),
        amount: (selectedProduct.price * parseInt(orderForm.quantity)).toFixed(2),
        delivery_date: orderForm.deliveryDate,
        status: 'Pending' // Orders start as pending, need admin approval
      }

      await ordersAPI.create(orderData)
      toast.success('Order placed successfully! Waiting for admin approval.')
      setOrderForm({ product: "", quantity: "", deliveryDate: "" })
      
      // Refresh data
      await fetchDashboardData()
    } catch (error) {
      console.error('Error placing order:', error)
      toast.error(error.response?.data?.error || 'Failed to place order')
    } finally {
      setSubmitting(false)
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

  const handleDownloadInvoice = (order) => {
    try {
      generateInvoicePDF(order)
      toast.success('Invoice downloaded successfully!')
    } catch (error) {
      console.error('Error generating invoice:', error)
      toast.error('Failed to generate invoice')
    }
  }

  return (
    <div className="dashboard-layout" style={{ backgroundColor: '#FDFBF7' }}>
      <ToastContainer position="top-center" autoClose={3000} />
      <Sidebar role="client" />

      <main className="dashboard-content" style={{ backgroundColor: '#FDFBF7', color: '#0F5132' }}>
        <div className="dashboard-header">
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#0F5132' }}>Client Dashboard</h1>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-12 h-12 animate-spin text-[#3AA174]" />
          </div>
        ) : (
          <>
            <div className="stats-grid">
              <StatCard title="Total Orders" value={stats?.totalOrders || 0} change="All time" icon="📋" />
              <StatCard title="Total Spent" value={`PKR ${parseFloat(stats?.totalSpent || 0).toLocaleString()}`} change="All time" icon="💰" />
              <StatCard title="Products Purchased" value={stats?.totalQuantity || 0} change="All time" icon="📦" />
              <StatCard title="Active Orders" value={stats?.activeOrders || 0} change="In progress" icon="🚚" />
            </div>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {/* Quick Actions Card */}
          <Card className="flex flex-col justify-center">
            <h2 className="text-xl font-semibold text-[#0F5132] mb-6 flex items-center gap-2">
              <ShoppingCart size={24} className="text-[#3AA174]" />
              Quick Actions
            </h2>
            <div className="space-y-3">
              <Button 
                onClick={() => window.location.href = '/client/place-order'} 
                className="w-full justify-center text-lg py-4"
              >
                <ShoppingCart size={20} />
                Place New Order
              </Button>
              <Button 
                onClick={() => window.location.href = '/client/orders'} 
                variant="secondary"
                className="w-full justify-center text-lg py-4"
              >
                📋 View My Orders
              </Button>
              <Button 
                onClick={() => window.location.href = '/client/profile'} 
                variant="secondary"
                className="w-full justify-center text-lg py-4"
              >
                👤 Update Profile
              </Button>
            </div>
          </Card>

          {/* Impact Report */}
          <Card>
            <h2 className="text-xl font-semibold text-[#0F5132] mb-4 flex items-center gap-2">
              <Leaf size={24} className="text-[#3AA174]" />
              Your Environmental Impact
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-xl">
                <span className="text-stone-700 font-semibold">Plastic Saved</span>
                <span className="text-2xl font-bold text-[#3AA174]">{stats?.impactMetrics?.plasticSaved || 0} kg</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-xl">
                <span className="text-stone-700 font-semibold">CO2 Reduced</span>
                <span className="text-2xl font-bold text-blue-600">{stats?.impactMetrics?.co2Reduced || 0} kg</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-amber-50 rounded-xl">
                <span className="text-stone-700 font-semibold">Farmers Supported</span>
                <span className="text-2xl font-bold text-[#C8A656]">{stats?.impactMetrics?.farmersSupported || 0}</span>
              </div>
              <Button variant="secondary" className="w-full">
                <Download size={16} /> Download Impact Report
              </Button>
            </div>
          </Card>
        </div>

        <Card className="mt-6">
          <h2 className="text-xl font-semibold text-[#0F5132] mb-4">Recent Orders</h2>
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <div className="min-w-full" style={{ maxHeight: '600px', overflowY: 'auto' }}>
            <table className="min-w-full">
              <thead className="bg-stone-50 sticky top-0 z-10">
                <tr className="border-b-2 border-stone-200">
                  <th className="text-left py-3 px-4 text-stone-600 font-semibold text-sm whitespace-nowrap">Order ID</th>
                  <th className="text-left py-3 px-4 text-stone-600 font-semibold text-sm whitespace-nowrap">Client</th>
                  <th className="text-left py-3 px-4 text-stone-600 font-semibold text-sm">Items</th>
                  <th className="text-left py-3 px-4 text-stone-600 font-semibold text-sm">Status</th>
                  <th className="text-left py-3 px-4 text-stone-600 font-semibold text-sm whitespace-nowrap">Amount</th>
                  <th className="text-left py-3 px-4 text-stone-600 font-semibold text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="py-8 text-center text-stone-500">
                      No orders yet. Place your first order above!
                    </td>
                  </tr>
                ) : (
                  orders.slice(0, 5).map((order, index) => (
                    <tr key={order.id} className="border-b border-stone-100 hover:bg-[#F6F3EB]/50 transition-colors">
                      <td className="py-3 px-4 font-mono text-sm font-semibold text-[#3AA174] whitespace-nowrap">{formatOrderId(order, index)}</td>
                      <td className="py-3 px-4 text-[#0F5132] font-medium text-sm whitespace-nowrap">{order.user?.name || 'N/A'}</td>
                      <td className="py-3 px-4 text-stone-600 text-sm">{order.product?.name || 'N/A'}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            order.status === "Delivered"
                              ? "bg-green-100 text-green-700"
                              : order.status === "Processing"
                                ? "bg-blue-100 text-blue-700"
                                : order.status === "Shipped"
                                  ? "bg-purple-100 text-purple-700"
                                  : order.status === "Pending"
                                    ? "bg-yellow-100 text-yellow-700"
                                    : "bg-red-100 text-red-700"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-stone-700 font-semibold text-sm whitespace-nowrap">PKR {parseFloat(order.amount || 0).toLocaleString()}</td>
                      <td className="py-3 px-4">
                        <button 
                          onClick={() => handleDownloadInvoice(order)}
                          className="text-[#3AA174] hover:text-[#0F5132] font-semibold text-sm transition-colors flex items-center gap-1 whitespace-nowrap"
                        >
                          <Download size={14} /> Invoice
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            </div>
          </div>
            </Card>
          </>
        )}
      </main>
    </div>
  )
}