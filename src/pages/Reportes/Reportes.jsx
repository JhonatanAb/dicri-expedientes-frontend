import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Alert,
} from "@mui/material";
import { obtenerTodasBitacoras } from "../../services/bitacoraService";

export default function Reportes() {
  const [bitacoras, setBitacoras] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargar = async () => {
      try {
        const data = await obtenerTodasBitacoras();
        setBitacoras(data);
      } catch (err) {
        setError("No se pudieron cargar las bitácoras.");
      } finally {
        setCargando(false);
      }
    };

    cargar();
  }, []);

  if (cargando) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight={600} gutterBottom>
        Reporte General de Cambios en Expedientes
      </Typography>

      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table sx={{ minWidth: 900 }}>

          <TableHead>
            <TableRow>
              <TableCell><b>ID Bitácora</b></TableCell>
              <TableCell><b>Expediente</b></TableCell>
              <TableCell><b>Estado Anterior</b></TableCell>
              <TableCell><b>Estado Nuevo</b></TableCell>
              <TableCell><b>Fecha Cambio</b></TableCell>
              <TableCell><b>Usuario</b></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {bitacoras.map((b) => (
              <TableRow key={b.id_bitacora}>
                <TableCell>{b.id_bitacora}</TableCell>
                <TableCell>{b.id_expediente}</TableCell>
                <TableCell>{b.estado_anterior}</TableCell>
                <TableCell>{b.estado_nuevo}</TableCell>
                <TableCell>
                  {new Date(b.fecha_cambio).toLocaleString()}
                </TableCell>
                <TableCell>{b.nombre_usuario}</TableCell>
              </TableRow>
            ))}
          </TableBody>

        </Table>
      </TableContainer>
    </Box>
  );
}