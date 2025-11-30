import { useState, useEffect } from 'react'
import Sidebar from "../../components/sidebar"
import StatCard from "../../components/StatCard"
import Chart from "../../components/Chart"
import Card from "../../components/Card"
import { Loader2 } from 'lucide-react'
import "../(client)/dashboard.css"

export default function AdminImpact() {
  const [stats, setStats] = useState(null)
  const [trendData, setTrendData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    document.title = 'Impact Analytics - GreenVerse'
    fetchImpactData()
  }, [])

  const fetchImpactData = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('token')
      const headers = { 'Authorization': `Bearer ${token}` }

      const [statsRes, trendRes] = await Promise.all([
        fetch('http://localhost:5000/api/impact/stats', { headers }),
        fetch('http://localhost:5000/api/impact/trend', { headers })
      ])

      const [statsData, trendData] = await Promise.all([
        statsRes.json(),
        trendRes.json()
      ])

      setStats(statsData.stats)
      setTrendData(trendData.trendData)
    } catch (error) {
      console.error('Failed to fetch impact data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="dashboard-layout" style={{ backgroundColor: '#FDFBF7' }}>
        <Sidebar role="admin" />
        <main className="dashboard-content flex items-center justify-center" style={{ backgroundColor: '#FDFBF7' }}>
          <Loader2 className="w-8 h-8 animate-spin text-[#3AA174]" />
        </main>
      </div>
    )
  }

  return (
    <div className="dashboard-layout" style={{ backgroundColor: '#FDFBF7' }}>
      <Sidebar role="admin" />

      <main className="dashboard-content" style={{ backgroundColor: '#FDFBF7' }}>
        <h1 className="mb-6" style={{ fontSize: '2rem', fontWeight: 'bold', color: '#0F5132' }}>Impact Analytics</h1>

        <div className="stats-grid">
          <StatCard
            title="Waste Processed"
            value={`${stats?.wasteProcessed || 0}kg`}
            change={stats?.wasteChange || '+0%'}
            icon="♻️"
          />
          <StatCard 
            title="CO2 Saved" 
            value={`${stats?.co2Saved || 0}kg`} 
            change={stats?.co2Change || '+0%'} 
            icon="🌍" 
          />
          <StatCard
            title="Landfill Diverted"
            value={`${stats?.landfillDiverted || 0}kg`}
            change={stats?.landfillChange || '+0%'}
            icon="🌱"
          />
          <StatCard 
            title="Farmers Supported" 
            value={stats?.farmersSupported || 0} 
            change={stats?.farmersChange || '+0'} 
            icon="👨‍🌾" 
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <Chart 
            data={trendData} 
            title="Environmental Impact Trend" 
            type="line" 
            dataKeys={["month", "waste", "co2"]} 
          />
          <Card style={{ backgroundColor: 'white' }}>
            <h3 className="text-lg font-semibold text-[#0F5132] mb-4">Impact Highlights</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
                <span className="text-stone-700">Trees Equivalent</span>
                <span className="text-2xl font-bold text-green-600">{stats?.treesEquivalent || 0}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl">
                <span className="text-stone-700">Active Clusters</span>
                <span className="text-2xl font-bold text-blue-600">{stats?.activeClusters || 0}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-amber-50 rounded-xl">
                <span className="text-stone-700">Active Users</span>
                <span className="text-2xl font-bold text-amber-600">{stats?.activeUsers || 0}</span>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
