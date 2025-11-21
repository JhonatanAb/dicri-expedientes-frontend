import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Auth/login";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import CrearExpediente from "./pages/Expedientes/CrearExpediente";
import ListadoExpedientes from "./pages/Expedientes/ListadoExpedientes";
import DetalleExpediente from "./pages/Expedientes/DetalleExpediente";
import Reportes from "./pages/Reportes/Reportes";

export default function App() {
  return (
    <Routes>
      {}
      <Route path="/login" element={<LoginPage />} />
      {}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/expedientes/crear" element={<CrearExpediente />} />
        <Route path="/expedientes" element={<ListadoExpedientes />} />
        <Route path="/expedientes/:id" element={<DetalleExpediente />} />
        <Route path="/reportes" element={<Reportes />} />
      </Route>
    
    </Routes>
  );
}

