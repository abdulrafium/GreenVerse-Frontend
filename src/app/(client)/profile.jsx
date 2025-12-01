import { useState, useEffect } from 'react'
import Sidebar from "../../components/sidebar"
import Button from "../../components/Button"
import Card from "../../components/Card"
import { Loader2, Save, User, Phone, MapPin } from 'lucide-react'
import { toast, ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import "./dashboard.css"
import api from '../../services/api'

// Pakistan States/Provinces and their Districts
const PAKISTAN_DATA = {
  "Sindh": [
    "Karachi Central", "Karachi East", "Karachi South", "Karachi West", "Korangi", "Malir",
    "Hyderabad", "Dadu", "Jamshoro", "Matiari", "Tando Allahyar", "Tando Muhammad Khan",
    "Badin", "Sujawal", "Thatta", "Ghotki", "Kashmore", "Sukkur",
    "Khairpur", "Naushahro Feroze", "Shaheed Benazirabad", "Sanghar",
    "Mirpur Khas", "Tharparkar", "Umerkot", "Larkana", "Jacobabad", "Shikarpur",
    "Kambar Shahdadkot", "Qambar Shahdadkot"
  ],
  "Punjab": [
    "Lahore", "Kasur", "Sheikhupura", "Nankana Sahib", "Okara",
    "Faisalabad", "Chiniot", "Jhang", "Toba Tek Singh",
    "Rawalpindi", "Attock", "Chakwal", "Jhelum", "Murree",
    "Multan", "Khanewal", "Lodhran", "Vehari",
    "Bahawalpur", "Bahawalnagar", "Rahim Yar Khan",
    "Gujranwala", "Gujrat", "Hafizabad", "Mandi Bahauddin", "Narowal", "Sialkot",
    "Sargodha", "Bhakkar", "Khushab", "Mianwali",
    "Sahiwal", "Pakpattan", "Dera Ghazi Khan", "Layyah", "Muzaffargarh", "Rajanpur"
  ],
  "Khyber Pakhtunkhwa": [
    "Peshawar", "Charsadda", "Nowshera", "Mardan", "Swabi",
    "Abbottabad", "Haripur", "Mansehra", "Battagram", "Kohistan", "Torghar",
    "Bannu", "Lakki Marwat", "North Waziristan", "South Waziristan",
    "Dera Ismail Khan", "Tank", "Swat", "Buner", "Shangla", "Dir Lower", "Dir Upper",
    "Chitral", "Malakand", "Kohat", "Karak", "Hangu", "Kurram", "Orakzai"
  ],
  "Balochistan": [
    "Quetta", "Pishin", "Killa Abdullah", "Chagai", "Nushki",
    "Kharan", "Mastung", "Kalat", "Khuzdar", "Awaran", "Lasbela", "Hub",
    "Gwadar", "Kech (Turbat)", "Panjgur", "Sibi", "Kohlu", "Dera Bugti",
    "Nasirabad", "Jaffarabad", "Jhal Magsi", "Kachhi (Bolan)", "Zhob",
    "Sherani", "Musakhel", "Loralai", "Barkhan", "Ziarat"
  ],
  "Azad Jammu and Kashmir": [
    "Muzaffarabad", "Hattian Bala", "Neelum",
    "Mirpur", "Bhimber", "Kotli",
    "Poonch", "Sudhanoti", "Bagh", "Haveli"
  ],
  "Gilgit-Baltistan": [
    "Gilgit", "Ghanche", "Skardu", "Shigar", "Kharmang",
    "Astore", "Diamer", "Ghizer", "Hunza", "Nagar"
  ],
  "Islamabad Capital Territory": [
    "Islamabad"
  ]
}

export default function Profile() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [user, setUser] = useState({ name: '', email: '' })
  const [profile, setProfile] = useState({
    phone: '',
    city: '',
    district: '',
    state: '',
    address_line: ''
  })
  const [availableDistricts, setAvailableDistricts] = useState([])

  useEffect(() => {
    document.title = 'My Profile - GreenVerse'
    fetchProfile()
  }, [])

  // Update districts when state changes
  useEffect(() => {
    if (profile.state && PAKISTAN_DATA[profile.state]) {
      setAvailableDistricts(PAKISTAN_DATA[profile.state])
      // Reset district if it's not in the new state's districts
      if (profile.district && !PAKISTAN_DATA[profile.state].includes(profile.district)) {
        setProfile(prev => ({ ...prev, district: '' }))
      }
    } else {
      setAvailableDistricts([])
    }
  }, [profile.state])

  const handleStateChange = (newState) => {
    setProfile(prev => ({
      ...prev,
      state: newState,
      district: '' // Reset district when state changes
    }))
  }

  const fetchProfile = async () => {
    try {
      setLoading(true)
      const userStr = localStorage.getItem('user')
      
      if (userStr) {
        const userData = JSON.parse(userStr)
        setUser({ name: userData.name, email: userData.email })
      }

      const response = await api.get('/profile')
      if (response.data.profile) {
        setProfile(response.data.profile)
      }
    } catch (error) {
      console.error('Error fetching profile:', error)
      toast.error('Failed to load profile')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate all fields
    if (!profile.phone || !profile.city || !profile.district || !profile.state || !profile.address_line) {
      toast.error('All fields are required')
      return
    }

    try {
      setSaving(true)

      const response = await api.post('/profile', profile)

      toast.success('Profile saved successfully!')
      setProfile(response.data.profile)
    } catch (error) {
      console.error('Save profile error:', error)
      toast.error(error.response?.data?.error || 'Failed to save profile')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="dashboard-layout" style={{ backgroundColor: '#FDFBF7' }}>
        <Sidebar role="client" />
        <main className="dashboard-content flex items-center justify-center" style={{ backgroundColor: '#FDFBF7' }}>
          <Loader2 className="w-8 h-8 animate-spin text-[#3AA174]" />
        </main>
      </div>
    )
  }

  return (
    <div className="dashboard-layout" style={{ backgroundColor: '#FDFBF7' }}>
      <ToastContainer position="top-center" autoClose={3000} />
      <Sidebar role="client" />

      <main className="dashboard-content" style={{ backgroundColor: '#FDFBF7' }}>
        <div className="dashboard-header">
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#0F5132' }}>My Profile</h1>
        </div>

        <Card className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* User Info (Read-only) */}
            <div className="bg-[#F6F3EB] p-6 rounded-lg mb-6">
              <h2 className="text-xl font-bold text-[#0F5132] mb-4 flex items-center gap-2">
                <User size={24} className="text-[#3AA174]" />
                Account Information
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-stone-700 mb-2">Name</label>
                  <input
                    type="text"
                    value={user.name}
                    disabled
                    className="w-full px-4 py-3 border border-stone-200 rounded-lg bg-stone-100 text-stone-600 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-stone-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={user.email}
                    disabled
                    className="w-full px-4 py-3 border border-stone-200 rounded-lg bg-stone-100 text-stone-600 cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-xl font-bold text-[#0F5132] mb-4 flex items-center gap-2">
                <Phone size={24} className="text-[#3AA174]" />
                Contact Information
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-stone-700 mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    placeholder="Enter phone number"
                    required
                    className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3AA174] transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div>
              <h2 className="text-xl font-bold text-[#0F5132] mb-4 flex items-center gap-2">
                <MapPin size={24} className="text-[#3AA174]" />
                Address Information
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-stone-700 mb-2">
                    State/Province <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={profile.state}
                    onChange={(e) => handleStateChange(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3AA174] transition-all bg-white"
                  >
                    <option value="">Select State/Province</option>
                    {Object.keys(PAKISTAN_DATA).map((state) => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-stone-700 mb-2">
                    District <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={profile.district}
                    onChange={(e) => setProfile({ ...profile, district: e.target.value })}
                    required
                    disabled={!profile.state}
                    className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3AA174] transition-all bg-white disabled:bg-stone-100 disabled:cursor-not-allowed"
                  >
                    <option value="">
                      {profile.state ? 'Select District' : 'Select State First'}
                    </option>
                    {availableDistricts.map((district) => (
                      <option key={district} value={district}>{district}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-stone-700 mb-2">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={profile.city}
                    onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                    placeholder="Enter city"
                    required
                    className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3AA174] transition-all"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-stone-700 mb-2">
                    Address Line <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={profile.address_line}
                    onChange={(e) => setProfile({ ...profile, address_line: e.target.value })}
                    placeholder="Street address, building, etc."
                    required
                    className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3AA174] transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Required Fields Note */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> All fields marked with <span className="text-red-500">*</span> are required to place orders.
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="submit"
                variant="primary"
                disabled={saving}
                className="px-8 py-3 text-base font-semibold"
              >
                {saving ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={18} />
                    Save Profile
                  </>
                )}
              </Button>
            </div>
          </form>
        </Card>
      </main>
    </div>
  )
}
