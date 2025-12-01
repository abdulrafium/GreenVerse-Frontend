import { useState, useEffect } from 'react'
import Sidebar from "../../components/sidebar"
import Chart from "../../components/Chart"
import StatCard from "../../components/StatCard"
import Card from "../../components/Card"
import { Loader2 } from 'lucide-react'
import "../(client)/dashboard.css"
import api from '../../services/api'

export default function Sales() {
  const [stats, setStats] = useState(null)
  const [trendData, setTrendData] = useState([])
  const [topProducts, setTopProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    document.title = 'Sales Management - GreenVerse'
    fetchSalesData()
  }, [])

  const fetchSalesData = async () => {
    try {
      // Fetch all data in parallel
      const [statsRes, trendRes, productsRes, categoriesRes] = await Promise.all([
        api.get('/orders/sales/stats'),
        api.get('/orders/sales/monthly-trend'),
        api.get('/orders/sales/top-products'),
        api.get('/orders/sales/by-category')
      ])

      setStats(statsRes.data.stats)
      setTrendData(trendRes.data.trendData)
      setTopProducts(productsRes.data.topProducts)
      setCategories(categoriesRes.data.categories)
    } catch (error) {
      console.error('Failed to fetch sales data:', error)
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
        <h1 className="mb-6" style={{ fontSize: '2rem', fontWeight: 'bold', color: '#0F5132' }}>Sales Management</h1>

        <div className="stats-grid">
          <StatCard 
            title="Total Sales" 
            value={`PKR ${stats?.totalSales.toLocaleString()}`} 
            change={stats?.salesChange} 
            icon="💵" 
          />
          <StatCard 
            title="Orders This Month" 
            value={stats?.ordersThisMonth.toString()} 
            change={stats?.ordersChange} 
            icon="📊" 
          />
          <StatCard 
            title="Avg Order Value" 
            value={`PKR ${stats?.avgOrderValue.toLocaleString()}`} 
            change={stats?.avgChange} 
            icon="📈" 
          />
          <StatCard 
            title="Conversion Rate" 
            value={stats?.conversionRate} 
            change={stats?.conversionChange} 
            icon="🎯" 
            changeType="negative" 
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <Chart 
            data={trendData} 
            title="Monthly Sales Trend" 
            type="area" 
            dataKeys={["month", "amount"]} 
          />
          <Chart 
            data={topProducts} 
            title="Top Selling Products" 
            type="bar" 
            dataKeys={["name", "sales"]} 
          />
        </div>

        <Card className="mt-6">
          <h2 className="text-xl font-semibold text-[#0F5132] mb-4">Sales by Product Category</h2>
          <div className="space-y-4">
            {categories.map((category) => (
              <div key={category.name}>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold text-stone-700">{category.name}</span>
                  <span className="text-stone-600">{category.percentage}%</span>
                </div>
                <div className="w-full bg-stone-200 rounded-full h-3">
                  <div 
                    className="bg-[#3AA174] h-3 rounded-full transition-all duration-500" 
                    style={{ width: `${category.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </main>
    </div>
  )
}
