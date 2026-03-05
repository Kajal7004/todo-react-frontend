import axios from 'axios';

// Replace with your local IP if testing on mobile, or localhost:5000
export  const API = axios.create({
  baseURL: 'http://localhost:5000/api', 
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
); 

export const loginUser = (credentials) => API.post('/auth/login', credentials);
export const registerUser = (userData) => API.post('/auth/register', userData);
export const fetchTodos = () => API.get('/todos');
export const createTodo = (newTodo) => API.post('/todos', newTodo);
export const deleteTodo = (id) => API.delete(`/todos/${id}`);
export const updateTodo = (id, updatedTodo) => API.put(`/todos/${id}`, updatedTodo);