import { DashboardHeader } from "@/components/layout/dashboard-header"
import { Sidebar } from "@/components/layout/sidebar"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts"

export default function ClusterAnalytics() {
  const processingData = [
    { month: "Jan", processed: 1200, recycled: 980 },
    { month: "Feb", processed: 1900, recycled: 1500 },
    { month: "Mar", processed: 2200, recycled: 1800 },
    { month: "Apr", processed: 2800, recycled: 2400 },
    { month: "May", processed: 3200, recycled: 2900 },
    { month: "Jun", processed: 3800, recycled: 3400 },
  ]

  const revenueData = [
    { month: "Jan", revenue: 5200 },
    { month: "Feb", revenue: 8400 },
    { month: "Mar", revenue: 9800 },
    { month: "Apr", revenue: 12500 },
    { month: "May", revenue: 14200 },
    { month: "Jun", revenue: 16800 },
  ]

  const efficiencyData = [
    { week: "Week 1", efficiency: 75 },
    { week: "Week 2", efficiency: 78 },
    { week: "Week 3", efficiency: 82 },
    { week: "Week 4", efficiency: 85 },
  ]

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar role="cluster" />

      <div className="flex-1">
        <DashboardHeader />

        <main className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
            <p className="mt-2 text-muted-foreground">Processing performance and revenue analytics</p>
          </div>

          {/* Charts Grid */}
          <div className="grid gap-8">
            <div className="rounded-lg border border-border bg-card p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Material Processing Trend</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={processingData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="month" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="processed" fill="#06b6d4" name="Total Processed (kg)" />
                  <Bar dataKey="recycled" fill="#0d9488" name="Successfully Recycled (kg)" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="rounded-lg border border-border bg-card p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Revenue Generation</h2>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="month" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    fill="#06b6d4"
                    stroke="#0d9488"
                    fillOpacity={0.6}
                    name="Revenue ($)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="rounded-lg border border-border bg-card p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Processing Efficiency</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={efficiencyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="week" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="efficiency"
                    stroke="#06b6d4"
                    strokeWidth={2}
                    dot={{ fill: "#06b6d4" }}
                    name="Efficiency (%)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Key Metrics */}
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-lg border border-border bg-card p-6 text-center">
                <p className="text-sm text-muted-foreground">Total Processed</p>
                <p className="mt-2 text-3xl font-bold text-foreground">18.4 T</p>
                <p className="mt-2 text-xs text-green-500">↑ 12% from last month</p>
              </div>
              <div className="rounded-lg border border-border bg-card p-6 text-center">
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="mt-2 text-3xl font-bold text-foreground">$67,200</p>
                <p className="mt-2 text-xs text-green-500">↑ 18% from last month</p>
              </div>
              <div className="rounded-lg border border-border bg-card p-6 text-center">
                <p className="text-sm text-muted-foreground">Efficiency Rate</p>
                <p className="mt-2 text-3xl font-bold text-foreground">85%</p>
                <p className="mt-2 text-xs text-green-500">↑ 4% from last week</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
