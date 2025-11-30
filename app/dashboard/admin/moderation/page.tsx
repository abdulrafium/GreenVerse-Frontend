import { DashboardHeader } from "@/components/layout/dashboard-header"
import { Sidebar } from "@/components/layout/sidebar"
import { Search, Filter } from "lucide-react"

export default function AdminModeration() {
  const reports = [
    {
      id: 1,
      reporter: "Jane Smith",
      subject: "Acme Corp",
      issue: "Suspicious Activity",
      priority: "High",
      date: "2025-01-15",
      action: "Pending",
    },
    {
      id: 2,
      reporter: "Mike Johnson",
      subject: "Tech Solutions",
      issue: "Document Fraud",
      priority: "Critical",
      date: "2025-01-14",
      action: "Under Review",
    },
    {
      id: 3,
      reporter: "Sarah Lee",
      subject: "Green Circle",
      issue: "Service Violation",
      priority: "Medium",
      date: "2025-01-13",
      action: "Resolved",
    },
    {
      id: 4,
      reporter: "Tom Wilson",
      subject: "Recycling Plus",
      issue: "Quality Complaint",
      priority: "Low",
      date: "2025-01-12",
      action: "Pending",
    },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical":
        return "bg-destructive/10 text-destructive"
      case "High":
        return "bg-orange-500/10 text-orange-500"
      case "Medium":
        return "bg-accent/10 text-accent"
      default:
        return "bg-green-500/10 text-green-500"
    }
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar role="admin" />

      <div className="flex-1">
        <DashboardHeader />

        <main className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Moderation & Reports</h1>
            <p className="mt-2 text-muted-foreground">Review and manage user reports and compliance issues</p>
          </div>

          {/* Filters */}
          <div className="mb-6 flex gap-4">
            <div className="relative flex-1 max-w-xs">
              <input
                type="search"
                placeholder="Search reports..."
                className="w-full rounded-lg bg-muted px-4 py-2 pl-10 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            </div>
            <button className="flex items-center gap-2 rounded-lg bg-card border border-border px-4 py-2 text-foreground hover:bg-muted">
              <Filter className="h-4 w-4" />
              Filter
            </button>
          </div>

          {/* Reports Table */}
          <div className="rounded-lg border border-border bg-card overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Reporter</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Subject</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Issue</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Priority</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Date</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Action</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report) => (
                  <tr key={report.id} className="border-b border-border hover:bg-muted/50">
                    <td className="px-6 py-4 text-sm text-foreground">{report.reporter}</td>
                    <td className="px-6 py-4 text-sm text-foreground">{report.subject}</td>
                    <td className="px-6 py-4 text-sm text-foreground">{report.issue}</td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${getPriorityColor(report.priority)}`}
                      >
                        {report.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{report.date}</td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                          report.action === "Resolved"
                            ? "bg-green-500/10 text-green-500"
                            : report.action === "Under Review"
                              ? "bg-accent/10 text-accent"
                              : "bg-orange-500/10 text-orange-500"
                        }`}
                      >
                        {report.action}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-primary hover:underline text-sm">Review</button>
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
