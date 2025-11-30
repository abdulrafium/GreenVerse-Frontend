import { useState, useEffect } from "react"
import Sidebar from "../../components/sidebar"
import Button from "../../components/Button"
import StatCard from "../../components/StatCard"
import Card from "../../components/Card"
import Chart from "../../components/Chart"
import { productionAPI, productsAPI, clustersAPI, attendanceAPI } from "../../services/api"
import { Factory, Users, Target, Camera, Loader2 } from "lucide-react"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "../(client)/dashboard.css"

export default function ClusterDashboard() {
  const [productionEntry, setProductionEntry] = useState({ 
    product: "", 
    quantity: "", 
    shift: "Morning",
    date: new Date().toISOString().split('T')[0]
  })
  const [products, setProducts] = useState([])
  const [production, setProduction] = useState([])
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    document.title = 'Cluster Dashboard - GreenVerse'
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      const [productsRes, productionRes, statsRes] = await Promise.all([
        productsAPI.getAll(),
        productionAPI.getAll(),
        productionAPI.getStats()
      ])

      setProducts(productsRes.data.products || [])
      setProduction(productionRes.data.production || [])
      setStats(statsRes.data.stats || {})
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
      toast.error('Failed to load dashboard data')
    } finally {
      setLoading(false)
    }
  }

  const handleProductionSubmit = async (e) => {
    e.preventDefault()
    
    if (!productionEntry.product || !productionEntry.quantity) {
      toast.error('Please fill all fields')
      return
    }

    try {
      setSubmitting(true)
      
      const productionData = {
        product_id: productionEntry.product,
        quantity: parseInt(productionEntry.quantity),
        shift: productionEntry.shift,
        date: productionEntry.date
      }

      console.log('Submitting production:', productionData)
      const response = await productionAPI.create(productionData)
      console.log('Production response:', response)
      
      toast.success('Production recorded successfully! Stock updated.')
      setProductionEntry({ product: "", quantity: "", shift: "Morning", date: new Date().toISOString().split('T')[0] })
      
      // Refresh data
      await fetchDashboardData()
    } catch (error) {
      console.error('Error submitting production:', error)
      console.error('Error response:', error.response)
      const errorMsg = error.response?.data?.error || error.message || 'Failed to record production'
      toast.error(errorMsg, { autoClose: 5000 })
    } finally {
      setSubmitting(false)
    }
  }

  // Generate production chart data
  const generateProductionChart = () => {
    const last7Days = []
    for (let i = 6; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      const dateStr = date.toISOString().split('T')[0]
      
      const dayProduction = production.filter(p => p.date === dateStr)
      const total = dayProduction.reduce((sum, p) => sum + p.quantity, 0)
      
      last7Days.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        production: total
      })
    }
    return last7Days
  }

  return (
    <div className="dashboard-layout" style={{ backgroundColor: '#FDFBF7' }}>
      <Sidebar role="cluster" />

      <main className="dashboard-content" style={{ backgroundColor: '#FDFBF7', color: '#0F5132' }}>
        <div className="dashboard-header">
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#0F5132' }}>Cluster Dashboard</h1>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-12 h-12 animate-spin text-[#3AA174]" />
          </div>
        ) : (
          <>
            <div className="stats-grid">
              <StatCard title="Today's Production" value={`${stats?.todayProduction || 0} units`} change="Today" icon="⚙️" />
              <StatCard title="This Month" value={`${stats?.monthProduction || 0} units`} change="Month total" icon="📊" />
              <StatCard title="Total Production" value={`${stats?.totalProduction || 0} units`} change="All time" icon="♻️" />
              <StatCard title="Active Products" value={products.length} change={`${products.filter(p => p.stock > 10).length} in stock`} icon="📦" />
            </div>

            {/* Production Chart */}
            {production.length > 0 && (
              <div className="mt-6">
                <Chart 
                  data={generateProductionChart()} 
                  title="Weekly Production Output" 
                  type="bar" 
                  dataKeys={["date", "production"]}
                />
              </div>
            )}
          </>
        )}

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {/* Production Entry Form */}
          <Card>
            <h2 className="text-xl font-semibold text-[#0F5132] mb-4 flex items-center gap-2">
              <Factory size={24} className="text-[#3AA174]" />
              Production Entry
            </h2>
            <form onSubmit={handleProductionSubmit} className="space-y-4">
              <div>
                <label className="block text-stone-700 font-semibold mb-2">Product</label>
                <select
                  value={productionEntry.product}
                  onChange={(e) => setProductionEntry({...productionEntry, product: e.target.value})}
                  required
                  className="w-full px-4 py-2 border-2 border-stone-200 rounded-xl focus:border-[#3AA174] focus:ring-2 focus:ring-[#3AA174]/20 outline-none transition-all"
                >
                  <option value="">Select product</option>
                  {products.map(product => (
                    <option key={product.id} value={product.id}>
                      {product.name} - Current Stock: {product.stock} units
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-stone-700 font-semibold mb-2">Quantity Produced</label>
                <input
                  type="number"
                  value={productionEntry.quantity}
                  onChange={(e) => setProductionEntry({...productionEntry, quantity: e.target.value})}
                  required
                  min="1"
                  className="w-full px-4 py-2 border-2 border-stone-200 rounded-xl focus:border-[#3AA174] focus:ring-2 focus:ring-[#3AA174]/20 outline-none transition-all"
                  placeholder="Enter quantity produced"
                />
              </div>
              <div>
                <label className="block text-stone-700 font-semibold mb-2">Shift</label>
                <select
                  value={productionEntry.shift}
                  onChange={(e) => setProductionEntry({...productionEntry, shift: e.target.value})}
                  className="w-full px-4 py-2 border-2 border-stone-200 rounded-xl focus:border-[#3AA174] focus:ring-2 focus:ring-[#3AA174]/20 outline-none transition-all"
                >
                  <option value="Morning">Morning</option>
                  <option value="Evening">Evening</option>
                  <option value="Night">Night</option>
                </select>
              </div>
              <div>
                <label className="block text-stone-700 font-semibold mb-2">Date</label>
                <input
                  type="date"
                  value={productionEntry.date}
                  onChange={(e) => setProductionEntry({...productionEntry, date: e.target.value})}
                  required
                  className="w-full px-4 py-2 border-2 border-stone-200 rounded-xl focus:border-[#3AA174] focus:ring-2 focus:ring-[#3AA174]/20 outline-none transition-all"
                />
              </div>
              <Button type="submit" className="w-full" disabled={submitting}>
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Submitting...
                  </>
                ) : (
                  'Submit Production'
                )}
              </Button>
            </form>
          </Card>

          {/* Recent Production */}
          <Card>
            <h2 className="text-xl font-semibold text-[#0F5132] mb-4 flex items-center gap-2">
              <Target size={24} className="text-[#3AA174]" />
              Recent Production
            </h2>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {production.length === 0 ? (
                <p className="text-stone-500 text-center py-4">No production records yet</p>
              ) : (
                production.slice(0, 10).map((prod) => (
                  <div key={prod.id} className="flex justify-between items-center p-3 bg-stone-50 rounded-lg">
                    <div>
                      <p className="font-semibold text-[#0F5132]">{prod.product?.name || 'N/A'}</p>
                      <p className="text-sm text-stone-600">{prod.shift} Shift - {new Date(prod.date).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-[#3AA174]">{prod.quantity} units</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}