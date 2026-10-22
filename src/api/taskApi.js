import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8081/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export const taskApi = {
  // Fetch tasks filtered by status ('ALL', 'PENDING', 'COMPLETED')
  getTasks: async (status = 'ALL') => {
    const response = await apiClient.get('/tasks', {
      params: { status }
    });
    return response.data;
  },

  // Get aggregated stats { total, pending, completed }
  getStats: async () => {
    const response = await apiClient.get('/tasks/stats');
    return response.data;
  },

  // Get single task by ID
  getTaskById: async (id) => {
    const response = await apiClient.get(`/tasks/${id}`);
    return response.data;
  },

  // Create new task
  createTask: async (taskData) => {
    const response = await apiClient.post('/tasks', taskData);
    return response.data;
  },

  // Update existing task (title, description, dueDate)
  updateTask: async (id, taskData) => {
    const response = await apiClient.put(`/tasks/${id}`, taskData);
    return response.data;
  },

  // Update or toggle status
  updateTaskStatus: async (id, status) => {
    const payload = status ? { status } : {};
    const response = await apiClient.patch(`/tasks/${id}/status`, payload);
    return response.data;
  },

  // Delete task by ID
  deleteTask: async (id) => {
    const response = await apiClient.delete(`/tasks/${id}`);
    return response.data;
  },

  // Health check ping
  checkHealth: async () => {
    const response = await apiClient.get('/tasks/stats');
    return response.status === 200;
  }
};

export default taskApi;
