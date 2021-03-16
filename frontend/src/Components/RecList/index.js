import React, { useState } from "react";
import { createStyles, makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import SortIcon from "@material-ui/icons/Sort";
import Pagination from "@material-ui/lab/Pagination";

// create attended events table for current volunteer
export default function RecList() {
    const classes = useStyles();
    const eventsPerPage = 5;
    const [page, setPage] = useState(1);

    const handleChange = (event, newPage) => {
        setPage(newPage);
    };

    // Uncomment to use actual volunteer data for volId from server
    //const rows: Array<Event> = props.attendedEvents ? props.attendedEvents : [];

    const numPages = rows.length > 0 ? Math.ceil(rows.length / eventsPerPage) : 0;
    const emptyRows = numPages > 0 ? numPages * eventsPerPage - rows.length : eventsPerPage;

    return (
        <TableContainer component={Paper} className={classes.tableContainer}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>
                                Event Name&nbsp;&nbsp;
                                <SortIcon style={{ verticalAlign: "middle" }} />
                        </StyledTableCell>
                        <StyledTableCell align="center">
                            <h4>Date</h4>
                        </StyledTableCell>
                        <StyledTableCell>
                            <h4 style={{ textAlign: "center" }}>
                                Hours&nbsp;&nbsp;
                                <SortIcon style={{ verticalAlign: "middle" }} />
                            </h4>
                        </StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.length > 0 &&
                        (numPages > 0
                            ? rows.slice((page - 1) * eventsPerPage, (page - 1) * eventsPerPage + eventsPerPage)
                            : rows
                        ).map(row => (
                            <TableRow key={row.name} className={classes.eventRow}>
                                <TableCell component="th" scope="row">
                                    <h6>{row.name}</h6>
                                </TableCell>
                                <TableCell align="center">
                                    <h6>
                                        {row.endDate?.toLocaleDateString("en-us", {
                                            month: "2-digit",
                                            day: "2-digit",
                                            year: "numeric",
                                        })}
                                    </h6>
                                </TableCell>
                                <TableCell align="center">
                                    <h6>{row.hours}</h6>
                                </TableCell>
                            </TableRow>
                        ))}
                    {page === numPages && emptyRows > 0 && (
                        <TableRow style={{ height: 58 * emptyRows }}>
                            <TableCell colSpan={3} style={{ border: "none" }} />
                        </TableRow>
                    )}
                    {numPages === 0 && (
                        <TableRow style={{ height: 58 * emptyRows }}>
                            <TableCell
                                colSpan={3}
                                style={{
                                    border: "none",
                                }}
                            >
                                <h6>No Attended Events</h6>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <div className={classes.tableFooter}>
                <div />
                <div>
                    <Pagination count={numPages} page={page} onChange={handleChange} />
                </div>
                <div />
            </div>
        </TableContainer>
    );
}

// style attended event table header row cells
const StyledTableCell = withStyles((theme) =>
    createStyles({
        head: {
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.text.primary,
            padding: "10px",
            verticalAlign: "middle",
        },
    })
)(TableCell);

// style attended event table container and cells
const useStyles = makeStyles((theme) =>
    createStyles({
        tableContainer: {
            border: `1px solid #c2c2c2`,
            width: "90vw",
            minWidth: "300px",
            maxWidth: "1400px",
            minHeight: "450px",
            padding: "10px 8px",
            backgroundColor: "#f4f4f4",
        },
        eventRow: {
            borderBottom: `2px solid #c2c2c2`,
        },
        tableFooter: {
            marginTop: "45px",
            height: "35px",
            width: "100%",
            display: "flex",
            alignItems: "end",
            justifyContent: "space-between",
        },
    })
);

// create dummy data for design purposes -- comment out to use volId data
function createData(name: string, endDate: Date, hours: number) {
    return { name, endDate, hours };
}

const rows = [
    createData("February Saturday Spruce Up", new Date("2021-02-15"), 2),
    createData("2021 North Knoxville Community Clean Up", new Date("2021-02-16"), 4),
    createData("Keep the TN River Beautiful Knoxville Clean Up", new Date("2021-02-12"), 3),
    createData("February Saturday Spruce Up 2", new Date("2021-02-05"), 2),
    createData("2021 North Knoxville Community Clean Up 2", new Date("2021-02-15"), 1),
    createData("Keep the TN River Beautiful Knoxville Clean Up 2", new Date("2021-02-22"), 2),
    createData("February Saturday Spruce Up 3", new Date("2021-02-20"), 2),
    createData("January Saturday Spruce Up", new Date("2021-01-10"), 1),
    createData("2020 North Knoxville Community Clean Up", new Date("2020-02-16"), 4),
    createData("Keep the Little River Beautiful Knoxville Clean Up", new Date("2020-04-12"), 3),
    createData("February Saturday Spruce Up 5", new Date("2021-02-05"), 2),
    createData("2021 South Knoxville Community Clean Up", new Date("2021-03-1"), 1),
    createData("Keep the TN River Beautiful Knoxville Clean Up 2", new Date("2021-02-22"), 2),
    createData("February Saturday Spruce Up 3", new Date("2021-02-20"), 2),
    createData("February Saturday Spruce Up", new Date("2021-02-15"), 2),
    createData("2021 North Knoxville Community Clean Up", new Date("2021-02-16"), 4),
    createData("Keep the TN River Beautiful Knoxville Clean Up", new Date("2021-02-12"), 3),
    createData("February Saturday Spruce Up 2", new Date("2021-02-05"), 2),
    createData("2021 North Knoxville Community Clean Up 2", new Date("2021-02-15"), 1),
    createData("Keep the TN River Beautiful Knoxville Clean Up 2", new Date("2021-02-22"), 2),
    createData("February Saturday Spruce Up 3", new Date("2021-02-20"), 2),
];