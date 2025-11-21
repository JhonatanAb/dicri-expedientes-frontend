import axios from "axios";

const API_BASE_URL = "http://localhost:4000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✔ Obtener bitácora de un expediente específico
export const obtenerBitacora = async (id_expediente) => {
  const res = await api.get(`/bitacora/${id_expediente}`);
  return res.data;
};

// ✔ Obtener todas las bitácoras (Reportes)
export const obtenerTodasBitacoras = async () => {
  const res = await api.get(`/bitacora`);
  return res.data;
};