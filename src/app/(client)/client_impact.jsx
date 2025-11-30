import { useState, useEffect } from "react"
import Sidebar from "../../components/sidebar"
import StatCard from "../../components/StatCard"
import Chart from "../../components/Chart"
import Card from "../../components/Card"
import { ordersAPI } from "../../services/api"
import { Loader2 } from "lucide-react"
import "../(client)/dashboard.css"

export default function ClientImpact() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [impactData, setImpactData] = useState({
    co2Reduced: 0,
    landfillDiverted: 0,
    waterSaved: 0,
    treesSaved: 0,
    farmersSupported: 0,
    fiberUsed: 0,
    ruralIncome: 0,
    plasticSaved: 0,
    energySaved: 0,
    fossilFuelSaved: 0
  })

  useEffect(() => {
    document.title = 'Environmental Impact - GreenVerse'
    fetchImpactData()
  }, [])

  const fetchImpactData = async () => {
    try {
      setLoading(true)
      const response = await ordersAPI.getAll()
      const allOrders = response.data.orders || []
      
      // Only count delivered orders for impact
      const deliveredOrders = allOrders.filter(o => o.status === 'Delivered')
      setOrders(deliveredOrders)
      
      // Calculate total quantity from delivered orders
      const totalQuantity = deliveredOrders.reduce((sum, order) => sum + parseInt(order.quantity || 0), 0)
      const totalRevenue = deliveredOrders.reduce((sum, order) => sum + parseFloat(order.amount || 0), 0)
      
      // Calculate impact metrics based on delivered orders
      // Assumptions: Each unit saves approximately:
      // - 2kg plastic, 0.007 tons CO2, 30L water, 10 kWh energy
      const plasticPerUnit = 2 // kg
      const co2PerUnit = 0.007 // tons
      const waterPerUnit = 30 // liters
      const energyPerUnit = 10 // kWh
      const fuelPerUnit = 1.7 // liters
      const fiberPerUnit = 0.25 // kg banana fiber
      
      setImpactData({
        co2Reduced: (totalQuantity * co2PerUnit).toFixed(1),
        landfillDiverted: (totalQuantity * plasticPerUnit).toFixed(0),
        waterSaved: (totalQuantity * waterPerUnit).toFixed(0),
        treesSaved: Math.floor(totalQuantity * co2PerUnit * 15), // ~15 trees per ton CO2
        farmersSupported: Math.floor(totalRevenue / 5000) || 1, // Estimated families
        fiberUsed: (totalQuantity * fiberPerUnit).toFixed(0),
        ruralIncome: totalRevenue.toFixed(0),
        plasticSaved: (totalQuantity * plasticPerUnit).toFixed(0),
        energySaved: (totalQuantity * energyPerUnit).toFixed(0),
        fossilFuelSaved: (totalQuantity * fuelPerUnit).toFixed(0),
        carbonOffset: (totalQuantity * co2PerUnit).toFixed(1),
        carKm: (totalQuantity * co2PerUnit * 1200).toFixed(0), // ~1200 km per ton CO2
        householdMonths: Math.floor(totalQuantity * energyPerUnit / 750) // ~750 kWh per month
      })
    } catch (error) {
      console.error('Error fetching impact data:', error)
    } finally {
      setLoading(false)
    }
  }

  // Generate monthly trend based on order history
  const generateTrendData = () => {
    if (orders.length === 0) return []
    
    const monthlyData = {}
    orders.forEach(order => {
      const date = new Date(order.created_at)
      const monthKey = date.toLocaleString('default', { month: 'short' })
      
      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = { month: monthKey, waste: 0, co2: 0 }
      }
      
      const quantity = parseInt(order.quantity || 0)
      monthlyData[monthKey].waste += quantity * 2 // 2kg per unit
      monthlyData[monthKey].co2 += quantity * 0.007 // 0.007 tons per unit
    })
    
    return Object.values(monthlyData)
  }

  // Generate product breakdown
  const generateProductBreakdown = () => {
    if (orders.length === 0) return []
    
    const productData = {}
    orders.forEach(order => {
      const productName = order.product?.name || 'Unknown'
      
      if (!productData[productName]) {
        productData[productName] = { material: productName, units: 0 }
      }
      
      productData[productName].units += parseInt(order.quantity || 0)
    })
    
    return Object.values(productData)
  }

  const wasteReductionTrend = generateTrendData()
  const materialBreakdown = generateProductBreakdown()
  return (
    <div className="dashboard-layout">
      <Sidebar role="client" />

      <main className="dashboard-content" style={{ backgroundColor: '#FDFBF7' }}>
        <div className="mb-6">
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#0F5132', marginBottom: '0.5rem' }}>Your Environmental Impact</h1>
          <p className="text-gray-600">Track the positive environmental changes from your orders</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-12 h-12 animate-spin text-[#3AA174]" />
          </div>
        ) : orders.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-gray-500 text-lg">No delivered orders yet. Your impact will appear here once orders are delivered!</p>
          </Card>
        ) : (
          <>
            <div className="grid md:grid-cols-4 gap-4 mb-6">
              <StatCard title="CO2 Reduced" value={`${impactData.co2Reduced} tons`} change="From delivered orders" icon="🌍" />
              <StatCard title="Landfill Diverted" value={`${impactData.landfillDiverted}kg`} change="Plastic equivalent" icon="🌱" />
              <StatCard title="Water Saved" value={`${impactData.waterSaved}L`} change="From production" icon="💧" />
              <StatCard title="Trees Saved" value={impactData.treesSaved} change="CO2 equivalent" icon="🌲" />
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {wasteReductionTrend.length > 0 && (
                <Chart 
                  data={wasteReductionTrend} 
                  title="Waste Reduction & CO2 Savings Over Time" 
                  type="line"
                  dataKeys={['waste', 'co2']}
                  xKey="month"
                />
              )}
              {materialBreakdown.length > 0 && (
                <Chart 
                  data={materialBreakdown} 
                  title="Products Ordered by Type" 
                  type="bar"
                  dataKeys={['units']}
                  xKey="material"
                />
              )}
            </div>

            {/* Impact Breakdown */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <Card className="p-6" style={{ backgroundColor: 'white' }}>
                <h2 className="text-xl font-bold mb-4">🌾 Agricultural Impact</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b">
                    <span className="text-gray-700">Farmers Supported</span>
                    <span className="font-bold text-primary">{impactData.farmersSupported} families</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b">
                    <span className="text-gray-700">Banana Fiber Used</span>
                    <span className="font-bold text-primary">{impactData.fiberUsed} kg</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b">
                    <span className="text-gray-700">Rural Income Generated</span>
                    <span className="font-bold text-primary">PKR {parseFloat(impactData.ruralIncome).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Waste Converted to Value</span>
                    <span className="font-bold text-primary">100%</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6" style={{ backgroundColor: 'white' }}>
                <h2 className="text-xl font-bold mb-4">♻️ Environmental Savings</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b">
                    <span className="text-gray-700">Plastic Equivalent Saved</span>
                    <span className="font-bold text-primary">{impactData.plasticSaved} kg</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b">
                    <span className="text-gray-700">Energy Saved</span>
                    <span className="font-bold text-primary">{impactData.energySaved} kWh</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b">
                    <span className="text-gray-700">Fossil Fuel Saved</span>
                    <span className="font-bold text-primary">{impactData.fossilFuelSaved} liters</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Carbon Offset</span>
                    <span className="font-bold text-primary">{impactData.carbonOffset} tons CO2</span>
                  </div>
                </div>
              </Card>
            </div>

            {/* Comparison Card */}
            <Card className="p-6" style={{ backgroundColor: 'white' }}>
              <h2 className="text-xl font-bold mb-4">📊 Your Impact in Context</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-3xl mb-2">🚗</div>
                  <div className="text-2xl font-bold text-primary mb-1">{impactData.carKm} km</div>
                  <div className="text-sm text-gray-600">Equivalent to taking a car off the road</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-3xl mb-2">🏠</div>
                  <div className="text-2xl font-bold text-primary mb-1">{impactData.householdMonths} months</div>
                  <div className="text-sm text-gray-600">Energy for an average household</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-3xl mb-2">🌳</div>
                  <div className="text-2xl font-bold text-primary mb-1">{impactData.treesSaved} trees</div>
                  <div className="text-sm text-gray-600">Equivalent trees planted and grown for 10 years</div>
                </div>
              </div>
            </Card>
          </>
        )}
      </main>
    </div>
  )
}
