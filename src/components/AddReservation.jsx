import { useState, useEffect } from "react";
import { Link, useParams, useNavigate, Form } from "react-router-dom";
import dayjs from "dayjs";
import reservationService from "../services/reservation.service";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import SaveIcon from "@mui/icons-material/Save";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";

const AddReservation = () => {
    const [clientName, setClientName] = useState("");
    const [date, setDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [quantity, setQuantity] = useState("");
    const [duration, setDuration] = useState("");
    const { id } = useParams();
    const [titleReservationForm, setTitleReservationForm] = useState("");
    const navigate = useNavigate();

    const saveReservation = (r) => {
        r.preventDefault();

        const reservation = { clientName, date, startTime, quantity, duration, id };
        if (id) {
            reservationService
                .update(reservation)
                .then((response) => {
                    console.log("Se actualizó la reserva.", response.data);
                    navigate("/reservas");
                })
                .catch((error) => {
                    console.log(
                        "Ha ocurrido un error al intentar actualizar datos del empleado.",
                        error
                    );
                });
        } else {
            reservationService
                .create(reservation)
                .then((response) => {
                    console.log("Reserva ha sido añadida.", response.data);
                    navigate("/reservas");
                })
                .catch((error) => {
                    console.log(
                        "Ha ocurrido un error al intentar hacer reserva.",
                        error
                    );
                });
        }
    };

    useEffect(() => {
        if (id) {
            setTitleReservationForm("Editar Reserva");
            reservationService
                .get(id)
                .then((reservation) => {
                    setClientName(reservation.data.clientName);
                    setDate(reservation.data.date);
                    setStartTime(reservation.data.startTime);
                    setQuantity(reservation.data.quantity);
                    setDuration(reservation.data.duration);
                })
                .catch((error) => {
                    console.log("Se ha producido un error.", error);
                });
        } else {
            setTitleReservationForm("Nueva Reserva");
        }
    }, []);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                }}
            >
                <h1>{titleReservationForm}</h1>
                <FormControl fullWidth>
                    <TextField
                        id="clientName"
                        color="info"
                        label="Nombre de quien reserva"
                        variant="filled"
                        value={clientName}
                        onChange={(r) => setClientName(r.target.value)}
                    />
                </FormControl>

                <div style={{ display: "flex", gap: 16 }}>
                    <FormControl sx={{ flex: 1 }}>
                        <DatePicker
                            id="date"
                            disablePast
                            color="info"
                            label="Fecha"
                            value={date ? dayjs(date) : null}
                            onChange={(newValue) => {
                                if (newValue) {
                                    setDate(newValue.format("YYYY-MM-DD"));
                                }
                            }}
                        />
                    </FormControl>

                    <FormControl sx={{ flex: 1 }}>
                        <TimePicker
                            id="startTime"
                            color="info"
                            label="Hora de Inicio"
                            viewRenderers={{
                                hours: renderTimeViewClock,
                                minutes: renderTimeViewClock,
                            }}
                            value={startTime ? dayjs(startTime, "HH:mm") : null}
                            onChange={(newValue) => {
                                if (newValue) {
                                    setStartTime(newValue.format("HH:mm"));
                                }
                            }}
                        />
                    </FormControl>
                </div>

                <div style={{ display: "flex", gap: 16 }}>
                    <FormControl sx={{ flex: 1 }}>
                        <TextField
                            id="duration"
                            label="Duración o Número de Vueltas"
                            value={duration}
                            select
                            variant="filled"
                            onChange={(r) => setDuration(r.target.value)}
                        >
                            <MenuItem value={30}>10 minutos/10 vueltas</MenuItem>
                            <MenuItem value={35}>15 minutos/15 vueltas</MenuItem>
                            <MenuItem value={40}>20 minutos/20 vueltas</MenuItem>
                        </TextField>
                    </FormControl>

                    <FormControl sx={{ flex: 1 }}>
                        <TextField
                            id="quantity"
                            color="info"
                            label="Cantidad de Personas"
                            variant="filled"
                            type="number"
                            value={quantity}
                            onChange={(r) => {
                                const value = parseInt(r.target.value, 10);
                                if (value >= 1 && value <= 15) {
                                    setQuantity(value);
                                } else if (value < 1) {
                                    setQuantity(1);
                                } else if (value > 15) {
                                    setQuantity(15);
                                }
                            }}
                            helperText="Máximo 15 personas"
                            slotProps={{
                                input: { min: 1, max: 15 },
                            }}
                        />
                    </FormControl>
                </div>

                <br />

                <h2> Detalles de pago </h2>
                <div style={{ display: "flex", gap: 16 }}>
                    <FormControl sx={{ flex: 1 }}>
                        <TextField
                            color="info"
                            label="Nombre"
                            variant="filled"
                        />
                    </FormControl>

                    <FormControl sx={{ flex: 1 }}>
                        <TextField
                            color="info"
                            label="Email"
                            variant="filled"
                            type="email"
                        />
                    </FormControl>
                </div>

                <div style={{ display: "flex", gap: 16 }}>
                    <FormControl sx={{ flex: 1 }}>
                        <TextField
                            color="info"
                            label="Tarifa Base"
                            variant="filled"
                            type="number"
                            helperText="Si no se especifica, se toma el valor por defecto"
                            slotProps={{
                                input: { min: 1 },
                            }}
                        />
                    </FormControl>

                    <FormControl sx={{ flex: 1 }}>
                        <TextField
                            color="info"
                            label="Descuento"
                            variant="filled"
                            type="number"
                            helperText="Si no se especifica, se aplica el descuento de cliente frecuente"
                            slotProps={{
                                input: { min: 0, max: 100 },
                            }}
                        />
                    </FormControl>
                </div>

                <FormControl>
                    <Button
                        variant="contained"
                        color="info"
                        onClick={(r) => saveReservation(r)}
                        startIcon={<SaveIcon />}
                    >
                        Guardar Reserva
                    </Button>
                </FormControl>

                <Link to="/reservas">De vuelta a la lista de reservas</Link>
            </Box>
        </LocalizationProvider>
    );
};

export default AddReservation;