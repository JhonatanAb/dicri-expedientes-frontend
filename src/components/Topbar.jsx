import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

export default function Topbar() {
  return (
    <AppBar position="static" color="primary" elevation={1}>
      <Toolbar>
        <Typography variant="h6" component="div">
          Sistema DICRI
        </Typography>
      </Toolbar>
    </AppBar>
  );
}