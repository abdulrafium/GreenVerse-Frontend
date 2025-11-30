import { useState, useEffect } from "react"
import Sidebar from "../../components/sidebar"
import Button from "../../components/Button"
import Card from "../../components/Card"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "../(client)/dashboard.css"

// Inline CSS for animations
const styles = document.createElement('style')
styles.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`
if (!document.head.querySelector('#attendance-animations')) {
  styles.id = 'attendance-animations'
  document.head.appendChild(styles)
}

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api"

export default function Attendance() {
  const [employees, setEmployees] = useState([])
  const [attendanceRecords, setAttendanceRecords] = useState([])
  const [todayAttendance, setTodayAttendance] = useState([])
  const [stats, setStats] = useState({
    total: 0,
    present: 0,
    absent: 0,
    leave: 0,
    presentPercentage: 0,
  })
  
  // Get current date in local timezone (not UTC)
  const getCurrentDate = () => {
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }
  
  const [selectedDate, setSelectedDate] = useState(getCurrentDate())
  const [filterDate, setFilterDate] = useState(getCurrentDate())
  const [showMarkDialog, setShowMarkDialog] = useState(false)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)

  console.log("Attendance component mounted")

  // Fetch data on component mount
  useEffect(() => {
    document.title = 'Attendance Management - GreenVerse'
    console.log("useEffect running")
    fetchEmployees()
    fetchTodayAttendance(filterDate)
    fetchAttendanceStats(filterDate)
  }, [])

  // Fetch attendance when filter date changes
  useEffect(() => {
    console.log("🔍 Filter date changed to:", filterDate)
    fetchTodayAttendance(filterDate)
    fetchAttendanceStats(filterDate)
  }, [filterDate])

  const fetchEmployees = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem("token")
      
      if (!token) {
        console.log("No token found")
        toast.error("Please login first")
        return
      }

      console.log("Fetching employees from:", `${API_URL}/employees`)
      const response = await fetch(`${API_URL}/employees`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      console.log("Employees data:", data)
      setEmployees(data.employees || [])

      // Initialize attendance records
      const initialRecords = (data.employees || []).map((emp) => ({
        employee_id: emp.id,
        worker_name: emp.name,
        status: "Absent",
      }))
      setAttendanceRecords(initialRecords)
    } catch (error) {
      console.error("Error fetching employees:", error)
      toast.error("Failed to load employees: " + error.message)
    } finally {
      setLoading(false)
    }
  }

  const fetchTodayAttendance = async (date = null) => {
    try {
      const token = localStorage.getItem("token")
      const targetDate = date || new Date().toISOString().split("T")[0]
      console.log("📅 Fetching attendance for date:", targetDate)
      const response = await fetch(`${API_URL}/attendance/date/${targetDate}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      
      if (!response.ok) {
        console.log("❌ Attendance fetch failed:", response.status)
        const errorData = await response.json()
        console.log("Error details:", errorData)
        return
      }
      
      const data = await response.json()
      console.log("✅ Attendance data received:", data.attendance)
      console.log("✅ Number of records:", data.attendance?.length || 0)
      setTodayAttendance(data.attendance || [])
    } catch (error) {
      console.error("❌ Error fetching today's attendance:", error)
    }
  }

  const fetchAttendanceStats = async (date = null) => {
    try {
      const token = localStorage.getItem("token")
      const targetDate = date || new Date().toISOString().split("T")[0]
      console.log("📊 Fetching stats for date:", targetDate)
      const response = await fetch(`${API_URL}/attendance/stats?date=${targetDate}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      
      if (!response.ok) {
        console.log("❌ Stats fetch failed:", response.status)
        return
      }
      
      const data = await response.json()
      console.log("✅ Attendance stats:", data.stats)
      console.log("📈 Stats breakdown - Total:", data.stats?.total, "Present:", data.stats?.present, "Absent:", data.stats?.absent, "Percentage:", data.stats?.presentPercentage)
      setStats(data.stats || {
        total: 0,
        present: 0,
        absent: 0,
        leave: 0,
        presentPercentage: 0,
      })
    } catch (error) {
      console.error("❌ Error fetching attendance stats:", error)
    }
  }

  const updateAttendanceStatus = (employeeId, status) => {
    setAttendanceRecords((prev) => {
      const existing = prev.find((r) => r.employee_id === employeeId)
      if (existing) {
        return prev.map((record) =>
          record.employee_id === employeeId ? { ...record, status } : record
        )
      } else {
        // If record doesn't exist, create it
        const employee = employees.find((e) => e.id === employeeId)
        return [...prev, { employee_id: employeeId, worker_name: employee?.name, status }]
      }
    })
  }

  const openMarkDialog = () => {
    // Auto-set today's date when dialog opens - force current date
    const today = new Date()
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const day = String(today.getDate()).padStart(2, '0')
    setSelectedDate(`${year}-${month}-${day}`)
    setShowMarkDialog(true)
    
    // Initialize attendance records for employees if empty
    if (attendanceRecords.length === 0) {
      const initialRecords = employees.map((emp) => ({
        employee_id: emp.id,
        worker_name: emp.name,
        status: "Absent",
      }))
      setAttendanceRecords(initialRecords)
    }
  }

  const handleMarkAttendance = async () => {
    try {
      setSaving(true)
      const token = localStorage.getItem("token")

      if (!token) {
        toast.error("Please login first")
        return
      }

      const attendanceData = attendanceRecords.map((record) => ({
        employee_id: record.employee_id,
        worker_name: record.worker_name,
        status: record.status,
        date: selectedDate,
      }))

      console.log("Submitting attendance:", attendanceData)

      const response = await fetch(`${API_URL}/attendance/bulk`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ attendanceRecords: attendanceData }),
      })

      const data = await response.json()
      console.log("✅ Response:", data)
      console.log("✅ Saved attendance count:", data.count)

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`)
      }

      console.log("✅ Attendance successfully saved to database!")
      toast.success("Attendance marked successfully!")
      setShowMarkDialog(false)
      
      // Wait a bit for database to update
      await new Promise(resolve => setTimeout(resolve, 800))
      
      // Refresh data - make sure to fetch for the date that was just marked
      await fetchTodayAttendance(selectedDate)
      await fetchAttendanceStats(selectedDate)
      
      console.log("Data refreshed after marking attendance for date:", selectedDate)
    } catch (error) {
      console.error("Error marking attendance:", error)
      toast.error(error.message || "Failed to mark attendance")
    } finally {
      setSaving(false)
    }
  }

  const getEmployeeStatus = (employeeId) => {
    const attendance = todayAttendance.find((att) => att.employee_id === employeeId)
    return attendance ? attendance.status : "Not Marked"
  }

  return (
    <div className="dashboard-layout">
      <Sidebar role="cluster" />

      <main className="dashboard-content">
        <div className="dashboard-header">
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#0F5132', marginBottom: '0.5rem' }}>Attendance</h1>
            <p style={{ color: '#78716C', fontSize: '0.95rem' }}>
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: '1 1 auto', minWidth: '200px' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: '600', color: '#0F5132' }}>Filter by Date</label>
              <input
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                style={{ 
                  padding: '0.65rem 0.85rem',
                  border: '2px solid #3AA174',
                  borderRadius: '0.75rem',
                  background: '#FFFFFF',
                  color: '#292524',
                  fontSize: '0.95rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  width: '100%'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#0F5132'
                  e.currentTarget.style.boxShadow = '0 0 0 4px rgba(58, 161, 116, 0.2), 0 0 20px rgba(58, 161, 116, 0.4)'
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#3AA174'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              />
            </div>
            <Button 
              variant="primary" 
              size="md" 
              onClick={openMarkDialog} 
              style={{ 
                marginTop: window.innerWidth < 768 ? '0' : '1.5rem',
                padding: '0.65rem 1.25rem',
                fontSize: '0.95rem',
                whiteSpace: 'nowrap'
              }}
            >
              Mark Attendance
            </Button>
          </div>
        </div>

        {/* Stats Cards with animations */}
        <div className="stats-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
          gap: '1.5rem', 
          marginBottom: '2rem' 
        }}>
          <Card style={{ 
            padding: '1.5rem',
            background: '#FFFFFF',
            border: '2px solid #3AA174',
            borderRadius: '1.25rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            transition: 'all 0.3s ease',
            cursor: 'default',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px)'
            e.currentTarget.style.boxShadow = '0 12px 24px rgba(58, 161, 116, 0.2), 0 0 20px rgba(58, 161, 116, 0.4)'
            e.currentTarget.style.borderColor = '#0F5132'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)'
            e.currentTarget.style.borderColor = '#3AA174'
          }}>
            <div style={{ 
              width: '56px', 
              height: '56px', 
              borderRadius: '12px', 
              background: '#3AA174',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem'
            }}>
              <span style={{ fontSize: '1.75rem', color: '#FFFFFF', fontWeight: '700' }}>1</span>
            </div>
            <p style={{ color: '#292524', fontSize: '1.125rem', marginBottom: '0.5rem', fontWeight: '700' }}>Total Employees</p>
            <p style={{ fontSize: '2.5rem', fontWeight: '800', color: '#292524', lineHeight: '1' }}>{stats.total || employees.length}</p>
          </Card>

          <Card style={{ 
            padding: '1.5rem',
            background: '#FFFFFF',
            border: '2px solid #F59E0B',
            borderRadius: '1.25rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            transition: 'all 0.3s ease',
            cursor: 'default',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px)'
            e.currentTarget.style.boxShadow = '0 12px 24px rgba(245, 158, 11, 0.2), 0 0 20px rgba(245, 158, 11, 0.4)'
            e.currentTarget.style.borderColor = '#D97706'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)'
            e.currentTarget.style.borderColor = '#F59E0B'
          }}>
            <div style={{ 
              width: '56px', 
              height: '56px', 
              borderRadius: '12px', 
              background: '#F59E0B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem'
            }}>
              <span style={{ fontSize: '1.75rem', color: '#FFFFFF', fontWeight: '700' }}>2</span>
            </div>
            <p style={{ color: '#292524', fontSize: '1.125rem', marginBottom: '0.5rem', fontWeight: '700' }}>Present</p>
            <p style={{ fontSize: '2.5rem', fontWeight: '800', color: '#292524', lineHeight: '1' }}>{stats.present || 0}</p>
          </Card>

          <Card style={{ 
            padding: '1.5rem',
            background: '#FFFFFF',
            border: '2px solid #3AA174',
            borderRadius: '1.25rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            transition: 'all 0.3s ease',
            cursor: 'default',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px)'
            e.currentTarget.style.boxShadow = '0 12px 24px rgba(58, 161, 116, 0.2)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)'
          }}>
            <div style={{ 
              width: '56px', 
              height: '56px', 
              borderRadius: '12px', 
              background: '#3AA174',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem'
            }}>
              <span style={{ fontSize: '1.75rem', color: '#FFFFFF', fontWeight: '700' }}>3</span>
            </div>
            <p style={{ color: '#292524', fontSize: '1.125rem', marginBottom: '0.5rem', fontWeight: '700' }}>Absent</p>
            <p style={{ fontSize: '2.5rem', fontWeight: '800', color: '#292524', lineHeight: '1' }}>{stats.absent || 0}</p>
          </Card>

          <Card style={{ 
            padding: '1.5rem',
            background: '#FFFFFF',
            border: '2px solid #3AA174',
            borderRadius: '1.25rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            transition: 'all 0.3s ease',
            cursor: 'default',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px)'
            e.currentTarget.style.boxShadow = '0 12px 24px rgba(58, 161, 116, 0.2)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)'
          }}>
            <div style={{ 
              width: '56px', 
              height: '56px', 
              borderRadius: '12px', 
              background: '#3AA174',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem'
            }}>
              <span style={{ fontSize: '1.75rem', color: '#FFFFFF', fontWeight: '700' }}>4</span>
            </div>
            <p style={{ color: '#292524', fontSize: '1.125rem', marginBottom: '0.5rem', fontWeight: '700' }}>Present Rate</p>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
              <p style={{ fontSize: '2.5rem', fontWeight: '800', color: '#292524', lineHeight: '1' }}>
                {stats.presentPercentage !== undefined ? `${stats.presentPercentage}%` : '0%'}
              </p>
            </div>
            <p style={{ color: '#78716C', fontSize: '0.875rem', marginTop: '0.5rem', fontWeight: '500' }}>
              {stats.present || 0} of {stats.total || 0} present
            </p>
          </Card>
        </div>

        {/* Attendance Table with professional styling */}
        <Card style={{ borderRadius: '1.25rem', overflow: 'hidden', border: '1px solid #E7E5E4', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#78716C' }}>
              <div style={{ display: 'inline-block', width: '40px', height: '40px', border: '3px solid #E7E5E4', borderTop: '3px solid #3AA174', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
              <p style={{ marginTop: '1rem' }}>Loading employees...</p>
            </div>
          ) : employees.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#78716C' }}>
              <svg style={{ width: '64px', height: '64px', margin: '0 auto 1rem', opacity: '0.5' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <p>No employees found in this cluster</p>
            </div>
          ) : (
            <div style={{ overflowX: 'auto', marginLeft: '-1rem', marginRight: '-1rem' }}>
              <div className="min-w-full" style={{ maxHeight: '600px', overflowY: 'auto' }}>
              <table style={{ minWidth: '100%', borderCollapse: 'collapse' }}>
                <thead style={{ position: 'sticky', top: 0, zIndex: 10 }}>
                  <tr style={{ background: 'linear-gradient(135deg, #F6F3EB 0%, #E7E5E4 100%)', borderBottom: '2px solid #E7E5E4' }}>
                    <th style={{ padding: '1rem', textAlign: 'left', color: '#0F5132', fontWeight: '600', fontSize: '0.875rem', whiteSpace: 'nowrap' }}>Employee</th>
                    <th style={{ padding: '1rem', textAlign: 'left', color: '#0F5132', fontWeight: '600', fontSize: '0.875rem' }}>Role</th>
                    <th style={{ padding: '1rem', textAlign: 'left', color: '#0F5132', fontWeight: '600', fontSize: '0.875rem' }}>City</th>
                    <th style={{ padding: '1rem', textAlign: 'left', color: '#0F5132', fontWeight: '600', fontSize: '0.875rem', whiteSpace: 'nowrap' }}>Date</th>
                    <th style={{ padding: '1rem', textAlign: 'left', color: '#0F5132', fontWeight: '600', fontSize: '0.875rem' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((emp, index) => {
                    const status = getEmployeeStatus(emp.id)
                    const attendance = todayAttendance.find((att) => att.employee_id === emp.id)
                    const attendanceDate = attendance ? new Date(attendance.date).toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' }) : '-'
                    
                    return (
                      <tr 
                        key={emp.id} 
                        style={{ 
                          borderBottom: '1px solid #E7E5E4',
                          background: index % 2 === 0 ? '#FFFFFF' : '#FDFBF7',
                          transition: 'all 0.2s ease',
                          cursor: 'default'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#F6F3EB'
                          e.currentTarget.style.transform = 'scale(1.01)'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = index % 2 === 0 ? '#FFFFFF' : '#FDFBF7'
                          e.currentTarget.style.transform = 'scale(1)'
                        }}
                      >
                        <td style={{ padding: '1rem', color: '#292524', fontWeight: '500', fontSize: '0.875rem', whiteSpace: 'nowrap' }}>{emp.name}</td>
                        <td style={{ padding: '1rem', color: '#78716C', fontSize: '0.875rem' }}>{emp.role}</td>
                        <td style={{ padding: '1rem', color: '#78716C', fontSize: '0.875rem' }}>{emp.city}</td>
                        <td style={{ padding: '1rem', color: '#78716C', fontWeight: '500', fontSize: '0.875rem', whiteSpace: 'nowrap' }}>{attendanceDate}</td>
                        <td style={{ padding: '1rem' }}>
                          <span
                            style={{
                              padding: '0.5rem 1rem',
                              borderRadius: '9999px',
                              fontSize: '0.875rem',
                              fontWeight: '600',
                              display: 'inline-block',
                              background: status === "Present"
                                ? 'linear-gradient(135deg, #3AA174 0%, #0F5132 100%)'
                                : status === "Leave"
                                ? 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)'
                                : status === "Absent"
                                  ? 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)'
                                  : 'linear-gradient(135deg, #78716C 0%, #57534E 100%)',
                              color: '#FFFFFF',
                              boxShadow: status === "Present"
                                ? '0 4px 12px rgba(58, 161, 116, 0.3)'
                                : status === "Leave"
                                ? '0 4px 12px rgba(245, 158, 11, 0.3)'
                                : status === "Absent"
                                  ? '0 4px 12px rgba(239, 68, 68, 0.3)'
                                  : '0 4px 12px rgba(120, 113, 108, 0.2)',
                              transition: 'all 0.2s ease',
                              cursor: 'default'
                            }}
                          >
                            {status}
                          </span>
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

        {/* Mark Attendance Dialog with professional design */}
        {showMarkDialog && (
          <div style={{ 
            position: 'fixed', 
            inset: 0, 
            background: 'rgba(0, 0, 0, 0.5)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            zIndex: 50,
            backdropFilter: 'blur(4px)',
            animation: 'fadeIn 0.2s ease'
          }}>
            <div style={{ 
              background: '#FFFFFF', 
              borderRadius: '1.5rem', 
              padding: window.innerWidth < 768 ? '1.25rem' : '2rem', 
              maxWidth: '64rem', 
              width: '95%', 
              maxHeight: '90vh', 
              overflowY: 'auto', 
              margin: '1rem',
              boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
              animation: 'slideUp 0.3s ease'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '2px solid #E7E5E4', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <h2 style={{ fontSize: window.innerWidth < 768 ? '1.35rem' : '1.75rem', fontWeight: '700', color: '#292524', marginBottom: '0.5rem' }}>Mark Attendance</h2>
                  <p style={{ color: '#78716C', fontSize: window.innerWidth < 768 ? '0.85rem' : '0.95rem' }}>Select attendance status for each employee</p>
                </div>
                <button
                  onClick={() => setShowMarkDialog(false)}
                  style={{ 
                    background: '#F5F5F4',
                    color: '#78716C', 
                    border: 'none',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    fontSize: '1.5rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#EF4444'
                    e.currentTarget.style.color = '#FFFFFF'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#F5F5F4'
                    e.currentTarget.style.color = '#78716C'
                  }}
                >
                  ✕
                </button>
              </div>

              {/* Date Selector with modern design */}
              <div style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#0F5132', marginBottom: '0.75rem' }}>
                  Attendance Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  style={{ 
                    padding: '0.75rem 1rem',
                    border: '2px solid #E7E5E4',
                    borderRadius: '0.75rem',
                    background: '#FFFFFF',
                    color: '#292524',
                    fontSize: '1rem',
                    fontWeight: '500',
                    width: '250px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#3AA174'
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(58, 161, 116, 0.1)'
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#E7E5E4'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                />
              </div>

              {/* Employee List with modern cards */}
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#292524', marginBottom: '1rem' }}>
                  Employees ({employees.length})
                </h3>
                <div style={{ display: 'grid', gap: '1rem' }}>
                  {employees.map((employee) => {
                    const record = attendanceRecords.find((r) => r.employee_id === employee.id)
                    return (
                      <div
                        key={employee.id}
                        style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'space-between', 
                          padding: '1.25rem', 
                          border: '2px solid #E7E5E4',
                          borderRadius: '1rem',
                          background: '#FDFBF7',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = '#3AA174'
                          e.currentTarget.style.boxShadow = '0 4px 12px rgba(58, 161, 116, 0.1)'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = '#E7E5E4'
                          e.currentTarget.style.boxShadow = 'none'
                        }}
                      >
                        <div>
                          <p style={{ fontWeight: '600', color: '#292524', fontSize: '1.05rem', marginBottom: '0.25rem' }}>{employee.name}</p>
                          <p style={{ fontSize: '0.875rem', color: '#78716C' }}>
                            {employee.role} • {employee.city}
                          </p>
                        </div>
                        <select
                          value={record?.status || "Absent"}
                          onChange={(e) => updateAttendanceStatus(employee.id, e.target.value)}
                          style={{ 
                            padding: '0.75rem 1rem',
                            border: '2px solid #E7E5E4',
                            borderRadius: '0.75rem',
                            background: '#FFFFFF',
                            color: '#292524',
                            fontSize: '0.95rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            minWidth: '140px',
                            transition: 'all 0.2s ease'
                          }}
                          onFocus={(e) => {
                            e.currentTarget.style.borderColor = '#3AA174'
                            e.currentTarget.style.boxShadow = '0 0 0 3px rgba(58, 161, 116, 0.1)'
                          }}
                          onBlur={(e) => {
                            e.currentTarget.style.borderColor = '#E7E5E4'
                            e.currentTarget.style.boxShadow = 'none'
                          }}
                        >
                          <option value="Present">✓ Present</option>
                          <option value="Absent">✗ Absent</option>
                          <option value="Leave">⊝ Leave</option>
                        </select>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Summary with gradient cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', padding: '1.5rem', background: 'linear-gradient(135deg, #F6F3EB 0%, #E7E5E4 100%)', borderRadius: '1rem', marginBottom: '2rem' }}>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: '0.875rem', color: '#78716C', marginBottom: '0.5rem', fontWeight: '500' }}>Total</p>
                  <p style={{ fontSize: '2rem', fontWeight: '700', color: '#292524' }}>{employees.length}</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: '0.875rem', color: '#78716C', marginBottom: '0.5rem', fontWeight: '500' }}>Present</p>
                  <p style={{ fontSize: '2rem', fontWeight: '700', color: '#3AA174' }}>
                    {attendanceRecords.filter((r) => r.status === "Present").length}
                  </p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: '0.875rem', color: '#78716C', marginBottom: '0.5rem', fontWeight: '500' }}>Absent</p>
                  <p style={{ fontSize: '2rem', fontWeight: '700', color: '#EF4444' }}>
                    {attendanceRecords.filter((r) => r.status === "Absent").length}
                  </p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: '0.875rem', color: '#78716C', marginBottom: '0.5rem', fontWeight: '500' }}>Leave</p>
                  <p style={{ fontSize: '2rem', fontWeight: '700', color: '#F59E0B' }}>
                    {attendanceRecords.filter((r) => r.status === "Leave").length}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', flexWrap: 'wrap' }}>
                <Button 
                  variant="outline" 
                  onClick={() => setShowMarkDialog(false)} 
                  disabled={saving}
                  style={{
                    padding: '0.65rem 1.5rem',
                    fontSize: '0.95rem',
                    minWidth: '100px'
                  }}
                >
                  Cancel
                </Button>
                <Button 
                  variant="primary" 
                  size="md" 
                  onClick={handleMarkAttendance} 
                  disabled={saving}
                  style={{
                    padding: '0.65rem 1.5rem',
                    fontSize: '0.95rem',
                    minWidth: '140px'
                  }}
                >
                  {saving ? "Saving..." : "Submit Attendance"}
                </Button>
              </div>
            </div>
          </div>
        )}

        <ToastContainer position="top-right" autoClose={3000} />
      </main>
    </div>
  )
}
