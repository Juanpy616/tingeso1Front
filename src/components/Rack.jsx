import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { use, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import reservationService from "../services/reservation.service";
import { Box } from "@mui/material";
import esLocale from "@fullcalendar/core/locales/es";

const Rack = () => {
    const [reservations, setReservations] = useState([]);
    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await reservationService.getAll();
                console.log("API Response:", response.data); // Log the raw API response
                const reservationsData = response.data.map((reservation) => ({
                    id: reservation.id,
                    start: `${reservation.date}T${reservation.startTime}`, // Combine date and start time
                    end: `${reservation.date}T${reservation.endTime}`,     // Combine date and end time
                    title: reservation.clientName,
                }));
                console.log("Mapped Reservations:", reservationsData); // Log the mapped data
                setReservations(reservationsData);
            } catch (error) {
                console.error("Error fetching reservations:", error);
            }
        };
    
        fetchReservations();
    }, []);

    return(
        <Box sx={{ width: "100%", height: "100vh" }}>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="timeGridWeek"
                headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                }}
                weekends={true}
                events={reservations}
                locale={esLocale}
                allDaySlot={false}
                slotMinTime="10:00:00"
                slotMaxTime="22:00:00"
                slotDuration="00:05:00"
            />
        </Box>
    )
}

export default Rack;