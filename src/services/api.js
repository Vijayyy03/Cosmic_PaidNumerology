import axios from 'axios';

// API base URL - update this for production
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

/**
 * Generate numerology report
 * @param {Object} data - Form data
 * @param {string} data.name - Full name
 * @param {string} data.gender - Gender
 * @param {string} data.dob - Date of birth (DD-MM-YYYY)
 * @param {string} data.language - Report language
 * @returns {Promise<Object>} - Numerology report data
 */
export const generateNumerologyReport = async (data) => {
    try {
        const response = await api.post('/api/numerology/generate', data);
        return response.data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

export default api;
