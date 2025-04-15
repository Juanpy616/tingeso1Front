import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
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
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';


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
            // Actualizar Datos Empelado
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
            // Crear nuevo empleado
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
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2,
                    //    "& .MuiInputLabel-root": { color: "#1976d2" }, // Label color
                    }}>
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

                <FormControl fullWidth>
                    <TextField
                        id="duration"
                        label="Duración o Número de Vueltas"
                        value={duration}
                        select
                        variant="standard"
                        onChange={(r) => setDuration(r.target.value)}
                    >
                        <MenuItem value={30}>10 minutos/10 vueltas</MenuItem>
                        <MenuItem value={35}>15 minutos/15 vueltas</MenuItem>
                        <MenuItem value={40}>20 minutos/20 vueltas</MenuItem>
                    </TextField>
                </FormControl>

                <FormControl>
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
                                setQuantity(value); // Only update state if within range
                            } else if (value < 1) {
                                setQuantity(1); // Set to minimum if below range
                            } else if (value > 15) {
                                setQuantity(15); // Set to maximum if above range
                            }
                        }}
                        helperText="Máximo 15 personas"
                        slotProps={{
                            input: { min: 1, max: 15 }, // Se pueden reservar hasta 15 personas
                        }}
                    />
                </FormControl>

                <FormControl>
                    <DatePicker
                        id="date"
                        disablePast
                        color="info"
                        label="Fecha"
                        value={date ? dayjs(date) : null} // Ensure dayjs only processes valid dates
                        onChange={(newValue) => {
                            if (newValue) {
                                setDate(newValue.format("YYYY-MM-DD")); // Update state with formatted date
                            }
                        }}
                    />
                </FormControl>

                <FormControl>
                    <TimePicker
                        id="startTime"
                        color="info"
                        label="Hora de Inicio"
                        viewRenderers={{
                            hours: renderTimeViewClock,
                            minutes: renderTimeViewClock,
                        }}
                        value={startTime ? dayjs(startTime, "HH:mm") : null} // Ensure dayjs only processes valid times
                        onChange={(newValue) => {
                            if (newValue) {
                                setStartTime(newValue.format("HH:mm")); // Update state with formatted time
                            }
                        }}
                    />
                </FormControl>

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