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
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

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
                            <TableRow key={letter.title}>
                                <TableCell component="th" scope="row">
                                    <h3>{letter.author}</h3>
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    <h3>{letter.title}</h3>
                                </TableCell>
                                <TableCell align="center">
                                    <h3>
                                        {letter.pub_date.toLocaleDateString("en-us", {
                                            month: "2-digit",
                                            day: "2-digit",
                                            year: "numeric",
                                        })}
                                    </h3>
                                </TableCell>
                                <TableCell align="center">
                                    <button className={classes.iconButton}>
                                        {letter.permissions === 0 ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                    </button>
                                </TableCell>
                                <TableCell style={{width: "20px"}}>
                                    <button className={classes.iconButton}>
                                        <PublishIcon/>
                                    </button>
                                </TableCell>
                                <TableCell>
                                    <button className={classes.iconButton}>
                                        <DeleteIcon/>
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
            borderStyle: "none",
            "&:hover": {
                cursor: "pointer",
            },
            "&:active": {
                transform: "scale(1.15)",
            },
        },
    })
);

// create dummy data for design purposes -- comment out to use volId data
function createData(pub_date, author, candidate, title, permissions) {
    return { pub_date, author, candidate, title, permissions };
}

const letters = [
    createData(new Date("2021-02-15"), "Dr. Ross Ketron", "Ross Ketron", "Some Boring Title", 0),
    createData(new Date("2021-01-15"), "Dr. Ross Ketron", "Ross Ketron", "Different Boring Title", 1),
    createData(new Date("2021-02-18"), "Dr. Ross Ketron", "Ross Ketron", "Boring Title", 0),
    createData(new Date("2021-03-15"), "Dr. Ross Ketron", "Ross Ketron", "Another Boring Title", 1),
    createData(new Date("2021-01-20"), "Dr. Ross Ketron", "Ross Ketron", "Some Boring Title", 0),
    createData(new Date("2021-02-15"), "Dr. Ross Ketron", "Ross Ketron", "Some Boring Title", 1),
    createData(new Date("2021-02-15"), "Dr. Ross Ketron", "Ross Ketron", "Some Boring Title", 0),
    createData(new Date("2021-02-15"), "Dr. Ross Ketron", "Ross Ketron", "Some Boring Title", 1),
]
