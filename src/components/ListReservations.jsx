import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import reservationService from "../services/reservation.service";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const ListReservations = () => {
  const [reservations, setReservations] = useState([]);

  const navigate = useNavigate();

  const init = () => {
    reservationService
      .getAll()
      .then((response) => {
        console.log("Mostrando listado de todas las reservas.", response.data);
        setReservations(response.data);
      })
      .catch((error) => {
        console.log(
          "Se ha producido un error al intentar mostrar listado de todas las reservas.",
          error
        );
      });
  };

  useEffect(() => {
    init();
  }, []);

  const handleAddVouchers = (id) => {
    console.log("Adding vouchers for reservation", id);
    navigate(`/reservas/${id}/vouchers`); // Redirige a la página para agregar vouchers
  };

  const handleDelete = (id) => {
    console.log("Printing id", id);
    const confirmDelete = window.confirm(
      "¿Realmente desea borrar esta reserva?"
    );
    if (confirmDelete) {
      reservationService
        .remove(id)
        .then((response) => {
          console.log("Se eliminó la reserva", response.data);
          init();
        })
        .catch((error) => {
          console.log(
            "Se produjo un error al intentar eliminar la reserva",
            error
          );
        });
    }
  };

  const handleEdit = (id) => {
    console.log("Printing id", id);
    navigate(`/reservas/edit/${id}`);
  };

  return (
    <TableContainer component={Paper}>
      <br />
      <Link
        to="/reservas/add"
        style={{ textDecoration: "none", marginBottom: "1rem" }}
      >
        <Button
          variant="contained"
          color="primary"
          startIcon={<PersonAddIcon />}
        >
          Hacer Reserva
        </Button>
      </Link>
      <br /> <br />
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>
              ID
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>
              Duración (Minutos)
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>
              Fecha
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Hora de Inicio
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
            Hora de Fin
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Cantidad de Personas
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Nombre de quien reserva
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reservations.map((reservation) => (
            <TableRow
              key={reservation.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="left">{reservation.id}</TableCell>
              <TableCell align="left">{reservation.duration}</TableCell>
              <TableCell align="left">{reservation.date}</TableCell>
              <TableCell align="right">{reservation.startTime}</TableCell>
              <TableCell align="right">{reservation.endTime}</TableCell>
              <TableCell align="right">{reservation.quantity}</TableCell>
              <TableCell align="right">{reservation.clientName}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="info"
                  size="small"
                  onClick={() => handleEdit(reservation.id)}
                  style={{ marginLeft: "0.3rem" }}
                  startIcon={<EditIcon />}
                >
                  Editar
                </Button>

                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={() => handleDelete(reservation.id)}
                  style={{ marginLeft: "0.3rem" }}
                  startIcon={<DeleteIcon />}
                >
                  Eliminar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ListReservations;
