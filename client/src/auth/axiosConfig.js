// axiosConfig.js
import axios from 'axios';

// Crea una instancia de Axios
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001/login', // Reemplaza con tu URL base
});

// Interceptor de solicitud para incluir el token JWT
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
