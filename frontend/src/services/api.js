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

/**
 * Create Razorpay Order
 * @param {string} currency - "INR"
 * @param {Object} formData - optional user data for logging
 */
export const createOrder = async (currency = "INR", formData = null) => {
    try {
        const response = await api.post('/api/payment/create-order', {
            currency,
            form_data: formData
        });
        return response.data;
    } catch (error) {
        console.error('Create Order Error:', error);
        throw error;
    }
};

/**
 * Verify Payment and Generate Report
 * @param {Object} paymentData - { razorpay_payment_id, razorpay_order_id, razorpay_signature, form_data }
 */
export const verifyPayment = async (paymentData) => {
    try {
        const response = await api.post('/api/payment/verify', paymentData);
        return response.data;
    } catch (error) {
        console.error('Verify Payment Error:', error);
        throw error;
    }
};

/**
 * Generate Report with Coupon
 * @param {Object} data - Flat NumerologyRequest: { name, gender, dob, email, mobile, language, coupon_code }
 */
export const generateReportWithCoupon = async (data) => {
    try {
        const response = await api.post('/api/numerology/generate-with-coupon', data);
        return response.data;
    } catch (error) {
        console.error('Coupon Generation Error:', error);
        throw error;
    }
};

export default api;
