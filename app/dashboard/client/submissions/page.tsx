import { DashboardHeader } from "@/components/layout/dashboard-header"
import { Sidebar } from "@/components/layout/sidebar"
import { Search, Filter, Plus } from "lucide-react"
import Link from "next/link"

export default function ClientSubmissions() {
  const submissions = [
    {
      id: 1,
      material: "Aluminum Cans",
      quantity: "250 kg",
      status: "Matched",
      cluster: "Tech Recyclers Co",
      date: "2025-01-15",
      revenue: "$125",
    },
    {
      id: 2,
      material: "Plastic Bottles",
      quantity: "180 kg",
      status: "In Transit",
      cluster: "Green Circle",
      date: "2025-01-14",
      revenue: "$45",
    },
    {
      id: 3,
      material: "Steel Scraps",
      quantity: "500 kg",
      status: "Processing",
      cluster: "EcoMelt Industries",
      date: "2025-01-13",
      revenue: "$200",
    },
    {
      id: 4,
      material: "Paper Waste",
      quantity: "300 kg",
      status: "Completed",
      cluster: "Paperworks Recycling",
      date: "2025-01-12",
      revenue: "$30",
    },
    {
      id: 5,
      material: "Electronic Waste",
      quantity: "100 kg",
      status: "Pending",
      cluster: "Awaiting Match",
      date: "2025-01-11",
      revenue: "$180",
    },
  ]

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar role="client" />

      <div className="flex-1">
        <DashboardHeader />

        <main className="p-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">My Submissions</h1>
              <p className="mt-2 text-muted-foreground">Manage your waste submissions and track their status</p>
            </div>
            <Link
              href="/dashboard/client/submissions/new"
              className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground hover:opacity-90"
            >
              <Plus className="h-4 w-4" />
              New Submission
            </Link>
          </div>

          {/* Filters */}
          <div className="mb-6 flex gap-4">
            <div className="relative flex-1 max-w-xs">
              <input
                type="search"
                placeholder="Search submissions..."
                className="w-full rounded-lg bg-muted px-4 py-2 pl-10 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            </div>
            <button className="flex items-center gap-2 rounded-lg bg-card border border-border px-4 py-2 text-foreground hover:bg-muted">
              <Filter className="h-4 w-4" />
              Filter
            </button>
          </div>

          {/* Submissions Table */}
          <div className="rounded-lg border border-border bg-card overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Material</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Quantity</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Recovery Cluster</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Date</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Revenue</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Action</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((submission) => (
                  <tr key={submission.id} className="border-b border-border hover:bg-muted/50">
                    <td className="px-6 py-4 text-sm text-foreground">{submission.material}</td>
                    <td className="px-6 py-4 text-sm text-foreground">{submission.quantity}</td>
                    <td className="px-6 py-4 text-sm text-foreground">{submission.cluster}</td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                          submission.status === "Completed"
                            ? "bg-green-500/10 text-green-500"
                            : submission.status === "Processing"
                              ? "bg-accent/10 text-accent"
                              : submission.status === "In Transit"
                                ? "bg-secondary/10 text-secondary"
                                : submission.status === "Matched"
                                  ? "bg-primary/10 text-primary"
                                  : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {submission.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{submission.date}</td>
                    <td className="px-6 py-4 text-sm font-medium text-foreground">{submission.revenue}</td>
                    <td className="px-6 py-4 text-sm">
                      <button className="text-primary hover:underline">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  )
}
