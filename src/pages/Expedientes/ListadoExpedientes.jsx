import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { obtenerExpedientes } from "../../services/expedienteService";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";

export default function ListadoExpedientes() {
  const [expedientes, setExpedientes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    const data = await obtenerExpedientes();
    setExpedientes(data);
  };

  const columns = [
    { field: "id_expediente", headerName: "ID", width: 100 },
    { field: "numero_expediente", headerName: "Expediente", width: 200 },
    { field: "estado", headerName: "Estado", width: 180 },
    { field: "fecha_registro", headerName: "Fecha Registro", width: 200 }
  ];

  
  const handleRowClick = (params) => {
    navigate(`/expedientes/${params.row.id_expediente}`);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" mb={2}>Listado de Expedientes</Typography>

      <div style={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={expedientes}
          columns={columns}
          getRowId={(row) => row.id_expediente}
          onRowClick={handleRowClick}
          pageSize={10}
        />
      </div>
    </Box>
  );
}