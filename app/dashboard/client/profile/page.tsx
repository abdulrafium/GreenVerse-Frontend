import { DashboardHeader } from "@/components/layout/dashboard-header"
import { Sidebar } from "@/components/layout/sidebar"
import { Save } from "lucide-react"

export default function ClientProfile() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar role="client" />

      <div className="flex-1">
        <DashboardHeader />

        <main className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Profile Settings</h1>
            <p className="mt-2 text-muted-foreground">Manage your account and company information</p>
          </div>

          <div className="max-w-2xl">
            {/* Profile Info */}
            <div className="rounded-lg border border-border bg-card p-6 mb-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Profile Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Full Name</label>
                  <input
                    type="text"
                    defaultValue="Jane Doe"
                    className="w-full rounded-lg bg-muted px-4 py-2 border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Email Address</label>
                  <input
                    type="email"
                    defaultValue="jane@example.com"
                    className="w-full rounded-lg bg-muted px-4 py-2 border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Phone Number</label>
                  <input
                    type="tel"
                    defaultValue="+1 (555) 000-0000"
                    className="w-full rounded-lg bg-muted px-4 py-2 border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
            </div>

            {/* Company Info */}
            <div className="rounded-lg border border-border bg-card p-6 mb-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Company Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Company Name</label>
                  <input
                    type="text"
                    defaultValue="Tech Manufacturing Inc."
                    className="w-full rounded-lg bg-muted px-4 py-2 border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Industry</label>
                    <select className="w-full rounded-lg bg-muted px-4 py-2 border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                      <option>Manufacturing</option>
                      <option>Retail</option>
                      <option>Construction</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Waste Type</label>
                    <select className="w-full rounded-lg bg-muted px-4 py-2 border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                      <option>Mixed Metals</option>
                      <option>Plastics</option>
                      <option>Electronics</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Company Address</label>
                  <input
                    type="text"
                    defaultValue="123 Industrial Ave, Tech City, CA 94000"
                    className="w-full rounded-lg bg-muted px-4 py-2 border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
            </div>

            {/* Preferences */}
            <div className="rounded-lg border border-border bg-card p-6 mb-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Preferences</h2>
              <div className="space-y-3">
                <label className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked className="rounded border border-border" />
                  <span className="text-foreground">Receive email notifications</span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked className="rounded border border-border" />
                  <span className="text-foreground">Weekly reports on submissions</span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" className="rounded border border-border" />
                  <span className="text-foreground">Marketing emails</span>
                </label>
              </div>
            </div>

            {/* Save Button */}
            <button className="flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground hover:opacity-90">
              <Save className="h-4 w-4" />
              Save Changes
            </button>
          </div>
        </main>
      </div>
    </div>
  )
}
