import React from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Divider,
  Typography,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import FolderIcon from "@mui/icons-material/Folder";
import ReportIcon from "@mui/icons-material/Assessment";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useLocation } from "react-router-dom";

const drawerWidth = 240;

export default function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/" },
    { text: "Crear Expediente", icon: <AddCircleIcon />, path: "/expedientes/crear" },
    { text: "Listado de Expedientes", icon: <FolderIcon />, path: "/expedientes" },
  ];

  const herramientasItems = [
    { text: "Reportes", icon: <ReportIcon />, path: "/reportes" },
  ];

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#0d1b2a",
          color: "#fff",
          paddingTop: 1,
        },
      }}
    >
      <Toolbar>
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#fff" }}>
          MP Guatemala
        </Typography>
      </Toolbar>

      <Divider sx={{ background: "rgba(255,255,255,0.2)" }} />

      <List>
        <Typography
          variant="subtitle2"
          sx={{ ml: 2, mb: 1, opacity: 0.7, textTransform: "uppercase" }}
        >
          Menú Principal
        </Typography>

        {menuItems.map((item) => (
          <ListItemButton
            key={item.text}
            component={Link}
            to={item.path}
            sx={{
              color: location.pathname === item.path ? "#1e90ff" : "#fff",
              backgroundColor:
                location.pathname === item.path ? "rgba(30,144,255,0.15)" : "transparent",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.1)",
              },
            }}
          >
            <ListItemIcon sx={{ color: "inherit" }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>

      <Divider sx={{ background: "rgba(255,255,255,0.2)", mt: 1 }} />

      <List>
        <Typography
          variant="subtitle2"
          sx={{ ml: 2, mb: 1, opacity: 0.7, textTransform: "uppercase" }}
        >
          Herramientas
        </Typography>

        {herramientasItems.map((item) => (
          <ListItemButton
            key={item.text}
            component={Link}
            to={item.path}
            sx={{
              color: location.pathname === item.path ? "#1e90ff" : "#fff",
              backgroundColor:
                location.pathname === item.path ? "rgba(30,144,255,0.15)" : "transparent",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.1)",
              },
            }}
          >
            <ListItemIcon sx={{ color: "inherit" }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
      <Divider sx={{ background: "rgba(255,255,255,0.2)", mt: 2 }} />

<List>
  <Typography
    variant="subtitle2"
    sx={{ ml: 2, mb: 1, opacity: 0.7, textTransform: "uppercase" }}
  >
    Cuenta
  </Typography>

  <ListItemButton
    onClick={() => {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }}
    sx={{
      color: "#fff",
      "&:hover": {
        backgroundColor: "rgba(255,255,255,0.1)",
      },
    }}
  >
    <ListItemIcon sx={{ color: "inherit" }}>
    <LogoutIcon/>
    </ListItemIcon>
    <ListItemText primary="Cerrar sesión" />
  </ListItemButton>
</List>

    </Drawer>
  );
}