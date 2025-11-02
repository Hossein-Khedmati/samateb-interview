import axios from "axios";

const api = axios.create({
  baseURL: "https://api.samateb.ir/API",
});

const getToken = () => {
  const match = document.cookie.match(/token=([^;]+)/);
  return match ? match[1] : null;
};

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
