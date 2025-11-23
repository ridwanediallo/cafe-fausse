import api from './api';

const customerService = {
  /**
   * Sign up for newsletter
   * @param {Object} data - Newsletter signup data {email, name}
   * @returns {Promise} Customer data
   */
  newsletterSignup: async (data) => {
    try {
      const response = await api.post('/customers/newsletter-signup', data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get customer by ID
   * @param {number} customerId - Customer ID
   * @returns {Promise} Customer data
   */
  getCustomer: async (customerId) => {
    try {
      const response = await api.get(`/customers/${customerId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get customer by email
   * @param {string} email - Customer email
   * @returns {Promise} Customer data
   */
  getCustomerByEmail: async (email) => {
    try {
      const response = await api.get(`/customers/email/${encodeURIComponent(email)}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default customerService;
