// src/services/expedienteService.js
import axios from "axios";

const API_BASE_URL = "http://localhost:4000/api";


const api = axios.create({
  baseURL: API_BASE_URL,
});
//token para las peticiones
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Listar expedientes
export const obtenerExpedientes = async (params = {}) => {
  const res = await api.get("/expedientes", { params });
  return res.data;
};

// Obtener expediente por ID
export const obtenerExpedientePorId = async (id) => {
  const res = await api.get(`/expedientes/${id}`);
  return res.data;
};

// Crear expediente
export const crearExpediente = async (data) => {
  const res = await api.post("/expedientes", data);
  return res.data;
};

// Aprobar expediente
export const aprobarExpediente = async (id, usuario) => {
  const res = await api.put(`/expedientes/${id}/aprobar`, { usuario });
  return res.data;
};

// Rechazar expediente
export const rechazarExpediente = async (id, justificacion, usuario) => {
  const res = await api.put(`/expedientes/${id}/rechazar`, {
    justificacion,
    usuario
  });
  return res.data;
};

// Listar indicios por expediente
export const obtenerIndiciosPorExpediente = async (id_expediente) => {
  const res = await api.get(`/indicios/${id_expediente}`);
  return res.data;
};

// Crear indicio dentro de expediente
export const crearIndicio = async (data) => {
  const res = await api.post("/indicios", data);
  return res.data;
};

// Eliminar indicio
export const eliminarIndicio = async (id_indicio) => {
  const res = await api.delete(`/indicios/${id_indicio}`);
  return res.data;
};