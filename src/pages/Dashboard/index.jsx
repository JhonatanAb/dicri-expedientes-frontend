import React, { useEffect, useState, useMemo } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
  Chip,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Stack,
} from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";

import { obtenerExpedientes } from "../../services/expedienteService";

export default function Dashboard() {
  const [expedientes, setExpedientes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setCargando(true);
        setError(null);
        const data = await obtenerExpedientes();
        setExpedientes(data || []);
      } catch (err) {
        console.error(err);
        setError("No se pudieron obtener los expedientes.");
      } finally {
        setCargando(false);
      }
    };

    cargarDatos();
  }, []);

  // ⚙️ Cálculo de métricas
  const stats = useMemo(() => {
    const total = expedientes.length;

    // OJO: usa los valores EXACTOS que tienes en BD: 'REVISION PENDIENTE', 'APROBADO', 'RECHAZADO'
    const revisionPendiente = expedientes.filter(
      (e) => e.estado === "REVISION_PENDIENTE"
    ).length;

    const aprobados = expedientes.filter(
      (e) => e.estado === "APROBADO"
    ).length;

    const rechazados = expedientes.filter(
      (e) => e.estado === "RECHAZADO"
    ).length;

    return { total, revisionPendiente, aprobados, rechazados };
  }, [expedientes]);

  // Últimos 5 expedientes (ordenados por fecha)
  const ultimosExpedientes = useMemo(() => {
    return [...expedientes]
      .sort((a, b) => new Date(b.fecha_registro) - new Date(a.fecha_registro))
      .slice(0, 5);
  }, [expedientes]);

  const renderEstadoChip = (estado) => {
    let color = "default";

    switch (estado) {
      case "APROBADO":
        color = "success";
        break;
      case "RECHAZADO":
        color = "error";
        break;
      case "REVISION PENDIENTE":
        color = "warning";
        break;
      default:
        color = "default";
        break;
    }

    return <Chip label={estado} color={color} size="small" />;
  };

  if (cargando) {
    return (
      <Box
        sx={{
          p: 4,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "50vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Título */}
      <Typography variant="h4" fontWeight={600} gutterBottom>
        Resumen Expedientes DICRI
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        Resumen general de expedientes e indicios registrados.
      </Typography>

      {/* KPI Cards */}
      <Grid container spacing={3} sx={{ mt: 1, mb: 3 }}>
        <Grid item xs={12} md={3}>
          <Card elevation={2}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2}>
                <AssignmentIcon sx={{ fontSize: 40, color: "#1565C0" }} />
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Total de expedientes
                  </Typography>
                  <Typography variant="h5" fontWeight={700}>
                    {stats.total}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card elevation={2}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2}>
                <HourglassEmptyIcon sx={{ fontSize: 40, color: "#FFA000" }} />
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Revisión pendiente
                  </Typography>
                  <Typography variant="h5" fontWeight={700}>
                    {stats.revisionPendiente}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card elevation={2}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2}>
                <CheckCircleIcon sx={{ fontSize: 40, color: "#2E7D32" }} />
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Aprobados
                  </Typography>
                  <Typography variant="h5" fontWeight={700}>
                    {stats.aprobados}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card elevation={2}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2}>
                <CancelIcon sx={{ fontSize: 40, color: "#C62828" }} />
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Rechazados
                  </Typography>
                  <Typography variant="h5" fontWeight={700}>
                    {stats.rechazados}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tabla últimos expedientes */}
      <Card elevation={2}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Últimos expedientes registrados
          </Typography>
          {ultimosExpedientes.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              No hay expedientes registrados todavía.
            </Typography>
          ) : (
            <Box sx={{ overflowX: "auto" }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Número</TableCell>
                    <TableCell>Fecha registro</TableCell>
                    <TableCell>Técnico</TableCell>
                    <TableCell>Estado</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {ultimosExpedientes.map((exp) => (
                    <TableRow key={exp.id_expediente}>
                      <TableCell>{exp.numero_expediente}</TableCell>
                      <TableCell>
                        {exp.fecha_registro
                          ? new Date(exp.fecha_registro).toLocaleString()
                          : "-"}
                      </TableCell>
                      <TableCell>{exp.nombre_tecnico}</TableCell>
                      <TableCell>{renderEstadoChip(exp.estado)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}