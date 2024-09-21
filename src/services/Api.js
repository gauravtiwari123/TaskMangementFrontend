import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_BASE_URL || 'http://localhost:8080/api/v1', // Set base URL from environment
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const token = Cookies.get('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  Cookies.remove('token');
  return Promise.reject(error);
});

api.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.response && error.response.status === 401) {
    Cookies.remove('token');
    window.location.href = '/';
  }
  return Promise.reject(error);
});
// ========== USERS ==========

// POST request example - create a new user
export const createUser = async (userData) => {
  try {
    const response = await api.post('/register', userData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/login', credentials);
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};
export const logout = async () => {
  try {
    await api.post('/logout');
    Cookies.remove('token');
    window.location.href = '/';
} catch (error) {
    console.error('Error during logout:', error);
  }
};
export const getUsers = async () => {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const getTaskDetail = async (id) => {
  try {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching task details:', error);
    throw error;
  }
};

export const createTask = async (taskData) => {
  try {
    const response = await api.post('/tasks', taskData);
    return response.data;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};

export const updateTask = async (id, taskData) => {
  try {
    const response = await api.put(`/tasks/${id}`, taskData);
    return response.data;
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
};

export const getTasks = async ({ search, sort, order, page, limit }) => {
  return await api.get(`/tasks`, {
    params: {
        search,
        sort,
        order,
        page,
        limit
    }
});
};

export const deleteTaskById =async (taskId) => {
  return await api.delete(`/tasks/${taskId}`);
};


