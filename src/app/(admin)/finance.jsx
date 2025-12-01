import { useState, useEffect } from 'react'
import Sidebar from "../../components/sidebar"
import Chart from "../../components/Chart"
import StatCard from "../../components/StatCard"
import Card from "../../components/Card"
import { Loader2 } from 'lucide-react'
import "../(client)/dashboard.css"
import api from '../../services/api'

export default function Finance() {
  const [stats, setStats] = useState(null)
  const [trendData, setTrendData] = useState([])
  const [expenseData, setExpenseData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    document.title = 'Finance Management - GreenVerse'
    fetchFinanceData()
  }, [])

  const fetchFinanceData = async () => {
    try {
      setLoading(true)

      const [statsRes, trendRes, expensesRes] = await Promise.all([
        api.get('/finance/stats'),
        api.get('/finance/revenue-trend'),
        api.get('/finance/expenses')
      ])

      setStats(statsRes.data.stats)
      setTrendData(trendRes.data.trendData)
      setExpenseData(expensesRes.data.expenses)
    } catch (error) {
      console.error('Failed to fetch finance data:', error)
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
        <h1 className="mb-6" style={{ fontSize: '2rem', fontWeight: 'bold', color: '#0F5132' }}>Finance Management</h1>

        <div className="stats-grid">
          <StatCard 
            title="Total Revenue" 
            value={`PKR ${(stats?.totalRevenue || 0).toLocaleString()}`} 
            change={stats?.revenueChange || '+PKR 0'} 
            icon="💰" 
          />
          <StatCard 
            title="Expenses" 
            value={`PKR ${(stats?.totalExpenses || 0).toLocaleString()}`} 
            change={stats?.expensesChange || '+PKR 0'} 
            icon="📊" 
          />
          <StatCard 
            title="Net Profit" 
            value={`PKR ${(stats?.netProfit || 0).toLocaleString()}`} 
            change={stats?.profitChange || '+PKR 0'} 
            icon="📈" 
          />
          <StatCard 
            title="Profit Margin" 
            value={`${stats?.profitMargin || '0.0'}%`} 
            change={stats?.profitMarginChange || '+0%'} 
            icon="📉" 
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <Chart 
            data={trendData} 
            title="Revenue Trend" 
            type="area" 
            dataKeys={["month", "amount"]} 
          />
          <Chart 
            data={expenseData} 
            title="Expense Breakdown" 
            type="bar" 
            dataKeys={["category", "amount"]} 
          />
        </div>

        <Card className="mt-6" style={{ backgroundColor: 'white' }}>
          <h2 className="text-xl font-semibold text-[#0F5132] mb-4">Financial Summary</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 rounded-xl">
              <p className="text-sm text-stone-600 mb-1">Cash Flow</p>
              <p className="text-2xl font-bold text-green-600">+PKR {(stats?.cashFlow || 0).toLocaleString()}</p>
              <p className="text-xs text-green-600 mt-1">Positive trend</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-xl">
              <p className="text-sm text-stone-600 mb-1">Accounts Receivable</p>
              <p className="text-2xl font-bold text-blue-600">PKR {(stats?.accountsReceivable || 0).toLocaleString()}</p>
              <p className="text-xs text-blue-600 mt-1">{stats?.pendingCount || 0} pending</p>
            </div>
            <div className="p-4 bg-amber-50 rounded-xl">
              <p className="text-sm text-stone-600 mb-1">Accounts Payable</p>
              <p className="text-2xl font-bold text-amber-600">PKR {(stats?.accountsPayable || 0).toLocaleString()}</p>
              <p className="text-xs text-amber-600 mt-1">Due in 30 days</p>
            </div>
          </div>
        </Card>
      </main>
    </div>
  )
}
