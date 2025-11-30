import { useEffect } from "react"
import Sidebar from "../../components/sidebar"
import Button from "../../components/Button"
import Card from "../../components/Card"
import "../(client)/dashboard.css"

export default function Maintenance() {
  useEffect(() => {
    document.title = 'Maintenance - GreenVerse'
  }, [])

  return (
    <div className="dashboard-layout">
      <Sidebar role="cluster" />

      <main className="dashboard-content">
        <div className="dashboard-header">
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#0F5132' }}>Maintenance</h1>
          <Button variant="primary">Schedule Maintenance</Button>
        </div>

        <Card>
          <div className="p-8 text-center">
            <p className="text-muted-foreground">Maintenance schedule coming soon</p>
          </div>
        </Card>
      </main>
    </div>
  )
}
