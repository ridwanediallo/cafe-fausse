import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000 // 10 seconds
});

// Request interceptor (for adding auth tokens later if needed)
apiClient.interceptors.request.use(
  (config) => {
    // You can add authentication tokens here later
    // config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor (for error handling)
apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // Handle errors globally
    const message = error.response?.data?.message || error.message || 'An error occurred';
    
    console.error('API Error:', {
      status: error.response?.status,
      message: message,
      url: error.config?.url
    });
    
    return Promise.reject({
      status: error.response?.status,
      message: message
    });
  }
);

// API methods
const api = {
  // GET request
  get: (url, config = {}) => {
    return apiClient.get(url, config);
  },
  
  // POST request
  post: (url, data = {}, config = {}) => {
    return apiClient.post(url, data, config);
  },
  
  // PUT request
  put: (url, data = {}, config = {}) => {
    return apiClient.put(url, data, config);
  },
  
  // PATCH request
  patch: (url, data = {}, config = {}) => {
    return apiClient.patch(url, data, config);
  },
  
  // DELETE request
  delete: (url, config = {}) => {
    return apiClient.delete(url, config);
  }
};

export default api;
