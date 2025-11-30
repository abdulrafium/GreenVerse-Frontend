import { useState, useEffect } from "react"
import Sidebar from "../../components/sidebar"
import Button from "../../components/Button"
import Card from "../../components/Card"
import { materialsAPI } from "../../lib/materialsAPI"
import { toast } from "react-toastify"
import "../(client)/dashboard.css"

export default function Materials() {
  const [materials, setMaterials] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingMaterial, setEditingMaterial] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    unit: 'kg',
    quality: '',
    supplier: '',
    cost_per_unit: ''
  })

  useEffect(() => {
    document.title = 'Materials Management - GreenVerse'
    fetchMaterials()
  }, [])

  const fetchMaterials = async () => {
    try {
      setLoading(true)
      const data = await materialsAPI.getMaterials()
      setMaterials(data.materials || [])
    } catch (error) {
      console.error('Error fetching materials:', error)
      toast.error('Failed to load materials')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingMaterial) {
        await materialsAPI.updateMaterial(editingMaterial.id, formData)
        toast.success('Material updated successfully')
      } else {
        await materialsAPI.createMaterial(formData)
        toast.success('Material added successfully')
      }
      fetchMaterials()
      closeModal()
    } catch (error) {
      console.error('Error saving material:', error)
      toast.error(error.response?.data?.error || 'Failed to save material')
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this material?')) return
    
    try {
      await materialsAPI.deleteMaterial(id)
      toast.success('Material deleted successfully')
      fetchMaterials()
    } catch (error) {
      console.error('Error deleting material:', error)
      toast.error('Failed to delete material')
    }
  }

  const openAddModal = () => {
    setEditingMaterial(null)
    setFormData({
      name: '',
      quantity: '',
      unit: 'kg',
      quality: '',
      supplier: '',
      cost_per_unit: ''
    })
    setShowModal(true)
  }

  const openEditModal = (material) => {
    setEditingMaterial(material)
    setFormData({
      name: material.name,
      quantity: material.quantity,
      unit: material.unit,
      quality: material.quality || '',
      supplier: material.supplier || '',
      cost_per_unit: material.cost_per_unit || ''
    })
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setEditingMaterial(null)
  }

  if (loading) {
    return (
      <div className="dashboard-layout">
        <Sidebar role="cluster" />
        <main className="dashboard-content">
          <div className="flex items-center justify-center h-64">
            <p className="text-stone-500">Loading materials...</p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="dashboard-layout">
      <Sidebar role="cluster" />

      <main className="dashboard-content">
        <div className="dashboard-header">
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#0F5132' }}>Materials Management</h1>
          <Button variant="primary" onClick={openAddModal}>Add Material</Button>
        </div>

        <Card>
          {materials.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-stone-500">No materials found. Add your first material!</p>
            </div>
          ) : (
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <div className="min-w-full" style={{ maxHeight: '600px', overflowY: 'auto' }}>
            <table className="min-w-full">
              <thead className="bg-stone-50 sticky top-0 z-10">
                <tr className="border-b border-border">
                  <th className="text-left py-2 px-4 text-muted-foreground text-sm whitespace-nowrap">Material</th>
                  <th className="text-left py-2 px-4 text-muted-foreground text-sm">Quantity</th>
                  <th className="text-left py-2 px-4 text-muted-foreground text-sm">Unit</th>
                  <th className="text-left py-2 px-4 text-muted-foreground text-sm">Quality</th>
                  <th className="text-left py-2 px-4 text-muted-foreground text-sm">Supplier</th>
                  <th className="text-left py-2 px-4 text-muted-foreground text-sm whitespace-nowrap">Cost/Unit</th>
                  <th className="text-left py-2 px-4 text-muted-foreground text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {materials.map((item) => (
                  <tr key={item.id} className="border-b border-border hover:bg-muted">
                    <td className="py-3 px-4 text-foreground font-semibold text-sm whitespace-nowrap">{item.name}</td>
                    <td className="py-3 px-4 text-foreground text-sm">{item.quantity}</td>
                    <td className="py-3 px-4 text-foreground text-sm">{item.unit}</td>
                    <td className="py-3 px-4 text-foreground font-medium text-sm">{item.quality || '-'}</td>
                    <td className="py-3 px-4 text-foreground text-sm">{item.supplier || '-'}</td>
                    <td className="py-3 px-4 text-foreground text-sm whitespace-nowrap">
                      {item.cost_per_unit ? `$${item.cost_per_unit}` : '-'}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-col sm:flex-row gap-2">
                        <button
                          onClick={() => openEditModal(item)}
                          className="text-blue-600 hover:text-blue-800 font-medium text-sm whitespace-nowrap"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-red-600 hover:text-red-800 font-medium text-sm whitespace-nowrap"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
              </div>
            </div>
          )}
        </Card>

        {/* Add/Edit Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-2xl font-bold text-[#0F5132] mb-4">
                {editingMaterial ? 'Edit Material' : 'Add New Material'}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">
                      Material Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-1">
                        Quantity *
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={formData.quantity}
                        onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                        className="w-full px-3 py-2 border border-stone-300 rounded-lg"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-1">
                        Unit *
                      </label>
                      <select
                        value={formData.unit}
                        onChange={(e) => setFormData({...formData, unit: e.target.value})}
                        className="w-full px-3 py-2 border border-stone-300 rounded-lg"
                        required
                      >
                        <option value="kg">kg</option>
                        <option value="tons">tons</option>
                        <option value="liters">liters</option>
                        <option value="units">units</option>
                        <option value="bags">bags</option>
                        <option value="boxes">boxes</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">
                      Quality Grade
                    </label>
                    <input
                      type="text"
                      value={formData.quality}
                      onChange={(e) => setFormData({...formData, quality: e.target.value})}
                      placeholder="e.g., A+, B, Premium"
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">
                      Supplier
                    </label>
                    <input
                      type="text"
                      value={formData.supplier}
                      onChange={(e) => setFormData({...formData, supplier: e.target.value})}
                      placeholder="Supplier name"
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">
                      Cost per Unit ($)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.cost_per_unit}
                      onChange={(e) => setFormData({...formData, cost_per_unit: e.target.value})}
                      placeholder="0.00"
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg"
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <Button type="submit" variant="primary" className="flex-1">
                    {editingMaterial ? 'Update' : 'Add'} Material
                  </Button>
                  <Button type="button" variant="secondary" onClick={closeModal} className="flex-1">
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
