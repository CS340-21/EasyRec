import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import GroupWorkIcon from "@material-ui/icons/GroupWork";
import SendIcon from "@material-ui/icons/Send";
import ListIcon from "@material-ui/icons/ViewList";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import RecList from "../RecList";
import axios from "axios";
import { TextField, Button } from "@material-ui/core";

const drawerWidth = 175;

const CandidateAccount = (props) => {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mainContent, setMainContent] = useState("WrittenLetters");
  const [user, setUser] = useState([]);
  const [values, setValues] = useState({
    title: "",
    firstName: "",
    lastName: "",
    email: "",
  });
  let params = useParams();
  const userId = params.id.toString().split(":")[1];

  /* Get User info from database */
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(
          `https://eazyrec.herokuapp.com/api/user/${userId}`
        );
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [userId]);

  /* Functions to handle input and button clicks */
  const handleTextChange = (event) => {
    setValues((values) => ({
      ...values,
      [event.target.id]: event.target.value,
    }));
  };

  const handleRequestSubmitButton = () => {
    if (
      values.firstName === "" ||
      values.lastName === "" ||
      values.email === ""
    ) {
      alert("Please fill all required fields");
    } else {
      alert("Email is not set up yet but please check back soon");
    }
  };

  const handleSubmitLetterUpload = () => {
    if (values.title === "" || values.email === "") {
      alert("Please fill all required fields");
    } else {
      uploadLetterToServer(user.id, values.email);
    }
  };

  // TODO: THIS IS NOT WORKING YET, Seems like it might be a django integration issue, CORS error
  const uploadLetterToServer = (userid, recipEmail) => {
    let data = { author_id: userid, email: recipEmail };

    const formData = new FormData();
    const fileField = document.querySelector('input[type="file"]');

    formData.append("author_id", userid);
    formData.append("email", recipEmail);
    // formData.append("data", data);
    formData.append("file", fileField.files[0]);

    let json = JSON.stringify(formData);

    fetch("https://eazyrec.herokuapp.com/api/upload/", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Success:", result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <ListItem
          button
          key="WrittenLetters"
          onClick={() => setMainContent("WrittenLetters")}
        >
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Written" />
        </ListItem>
        <ListItem
          button
          key="ReceivedLetters"
          onClick={() => setMainContent("ReceivedLetters")}
        >
          <ListItemIcon>
            <ListIcon />
          </ListItemIcon>
          <ListItemText primary="Received" />
        </ListItem>
        <ListItem
          button
          key="RequestLetter"
          onClick={() => setMainContent("RequestLetter")}
        >
          <ListItemIcon>
            <SendIcon />
          </ListItemIcon>
          <ListItemText primary="Request" />
        </ListItem>
        <ListItem
          button
          key="UploadLetter"
          onClick={() => setMainContent("UploadLetter")}
        >
          <ListItemIcon>
            <CloudUploadIcon />
          </ListItemIcon>
          <ListItemText primary="Upload" />
        </ListItem>
        <ListItem
          button
          key="Campaigns"
          onClick={() => setMainContent("Campaigns")}
        >
          <ListItemIcon>
            <GroupWorkIcon />
          </ListItemIcon>
          <ListItemText primary="Campaigns" />
        </ListItem>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          {(() => {
            switch (mainContent) {
              case "ReceivedLetters":
                return (
                  <Typography variant="h6" noWrap>
                    Received Letters of Recommendation
                  </Typography>
                );

              case "RequestLetter":
                return (
                  <Typography variant="h6" noWrap>
                    Request Letter of Recommendation
                  </Typography>
                );

              case "UploadLetter":
                return (
                  <Typography variant="h6" noWrap>
                    Upload Letter of Recommendation
                  </Typography>
                );

              case "Campaigns":
                return (
                  <Typography variant="h6" noWrap>
                    Your Active Campaigns
                  </Typography>
                );

              default:
                return (
                  <Typography variant="h6" noWrap>
                    Written Letters of Recommendation
                  </Typography>
                );
            }
          })()}
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {(() => {
          switch (mainContent) {
            case "ReceivedLetters":
              return <RecList user={user} letterType="received" />;

            case "UploadLetter":
              return (
                <div className={classes.uploadContainer}>
                  <TextField
                    style={{
                      width: "40%",
                    }}
                    id="title"
                    label="Title"
                    type="text"
                    variant="outlined"
                    required
                    value={values.title}
                    rowsMax={4}
                    onChange={handleTextChange}
                  />
                  <TextField
                    style={{
                      width: "40%",
                    }}
                    id="email"
                    label="Recipient Email"
                    type="text"
                    variant="outlined"
                    required
                    value={values.email}
                    rowsMax={4}
                    onChange={handleTextChange}
                  />
                  <input
                    type="file"
                    className={classes.inputButton}
                    style={{ padding: "15px" }}
                  />
                  <Button
                    variant="contained"
                    type="submit"
                    className={classes.button}
                    style={{ padding: "20px" }}
                    onClick={handleSubmitLetterUpload}
                  >
                    Submit Letter Upload
                  </Button>
                </div>
              );

            case "RequestLetter":
              return (
                <>
                  <div className={classes.requestFormContainer}>
                    <Typography paragraph>
                      <TextField
                        style={{
                          marginRight: "10px",
                          marginBottom: "10px",
                          width: "100px",
                        }}
                        id="title"
                        label="Title"
                        type="text"
                        variant="outlined"
                        value={values.title}
                        rowsMax={4}
                        onChange={handleTextChange}
                      />
                      <TextField
                        style={{ marginRight: "10px", marginBottom: "10px" }}
                        id="firstName"
                        label="First Name"
                        type="text"
                        variant="outlined"
                        required
                        value={values.firstName}
                        rowsMax={4}
                        onChange={handleTextChange}
                      />
                      <TextField
                        style={{ marginRight: "10px", marginBottom: "10px" }}
                        id="lastName"
                        label="Last Name"
                        type="text"
                        variant="outlined"
                        required
                        value={values.lastName}
                        rowsMax={4}
                        onChange={handleTextChange}
                      />
                      <TextField
                        style={{ width: "300px" }}
                        id="email"
                        label="Email"
                        type="text"
                        variant="outlined"
                        required
                        value={values.email}
                        rowsMax={4}
                        onChange={handleTextChange}
                      />
                    </Typography>
                  </div>
                  <Button
                    variant="contained"
                    type="submit"
                    className={classes.button}
                    style={{ marginTop: "30px", padding: "20px" }}
                    onClick={handleRequestSubmitButton}
                  >
                    Send Request Email
                  </Button>
                </>
              );

            case "Campaigns":
              return <h1>Hi this is not done yet</h1>;

            default:
              //this is the user's written letters
              return <RecList user={user} letterType="written" />;
          }
        })()}
      </main>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    backgroundColor: "inherit",
    color: "black",
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  requestFormContainer: {
    marginTop: "40px",
  },
  button: {
    backgroundColor: "#343d52",
    color: "white",
    width: "300px",
    "&:hover": {
      backgroundColor: "#5d6475",
    },
  },
  inputButton: {
    backgroundColor: "#343d52",
    color: "white",
    width: "300px",
    borderRadius: "5px",
    "&:hover": {
      backgroundColor: "#5d6475",
    },
  },
  uploadContainer: {
    height: "60vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
}));

export default CandidateAccount;
