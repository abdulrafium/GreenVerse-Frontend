import { useState, useEffect } from "react"
import Sidebar from "../../components/sidebar"
import Button from "../../components/Button"
import Card from "../../components/Card"
import { clustersAPI } from "../../services/api"
import { Loader2, Eye, EyeOff, X } from "lucide-react"
import { toast } from "react-toastify"
import "../(client)/dashboard.css"

export default function AdminClusters() {
  const [clusters, setClusters] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingCluster, setEditingCluster] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    manager_name: '',
    email: '',
    password: '',
    city: '',
    province: '',
    capacity: ''
  })

  useEffect(() => {
    document.title = 'Clusters Management - GreenVerse'
    fetchClusters()
  }, [])

  const fetchClusters = async () => {
    try {
      setLoading(true)
      const response = await clustersAPI.getAll()
      setClusters(response.data.clusters || [])
    } catch (error) {
      console.error('Error fetching clusters:', error)
      toast.error('Failed to load clusters')
    } finally {
      setLoading(false)
    }
  }

  const openAddModal = () => {
    setEditingCluster(null)
    setFormData({
      name: '',
      manager_name: '',
      email: '',
      password: '',
      city: '',
      province: '',
      capacity: ''
    })
    setShowModal(true)
  }

  const openEditModal = async (cluster) => {
    setEditingCluster(cluster)
    
    // Fetch cluster details including manager email
    try {
      const response = await clustersAPI.getById(cluster.id)
      const clusterData = response.data.cluster || response.data
      
      // Get manager email from the user data
      const managerEmail = clusterData.manager?.email || cluster.email || ''
      
      // Parse location to city and province if it's a combined string
      let city = ''
      let province = ''
      if (clusterData.location && clusterData.location.includes(',')) {
        const parts = clusterData.location.split(',').map(p => p.trim())
        city = parts[0] || ''
        province = parts[1] || ''
      } else {
        city = clusterData.location || ''
      }
      
      setFormData({
        name: clusterData.name || '',
        manager_name: clusterData.manager_name || '',
        email: managerEmail,
        password: '', // Leave empty - will show placeholder for password update
        city: city,
        province: province,
        capacity: clusterData.capacity || ''
      })
      setShowModal(true)
    } catch (error) {
      console.error('Error fetching cluster details:', error)
      toast.error('Failed to load cluster details')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      let response;
      if (editingCluster) {
        // Update cluster
        const updateData = { ...formData }
        if (!updateData.password) delete updateData.password // Don't update password if empty
        response = await clustersAPI.update(editingCluster.id, updateData)
        console.log('Update response:', response)
        toast.success('Cluster updated successfully')
      } else {
        // Create cluster
        response = await clustersAPI.create(formData)
        console.log('Create response:', response)
        toast.success('Cluster created successfully')
      }
      
      // Reload clusters data
      console.log('Fetching clusters...')
      await fetchClusters()
      console.log('Clusters fetched successfully')
      
      // Close modal and reset form
      setShowModal(false)
      setEditingCluster(null)
      setFormData({
        name: '',
        manager_name: '',
        email: '',
        password: '',
        city: '',
        province: '',
        capacity: ''
      })
    } catch (error) {
      console.error('Error saving cluster:', error)
      toast.error(error.response?.data?.error || 'Failed to save cluster')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="dashboard-layout" style={{ backgroundColor: '#FDFBF7' }}>
      <Sidebar role="admin" />

      <main className="dashboard-content" style={{ backgroundColor: '#FDFBF7' }}>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#0F5132' }}>Clusters Management</h1>
          <Button variant="primary" onClick={openAddModal}>Add Cluster</Button>
        </div>

        <Card>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-12 h-12 animate-spin text-[#3AA174]" />
            </div>
          ) : clusters.length === 0 ? (
            <div className="text-center py-12 text-stone-500">
              <p>No clusters found</p>
            </div>
          ) : (
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <div className="min-w-full" style={{ maxHeight: '600px', overflowY: 'auto' }}>
            <table className="min-w-full">
              <thead className="bg-stone-50 sticky top-0 z-10">
                <tr className="border-b-2 border-stone-200">
                  <th className="text-left py-3 px-4 text-stone-600 font-semibold text-sm whitespace-nowrap">Cluster Name</th>
                  <th className="text-left py-3 px-4 text-stone-600 font-semibold text-sm">Location</th>
                  <th className="text-left py-3 px-4 text-stone-600 font-semibold text-sm">Role</th>
                  <th className="text-left py-3 px-4 text-stone-600 font-semibold text-sm whitespace-nowrap">Manager Name</th>
                  <th className="text-left py-3 px-4 text-stone-600 font-semibold text-sm">Capacity</th>
                  <th className="text-left py-3 px-4 text-stone-600 font-semibold text-sm">Utilization</th>
                  <th className="text-left py-3 px-4 text-stone-600 font-semibold text-sm">Workers</th>
                  <th className="text-left py-3 px-4 text-stone-600 font-semibold text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {clusters.map((cluster) => {
                  const utilization = cluster.utilization || 0
                  const workers = cluster.employees_count || 0
                  const location = cluster.location || (cluster.city && cluster.province ? `${cluster.city}, ${cluster.province}` : cluster.city || cluster.province || 'N/A')
                  const roleName = cluster.manager?.name || 'N/A'
                  const managerName = cluster.manager_name || 'N/A'
                  return (
                    <tr key={cluster.id} className="border-b border-stone-100 hover:bg-[#F6F3EB]/50 transition-colors">
                      <td className="py-3 px-4 text-[#0F5132] font-medium text-sm whitespace-nowrap">{cluster.name}</td>
                      <td className="py-3 px-4 text-stone-600 text-sm">{location}</td>
                      <td className="py-3 px-4 text-stone-700 text-sm">{roleName}</td>
                      <td className="py-3 px-4 text-stone-700 text-sm whitespace-nowrap">{managerName}</td>
                      <td className="py-3 px-4 text-stone-700 text-sm whitespace-nowrap">{cluster.capacity}kg</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-stone-200 rounded-full h-2">
                            <div 
                              className="bg-[#3AA174] h-2 rounded-full transition-all" 
                              style={{ width: `${Math.min(utilization, 100)}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-stone-600 font-medium">{utilization}%</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-stone-700 font-semibold text-sm">{workers}</td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => openEditModal(cluster)}
                          className="p-2 hover:bg-[#3AA174]/10 rounded-lg transition-colors text-[#3AA174]"
                          title="View/Edit Cluster"
                        >
                          <Eye size={18} />
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
              </div>
            </div>
          )}
        </Card>
      </main>

      {/* Add/Edit Cluster Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-[#0F5132]">
                {editingCluster ? 'Edit Cluster' : 'Add New Cluster'}
              </h3>
              <button 
                onClick={() => setShowModal(false)} 
                className="p-1 hover:bg-stone-100 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-stone-700 font-semibold mb-2">Cluster Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                  className="w-full px-4 py-2 border-2 border-stone-200 rounded-xl focus:border-[#3AA174] focus:ring-2 focus:ring-[#3AA174]/20 outline-none transition-all"
                  placeholder="Sukkur Cluster"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-2">Manager Name *</label>
                <input
                  type="text"
                  value={formData.manager_name}
                  onChange={(e) => setFormData({...formData, manager_name: e.target.value})}
                  required
                  className="w-full px-4 py-2 border-2 border-stone-200 rounded-xl focus:border-[#3AA174] focus:ring-2 focus:ring-[#3AA174]/20 outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-2">Email (Login) *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                  className="w-full px-4 py-2 border-2 border-stone-200 rounded-xl focus:border-[#3AA174] focus:ring-2 focus:ring-[#3AA174]/20 outline-none transition-all"
                  placeholder="cluster@example.com"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-2">
                  Password {editingCluster ? '(Update if forgot)' : '*'}
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    required={!editingCluster}
                    minLength={6}
                    className="w-full px-4 py-2 pr-12 border-2 border-stone-200 rounded-xl focus:border-[#3AA174] focus:ring-2 focus:ring-[#3AA174]/20 outline-none transition-all"
                    placeholder={editingCluster ? "Enter new password or leave empty" : "Minimum 6 characters"}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-[#3AA174] transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-2">City *</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                  required
                  className="w-full px-4 py-2 border-2 border-stone-200 rounded-xl focus:border-[#3AA174] focus:ring-2 focus:ring-[#3AA174]/20 outline-none transition-all"
                  placeholder="Sukkur"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-2">Province *</label>
                <select
                  value={formData.province}
                  onChange={(e) => setFormData({...formData, province: e.target.value})}
                  required
                  className="w-full px-4 py-2 border-2 border-stone-200 rounded-xl focus:border-[#3AA174] focus:ring-2 focus:ring-[#3AA174]/20 outline-none transition-all"
                >
                  <option value="">Select Province</option>
                  <option value="Sindh">Sindh</option>
                  <option value="Punjab">Punjab</option>
                  <option value="Khyber Pakhtunkhwa">Khyber Pakhtunkhwa</option>
                  <option value="Balochistan">Balochistan</option>
                  <option value="Gilgit-Baltistan">Gilgit-Baltistan</option>
                  <option value="Azad Kashmir">Azad Kashmir</option>
                </select>
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-2">Capacity (kg) *</label>
                <input
                  type="number"
                  value={formData.capacity}
                  onChange={(e) => setFormData({...formData, capacity: e.target.value})}
                  required
                  min="1"
                  className="w-full px-4 py-2 border-2 border-stone-200 rounded-xl focus:border-[#3AA174] focus:ring-2 focus:ring-[#3AA174]/20 outline-none transition-all"
                  placeholder="5000"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <Button 
                  type="button" 
                  variant="secondary" 
                  className="flex-1"
                  onClick={() => setShowModal(false)}
                  disabled={submitting}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  variant="primary" 
                  className="flex-1"
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      {editingCluster ? 'Updating...' : 'Creating...'}
                    </>
                  ) : (
                    editingCluster ? 'Update Cluster' : 'Create Cluster'
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
