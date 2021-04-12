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
import Popover from '@material-ui/core/Popover';
import { TextField } from "@material-ui/core";
import axios from "axios";

// create attended events table for current volunteer
export default function RecList({ user, letterType }) {
    const classes = useStyles();
    const [recipientCode, setRecipientCode] = React.useState("");
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleLetterSend = () => {
        alert("Letter sending is not yet set up");
    }

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handlePopoverClose = () => {
        setAnchorEl(null);
    }

    const handleTextChange = (event) => {
        setRecipientCode(event.target.value);
    }

    const handleLetterDelete = (event) => {
        deleteLetter(event.target.id)
    }

    // TODO: This does not work correctly
    const deleteLetter = (letterId) => {
        const reqOptions = {
            method: "delete",
            headers: {
                'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
               }
        };
      
        fetch(`https://eazyrec.herokuapp.com/api/letter/2`, reqOptions).then(
            async (res) => {
                let d = await res.json();
                console.log(d);
            }
        );
    }

    const popoverOpen = Boolean(anchorEl);
    const popoverId = popoverOpen ? "simple-popover" : undefined;

    //Uncomment to use actual volunteer data for volId from server
    let letters;
    if (letterType === "written") {
        letters = user.written ? user.written : [];
    } else {
        letters = user.received ? user.received : [];
    }

    return (
        <TableContainer component={Paper} className={classes.tableContainer}>
            <Table aria-label="simple table">
                <TableBody>
                    {letters.length > 0 &&
                        letters.map(letter => (
                            <TableRow key={letter.title}>
                                <TableCell component="th" scope="row">
                                    {letter.author}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {letter.title}
                                </TableCell>
                                <TableCell align="center">
                                    {letter.pub_date.split('T')[0]}
                                </TableCell>
                                <TableCell align="center">
                                    <button className={classes.iconButton}>
                                        {letter.permissions === 0 ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                    </button>
                                </TableCell>
                                <TableCell style={{width: "20px"}}>
                                    <button className={classes.iconButton}>
                                        <PublishIcon onClick={handlePopoverOpen} />
                                    </button>
                                    <Popover
                                        id={popoverId}
                                        open={popoverOpen}
                                        anchorEl={anchorEl}
                                        onClose={handlePopoverClose}
                                        anchorOrigin={{
                                        vertical: 'center',
                                        horizontal: 'center',
                                        }}
                                        transformOrigin={{
                                        vertical: 'center',
                                        horizontal: 'center',
                                        }}
                                    >
                                        <TextField
                                            id="code"
                                            label="Recipient Code"
                                            type="text"
                                            variant="filled"
                                            value={recipientCode}
                                            onChange={handleTextChange}
                                        />
                                        <button className={classes.iconButton}>
                                            <PublishIcon 
                                                style={{ marginTop: "15px" }}
                                                onClick={handleLetterSend} 
                                            />
                                        </button>
                                    </Popover>
                                </TableCell>
                                <TableCell>
                                    <button className={classes.iconButton}>
                                        <DeleteIcon id={letter.id} onClick={handleLetterDelete} />
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
            outline: "none",
            borderStyle: "none",
            "&:hover": {
                outline: "none",
                cursor: "pointer",
                border: "none",
            },
            "&:active": {
                outline: "none",
                transform: "scale(.75)",
                border: "none",
            },
        },
    })
);

/*
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
*/