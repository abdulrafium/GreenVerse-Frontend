import { DashboardHeader } from "@/components/layout/dashboard-header"
import { Sidebar } from "@/components/layout/sidebar"
import { Search, Filter, MoreVertical } from "lucide-react"

export default function AdminUsers() {
  const users = [
    { id: 1, name: "John Smith", email: "john@acme.com", company: "Acme Corp", status: "Active", joined: "2024-12-15" },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah@techsol.com",
      company: "Tech Solutions",
      status: "Active",
      joined: "2024-11-20",
    },
    {
      id: 3,
      name: "Mike Davis",
      email: "mike@recycling.com",
      company: "Recycling Plus",
      status: "Suspended",
      joined: "2024-10-10",
    },
    {
      id: 4,
      name: "Emily Chen",
      email: "emily@waste.com",
      company: "Waste Management Inc",
      status: "Active",
      joined: "2024-09-05",
    },
    {
      id: 5,
      name: "David Wilson",
      email: "david@green.com",
      company: "Green Solutions",
      status: "Active",
      joined: "2024-08-12",
    },
  ]

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar role="admin" />

      <div className="flex-1">
        <DashboardHeader />

        <main className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">User Management</h1>
            <p className="mt-2 text-muted-foreground">Manage platform users and their permissions</p>
          </div>

          {/* Filters */}
          <div className="mb-6 flex gap-4">
            <div className="relative flex-1 max-w-xs">
              <input
                type="search"
                placeholder="Search users..."
                className="w-full rounded-lg bg-muted px-4 py-2 pl-10 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            </div>
            <button className="flex items-center gap-2 rounded-lg bg-card border border-border px-4 py-2 text-foreground hover:bg-muted">
              <Filter className="h-4 w-4" />
              Filter
            </button>
          </div>

          {/* Users Table */}
          <div className="rounded-lg border border-border bg-card overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Company</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Joined</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-border hover:bg-muted/50">
                    <td className="px-6 py-4 text-sm text-foreground">{user.name}</td>
                    <td className="px-6 py-4 text-sm text-foreground">{user.email}</td>
                    <td className="px-6 py-4 text-sm text-foreground">{user.company}</td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                          user.status === "Active"
                            ? "bg-green-500/10 text-green-500"
                            : "bg-destructive/10 text-destructive"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{user.joined}</td>
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
