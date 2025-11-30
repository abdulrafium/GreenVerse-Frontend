import { useEffect } from "react"
import Sidebar from "../../components/sidebar"
import Button from "../../components/Button"
import Card from "../../components/Card"
import { mockUsers } from "../../lib/mockData"
import "../(client)/dashboard.css"

export default function Users() {
  useEffect(() => {
    document.title = 'Users Management - GreenVerse'
  }, [])

  return (
    <div className="dashboard-layout">
      <Sidebar role="admin" />

      <main className="dashboard-content">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#0F5132' }}>Users Management</h1>
          <Button variant="primary">Add User</Button>
        </div>

        <Card>
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 px-4 text-muted-foreground">Name</th>
                <th className="text-left py-2 px-4 text-muted-foreground">Email</th>
                <th className="text-left py-2 px-4 text-muted-foreground">Role</th>
                <th className="text-left py-2 px-4 text-muted-foreground">Join Date</th>
                <th className="text-left py-2 px-4 text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockUsers.map((user) => (
                <tr key={user.id} className="border-b border-border hover:bg-muted">
                  <td className="py-3 px-4 text-foreground">{user.name}</td>
                  <td className="py-3 px-4 text-foreground">{user.email}</td>
                  <td className="py-3 px-4 text-foreground capitalize">{user.role.replace("_", " ")}</td>
                  <td className="py-3 px-4 text-muted-foreground">{user.joinDate}</td>
                  <td className="py-3 px-4">
                    <span className="px-3 py-1 rounded text-xs font-medium bg-green-900 text-green-200">
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </main>
    </div>
  )
}
