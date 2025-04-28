import analyticsService from "../services/analytics.service";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";

const Analytics = () => {
    const [analytics, setAnalytics] = useState([]);

    const init = () => {
        analyticsService
            .getAll()
            .then((response) => {
                console.log("Mostrando listado de resumenes.", response.data);
                setAnalytics(response.data);
            })
            .catch((error) => {
                console.log(
                    "Se ha producido un error al intentar mostrar resumenes.",
                    error
                );
            });
    };

    useEffect(() => {
        init();
    }, []);

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left" sx={{ fontWeight: "bold" }}>
                            Año
                        </TableCell>
                        <TableCell align="left" sx={{ fontWeight: "bold" }}>
                            Mes
                        </TableCell>
                        <TableCell align="left" sx={{ fontWeight: "bold" }}>
                            Ganancias 10min/10vueltas
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: "bold" }}>
                            Ganancias 15min/15vueltas
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: "bold" }}>
                            Ganancias 20min/20vueltas
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: "bold" }}>
                            Ganancias grupos 1-2
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: "bold" }}>
                            Ganancias grupos 3-5
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: "bold" }}>
                            Ganancias grupos 6-10
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: "bold" }}>
                            Ganancias grupos 11-15
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {analytics.map((analytics) => (
                        <TableRow
                            key={analytics.id}
                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                        >
                            <TableCell align="left">{analytics.year}</TableCell>
                            <TableCell align="left">{analytics.month}</TableCell>
                            <TableCell align="left">{analytics.tenMins}</TableCell>
                            <TableCell align="left">{analytics.fifteenMins}</TableCell>
                            <TableCell align="left">{analytics.twentyMins}</TableCell>
                            <TableCell align="right">{analytics.smallGroup}</TableCell>
                            <TableCell align="right">{analytics.mediumGroup}</TableCell>
                            <TableCell align="right">{analytics.bigGroup}</TableCell>
                            <TableCell align="right">{analytics.veryBigGroup}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default Analytics;