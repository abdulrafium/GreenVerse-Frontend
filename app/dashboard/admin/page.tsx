import { DashboardHeader } from "@/components/layout/dashboard-header"
import { Sidebar } from "@/components/layout/sidebar"
import { Users, Building2, FileText, AlertCircle } from "lucide-react"
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
  LineChart,
  Line,
} from "recharts"

export default function AdminDashboard() {
  const stats = [
    { label: "Total Users", value: "2,345", icon: Users, change: "+12%" },
    { label: "Active Clusters", value: "512", icon: Building2, change: "+8%" },
    { label: "Total Submissions", value: "8,932", icon: FileText, change: "+23%" },
    { label: "Pending Review", value: "28", icon: AlertCircle, change: "-5%" },
  ]

  const chartData = [
    { month: "Jan", submissions: 400, completed: 240 },
    { month: "Feb", submissions: 520, completed: 350 },
    { month: "Mar", submissions: 680, completed: 520 },
    { month: "Apr", submissions: 750, completed: 620 },
    { month: "May", submissions: 890, completed: 750 },
    { month: "Jun", submissions: 1050, completed: 920 },
  ]

  const recentReports = [
    { id: 1, user: "Acme Corp", issue: "Suspicious Activity", status: "Pending", date: "2025-01-15" },
    { id: 2, user: "Tech Solutions", issue: "Document Fraud", status: "Under Review", date: "2025-01-14" },
    { id: 3, user: "Green Circle", issue: "Service Violation", status: "Resolved", date: "2025-01-13" },
  ]

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar role="admin" />

      <div className="flex-1 w-full lg:w-auto">
        <DashboardHeader />

        <main className="p-4 lg:p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="mt-2 text-muted-foreground">System overview and management</p>
          </div>

          {/* Stats Grid */}
          <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon
              return (
                <div key={stat.label} className="rounded-lg border border-border bg-card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <div className="rounded-lg bg-primary/10 p-2">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="mt-2 text-xs text-green-500">{stat.change} from last month</p>
                </div>
              )
            })}
          </div>

          {/* Charts */}
          <div className="grid gap-6 lg:gap-8 mb-8 grid-cols-1 lg:grid-cols-2">
            <div className="rounded-lg border border-border bg-card p-4 lg:p-6">
              <h2 className="text-base lg:text-lg font-semibold text-foreground mb-4">Submissions Trend</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="month" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="submissions" fill="#06b6d4" name="Total Submissions" />
                  <Bar dataKey="completed" fill="#0d9488" name="Completed" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="rounded-lg border border-border bg-card p-4 lg:p-6">
              <h2 className="text-base lg:text-lg font-semibold text-foreground mb-4">Revenue Growth</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="month" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip />
                  <Line type="monotone" dataKey="completed" stroke="#06b6d4" name="Revenue" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Reports */}
          <div className="rounded-lg border border-border bg-card">
            <div className="flex items-center justify-between border-b border-border px-4 lg:px-6 py-4">
              <h2 className="text-base lg:text-lg font-semibold text-foreground">Recent Reports</h2>
              <Link href="/dashboard/admin/moderation" className="text-xs lg:text-sm text-primary hover:underline">
                View All
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-semibold text-muted-foreground">User/Cluster</th>
                    <th className="px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-semibold text-muted-foreground">Issue</th>
                    <th className="px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-semibold text-muted-foreground">Status</th>
                    <th className="px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-semibold text-muted-foreground">Date</th>
                    <th className="px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-semibold text-muted-foreground">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentReports.map((report) => (
                    <tr key={report.id} className="border-b border-border hover:bg-muted/50">
                      <td className="px-4 lg:px-6 py-4 text-xs lg:text-sm text-foreground">{report.user}</td>
                      <td className="px-4 lg:px-6 py-4 text-xs lg:text-sm text-foreground">{report.issue}</td>
                      <td className="px-4 lg:px-6 py-4 text-xs lg:text-sm">
                        <span
                          className={`inline-block rounded-full px-2 lg:px-3 py-1 text-xs font-medium ${
                            report.status === "Resolved"
                              ? "bg-green-500/10 text-green-500"
                              : report.status === "Pending"
                                ? "bg-destructive/10 text-destructive"
                                : "bg-accent/10 text-accent"
                          }`}
                        >
                          {report.status}
                        </span>
                      </td>
                      <td className="px-4 lg:px-6 py-4 text-xs lg:text-sm text-muted-foreground">{report.date}</td>
                      <td className="px-4 lg:px-6 py-4 text-xs lg:text-sm">
                        <button className="text-primary hover:underline">Review</button>
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
