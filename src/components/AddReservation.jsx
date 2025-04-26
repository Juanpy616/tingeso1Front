import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import reservationService from "../services/reservation.service";
import voucherService from "../services/voucher.service";
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
    const [quantity, setQuantity] = useState(1);
    const [duration, setDuration] = useState("");
    const [vouchers, setVouchers] = useState([]);
    const { id } = useParams();
    const [titleReservationForm, setTitleReservationForm] = useState("");
    const navigate = useNavigate();

    // Inicializar los vouchers cuando cambia la cantidad
    useEffect(() => {
        setVouchers(
            Array.from({ length: quantity }, () => ({
                clientName: "",
                clientEmail: "",
                basePrice: 0,
                specialDiscount: 0,
                sizeDiscount: 0,
                priceAfterDiscount: 0,
                iva: 0,
                finalPrice: 0,
            }))
        );
    }, [quantity]);

    // Manejar cambios en los campos de los vouchers
    const handleVoucherChange = (index, field, value) => {
        const updatedVouchers = [...vouchers];
        updatedVouchers[index][field] = value;
        setVouchers(updatedVouchers);
    };

    // Guardar la reserva y los vouchers
    const saveReservation = async (r) => {
        r.preventDefault();

        const reservation = { clientName, date, startTime, quantity, duration, id };

        try {
            let savedReservation;
            if (id) {
                // Actualizar reserva existente
                const response = await reservationService.update(reservation);
                console.log("Se actualizó la reserva.", response.data);
                savedReservation = response.data;
            } else {
                // Crear nueva reserva
                const response = await reservationService.create(reservation);
                console.log("Reserva ha sido añadida.", response.data);
                savedReservation = response.data;
            }

            // Asignar el ID de la reserva a los vouchers
            const vouchersWithReservationId = vouchers.map((voucher) => ({
                ...voucher,
                reservationId: savedReservation.id,
            }));

            // Crear los vouchers
            await Promise.all(
                vouchersWithReservationId.map((voucher) => voucherService.create(voucher))
            );

            console.log("Vouchers creados exitosamente.");
            navigate("/reservas");
        } catch (error) {
            console.error("Error al guardar la reserva o los vouchers:", error);
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
                    console.log("Se produjo un error.", error);
                });
        } else {
            setTitleReservationForm("Nueva Reserva");
        }
    }, [id]);

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

                <h2> Detalles de los Vouchers </h2>
                {vouchers.map((voucher, index) => (
                    <div key={index}>
                        <div style={{ display: "flex", gap: 16 }}>
                            <FormControl sx={{ flex: 1 }}>
                                <TextField
                                    color="info"
                                    label="Nombre"
                                    variant="filled"
                                    value={voucher.clientName}
                                    onChange={(e) =>
                                        handleVoucherChange(index, "clientName", e.target.value)
                                    }
                                />
                            </FormControl>

                            <FormControl sx={{ flex: 1 }}>
                                <TextField
                                    color="info"
                                    label="Email"
                                    variant="filled"
                                    type="email"
                                    value={voucher.clientEmail}
                                    onChange={(e) =>
                                        handleVoucherChange(index, "clientEmail", e.target.value)
                                    }
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
                                    value={voucher.basePrice}
                                    onChange={(e) =>
                                        handleVoucherChange(index, "basePrice", parseFloat(e.target.value))
                                    }
                                />
                            </FormControl>

                            <FormControl sx={{ flex: 1 }}>
                                <TextField
                                    color="info"
                                    label="Descuento"
                                    variant="filled"
                                    type="number"
                                    value={voucher.specialDiscount}
                                    onChange={(e) =>
                                        handleVoucherChange(index, "specialDiscount", parseFloat(e.target.value))
                                    }
                                />
                            </FormControl>
                        </div>
                    </div>
                ))}

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