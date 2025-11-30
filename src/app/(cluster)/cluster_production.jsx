import { useState, useEffect } from "react"
import Sidebar from "../../components/sidebar"
import Chart from "../../components/Chart"
import Card from "../../components/Card"
import Button from "../../components/Button"
import { productionAPI } from "../../services/api"
import { Loader2 } from "lucide-react"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "../(client)/dashboard.css"

export default function ClusterProduction() {
  const [production, setProduction] = useState([])
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    document.title = 'Production Management - GreenVerse'
    fetchProductionData()
  }, [])

  const fetchProductionData = async () => {
    try {
      setLoading(true)
      const [productionRes, statsRes] = await Promise.all([
        productionAPI.getAll(),
        productionAPI.getStats()
      ])

      setProduction(productionRes.data.production || [])
      setStats(statsRes.data.stats || {})
    } catch (error) {
      console.error('Error fetching production data:', error)
      toast.error('Failed to load production data')
    } finally {
      setLoading(false)
    }
  }

  // Generate weekly production chart
  const generateWeeklyChart = () => {
    const last7Days = []
    for (let i = 6; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      const dateStr = date.toISOString().split('T')[0]
      
      const dayProduction = production.filter(p => p.date === dateStr)
      const total = dayProduction.reduce((sum, p) => sum + p.quantity, 0)
      
      last7Days.push({
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        units: total
      })
    }
    return last7Days
  }

  // Calculate quality pass rate (mock for now, can be enhanced)
  const qualityPassRate = production.length > 0 ? 96.5 : 0

  return (
    <div className="dashboard-layout">
      <ToastContainer position="top-center" autoClose={3000} />
      <Sidebar role="cluster" />

      <main className="dashboard-content" style={{ backgroundColor: '#FDFBF7' }}>
        <div className="mb-6 flex justify-between items-center">
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#0F5132' }}>Production Management</h1>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-12 h-12 animate-spin text-[#3AA174]" />
          </div>
        ) : (
          <>
            {/* Production Stats */}
            <div className="grid md:grid-cols-4 gap-4 mb-6">
              <Card className="p-4" style={{ backgroundColor: 'white' }}>
                <div className="text-sm text-gray-600 mb-1">Today's Output</div>
                <div className="text-2xl font-bold text-[#0F5132]">{stats?.todayProduction || 0} units</div>
                <div className="text-xs text-green-600 mt-1">Today</div>
              </Card>
              <Card className="p-4" style={{ backgroundColor: 'white' }}>
                <div className="text-sm text-gray-600 mb-1">Active Products</div>
                <div className="text-2xl font-bold text-[#0F5132]">5</div>
                <div className="text-xs text-blue-600 mt-1">In production</div>
              </Card>
              <Card className="p-4" style={{ backgroundColor: 'white' }}>
                <div className="text-sm text-gray-600 mb-1">This Month</div>
                <div className="text-2xl font-bold text-[#0F5132]">{stats?.monthProduction || 0} units</div>
                <div className="text-xs text-green-600 mt-1">Month total</div>
              </Card>
              <Card className="p-4" style={{ backgroundColor: 'white' }}>
                <div className="text-sm text-gray-600 mb-1">Quality Pass Rate</div>
                <div className="text-2xl font-bold text-[#0F5132]">{qualityPassRate}%</div>
                <div className="text-xs text-green-600 mt-1">High quality</div>
              </Card>
            </div>

            {/* Chart */}
            {production.length > 0 && (
              <div className="mb-6">
                <Chart 
                  data={generateWeeklyChart()} 
                  title="Weekly Production Output" 
                  type="bar"
                  dataKeys={['day', 'units']}
                />
              </div>
            )}

            {/* Production Records Table */}
            <Card className="p-6 mb-6" style={{ backgroundColor: 'white' }}>
              <h2 className="text-xl font-bold text-[#0F5132] mb-4">Production History</h2>
              <div className="overflow-x-auto -mx-4 sm:mx-0">
                {production.length === 0 ? (
                  <p className="text-center text-stone-500 py-8">No production records yet</p>
                ) : (
                  <div className="min-w-full" style={{ maxHeight: '600px', overflowY: 'auto' }}>
                  <table className="min-w-full">
                    <thead className="bg-stone-50 sticky top-0 z-10">
                      <tr className="border-b-2 border-stone-200">
                        <th className="text-left p-3 text-stone-600 text-sm whitespace-nowrap">Date</th>
                        <th className="text-left p-3 text-stone-600 text-sm">Product</th>
                        <th className="text-left p-3 text-stone-600 text-sm">Quantity</th>
                        <th className="text-left p-3 text-stone-600 text-sm">Shift</th>
                        <th className="text-left p-3 text-stone-600 text-sm">Cluster</th>
                      </tr>
                    </thead>
                    <tbody>
                      {production.map((record) => (
                        <tr key={record.id} className="border-b border-stone-100 hover:bg-stone-50">
                          <td className="p-3 text-sm whitespace-nowrap">{new Date(record.date).toLocaleDateString()}</td>
                          <td className="p-3 font-semibold text-[#0F5132] text-sm">{record.product?.name || 'N/A'}</td>
                          <td className="p-3 text-sm">
                            <span className="px-3 py-1 bg-[#3AA174]/10 text-[#3AA174] rounded-full font-semibold text-xs whitespace-nowrap">
                              {record.quantity} units
                            </span>
                          </td>
                          <td className="p-3 text-sm">{record.shift}</td>
                          <td className="p-3 text-stone-600 text-sm">{record.cluster?.name || 'N/A'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  </div>
                )}
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6" style={{ backgroundColor: 'white' }}>
              <h2 className="text-xl font-bold text-[#0F5132] mb-4">Quick Actions</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <Button variant="outline" className="w-full">
                  📋 View Production Schedule
                </Button>
                <Button variant="outline" className="w-full">
                  🔧 Report Machine Issue
                </Button>
                <Button variant="outline" className="w-full">
                  📊 Export Production Report
                </Button>
              </div>
            </Card>
          </>
        )}
      </main>
    </div>
  )
}
