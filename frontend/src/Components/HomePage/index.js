import { React } from "react";
import Header from "./../Header";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { LoginForm } from "./../LoginForm";
import { SignUpForm } from "./../SignUpForm";
import { Templates } from "../Templates";
import { FAQ } from "../FAQ";
import ResponsiveDrawer from "../CandidateAccount";

const HomePage = () => {
  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/signup" component={SignUpForm} />
          <Route exact path="/faq" component={FAQ} />
          <Route exact path="/templates" component={Templates} />
          <Redirect from="./login" to="./genericcandidateaccount" />
        </Switch>
      </Router>
    </>
  );
};

export default HomePage;
