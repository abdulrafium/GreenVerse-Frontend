import { useState, useEffect } from 'react'
import Sidebar from "../../components/sidebar"
import Button from "../../components/Button"
import Card from "../../components/Card"
import StatCard from "../../components/StatCard"
import { Loader2, Calendar, X, UserPlus, UserMinus } from 'lucide-react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import "../(client)/dashboard.css"
import api from '../../services/api'

export default function HR() {
  const [stats, setStats] = useState(null)
  const [employees, setEmployees] = useState([])
  const [clusters, setClusters] = useState([])
  const [selectedCluster, setSelectedCluster] = useState('')
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [loading, setLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showRemoveModal, setShowRemoveModal] = useState(false)
  const [addingEmployee, setAddingEmployee] = useState(false)
  const [removingEmployee, setRemovingEmployee] = useState(false)
  const [employeeForm, setEmployeeForm] = useState({
    name: '',
    city: '',
    role: '',
    cluster_id: ''
  })
  const [removeForm, setRemoveForm] = useState({
    cluster_id: '',
    employee_id: ''
  })
  const [clusterEmployees, setClusterEmployees] = useState([])

  useEffect(() => {
    document.title = 'Human Resources - GreenVerse'
    fetchClusters()
  }, [])

  useEffect(() => {
    fetchHRData()
  }, [selectedCluster, selectedDate])

  const fetchClusters = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('http://localhost:5000/api/employees/hr/clusters', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const data = await response.json()
      setClusters(data.clusters || [])
    } catch (error) {
      console.error('Failed to fetch clusters:', error)
    }
  }

  const fetchHRData = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('token')
      const headers = { 'Authorization': `Bearer ${token}` }

      // Build query params
      const statsParams = new URLSearchParams({ date: selectedDate })
      const empParams = new URLSearchParams({ date: selectedDate })
      if (selectedCluster) {
        empParams.append('cluster_id', selectedCluster)
      }

      const [statsRes, empRes] = await Promise.all([
        fetch(`http://localhost:5000/api/employees/hr/stats?${statsParams}`, { headers }),
        fetch(`http://localhost:5000/api/employees/hr/employees?${empParams}`, { headers })
      ])

      const [statsData, empData] = await Promise.all([
        statsRes.json(),
        empRes.json()
      ])

      setStats(statsData.stats)
      setEmployees(empData.employees || [])
    } catch (error) {
      console.error('Failed to fetch HR data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddEmployee = async (e) => {
    e.preventDefault()
    
    if (!employeeForm.name || !employeeForm.city || !employeeForm.role || !employeeForm.cluster_id) {
      toast.error('All fields are required')
      return
    }

    try {
      setAddingEmployee(true)
      const token = localStorage.getItem('token')
      
      const response = await fetch('http://localhost:5000/api/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(employeeForm)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to add employee')
      }
      
      toast.success('Employee added successfully!')
      setShowAddModal(false)
      setEmployeeForm({ name: '', city: '', role: '', cluster_id: '' })
      await fetchHRData()
    } catch (error) {
      console.error('Error adding employee:', error)
      toast.error(error.message || 'Failed to add employee')
    } finally {
      setAddingEmployee(false)
    }
  }

  const fetchClusterEmployees = async (clusterId) => {
    try {
      const response = await api.get(`/employees/cluster/${clusterId}`)
      setClusterEmployees(response.data.employees || [])
    } catch (error) {
      console.error('Failed to fetch cluster employees:', error)
      setClusterEmployees([])
    }
  }

  const handleRemoveEmployee = async (e) => {
    e.preventDefault()
    
    if (!removeForm.employee_id) {
      toast.error('Please select an employee to remove')
      return
    }

    try {
      setRemovingEmployee(true)
      await api.delete(`/employees/${removeForm.employee_id}`)
      toast.success('Employee removed successfully!')
      setShowRemoveModal(false)
      setRemoveForm({ cluster_id: '', employee_id: '' })
      setClusterEmployees([])
      await fetchHRData()
    } catch (error) {
      console.error('Error removing employee:', error)
      toast.error(error.response?.data?.error || 'Failed to remove employee')
    } finally {
      setRemovingEmployee(false)
    }
  }

  useEffect(() => {
    if (removeForm.cluster_id) {
      fetchClusterEmployees(removeForm.cluster_id)
    } else {
      setClusterEmployees([])
      setRemoveForm(prev => ({ ...prev, employee_id: '' }))
    }
  }, [removeForm.cluster_id])

  if (loading && !stats) {
    return (
      <div className="dashboard-layout" style={{ backgroundColor: '#FDFBF7' }}>
        <Sidebar role="admin" />
        <main className="dashboard-content flex items-center justify-center" style={{ backgroundColor: '#FDFBF7' }}>
          <Loader2 className="w-8 h-8 animate-spin text-[#3AA174]" />
        </main>
      </div>
    )
  }

  return (
    <div className="dashboard-layout" style={{ backgroundColor: '#FDFBF7' }}>
      <ToastContainer 
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Sidebar role="admin" />

      <main className="dashboard-content" style={{ backgroundColor: '#FDFBF7' }}>
        {/* Header with responsive buttons */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#0F5132' }}>Human Resources</h1>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Button 
              variant="secondary" 
              onClick={() => setShowRemoveModal(true)}
              style={{ backgroundColor: '#DC2626', color: 'white' }}
              className="w-full sm:w-auto text-sm"
            >
              <UserMinus size={16} className="sm:mr-1" /> 
              <span className="hidden sm:inline">Remove Employee</span>
              <span className="sm:hidden">Remove</span>
            </Button>
            <Button 
              variant="primary" 
              onClick={() => setShowAddModal(true)}
              style={{ backgroundColor: '#3AA174', color: 'white' }}
              className="w-full sm:w-auto text-sm"
            >
              <UserPlus size={16} className="sm:mr-1" /> 
              <span className="hidden sm:inline">Add Employee</span>
              <span className="sm:hidden">Add</span>
            </Button>
          </div>
        </div>

        {/* Date Filter - Responsive */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#3AA174]" />
            <label className="font-semibold text-[#0F5132] text-sm sm:text-base">Date:</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3AA174] text-sm"
              style={{ backgroundColor: 'white' }}
            />
          </div>
        </div>

        <div className="stats-grid">
          <StatCard 
            title="Total Employees" 
            value={stats?.totalEmployees?.toString() || '0'} 
            change={`${stats?.employeeChange} this month`} 
            icon="👥" 
          />
          <StatCard 
            title="Active" 
            value={stats?.presentCount?.toString() || '0'} 
            change={stats?.presentChange || '+0'} 
            icon="✓" 
          />
          <StatCard 
            title="On Leave" 
            value={stats?.onLeaveCount?.toString() || '0'} 
            change={stats?.leaveChange || '0'} 
            icon="📅" 
          />
          <StatCard 
            title="Turnover Rate" 
            value={stats?.turnoverRate || '0%'} 
            change={stats?.turnoverChange || '0%'} 
            icon="📉" 
          />
        </div>

        <Card className="mt-6" style={{ backgroundColor: 'white' }}>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
            <h2 className="text-xl font-semibold text-[#0F5132]">Employees</h2>
            
            {/* Cluster Filter - Responsive */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full sm:w-auto">
              <label className="font-semibold text-[#0F5132] text-sm sm:text-base whitespace-nowrap">Filter by Cluster:</label>
              <select
                value={selectedCluster}
                onChange={(e) => setSelectedCluster(e.target.value)}
                className="px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3AA174] text-sm"
                style={{ backgroundColor: 'white', width: '100%', minWidth: '200px' }}
              >
                <option value="">All Clusters</option>
                {clusters.map(cluster => (
                  <option key={cluster.id} value={cluster.id}>
                    {cluster.name} - {cluster.location}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-[#3AA174]" />
            </div>
          ) : (
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <div className="inline-block min-w-full align-middle">
                <div className="overflow-hidden" style={{ maxHeight: '600px', overflowY: 'auto' }}>
                  <table className="min-w-full divide-y divide-stone-200">
                    <thead className="bg-stone-50 sticky top-0 z-10">
                      <tr>
                        <th className="text-left py-3 px-4 font-semibold text-[#0F5132] text-sm whitespace-nowrap">No.</th>
                        <th className="text-left py-3 px-4 font-semibold text-[#0F5132] text-sm whitespace-nowrap">Name</th>
                        <th className="text-left py-3 px-4 font-semibold text-[#0F5132] text-sm whitespace-nowrap">City</th>
                        <th className="text-left py-3 px-4 font-semibold text-[#0F5132] text-sm whitespace-nowrap">Role</th>
                        <th className="text-left py-3 px-4 font-semibold text-[#0F5132] text-sm whitespace-nowrap">Cluster</th>
                        <th className="text-left py-3 px-4 font-semibold text-[#0F5132] text-sm whitespace-nowrap">Manager</th>
                        <th className="text-left py-3 px-4 font-semibold text-[#0F5132] text-sm whitespace-nowrap">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-stone-100">
                      {employees.length > 0 ? (
                        employees.map((employee, index) => (
                          <tr key={employee.id} className="hover:bg-stone-50 transition-colors">
                            <td className="py-3 px-4 text-stone-700 text-sm">{index + 1}</td>
                            <td className="py-3 px-4 font-medium text-stone-800 text-sm whitespace-nowrap">{employee.name}</td>
                            <td className="py-3 px-4 text-stone-600 text-sm whitespace-nowrap">{employee.city}</td>
                            <td className="py-3 px-4 text-stone-600 text-sm">{employee.role}</td>
                            <td className="py-3 px-4 text-stone-600 text-sm whitespace-nowrap">
                              {employee.cluster?.name || 'N/A'}
                            </td>
                            <td className="py-3 px-4 text-stone-600 text-sm whitespace-nowrap">
                              {employee.manager_name}
                            </td>
                            <td className="py-3 px-4">
                              <span 
                                className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                                  employee.attendance_status === 'Present' 
                                    ? 'bg-green-100 text-green-700' 
                                    : employee.attendance_status === 'Leave' || employee.attendance_status === 'Absent'
                                    ? 'bg-red-100 text-red-700'
                                    : 'bg-stone-100 text-stone-600'
                                }`}
                              >
                                {employee.attendance_status}
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="7" className="py-8 text-center text-stone-500 text-sm">
                            No employees found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </Card>
      </main>

      {/* Add Employee Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setShowAddModal(false)}>
          <div className="bg-white rounded-2xl p-4 sm:p-6 w-full max-w-md shadow-xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg sm:text-xl font-bold text-[#0F5132]">Add Staff Member</h3>
              <button 
                onClick={() => setShowAddModal(false)} 
                className="p-1 hover:bg-stone-100 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleAddEmployee} className="space-y-4">
              <div>
                <label className="block text-stone-700 font-semibold mb-2">Full Name *</label>
                <input
                  type="text"
                  value={employeeForm.name}
                  onChange={(e) => setEmployeeForm({...employeeForm, name: e.target.value})}
                  required
                  className="w-full px-4 py-2 border-2 border-stone-200 rounded-xl focus:border-[#3AA174] focus:ring-2 focus:ring-[#3AA174]/20 outline-none transition-all"
                  placeholder="Hassan Ali"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-2">City *</label>
                <input
                  type="text"
                  value={employeeForm.city}
                  onChange={(e) => setEmployeeForm({...employeeForm, city: e.target.value})}
                  required
                  className="w-full px-4 py-2 border-2 border-stone-200 rounded-xl focus:border-[#3AA174] focus:ring-2 focus:ring-[#3AA174]/20 outline-none transition-all"
                  placeholder="Sukkur"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-2">Role *</label>
                <select
                  value={employeeForm.role}
                  onChange={(e) => setEmployeeForm({...employeeForm, role: e.target.value})}
                  required
                  className="w-full px-4 py-2 border-2 border-stone-200 rounded-xl focus:border-[#3AA174] focus:ring-2 focus:ring-[#3AA174]/20 outline-none transition-all"
                >
                  <option value="">Select Role</option>
                  <option value="Production Worker">Production Worker</option>
                  <option value="Quality Control">Quality Control</option>
                  <option value="Machine Operator">Machine Operator</option>
                  <option value="Packaging Staff">Packaging Staff</option>
                  <option value="Maintenance Technician">Maintenance Technician</option>
                  <option value="Supervisor">Supervisor</option>
                  <option value="Raw Material Handler">Raw Material Handler</option>
                  <option value="Logistics Coordinator">Logistics Coordinator</option>
                </select>
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-2">Assign to Cluster *</label>
                <select
                  value={employeeForm.cluster_id}
                  onChange={(e) => setEmployeeForm({...employeeForm, cluster_id: e.target.value})}
                  required
                  className="w-full px-4 py-2 border-2 border-stone-200 rounded-xl focus:border-[#3AA174] focus:ring-2 focus:ring-[#3AA174]/20 outline-none transition-all"
                >
                  <option value="">Select Cluster</option>
                  {clusters.map(cluster => (
                    <option key={cluster.id} value={cluster.id}>
                      {cluster.name} - {cluster.location}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <Button 
                  type="button" 
                  variant="secondary" 
                  className="flex-1"
                  onClick={() => setShowAddModal(false)}
                  disabled={addingEmployee}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  variant="primary" 
                  className="flex-1"
                  disabled={addingEmployee}
                  style={{ backgroundColor: '#3AA174' }}
                >
                  {addingEmployee ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Adding...
                    </>
                  ) : (
                    'Add Employee'
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Remove Employee Modal */}
      {showRemoveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setShowRemoveModal(false)}>
          <div className="bg-white rounded-2xl p-4 sm:p-6 w-full max-w-md shadow-xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg sm:text-xl font-bold text-[#DC2626]">Remove Employee</h3>
              <button 
                onClick={() => setShowRemoveModal(false)} 
                className="p-1 hover:bg-stone-100 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleRemoveEmployee} className="space-y-4">
              <div>
                <label className="block text-stone-700 font-semibold mb-2">Select Cluster *</label>
                <select
                  value={removeForm.cluster_id}
                  onChange={(e) => setRemoveForm({...removeForm, cluster_id: e.target.value})}
                  required
                  className="w-full px-4 py-2 border-2 border-stone-200 rounded-xl focus:border-[#3AA174] focus:ring-2 focus:ring-[#3AA174]/20 outline-none transition-all"
                >
                  <option value="">Select Cluster</option>
                  {clusters.map(cluster => (
                    <option key={cluster.id} value={cluster.id}>
                      {cluster.name} - {cluster.location}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-2">Select Employee *</label>
                <select
                  value={removeForm.employee_id}
                  onChange={(e) => setRemoveForm({...removeForm, employee_id: e.target.value})}
                  required
                  disabled={!removeForm.cluster_id || clusterEmployees.length === 0}
                  className="w-full px-4 py-2 border-2 border-stone-200 rounded-xl focus:border-[#3AA174] focus:ring-2 focus:ring-[#3AA174]/20 outline-none transition-all disabled:bg-stone-100 disabled:cursor-not-allowed"
                >
                  <option value="">
                    {!removeForm.cluster_id 
                      ? 'First select a cluster' 
                      : clusterEmployees.length === 0 
                      ? 'No employees in this cluster' 
                      : 'Select Employee'}
                  </option>
                  {clusterEmployees.map(employee => (
                    <option key={employee.id} value={employee.id}>
                      {employee.name} - {employee.role}
                    </option>
                  ))}
                </select>
              </div>

              {removeForm.employee_id && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-sm text-red-700">
                    <strong>Warning:</strong> This action cannot be undone. The employee will be permanently removed from the database and the cluster's employee count will be decreased.
                  </p>
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <Button 
                  type="button" 
                  variant="secondary" 
                  className="flex-1"
                  onClick={() => setShowRemoveModal(false)}
                  disabled={removingEmployee}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  variant="primary" 
                  className="flex-1"
                  disabled={removingEmployee || !removeForm.employee_id}
                  style={{ backgroundColor: '#DC2626' }}
                >
                  {removingEmployee ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Removing...
                    </>
                  ) : (
                    'Remove Employee'
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
