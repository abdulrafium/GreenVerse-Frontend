import { DashboardHeader } from "@/components/layout/dashboard-header"
import { Sidebar } from "@/components/layout/sidebar"
import { Search, Filter } from "lucide-react"

export default function ClusterOrders() {
  const orders = [
    {
      id: "ORD-001",
      producer: "Acme Corp",
      material: "Aluminum",
      quantity: "250 kg",
      pickupDate: "2025-01-16",
      expectedDelivery: "2025-01-17",
      status: "Pending",
    },
    {
      id: "ORD-002",
      producer: "Tech Solutions",
      material: "Electronics",
      quantity: "150 kg",
      pickupDate: "2025-01-15",
      expectedDelivery: "2025-01-18",
      status: "In Transit",
    },
    {
      id: "ORD-003",
      producer: "Green Industries",
      material: "Steel",
      quantity: "500 kg",
      pickupDate: "2025-01-15",
      expectedDelivery: "2025-01-16",
      status: "Received",
    },
    {
      id: "ORD-004",
      producer: "Waste Management Inc",
      material: "Plastic",
      quantity: "180 kg",
      pickupDate: "2025-01-14",
      expectedDelivery: "2025-01-15",
      status: "Processing",
    },
    {
      id: "ORD-005",
      producer: "Recycling Plus",
      material: "Paper",
      quantity: "300 kg",
      pickupDate: "2025-01-13",
      expectedDelivery: "2025-01-14",
      status: "Completed",
    },
  ]

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar role="cluster" />

      <div className="flex-1">
        <DashboardHeader />

        <main className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Orders</h1>
            <p className="mt-2 text-muted-foreground">Manage incoming waste orders and deliveries</p>
          </div>

          {/* Filters */}
          <div className="mb-6 flex gap-4">
            <div className="relative flex-1 max-w-xs">
              <input
                type="search"
                placeholder="Search orders..."
                className="w-full rounded-lg bg-muted px-4 py-2 pl-10 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            </div>
            <button className="flex items-center gap-2 rounded-lg bg-card border border-border px-4 py-2 text-foreground hover:bg-muted">
              <Filter className="h-4 w-4" />
              Filter
            </button>
          </div>

          {/* Orders Table */}
          <div className="rounded-lg border border-border bg-card overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Order ID</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Producer</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Material</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Quantity</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Pickup Date</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Expected Delivery</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b border-border hover:bg-muted/50">
                    <td className="px-6 py-4 text-sm font-medium text-foreground">{order.id}</td>
                    <td className="px-6 py-4 text-sm text-foreground">{order.producer}</td>
                    <td className="px-6 py-4 text-sm text-foreground">{order.material}</td>
                    <td className="px-6 py-4 text-sm text-foreground">{order.quantity}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{order.pickupDate}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{order.expectedDelivery}</td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                          order.status === "Pending"
                            ? "bg-orange-500/10 text-orange-500"
                            : order.status === "In Transit"
                              ? "bg-primary/10 text-primary"
                              : order.status === "Received"
                                ? "bg-accent/10 text-accent"
                                : order.status === "Processing"
                                  ? "bg-secondary/10 text-secondary"
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
        </main>
      </div>
    </div>
  )
}
