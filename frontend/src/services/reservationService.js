import api from './api';

const reservationService = {
  /**
   * Create a new reservation
   * @param {Object} reservationData - Reservation details
   * @returns {Promise} Created reservation
   */
  createReservation: async (reservationData) => {
    try {
      const response = await api.post('/reservations/', reservationData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Check table availability
   * @param {string} startTime - ISO format datetime
   * @param {number} guestCount - Number of guests
   * @returns {Promise} Availability data
   */
  checkAvailability: async (startTime, guestCount) => {
    try {
      const response = await api.get(
        `/reservations/check-availability?start_time=${encodeURIComponent(startTime)}&guest_count=${guestCount}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get a specific reservation
   * @param {number} reservationId - Reservation ID
   * @returns {Promise} Reservation data
   */
  getReservation: async (reservationId) => {
    try {
      const response = await api.get(`/reservations/${reservationId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get all reservations (optionally filtered by status)
   * @param {string} status - Filter by status (optional)
   * @returns {Promise} Array of reservations
   */
  getAllReservations: async (status = null) => {
    try {
      const url = status ? `/reservations/?status=${status}` : '/reservations/';
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Cancel a reservation
   * @param {number} reservationId - Reservation ID
   * @returns {Promise} Updated reservation
   */
  cancelReservation: async (reservationId) => {
    try {
      const response = await api.put(`/reservations/${reservationId}/cancel`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default reservationService;
