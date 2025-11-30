import { DashboardHeader } from "@/components/layout/dashboard-header"
import { Sidebar } from "@/components/layout/sidebar"
import { BarChart3, TrendingUp, FileText, DollarSign } from "lucide-react"
import Link from "next/link"

export default function ClientDashboard() {
  const stats = [
    { label: "Total Submissions", value: "24", icon: FileText, color: "bg-primary" },
    { label: "Revenue Generated", value: "$2,450", icon: DollarSign, color: "bg-secondary" },
    { label: "Waste Diverted", value: "4.2T", icon: TrendingUp, color: "bg-accent" },
    { label: "Active Orders", value: "3", icon: BarChart3, color: "bg-primary" },
  ]

  const recentSubmissions = [
    { id: 1, material: "Aluminum Cans", quantity: "250 kg", status: "Matched", date: "2025-01-15", revenue: "$125" },
    {
      id: 2,
      material: "Plastic Bottles",
      quantity: "180 kg",
      status: "In Transit",
      date: "2025-01-14",
      revenue: "$45",
    },
    { id: 3, material: "Steel Scraps", quantity: "500 kg", status: "Processing", date: "2025-01-13", revenue: "$200" },
    { id: 4, material: "Paper Waste", quantity: "300 kg", status: "Completed", date: "2025-01-12", revenue: "$30" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Matched":
        return "bg-primary/10 text-primary"
      case "In Transit":
        return "bg-secondary/10 text-secondary"
      case "Processing":
        return "bg-accent/10 text-accent"
      case "Completed":
        return "bg-green-500/10 text-green-500"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar role="client" />

      <div className="flex-1 w-full lg:w-auto">
        <DashboardHeader />

        <main className="p-4 lg:p-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Welcome back, Jane Doe</h1>
            <p className="mt-2 text-muted-foreground">Here's your waste management overview</p>
          </div>

          {/* Stats Grid */}
          <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon
              return (
                <div key={stat.label} className="rounded-lg border border-border bg-card p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="mt-2 text-2xl font-bold text-foreground">{stat.value}</p>
                    </div>
                    <div className={`rounded-lg ${stat.color} p-3`}>
                      <Icon className="h-6 w-6 text-foreground" />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Recent Submissions */}
          <div className="rounded-lg border border-border bg-card">
            <div className="flex items-center justify-between border-b border-border px-4 lg:px-6 py-4">
              <h2 className="text-base lg:text-lg font-semibold text-foreground">Recent Submissions</h2>
              <Link href="/dashboard/client/submissions" className="text-xs lg:text-sm text-primary hover:underline">
                View All
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-semibold text-muted-foreground">Material</th>
                    <th className="px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-semibold text-muted-foreground">Quantity</th>
                    <th className="px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-semibold text-muted-foreground">Status</th>
                    <th className="px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-semibold text-muted-foreground">Date</th>
                    <th className="px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-semibold text-muted-foreground">Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {recentSubmissions.map((submission) => (
                    <tr key={submission.id} className="border-b border-border hover:bg-muted/50">
                      <td className="px-4 lg:px-6 py-4 text-xs lg:text-sm text-foreground">{submission.material}</td>
                      <td className="px-4 lg:px-6 py-4 text-xs lg:text-sm text-foreground">{submission.quantity}</td>
                      <td className="px-4 lg:px-6 py-4 text-xs lg:text-sm">
                        <span
                          className={`inline-block rounded-full px-2 lg:px-3 py-1 text-xs font-medium ${getStatusColor(submission.status)}`}
                        >
                          {submission.status}
                        </span>
                      </td>
                      <td className="px-4 lg:px-6 py-4 text-xs lg:text-sm text-muted-foreground">{submission.date}</td>
                      <td className="px-4 lg:px-6 py-4 text-xs lg:text-sm font-medium text-foreground">{submission.revenue}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <Link
              href="/dashboard/client/submissions/new"
              className="rounded-lg border border-border bg-card p-6 hover:bg-muted transition"
            >
              <h3 className="text-lg font-semibold text-foreground mb-2">Submit New Waste</h3>
              <p className="text-sm text-muted-foreground">
                Create a new waste submission and get matched with recovery clusters
              </p>
            </Link>
            <Link
              href="/dashboard/client/profile"
              className="rounded-lg border border-border bg-card p-6 hover:bg-muted transition"
            >
              <h3 className="text-lg font-semibold text-foreground mb-2">View Profile</h3>
              <p className="text-sm text-muted-foreground">Update your company information and preferences</p>
            </Link>
          </div>
        </main>
      </div>
    </div>
  )
}
