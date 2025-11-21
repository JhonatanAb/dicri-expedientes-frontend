import React, { useState } from "react";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";
import { login } from "../../services/authService";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { token, user } = await login(email, password);

      // Guardamos token
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      navigate("/"); // redirige al dashboard

    } catch (err) {
      setErrorMsg("Credenciales incorrectas");
    }
  };

  return (
    <Box sx={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#f5f5f5"
    }}>

      <Paper elevation={3} sx={{ padding: 4, width: 350 }}>
        
        <Typography variant="h5" mb={2}>
          Iniciar Sesión
        </Typography>

        {errorMsg && (
          <Typography color="error" mb={2}>{errorMsg}</Typography>
        )}

        <form onSubmit={handleSubmit}>
          <TextField 
            fullWidth 
            label="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
          />

          <TextField 
            fullWidth 
            label="Contraseña" 
            type="password"
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
          />

          <Button 
            fullWidth 
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 2 }}
          >
            Entrar
          </Button>
        </form>

      </Paper>
    </Box>
  );
}