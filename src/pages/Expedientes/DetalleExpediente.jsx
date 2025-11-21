import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { obtenerBitacora } from "../../services/bitacoraService";
import { 
  obtenerExpedientePorId, 
  aprobarExpediente, 
  rechazarExpediente 
} from "../../services/expedienteService";

import { 
  obtenerIndiciosPorExpediente, 
  crearIndicio 
} from "../../services/indicioService";

import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  TextField,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent
} from "@mui/material";

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
  } from "@mui/material";
export default function DetalleExpediente() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [expediente, setExpediente] = useState(null);
  const [indicios, setIndicios] = useState([]);

  const [openRechazo, setOpenRechazo] = useState(false);
  const [justificacion, setJustificacion] = useState("");
  const [bitacora, setBitacora] = useState([]);
  // Modal de crear indicio
  const [openNuevoIndicio, setOpenNuevoIndicio] = useState(false);
  const [nuevoIndicio, setNuevoIndicio] = useState({
    descripcion: "",
    color: "",
    tamano: "",
    peso: "",
    ubicacion: ""
  });

  useEffect(() => {
    cargarDetalle();
  }, [id]);

  const cargarDetalle = async () => {
    const data = await obtenerExpedientePorId(id);
    setExpediente(data);
  
    const ind = await obtenerIndiciosPorExpediente(id);
    setIndicios(ind);
  
    const bit = await obtenerBitacora(id);
    setBitacora(bit);
  };

  const aprobar = async () => {
    await aprobarExpediente(id);
    alert("Expediente aprobado");
    navigate("/expedientes");
  };

  const rechazar = async () => {
    await rechazarExpediente(id, justificacion);
    alert("Expediente rechazado");
    setOpenRechazo(false);
    navigate("/expedientes");
  };

  const guardarIndicio = async () => {
    if (!nuevoIndicio.descripcion.trim()) {
      alert("La descripción es obligatoria.");
      return;
    }

    await crearIndicio({
      id_expediente: id,
      ...nuevoIndicio
    });

    setOpenNuevoIndicio(false);

    // Reiniciar campos
    setNuevoIndicio({
      descripcion: "",
      color: "",
      tamano: "",
      peso: "",
      ubicacion: ""
    });

    cargarDetalle();
  };

  if (!expediente) return <Typography>Cargando...</Typography>;

  return (
    <Box p={3}>
      <Typography variant="h4" mb={2}>
        Expediente #{expediente.numero_expediente}
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography><b>Estado:</b> {expediente.estado}</Typography>
          <Typography><b>Fecha:</b> {expediente.fecha_registro}</Typography>
          <Typography><b>Técnico que registró:</b> {expediente.tecnico_registra}</Typography>
          {expediente.justificacion_rechazo && (
            <Typography color="error">
              <b>Justificación:</b> {expediente.justificacion_rechazo}
            </Typography>
          )}
        </CardContent>
      </Card>

      {}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
        <Typography variant="h5">Indicios</Typography>

        <Button 
          variant="contained" 
          onClick={() => setOpenNuevoIndicio(true)}
        >
          + Agregar Indicio
        </Button>
      </Box>

      {indicios.length === 0 ? (
        <Typography>No hay indicios registrados</Typography>
      ) : (
        indicios.map((i) => (
          <Card key={i.id_indicio} sx={{ mb: 2 }}>
            <CardContent>
              <Typography><b>{i.descripcion}</b></Typography>
              <Typography>Color: {i.color}</Typography>
              <Typography>Tamaño: {i.tamano}</Typography>
              <Typography>Peso: {i.peso}</Typography>
              <Typography>Ubicación: {i.ubicacion}</Typography>
            </CardContent>
          </Card>
        ))
      )}

      {/* BITÁCORA */}
      <Box mt={4}>
  <Typography variant="h5" mb={2}>
    Bitácora del expediente
  </Typography>

  {bitacora.length === 0 ? (
    <Typography>No hay registros en la bitácora</Typography>
  ) : (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><b>Estado anterior</b></TableCell>
            <TableCell><b>Estado nuevo</b></TableCell>
            <TableCell><b>Fecha cambio</b></TableCell>
            <TableCell><b>Usuario modifica</b></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {bitacora.map((b) => (
            <TableRow key={b.id_bitacora}>
              <TableCell>{b.estado_anterior}</TableCell>
              <TableCell>{b.estado_nuevo}</TableCell>
              <TableCell>
                {new Date(b.fecha_cambio).toLocaleString()}
              </TableCell>
              <TableCell>{b.usuario_modifica}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )}
</Box>

      {}
      {expediente.estado === "REVISION_PENDIENTE" && (
        <Box mt={3} display="flex" gap={2}>
          <Button variant="contained" color="success" onClick={aprobar}>
            Aprobar
          </Button>

          <Button variant="contained" color="error" onClick={() => setOpenRechazo(true)}>
            Rechazar
          </Button>
        </Box>
      )}

      {}
      <Dialog open={openRechazo} onClose={() => setOpenRechazo(false)}>
        <DialogTitle>Rechazar Expediente</DialogTitle>
        <DialogContent>
          <TextField
            label="Justificación"
            fullWidth
            multiline
            rows={4}
            value={justificacion}
            onChange={(e) => setJustificacion(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenRechazo(false)}>Cancelar</Button>
          <Button color="error" onClick={rechazar}>Rechazar</Button>
        </DialogActions>
      </Dialog>

      {}
      <Dialog open={openNuevoIndicio} onClose={() => setOpenNuevoIndicio(false)}>
        <DialogTitle>Agregar Indicio</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          
          <TextField 
            label="Descripción" 
            fullWidth 
            value={nuevoIndicio.descripcion} 
            onChange={(e) => setNuevoIndicio({ ...nuevoIndicio, descripcion: e.target.value })} 
          />

          <TextField 
            label="Color" 
            fullWidth 
            value={nuevoIndicio.color} 
            onChange={(e) => setNuevoIndicio({ ...nuevoIndicio, color: e.target.value })} 
          />

          <TextField 
            label="Tamaño" 
            fullWidth 
            value={nuevoIndicio.tamano} 
            onChange={(e) => setNuevoIndicio({ ...nuevoIndicio, tamano: e.target.value })} 
          />

          <TextField 
            label="Peso" 
            fullWidth 
            value={nuevoIndicio.peso} 
            onChange={(e) => setNuevoIndicio({ ...nuevoIndicio, peso: e.target.value })} 
          />

          <TextField 
            label="Ubicación" 
            fullWidth 
            value={nuevoIndicio.ubicacion} 
            onChange={(e) => setNuevoIndicio({ ...nuevoIndicio, ubicacion: e.target.value })} 
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenNuevoIndicio(false)}>Cancelar</Button>
          <Button variant="contained" onClick={guardarIndicio}>
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
  
}