import axios from "axios";

const API_BASE_URL = "http://localhost:4000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
});

// interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const crearIndicio = async (data) => {
  const res = await api.post("/indicios", data);
  return res.data;
};

export const obtenerIndiciosPorExpediente = async (id_expediente) => {
  const res = await api.get(`/indicios/${id_expediente}`);
  return res.data;
};