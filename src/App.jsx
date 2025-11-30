"use client"

import { Routes, Route, Navigate } from "react-router-dom"
import { useState } from "react"

// Public pages
import Home from "./app/(public)/home"
import About from "./app/(public)/about"
import Products from "./app/(public)/products"
import Impact from "./app/(public)/impact"
import Process from "./app/(public)/process"
import Partners from "./app/(public)/partners"
import Contact from "./app/(public)/contact"

// Auth pages
import Login from "./app/(auth)/login"
import Register from "./app/(auth)/register"

// Client pages
import ClientDashboard from "./app/(client)/client_dashboard"
import ClientOrders from "./app/(client)/client_orders"
import ClientInvoices from "./app/(client)/client_invoices"
import ClientImpact from "./app/(client)/client_impact"
import PlaceOrder from "./app/(client)/place_order"
import Profile from "./app/(client)/profile"

// Admin pages
import AdminDashboard from "./app/(admin)/admin_dashboard"
import AdminTest from "./app/(admin)/admin_test"
import AdminOrders from "./app/(admin)/admin_orders"
import AdminInventory from "./app/(admin)/admin_inventory"
import AdminClusters from "./app/(admin)/admin_clusters"
import AdminProduction from "./app/(admin)/admin_production"
import Sales from "./app/(admin)/sales"
import HR from "./app/(admin)/hr"
import Users from "./app/(admin)/users"
import Finance from "./app/(admin)/finance"
import AdminImpact from "./app/(admin)/admin_impact"

// Cluster pages
import ClusterDashboard from "./app/(cluster)/cluster_dashboard"
import ClusterProduction from "./app/(cluster)/cluster_production"
import Materials from "./app/(cluster)/materials"
import Attendance from "./app/(cluster)/attendance"
import Maintenance from "./app/(cluster)/maintenance"
import Training from "./app/(cluster)/training"

function App() {
  const [user, setUser] = useState(null)

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/products" element={<Products />} />
      <Route path="/impact" element={<Impact />} />
      <Route path="/process" element={<Process />} />
      <Route path="/partners" element={<Partners />} />
      <Route path="/contact" element={<Contact />} />

      {/* Auth routes */}
      <Route path="/login" element={<Login setUser={setUser} />} />
      <Route path="/register" element={<Register />} />
      

      {/* Client routes */}
      <Route path="/client/dashboard" element={<ClientDashboard />} />
      <Route path="/client/place-order" element={<PlaceOrder />} />
      <Route path="/client/orders" element={<ClientOrders />} />
      <Route path="/client/invoices" element={<ClientInvoices />} />
      <Route path="/client/profile" element={<Profile />} />
      <Route path="/client/impact" element={<ClientImpact />} />

      {/* Admin routes */}
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/orders" element={<AdminOrders />} />
      <Route path="/admin/inventory" element={<AdminInventory />} />
      <Route path="/admin/clusters" element={<AdminClusters />} />
      <Route path="/admin/production" element={<AdminProduction />} />
      <Route path="/admin/sales" element={<Sales />} />
      <Route path="/admin/hr" element={<HR />} />
      <Route path="/admin/users" element={<Users />} />
      <Route path="/admin/finance" element={<Finance />} />
      <Route path="/admin/impact" element={<AdminImpact />} />

      {/* Cluster routes */}
      <Route path="/cluster/dashboard" element={<ClusterDashboard />} />
      <Route path="/cluster/production" element={<ClusterProduction />} />
      <Route path="/cluster/materials" element={<Materials />} />
      <Route path="/cluster/attendance" element={<Attendance />} />
      <Route path="/cluster/maintenance" element={<Maintenance />} />
      <Route path="/cluster/training" element={<Training />} />

      {/* Default redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
