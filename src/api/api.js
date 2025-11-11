import axios from "axios";

const api = axios.create({
  baseURL: "https://ecomerce-laravel.fly.dev/api", // backend-i Laravel
  withCredentials: true, // për Sanctum cookies
});

// 📦 interceptor që shton token automatikisht në çdo kërkesë
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
