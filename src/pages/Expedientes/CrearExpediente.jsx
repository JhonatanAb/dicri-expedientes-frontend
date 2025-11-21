import React, { useState } from "react";
import { TextField, Button, Card, CardContent, Typography } from "@mui/material";
import { crearExpediente } from "../../services/expedienteService";

export default function CrearExpediente() {
  const [numero, setNumero] = useState("");
  const [tecnico, setTecnico] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      numero_expediente: numero,
      tecnico_registra: parseInt(tecnico)
    };

    await crearExpediente(data);

    alert("Expediente creado correctamente");
    setNumero("");
    setTecnico("");
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">Crear Expediente</Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Número de expediente"
            fullWidth
            margin="normal"
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
            required
          />

          <TextField
            label="ID Técnico"
            type="number"
            fullWidth
            margin="normal"
            value={tecnico}
            onChange={(e) => setTecnico(e.target.value)}
            required
          />

          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 2 }}
          >
            Crear
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}