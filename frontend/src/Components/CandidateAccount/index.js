import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import List from "@material-ui/core/List";
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SendIcon from '@material-ui/icons/Send';
import ListIcon from '@material-ui/icons/ViewList';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import RecList from '../RecList';
import axios from "axios";
import { TextField, Button } from '@material-ui/core';

const drawerWidth = 175;

const getServerSideProps = async (id) => {
  try {
    const res = await axios.get(`https://eazyrec.herokuapp.com/api/user/${id}`)
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

function ResponsiveDrawer(props, userId) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [values, setValues] = React.useState({
    title: "",
    firstName: "",
    lastName: "",
    email: "",
  });

  const handleTextChange = (event) => {
    setValues(values => ({ ...values, [event.target.id]: event.target.value }));
  };

  const handleRequestSubmitButton = () => {
    alert("Email is not set up yet but please check back soon");
  }


  userId = 1;

  const user = getServerSideProps(userId);
  console.log(user);

  // Set main content to user home page default.
  // options are 'Home', 'Letters', 'Request'
  const [mainContent, setMainContent] = React.useState("Home");

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
          <ListItem button key="WrittenLetters" onClick={() => setMainContent("WrittenLetters")}>
            <ListItemIcon><HomeIcon /></ListItemIcon>
            <ListItemText primary="Written" />
          </ListItem>
          <ListItem button key="ReceivedLetters" onClick={() => setMainContent("ReceivedLetters")}>
            <ListItemIcon><ListIcon /></ListItemIcon>
            <ListItemText primary="Received" />
          </ListItem>
          <ListItem button key="RequestLetter" onClick={() => setMainContent("RequestLetter")}>
            <ListItemIcon><SendIcon /></ListItemIcon>
            <ListItemText primary="Request" />
          </ListItem>
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

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
                    <Typography variant="h6" noWrap>Received Letters of Recommendation</Typography>
                  );
                case "RequestLetter":
                  return (
                    <Typography variant="h6" noWrap>Request Letter of Recommendation</Typography>
                  );
                default:
                  return (
                    <Typography variant="h6" noWrap>Written Letters of Recommendation</Typography>
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
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
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
              return ( <RecList props={{ user: user, letterType: "received" }} /> );

            case "RequestLetter":
              return (
                <>
                  <div className={classes.requestFormContainer}>
                    <Typography paragraph>
                      <TextField
                        style={{ margin: "10px" }}
                        id="title"
                        label="Title"
                        type="text"
                        variant="outlined"
                        value={values.title}
                        rowsMax={4}
                        onChange={handleTextChange}
                      />
                      <TextField
                        style={{ margin: "10px" }}
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
                        style={{ margin: "10px" }}
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
                        style={{ margin: "10px" }}
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
                    style={{ marginTop: "40px", marginLeft: "150px" }}
                    onClick={handleRequestSubmitButton}
                  >
                    Send Request Email
                  </Button>
                </>
              );

            default: //this is the user's received letters
              return ( <RecList props={{ user: user, letterType: "written" }} /> );
          }
        })()}
      </main>
    </div>
  );
}

export default ResponsiveDrawer;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    backgroundColor: "inherit",
    color: "black",
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
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
    margin: "10px",
  },
  button: {
    backgroundColor: "#343d52",
    color: "white",
    minWidth: "150px",
    "&:hover": {
      backgroundColor: "#5d6475"
    },
  },
}));