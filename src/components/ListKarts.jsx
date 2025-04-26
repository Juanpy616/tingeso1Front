import { useState, useEffect } from "react";
import kartService from "../services/kart.service"; // Asegúrate de tener este servicio configurado
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const ListKarts = () => {
  const [karts, setKarts] = useState([]);

  // Obtener el listado de karts
  const fetchKarts = () => {
    kartService
      .getAll()
      .then((response) => {
        console.log("Mostrando listado de karts.", response.data);
        setKarts(response.data);
      })
      .catch((error) => {
        console.error("Se ha producido un error al obtener los karts:", error);
      });
  };

  // Cambiar la disponibilidad de un kart
  const toggleAvailability = (kart) => {
    const updatedKart = { ...kart, active: kart.active === 1 ? 0 : 1 };

    kartService
      .update(kart.id, updatedKart)
      .then(() => {
        console.log(`Disponibilidad del kart ${kart.id} actualizada a ${updatedKart.active}.`);
        setKarts((prevKarts) =>
          prevKarts.map((k) => (k.id === kart.id ? { ...k, active: updatedKart.active } : k))
        );
      })
      .catch((error) => {
        console.error("Error al actualizar la disponibilidad del kart:", error);
      });
  };

  const deleteKart = (kartId) => {
    kartService
      .remove(kartId)
      .then(() => {
        console.log(`Kart con ID ${kartId} eliminado.`);
        fetchKarts(); // Refrescar la lista de karts
      })
      .catch((error) => {
        console.error("Error al eliminar el kart:", error);
      });
  };

  useEffect(() => {
    fetchKarts();
  }, []);

  return (
    <div className="list-karts">
      <h1>Listado de Karts</h1>
      <Link
        to="/karts/add"
        style={{ textDecoration: "none", marginBottom: "1rem" }}
      >
        <Button variant="contained" color="primary">
          Agregar Kart
        </Button>
      </Link>
      {karts.map((kart) => (
        <div key={kart.id} className="kart-item">
          <h3>Nombre: {kart.name}</h3>
          <p>Disponibilidad: {kart.active === 1 ? "Disponible" : "No Disponible"}</p>
          <Button
            variant="contained"
            color={kart.active === 1 ? "secondary" : "primary"}
            onClick={() => toggleAvailability(kart)}
          >
            {kart.active === 1 ? "Marcar como No Disponible" : "Marcar como Disponible"}
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => deleteKart(kart.id)}
          >
            Borrar
          </Button>
        </div>
      ))}
    </div>
  );
};

export default ListKarts;