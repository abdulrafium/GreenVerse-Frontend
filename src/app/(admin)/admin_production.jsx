import { useState, useEffect } from "react"
import Sidebar from "../../components/sidebar"
import Chart from "../../components/Chart"
import StatCard from "../../components/StatCard"
import Card from "../../components/Card"
import { Loader2 } from "lucide-react"
import { toast } from "react-toastify"
import "../(client)/dashboard.css"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api"

export default function AdminProduction() {
  const [stats, setStats] = useState({
    totalOutput: 0,
    outputChange: '+0%',
    efficiency: '0%',
    efficiencyChange: '+0%',
    activeClusters: '0/0',
    underMaintenance: 0,
    qualityRate: '0%',
    qualityImprovement: '+0%'
  })
  const [weeklyData, setWeeklyData] = useState([])
  const [efficiencyData, setEfficiencyData] = useState([])
  const [clusters, setClusters] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    document.title = 'Production Management - GreenVerse'
    fetchProductionData()
  }, [])

  const fetchProductionData = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('token')

      // Fetch all production data in parallel
      const [statsRes, weeklyRes, efficiencyRes, clustersRes] = await Promise.all([
        fetch(`${API_URL}/production/admin/stats`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        fetch(`${API_URL}/production/admin/weekly`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        fetch(`${API_URL}/production/admin/efficiency`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        fetch(`${API_URL}/production/admin/clusters`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      ])

      if (statsRes.ok) {
        const data = await statsRes.json()
        setStats(data.stats)
      }

      if (weeklyRes.ok) {
        const data = await weeklyRes.json()
        setWeeklyData(data.weeklyData || [])
      }

      if (efficiencyRes.ok) {
        const data = await efficiencyRes.json()
        setEfficiencyData(data.efficiencyData || [])
      }

      if (clustersRes.ok) {
        const data = await clustersRes.json()
        setClusters(data.clusters || [])
      }
    } catch (error) {
      console.error('Error fetching production data:', error)
      toast.error('Failed to load production data')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="dashboard-layout" style={{ backgroundColor: '#FDFBF7' }}>
      <Sidebar role="admin" />

      <main className="dashboard-content" style={{ backgroundColor: '#FDFBF7' }}>
        <h1 className="mb-6" style={{ fontSize: '2rem', fontWeight: 'bold', color: '#0F5132' }}>Production Management</h1>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-12 h-12 animate-spin text-[#3AA174]" />
          </div>
        ) : (
          <>
            <div className="stats-grid">
              <StatCard 
                title="Total Output" 
                value={`${stats.totalOutput.toLocaleString()} units`} 
                change={`${stats.outputChange} this week`} 
                icon="📦" 
              />
              <StatCard 
                title="Efficiency" 
                value={stats.efficiency} 
                change={`${stats.efficiencyChange} this week`} 
                icon="⚡" 
              />
              <StatCard 
                title="Active Lines" 
                value={stats.activeClusters} 
                change={`${stats.underMaintenance} under maintenance`} 
                icon="🏭" 
              />
              <StatCard 
                title="Quality Rate" 
                value={stats.qualityRate} 
                change={`${stats.qualityImprovement} improvement`} 
                icon="✓" 
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <Chart 
                data={weeklyData} 
                title="Weekly Production Output" 
                type="bar" 
                dataKeys={["date", "plates", "bowls", "cutlery"]} 
              />
              <Chart 
                data={efficiencyData} 
                title="Efficiency Trend" 
                type="line" 
                dataKeys={["day", "efficiency"]} 
              />
            </div>

            <Card className="mt-6">
              <h2 className="text-xl font-semibold text-[#0F5132] mb-4">Cluster Production Status</h2>
              <div className="overflow-x-auto -mx-4 sm:mx-0">
                <div className="min-w-full" style={{ maxHeight: '600px', overflowY: 'auto' }}>
                <table className="min-w-full">
                  <thead className="bg-stone-50 sticky top-0 z-10">
                    <tr className="border-b-2 border-stone-200">
                      <th className="text-left py-3 px-4 text-stone-600 font-semibold text-sm whitespace-nowrap">Cluster</th>
                      <th className="text-left py-3 px-4 text-stone-600 font-semibold text-sm">Manager</th>
                      <th className="text-left py-3 px-4 text-stone-600 font-semibold text-sm">Capacity</th>
                      <th className="text-left py-3 px-4 text-stone-600 font-semibold text-sm">Utilization</th>
                      <th className="text-left py-3 px-4 text-stone-600 font-semibold text-sm">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clusters.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="text-center py-8 text-stone-500">
                          No production data available
                        </td>
                      </tr>
                    ) : (
                      clusters.map((cluster) => (
                        <tr key={cluster.id} className="border-b border-stone-100 hover:bg-[#F6F3EB]/50 transition-colors">
                          <td className="py-3 px-4 text-[#0F5132] font-medium text-sm whitespace-nowrap">{cluster.name}</td>
                          <td className="py-3 px-4 text-stone-600 text-sm">{cluster.manager}</td>
                          <td className="py-3 px-4 text-stone-700 text-sm">{cluster.capacity}</td>
                          <td className="py-3 px-4 text-stone-700 font-semibold text-sm">{cluster.utilization}</td>
                          <td className="py-3 px-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              cluster.status === 'Active' 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-yellow-100 text-yellow-700'
                            }`}>
                              {cluster.status === 'Active' ? 'Operational' : 'Maintenance'}
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
          </>
        )}
      </main>
    </div>
  )
}
