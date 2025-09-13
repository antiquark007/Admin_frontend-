import api from './index.js';

export const dashboardAPI = {
  // Get dashboard statistics
  getDashboardStats: async () => {
    try {
      const response = await api.get('/admin/dashboard/stats');
      return response.data;
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      throw error;
    }
  },

  // Get product statistics  
  getProductStats: async () => {
    try {
      const response = await api.get('/admin/products/stats');
      return response.data;
    } catch (error) {
      console.error('Error fetching product stats:', error);
      throw error;
    }
  },

  // Get top selling products
  getTopProducts: async (limit = 5) => {
    try {
      const response = await api.get(`/admin/products/top?limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching top products:', error);
      throw error;
    }
  },

  // Get recent orders
  getRecentOrders: async (limit = 10) => {
    try {
      const response = await api.get(`/admin/orders/recent?limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching recent orders:', error);
      throw error;
    }
  }
};