import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

export const materialsAPI = {
  // Get all materials (filtered by cluster)
  getMaterials: async () => {
    const response = await axios.get(`${API_URL}/materials`, getAuthHeader());
    return response.data;
  },

  // Create new material
  createMaterial: async (materialData) => {
    const response = await axios.post(`${API_URL}/materials`, materialData, getAuthHeader());
    return response.data;
  },

  // Update material
  updateMaterial: async (id, materialData) => {
    const response = await axios.put(`${API_URL}/materials/${id}`, materialData, getAuthHeader());
    return response.data;
  },

  // Delete material
  deleteMaterial: async (id) => {
    const response = await axios.delete(`${API_URL}/materials/${id}`, getAuthHeader());
    return response.data;
  }
};
