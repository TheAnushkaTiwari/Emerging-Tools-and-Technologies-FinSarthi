import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token"); // Ensure key name matches Login
  
  // Only add the token if it exists AND we aren't registering/logging in
  if (token && !config.url.includes('register') && !config.url.includes('login')) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;