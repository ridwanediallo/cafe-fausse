import api from './api';

const menuService = {
  /**
   * Get the complete menu organized by categories
   * @param {boolean} includeUnavailable - Whether to include unavailable items
   * @returns {Promise} Menu data
   */
  getMenu: async (includeUnavailable = false) => {
    try {
      const response = await api.get(`/menu/?include_unavailable=${includeUnavailable}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get a specific category with its items
   * @param {number} categoryId - Category ID
   * @returns {Promise} Category data
   */
  getCategory: async (categoryId) => {
    try {
      const response = await api.get(`/menu/categories/${categoryId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get a specific menu item
   * @param {number} itemId - Item ID
   * @returns {Promise} Item data
   */
  getMenuItem: async (itemId) => {
    try {
      const response = await api.get(`/menu/items/${itemId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default menuService;
