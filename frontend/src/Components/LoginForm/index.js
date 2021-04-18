import React, { useEffect, useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { Route, useHistory } from "react-router-dom";
import "./index.css";
import CandidateAccount from "../CandidateAccount";


const LoginForm = (props) => {
  const [values, setValues] = useState({
    username: "",
    usernameError: false,
    pw: "",
    passwordError: false,
  });

  const history = useHistory();

  //Updates respective state from Textfields
  const updateFieldState = (e) => {
    const key = e.target.name;
    setValues((values) => ({
      ...values,
      [key]: e.target.value, 
    }));
  };

  const attemptLogin = async (e) => {
    console.log("attempting login", values.username, values.pw);
    const reqOptions = {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: values.username,
        password: values.pw,
      }),
    };

    const res = await fetch(
      "https://eazyrec.herokuapp.com/api/token-auth/",
      reqOptions
    );
    console.log(res.status);
    const d = await res.json();
    console.log(d);
    if (res.status === 200) {
      const id = d.user_id;
      history.push(`/candidateaccount/:${id}`);
      window.location.reload();
    } else if (res.status === 400) {
      alert("Error signing in");
    }

    e.preventDefault();
  };

/*
    if (this.state.loggedIn) {
      return (
        <Route path=
        // <Router path="./genericcandidateaccount">
        //<Redirect from="/login" to="/candidateaccount:this.state.userId" />
        // </Router>
      );
    }
*/
  return (
    <>
      <div className="formContainer">
        <form className="loginForm" action="login" method="post">
          <div className="entryField">
            <TextField
              id="email"
              label="Email"
              name="username"
              variant="standard"
              value={values.username}
              onChange={updateFieldState}
              autoComplete="off"
              error={values.usernameError}
              helperText={values.usernameError ? "Username Error!" : ""}
            />
          </div>
          <div className="entryField">
            <TextField
              id="password"
              label="Password"
              name="pw"
              variant="standard"
              value={values.pw}
              onChange={updateFieldState}
              type="password"
            />
          </div>
          <div className="submitButton">
            <Button variant="contained" onClick={attemptLogin}>
              Login
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default LoginForm;