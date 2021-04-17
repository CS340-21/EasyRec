import HomePage from "./Components/HomePage";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import {BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CandidateAccount from "./Components/CandidateAccount";
import "./App.css";

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      width: "100%",
      height: "100vh",
      backgroundImage: `url(${
        process.env.PUBLIC_URL + "/desk_background.jpg"
      })`,
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
    },
  })
);

function App() {
  const style = useStyles();
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/">
            <div className={style.container}>
              <HomePage />
            </div>
          </Route>
          <Route path="/candidateaccount/:id">
            <CandidateAccount />
          </Route>
        </Switch>
        
      </Router>
    </div>
  );
}

export default App;
