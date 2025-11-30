import { DashboardHeader } from "@/components/layout/dashboard-header"
import { Sidebar } from "@/components/layout/sidebar"
import { Search, Filter, MoreVertical } from "lucide-react"

export default function AdminClusters() {
  const clusters = [
    {
      id: 1,
      name: "Tech Recyclers Co",
      location: "San Francisco, CA",
      materials: "Electronics, Metals",
      status: "Active",
      capacity: "85%",
    },
    {
      id: 2,
      name: "Green Circle",
      location: "New York, NY",
      materials: "Plastics, Paper",
      status: "Active",
      capacity: "60%",
    },
    {
      id: 3,
      name: "EcoMelt Industries",
      location: "Chicago, IL",
      materials: "Metals, Steel",
      status: "Active",
      capacity: "72%",
    },
    {
      id: 4,
      name: "Paperworks Recycling",
      location: "Boston, MA",
      materials: "Paper, Cardboard",
      status: "Inactive",
      capacity: "20%",
    },
    {
      id: 5,
      name: "Plastic Revival",
      location: "Los Angeles, CA",
      materials: "Plastics",
      status: "Active",
      capacity: "95%",
    },
  ]

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar role="admin" />

      <div className="flex-1">
        <DashboardHeader />

        <main className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Recovery Clusters</h1>
            <p className="mt-2 text-muted-foreground">Manage recovery cluster network and operations</p>
          </div>

          {/* Filters */}
          <div className="mb-6 flex gap-4">
            <div className="relative flex-1 max-w-xs">
              <input
                type="search"
                placeholder="Search clusters..."
                className="w-full rounded-lg bg-muted px-4 py-2 pl-10 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            </div>
            <button className="flex items-center gap-2 rounded-lg bg-card border border-border px-4 py-2 text-foreground hover:bg-muted">
              <Filter className="h-4 w-4" />
              Filter
            </button>
          </div>

          {/* Clusters Table */}
          <div className="rounded-lg border border-border bg-card overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Cluster Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Location</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Materials</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Capacity</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Action</th>
                </tr>
              </thead>
              <tbody>
                {clusters.map((cluster) => (
                  <tr key={cluster.id} className="border-b border-border hover:bg-muted/50">
                    <td className="px-6 py-4 text-sm font-medium text-foreground">{cluster.name}</td>
                    <td className="px-6 py-4 text-sm text-foreground">{cluster.location}</td>
                    <td className="px-6 py-4 text-sm text-foreground">{cluster.materials}</td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                          cluster.status === "Active"
                            ? "bg-green-500/10 text-green-500"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {cluster.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="h-2 flex-1 rounded-full bg-muted">
                          <div className="h-full rounded-full bg-primary" style={{ width: cluster.capacity }}></div>
                        </div>
                        <span className="text-xs text-muted-foreground">{cluster.capacity}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-muted-foreground hover:text-foreground">
                        <MoreVertical className="h-4 w-4" />
                      </button>
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
