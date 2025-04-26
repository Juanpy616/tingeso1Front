import { useState } from "react";
import { useNavigate } from "react-router-dom";
import kartService from "../services/kart.service"; // Asegúrate de tener este servicio configurado
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

const AddKarts = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  // Función para guardar el kart
  const saveKart = () => {
    const newKart = { name };
    kartService
      .create(newKart)
      .then(() => {
        console.log("Kart creado exitosamente.");
        navigate("/karts"); // Redirige al listado de karts
      })
      .catch((error) => {
        console.error("Error al crear el kart:", error);
      });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: "400px",
        margin: "0 auto",
      }}
    >
      <h1>Crear Nuevo Kart</h1>
      <TextField
        label="Nombre del Kart"
        variant="filled"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={saveKart}
        disabled={!name.trim()} // Deshabilita el botón si el nombre está vacío
      >
        Guardar Kart
      </Button>
    </Box>
  );
};

export default AddKarts;