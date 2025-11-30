import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Sidebar from "../../components/sidebar"
import StatCard from "../../components/StatCard"
import Card from "../../components/Card"
import Chart from "../../components/Chart"
import Button from "../../components/Button"
import { dashboardAPI, productsAPI, ordersAPI, clustersAPI, employeesAPI } from "../../services/api"
import { Download, TrendingUp, Package, DollarSign, Users, Loader2, X } from "lucide-react"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "../(client)/dashboard.css"

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [stats, setStats] = useState(null)
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [clusters, setClusters] = useState([])
  const [ordersTrend, setOrdersTrend] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingProduct, setEditingProduct] = useState(null)
  const [newPrice, setNewPrice] = useState('')
  const [updating, setUpdating] = useState(false)
  const [showClusterModal, setShowClusterModal] = useState(false)
  const [showStaffModal, setShowStaffModal] = useState(false)
  const [addingStaff, setAddingStaff] = useState(false)
  const [expandedOrders, setExpandedOrders] = useState({})
  const [staffForm, setStaffForm] = useState({
    name: '',
    city: '',
    role: '',
    cluster_id: ''
  })
  const [clusterForm, setClusterForm] = useState({
    name: '',
    email: '',
    password: '',
    city: '',
    province: '',
    capacity: 100
  })
  const [creatingCluster, setCreatingCluster] = useState(false)

  // Calculate real-time stats from backend data
  const calculateTodayOrders = () => {
    return stats?.todayOrders || 0
  }

  const calculateWeeklyUsers = () => {
    return stats?.weeklyUsers || 0
  }

  useEffect(() => {
    document.title = 'Admin Dashboard - GreenVerse'
    fetchDashboardData()
  }, [])

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
      await fetchDashboardData()
    } catch (error) {
      console.error('Error updating price:', error)
      toast.error('Failed to update price')
    } finally {
      setUpdating(false)
    }
  }

  const handleApproveOrder = async (orderId) => {
    try {
      await ordersAPI.updateStatus(orderId, 'Processing')
      toast.success('Order approved!')
      await fetchDashboardData()
    } catch (error) {
      console.error('Error approving order:', error)
      toast.error('Failed to approve order')
    }
  }

  const handleRejectOrder = async (orderId) => {
    try {
      await ordersAPI.updateStatus(orderId, 'Cancelled')
      toast.success('Order rejected')
      await fetchDashboardData()
    } catch (error) {
      console.error('Error rejecting order:', error)
      toast.error('Failed to reject order')
    }
  }

  const handleShipOrder = async (orderId) => {
    try {
      await ordersAPI.updateStatus(orderId, 'Shipped')
      toast.success('Order marked as shipped!')
      await fetchDashboardData()
    } catch (error) {
      console.error('Error shipping order:', error)
      toast.error('Failed to update order')
    }
  }

  const handleDeliverOrder = async (orderId) => {
    try {
      await ordersAPI.updateStatus(orderId, 'Delivered')
      toast.success('Order marked as delivered!')
      await fetchDashboardData()
    } catch (error) {
      console.error('Error delivering order:', error)
      toast.error('Failed to update order')
    }
  }

  const toggleOrderExpand = (orderId) => {
    setExpandedOrders(prev => ({
      ...prev,
      [orderId]: !prev[orderId]
    }))
  }

  const handleCreateCluster = async (e) => {
    e.preventDefault()
    
    if (!clusterForm.name || !clusterForm.email || !clusterForm.password || !clusterForm.city || !clusterForm.province) {
      toast.error('All fields are required')
      return
    }

    try {
      setCreatingCluster(true)
      
      // Create cluster and user account
      const location = `${clusterForm.city}, ${clusterForm.province}`
      await clustersAPI.create({
        name: clusterForm.name,
        email: clusterForm.email,
        password: clusterForm.password,
        location: location,
        capacity: parseInt(clusterForm.capacity)
      })
      
      toast.success('Cluster created successfully!')
      setShowClusterModal(false)
      setClusterForm({ name: '', email: '', password: '', city: '', province: '', capacity: 100 })
      await fetchDashboardData()
    } catch (error) {
      console.error('Error creating cluster:', error)
      toast.error(error.response?.data?.error || 'Failed to create cluster')
    } finally {
      setCreatingCluster(false)
    }
  }

  const handleAddStaff = async (e) => {
    e.preventDefault()
    
    if (!staffForm.name || !staffForm.city || !staffForm.role || !staffForm.cluster_id) {
      toast.error('All fields are required')
      return
    }

    try {
      setAddingStaff(true)
      
      await employeesAPI.create(staffForm)
      
      toast.success('Staff member added successfully!')
      setShowStaffModal(false)
      setStaffForm({ name: '', city: '', role: '', cluster_id: '' })
      await fetchDashboardData()
    } catch (error) {
      console.error('Error adding staff:', error)
      toast.error(error.response?.data?.error || 'Failed to add staff member')
    } finally {
      setAddingStaff(false)
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

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      
      // Fetch dashboard stats
      const statsResponse = await dashboardAPI.getStats()
      setStats(statsResponse.data.stats)
      
      // Fetch orders trend
      const trendResponse = await dashboardAPI.getOrdersTrend()
      setOrdersTrend(trendResponse.data.trend || [])
      
      // Fetch products
      const productsResponse = await productsAPI.getAll()
      setProducts(productsResponse.data.products || [])
      
      // Fetch recent orders
      const ordersResponse = await ordersAPI.getAll()
      setOrders(ordersResponse.data.orders || [])
      
      // Fetch clusters
      const clustersResponse = await clustersAPI.getAll()
      setClusters(clustersResponse.data.clusters || [])
      
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
      toast.error('Failed to load dashboard data')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="dashboard-layout" style={{ backgroundColor: '#FDFBF7' }}>
        <Sidebar role="admin" />
        <main className="dashboard-content flex items-center justify-center" style={{ backgroundColor: '#FDFBF7' }}>
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin text-[#3AA174] mx-auto mb-4" />
            <p className="text-stone-600">Loading dashboard...</p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="dashboard-layout" style={{ backgroundColor: '#FDFBF7' }}>
      <ToastContainer 
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Sidebar role="admin" />

      <main className="dashboard-content" style={{ backgroundColor: '#FDFBF7', color: '#0F5132' }}>
        <h1 className="mb-6" style={{ fontSize: '2rem', fontWeight: 'bold', color: '#0F5132' }}>Admin Dashboard</h1>

        <div className="stats-grid">
          <StatCard 
            title="Total Orders" 
            value={stats?.totalOrders || 0} 
            change={`+${stats?.todayOrders || 0} today`} 
            icon="📦" 
          />
          <StatCard 
            title="Active Users" 
            value={stats?.activeUsers || 0} 
            change={stats?.weeklyUsers > 0 ? `+${stats.weeklyUsers} this week` : stats?.activeUsers > 0 ? 'All registered' : 'No users yet'} 
            icon="👥" 
          />
          <StatCard 
            title="Active Clusters" 
            value={stats?.activeClusters || 0} 
            change={stats?.activeClusters > 0 ? '100% operational' : 'No clusters'} 
            icon="🏭" 
          />
          <StatCard 
            title="Revenue" 
            value={`PKR ${parseFloat(stats?.totalRevenue || 0).toLocaleString()}`} 
            change={stats?.monthlyRevenue > 0 ? `+PKR ${parseFloat(stats.monthlyRevenue).toLocaleString()} this month` : 'No revenue yet'} 
            icon="💰" 
          />
        </div>

        <Card className="mt-6">
          <div className="flex flex-wrap justify-between items-center mb-4 gap-3">
            <h2 className="text-lg md:text-xl font-semibold text-[#0F5132]">Recent Orders - Approval</h2>
            <Button variant="primary" size="sm" className="text-sm whitespace-nowrap">
              <Download size={16} className="hidden sm:inline" /> 
              <span className="hidden sm:inline">Export Report</span>
              <span className="sm:hidden">Export</span>
            </Button>
          </div>
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
                      No orders yet. Orders will appear here once clients start placing them.
                    </td>
                  </tr>
                ) : (
                  orders.slice(0, 5).map((order, index) => (
                    <>
                      <tr key={order.id} className="border-b border-stone-100 hover:bg-[#F6F3EB]/50 transition-colors">
                        <td className="py-3 px-4 font-mono text-sm font-semibold text-[#3AA174] whitespace-nowrap">{formatOrderId(order, index)}</td>
                        <td className="py-3 px-4 text-[#0F5132] font-medium text-sm whitespace-nowrap">{order.user?.name || 'N/A'}</td>
                        <td className="py-3 px-4 text-stone-600 text-sm">
                          {order.items && order.items.length > 0 ? (
                            <button 
                              onClick={() => toggleOrderExpand(order.id)}
                              className="flex items-center gap-2 hover:text-[#3AA174] transition-colors"
                            >
                              <span className="font-semibold">{order.items.length} items</span>
                              <svg 
                                className={`w-4 h-4 transition-transform ${expandedOrders[order.id] ? 'rotate-180' : ''}`} 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </button>
                          ) : (
                            order.product?.name || 'N/A'
                          )}
                        </td>
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
                        {order.status === 'Pending' ? (
                          <div className="flex flex-col sm:flex-row gap-2">
                            <button 
                              onClick={() => handleApproveOrder(order.id)}
                              className="px-3 py-1.5 bg-green-500 text-white rounded-full font-semibold text-xs hover:bg-green-600 transition-all duration-300 shadow-sm hover:shadow-md active:scale-95 flex items-center justify-center gap-1 whitespace-nowrap"
                            >
                              ✓ Approve
                            </button>
                            <button 
                              onClick={() => handleRejectOrder(order.id)}
                              className="px-3 py-1.5 bg-red-500 text-white rounded-full font-semibold text-xs hover:bg-red-600 transition-all duration-300 shadow-sm hover:shadow-md active:scale-95 flex items-center justify-center gap-1 whitespace-nowrap"
                            >
                              ✕ Reject
                            </button>
                          </div>
                        ) : order.status === 'Processing' ? (
                          <button 
                            onClick={() => handleShipOrder(order.id)}
                            className="px-3 py-1.5 bg-purple-500 text-white rounded-full font-semibold text-xs hover:bg-purple-600 transition-all duration-300 shadow-sm hover:shadow-md active:scale-95 flex items-center gap-1 whitespace-nowrap"
                          >
                            🚚 Ship
                          </button>
                        ) : order.status === 'Shipped' ? (
                          <button 
                            onClick={() => handleDeliverOrder(order.id)}
                            className="px-3 py-1.5 bg-green-500 text-white rounded-full font-semibold text-xs hover:bg-green-600 transition-all duration-300 shadow-sm hover:shadow-md active:scale-95 flex items-center gap-1 whitespace-nowrap"
                          >
                            ✓ Deliver
                          </button>
                        ) : (
                          <span className="text-stone-400 text-sm">{order.status}</span>
                        )}
                      </td>
                    </tr>
                    {expandedOrders[order.id] && order.items && order.items.length > 0 && (
                      <tr key={`${order.id}-items`} className="bg-stone-50">
                        <td colSpan="6" className="py-4 px-4">
                          <div className="ml-8">
                            <h4 className="text-sm font-semibold text-[#0F5132] mb-2">Order Items:</h4>
                            <div className="space-y-2">
                              {order.items.map((item, idx) => (
                                <div key={idx} className="flex items-center justify-between bg-white p-3 rounded-lg border border-stone-200">
                                  <div className="flex-1">
                                    <p className="font-medium text-[#0F5132]">{item.product?.name || 'Product'}</p>
                                    <p className="text-sm text-stone-600">Quantity: {item.quantity} × PKR {parseFloat(item.unit_price || 0).toFixed(2)}</p>
                                  </div>
                                  <div className="text-right">
                                    <p className="font-semibold text-[#3AA174]">PKR {parseFloat(item.total_price || 0).toFixed(2)}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                    </>
                  ))
                )}
              </tbody>
            </table>
            </div>
          </div>
        </Card>

        <Card className="mt-6">
          <div className="flex flex-wrap justify-between items-center mb-4 gap-3">
            <h2 className="text-lg md:text-xl font-semibold text-[#0F5132]">Product Management</h2>
            <div className="flex gap-2 flex-wrap">
              <Button variant="secondary" size="sm" className="text-xs sm:text-sm whitespace-nowrap">
                <Download size={14} className="hidden sm:inline" /> 
                <span className="hidden sm:inline">Export CSV</span>
                <span className="sm:hidden">CSV</span>
              </Button>
              <Button variant="primary" size="sm" className="text-xs sm:text-sm whitespace-nowrap">
                <Package size={14} className="hidden sm:inline" /> 
                <span className="hidden sm:inline">Add Product</span>
                <span className="sm:hidden">Add</span>
              </Button>
            </div>
          </div>
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <div className="min-w-full" style={{ maxHeight: '600px', overflowY: 'auto' }}>
            <table className="min-w-full">
              <thead className="bg-stone-50 sticky top-0 z-10">
                <tr className="border-b-2 border-stone-200">
                  <th className="text-left py-3 px-4 text-stone-600 font-semibold text-sm whitespace-nowrap">Product</th>
                  <th className="text-left py-3 px-4 text-stone-600 font-semibold text-sm">Category</th>
                  <th className="text-left py-3 px-4 text-stone-600 font-semibold text-sm whitespace-nowrap">Price</th>
                  <th className="text-left py-3 px-4 text-stone-600 font-semibold text-sm">Stock</th>
                  <th className="text-left py-3 px-4 text-stone-600 font-semibold text-sm">Status</th>
                </tr>
              </thead>
              <tbody>
                {products.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="py-8 text-center text-stone-500">
                      No products found. Add your first product to get started.
                    </td>
                  </tr>
                ) : (
                  products.map((product) => (
                    <tr key={product.id} className="border-b border-stone-100 hover:bg-[#F6F3EB]/50 transition-colors">
                      <td className="py-3 px-4 text-[#0F5132] font-medium text-sm whitespace-nowrap">{product.name}</td>
                      <td className="py-3 px-4 text-stone-600 text-sm">{product.category}</td>
                      <td className="py-3 px-4 text-stone-700 font-semibold text-sm whitespace-nowrap">PKR {product.price}</td>
                      <td className="py-3 px-4 text-stone-600 text-sm">{product.stock || 0}</td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          product.stock > 10 ? "bg-green-100 text-green-700" :
                          product.stock > 0 ? "bg-yellow-100 text-yellow-700" :
                          "bg-red-100 text-red-700"
                        }`}>
                          {product.stock > 10 ? "In Stock" : product.stock > 0 ? "Low Stock" : "Out of Stock"}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            </div>
          </div>
        </Card>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <Chart 
            data={ordersTrend} 
            title="Orders Trend (Last 6 Months)" 
            type="line" 
            dataKeys={["month", "orders"]} 
          />
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
            <h3 className="text-lg font-semibold text-[#0F5132] mb-4">Environmental Impact</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-stone-600">CO2 Saved</span>
                <span className="font-bold text-[#3AA174]">{(stats?.co2Saved || 0).toLocaleString()} kg</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-stone-600">Waste Processed</span>
                <span className="font-bold text-[#3AA174]">{(stats?.wasteProcessed || 0).toLocaleString()} kg</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-stone-600">Landfill Diverted</span>
                <span className="font-bold text-[#3AA174]">{(stats?.landfillDiverted || 0).toLocaleString()} kg</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-stone-600">Farmers Supported</span>
                <span className="font-bold text-[#3AA174]">{stats?.farmersSupported || 0}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <Card>
            <h2 className="text-xl font-semibold text-[#0F5132] mb-4">Cluster Units</h2>
            <div className="space-y-3">
              {clusters.length === 0 ? (
                <p className="text-center text-stone-500 py-4">No clusters found.</p>
              ) : (
                clusters.map((cluster) => (
                  <div key={cluster.id} className="flex justify-between items-center p-3 bg-[#F6F3EB] rounded-xl hover:bg-[#F6F3EB]/70 transition-colors">
                    <div>
                      <p className="font-semibold text-[#0F5132]">{cluster.name}</p>
                      <p className="text-sm text-stone-600">{cluster.location || 'Location not set'}</p>
                    </div>
                    <div className="text-right">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        cluster.status === "Active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                      }`}>
                        {cluster.status}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>

          <Card>
            <h2 className="text-xl font-semibold text-[#0F5132] mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Button variant="primary" className="w-full justify-start" onClick={() => setShowStaffModal(true)}><Users size={18} /> Add Staff Member</Button>
              <Button variant="secondary" className="w-full justify-start" onClick={() => navigate('/admin/inventory')}><Package size={18} /> Manage Inventory</Button>
              <Button variant="secondary" className="w-full justify-start" onClick={() => navigate('/admin/sales')}><TrendingUp size={18} /> View Sales Analytics</Button>
              <Button variant="secondary" className="w-full justify-start"><Download size={18} /> Export Excel Report</Button>
              <Button variant="secondary" className="w-full justify-start"><Download size={18} /> Export PDF Report</Button>
            </div>
          </Card>
        </div>
      </main>

      {/* Add Cluster Modal */}
      {showClusterModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setShowClusterModal(false)}>
          <div className="bg-white rounded-2xl p-4 sm:p-6 w-full max-w-md shadow-xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg sm:text-xl font-bold text-[#0F5132] mb-4">Add New Cluster</h3>
            <form onSubmit={handleCreateCluster} className="space-y-4">
              <div>
                <label className="block text-stone-700 font-semibold mb-2">Cluster Name</label>
                <input
                  type="text"
                  value={clusterForm.name}
                  onChange={(e) => setClusterForm({...clusterForm, name: e.target.value})}
                  required
                  className="w-full px-4 py-2 border-2 border-stone-200 rounded-xl focus:border-[#3AA174] focus:ring-2 focus:ring-[#3AA174]/20 outline-none transition-all"
                  placeholder="Sukkur Cluster"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-2">Email (Login)</label>
                <input
                  type="email"
                  value={clusterForm.email}
                  onChange={(e) => setClusterForm({...clusterForm, email: e.target.value})}
                  required
                  className="w-full px-4 py-2 border-2 border-stone-200 rounded-xl focus:border-[#3AA174] focus:ring-2 focus:ring-[#3AA174]/20 outline-none transition-all"
                  placeholder="cluster@example.com"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-2">Password</label>
                <input
                  type="password"
                  value={clusterForm.password}
                  onChange={(e) => setClusterForm({...clusterForm, password: e.target.value})}
                  required
                  minLength={6}
                  className="w-full px-4 py-2 border-2 border-stone-200 rounded-xl focus:border-[#3AA174] focus:ring-2 focus:ring-[#3AA174]/20 outline-none transition-all"
                  placeholder="Minimum 6 characters"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-2">City</label>
                <input
                  type="text"
                  value={clusterForm.city}
                  onChange={(e) => setClusterForm({...clusterForm, city: e.target.value})}
                  required
                  className="w-full px-4 py-2 border-2 border-stone-200 rounded-xl focus:border-[#3AA174] focus:ring-2 focus:ring-[#3AA174]/20 outline-none transition-all"
                  placeholder="Sukkur"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-2">Province</label>
                <select
                  value={clusterForm.province}
                  onChange={(e) => setClusterForm({...clusterForm, province: e.target.value})}
                  required
                  className="w-full px-4 py-2 border-2 border-stone-200 rounded-xl focus:border-[#3AA174] focus:ring-2 focus:ring-[#3AA174]/20 outline-none transition-all"
                >
                  <option value="">Select Province</option>
                  <option value="Sindh">Sindh</option>
                  <option value="Punjab">Punjab</option>
                  <option value="Khyber Pakhtunkhwa">Khyber Pakhtunkhwa</option>
                  <option value="Balochistan">Balochistan</option>
                  <option value="Gilgit-Baltistan">Gilgit-Baltistan</option>
                  <option value="Azad Kashmir">Azad Kashmir</option>
                </select>
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-2">Capacity</label>
                <input
                  type="number"
                  value={clusterForm.capacity}
                  onChange={(e) => setClusterForm({...clusterForm, capacity: e.target.value})}
                  required
                  min="1"
                  className="w-full px-4 py-2 border-2 border-stone-200 rounded-xl focus:border-[#3AA174] focus:ring-2 focus:ring-[#3AA174]/20 outline-none transition-all"
                  placeholder="100"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <Button 
                  type="button" 
                  variant="secondary" 
                  className="flex-1"
                  onClick={() => setShowClusterModal(false)}
                  disabled={creatingCluster}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  variant="primary" 
                  className="flex-1"
                  disabled={creatingCluster}
                >
                  {creatingCluster ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Creating...
                    </>
                  ) : (
                    'Create Cluster'
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Staff Modal */}
      {showStaffModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setShowStaffModal(false)}>
          <div className="bg-white rounded-2xl p-4 sm:p-6 w-full max-w-md shadow-xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg sm:text-xl font-bold text-[#0F5132]">Add Staff Member</h3>
              <button 
                onClick={() => setShowStaffModal(false)} 
                className="p-1 hover:bg-stone-100 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleAddStaff} className="space-y-4">
              <div>
                <label className="block text-stone-700 font-semibold mb-2">Full Name *</label>
                <input
                  type="text"
                  value={staffForm.name}
                  onChange={(e) => setStaffForm({...staffForm, name: e.target.value})}
                  required
                  className="w-full px-4 py-2 border-2 border-stone-200 rounded-xl focus:border-[#3AA174] focus:ring-2 focus:ring-[#3AA174]/20 outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-2">City *</label>
                <input
                  type="text"
                  value={staffForm.city}
                  onChange={(e) => setStaffForm({...staffForm, city: e.target.value})}
                  required
                  className="w-full px-4 py-2 border-2 border-stone-200 rounded-xl focus:border-[#3AA174] focus:ring-2 focus:ring-[#3AA174]/20 outline-none transition-all"
                  placeholder="Karachi"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-2">Role *</label>
                <select
                  value={staffForm.role}
                  onChange={(e) => setStaffForm({...staffForm, role: e.target.value})}
                  required
                  className="w-full px-4 py-2 border-2 border-stone-200 rounded-xl focus:border-[#3AA174] focus:ring-2 focus:ring-[#3AA174]/20 outline-none transition-all"
                >
                  <option value="">Select Role</option>
                  <option value="Production Worker">Production Worker</option>
                  <option value="Quality Control">Quality Control</option>
                  <option value="Machine Operator">Machine Operator</option>
                  <option value="Packaging Staff">Packaging Staff</option>
                  <option value="Maintenance Technician">Maintenance Technician</option>
                  <option value="Supervisor">Supervisor</option>
                  <option value="Raw Material Handler">Raw Material Handler</option>
                  <option value="Logistics Coordinator">Logistics Coordinator</option>
                </select>
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-2">Assign to Cluster *</label>
                <select
                  value={staffForm.cluster_id}
                  onChange={(e) => setStaffForm({...staffForm, cluster_id: e.target.value})}
                  required
                  className="w-full px-4 py-2 border-2 border-stone-200 rounded-xl focus:border-[#3AA174] focus:ring-2 focus:ring-[#3AA174]/20 outline-none transition-all"
                >
                  <option value="">Select Cluster</option>
                  {clusters.map(cluster => (
                    <option key={cluster.id} value={cluster.id}>
                      {cluster.name} - {cluster.location}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="secondary"
                  className="flex-1"
                  onClick={() => setShowStaffModal(false)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  variant="primary" 
                  className="flex-1"
                  disabled={addingStaff}
                >
                  {addingStaff ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Adding...
                    </>
                  ) : (
                    'Add Staff'
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Price Modal */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setEditingProduct(null)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-[#0F5132] mb-4">Edit Product Price</h3>
            <p className="text-stone-600 mb-4">Product: <span className="font-semibold text-[#0F5132]">{editingProduct.name}</span></p>
            <div className="mb-4">
              <label className="block text-stone-700 font-semibold mb-2">New Price (PKR)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
                className="w-full px-4 py-2 border-2 border-stone-300 rounded-lg focus:border-[#3AA174] focus:outline-none"
                placeholder="Enter new price (e.g., 45.50)"
                disabled={updating}
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setEditingProduct(null)}
                className="flex-1 px-4 py-2 bg-stone-200 text-stone-700 rounded-lg font-semibold hover:bg-stone-300 transition-colors"
                disabled={updating}
              >
                Cancel
              </button>
              <button
                onClick={handleUpdatePrice}
                className="flex-1 px-4 py-2 bg-[#3AA174] text-white rounded-lg font-semibold hover:bg-[#2d8a5f] transition-colors flex items-center justify-center gap-2"
                disabled={updating}
              >
                {updating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  'Update Price'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
