import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import PublishIcon from '@material-ui/icons/Publish';
import DeleteIcon from '@material-ui/icons/Delete';

// create attended events table for current volunteer
export default function RecList(props) {
    const classes = useStyles();

    // Uncomment to use actual volunteer data for volId from server
    //const letters = props.letters ? props.letters : [];

    return (
        <TableContainer component={Paper} className={classes.tableContainer}>
            <Table aria-label="simple table">
                <TableBody>
                    {letters.length > 0 &&
                        letters.map(letter => (
                            <TableRow key={letter.name}>
                                <TableCell component="th" scope="row">
                                    <h3>{letter.name}</h3>
                                </TableCell>
                                <TableCell align="center">
                                    <h3>
                                        {letter.date.toLocaleDateString("en-us", {
                                            month: "2-digit",
                                            day: "2-digit",
                                            year: "numeric",
                                        })}
                                    </h3>
                                </TableCell>
                                <TableCell align="center">
                                    <h3>{letter.numSubmits}</h3>
                                </TableCell>
                                <TableCell style={{width: "20px"}}>
                                    <button className={classes.iconButton}>
                                        <PublishIcon />
                                    </button>
                                </TableCell>
                                <TableCell>
                                    <button className={classes.iconButton}>
                                        <DeleteIcon />
                                    </button>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

// style attended event table container and cells
const useStyles = makeStyles((theme) =>
    createStyles({
        tableContainer: {
            width: "100%",
            minWidth: "300px",
            maxWidth: "1400px",
            minHeight: "450px",
            padding: "10px 8px",
        },
        tableFooter: {
            marginTop: "45px",
            height: "35px",
            width: "100%",
            display: "flex",
            alignItems: "end",
            justifyContent: "space-between",
        },
        iconButton: {
            background: "none",
            border: "none",
            "&:hover": {
                cursor: "pointer",
            },
        },
    })
);

// create dummy data for design purposes -- comment out to use volId data
function createData(name, date, numSubmits) {
    return { name, date, numSubmits };
}

const letters = [
    createData("Dr. Ricky Bobby", new Date("2021-02-15"), 1),
    createData("Dr. Jimothy Plankton", new Date("2021-02-16"), 4),
    createData("John Smith", new Date("2021-02-20"), 2),
    createData("John Smith", new Date("2021-02-15"), 2),
    createData("John Smith", new Date("2021-02-16"), 4),
    createData("John Smith", new Date("2021-02-12"), 3),
    createData("John Smith", new Date("2021-02-05"), 2),
    createData("John Smith", new Date("2021-02-15"), 1),
    createData("John Smith", new Date("2021-02-22"), 2),
    createData("John Smith", new Date("2021-02-20"), 2),
];
