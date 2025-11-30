import { DashboardHeader } from "@/components/layout/dashboard-header"
import { Sidebar } from "@/components/layout/sidebar"
import { Package, TrendingUp, Clock, CheckCircle } from "lucide-react"
import Link from "next/link"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar role="cluster" />

      <div className="flex-1 w-full lg:w-auto">
        <DashboardHeader />

        <main className="p-4 lg:p-8">
      price: "$450",
      status: "In Progress",
    },
    {
      id: 3,
      producer: "Green Industries",
      material: "Steel",
      quantity: "500 kg",
      price: "$200",
      status: "Ready for Pickup",
    },
  ]

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar role="cluster" />

      <div className="flex-1 w-full lg:w-auto">
        <DashboardHeader />

        <main className="p-4 lg:p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Tech Recyclers Co - Dashboard</h1>
            <p className="mt-2 text-muted-foreground">Operations overview and order management</p>
          </div>

          {/* Stats Grid */}
          <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon
              return (
                <div key={stat.label} className="rounded-lg border border-border bg-card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <div className={`rounded-lg ${stat.color} p-2`}>
                      <Icon className="h-5 w-5 text-foreground" />
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                </div>
              )
            })}
          </div>

          {/* Charts */}
          <div className="grid gap-6 lg:gap-8 mb-8 grid-cols-1 lg:grid-cols-2">
            <div className="rounded-lg border border-border bg-card p-4 lg:p-6">
              <h2 className="text-base lg:text-lg font-semibold text-foreground mb-4">Order Trend</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={orderTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="week" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="orders" fill="#06b6d4" name="Total Orders" />
                  <Bar dataKey="completed" fill="#0d9488" name="Completed" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="rounded-lg border border-border bg-card p-4 lg:p-6">
              <h2 className="text-base lg:text-lg font-semibold text-foreground mb-4">Material Mix</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={materialMix}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {materialMix.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="rounded-lg border border-border bg-card">
            <div className="flex items-center justify-between border-b border-border px-4 lg:px-6 py-4">
              <h2 className="text-base lg:text-lg font-semibold text-foreground">Recent Orders</h2>
              <Link href="/dashboard/cluster/orders" className="text-xs lg:text-sm text-primary hover:underline">
                View All
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-semibold text-muted-foreground">Producer</th>
                    <th className="px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-semibold text-muted-foreground">Material</th>
                    <th className="px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-semibold text-muted-foreground">Quantity</th>
                    <th className="px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-semibold text-muted-foreground">Price</th>
                    <th className="px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-semibold text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-b border-border hover:bg-muted/50">
                      <td className="px-4 lg:px-6 py-4 text-xs lg:text-sm text-foreground">{order.producer}</td>
                      <td className="px-4 lg:px-6 py-4 text-xs lg:text-sm text-foreground">{order.material}</td>
                      <td className="px-4 lg:px-6 py-4 text-xs lg:text-sm text-foreground">{order.quantity}</td>
                      <td className="px-4 lg:px-6 py-4 text-xs lg:text-sm font-medium text-foreground">{order.price}</td>
                      <td className="px-4 lg:px-6 py-4 text-xs lg:text-sm">
                        <span
                          className={`inline-block rounded-full px-2 lg:px-3 py-1 text-xs font-medium ${
                            order.status === "Pending"
                              ? "bg-orange-500/10 text-orange-500"
                              : order.status === "In Progress"
                                ? "bg-primary/10 text-primary"
                                : "bg-green-500/10 text-green-500"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
