import React, { Component, useEffect, useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { Router, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
import "./index.css";

const history = createBrowserHistory();

export class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      usernameError: false,
      pw: "",
      passwordError: false,
      loggedIn: false,
      userId: -1,
    };

    this.updateFieldState = this.updateFieldState.bind(this);
    this.attemptLogin = this.attemptLogin.bind(this);
  }

  //Updates respective state from Textfields
  updateFieldState(e) {
    const key = e.target.name;
    this.setState({ [key]: e.target.value });
  }

  async attemptLogin(e) {
    console.log("attempting login", this.state.username, this.state.paw);
    const reqOptions = {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.pw,
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
      this.setState({ loggedIn: true, userId: d.user_id });
    } else if (res.status === 400) {
      alert("Error signing in");
    }

    e.preventDefault();
  }

  render() {
    const { username, usernameError, pw, passwordError } = this.state;

    if (this.state.loggedIn) {
      return (
        // <Router path="./genericcandidateaccount">
        <Redirect from="./login" to="./genericcandidateaccount" />
        // </Router>
      );
    }
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
                value={username}
                onChange={this.updateFieldState}
                autoComplete="off"
                error={usernameError}
                helperText={usernameError ? "Username Error!" : ""}
              />
            </div>
            <div className="entryField">
              <TextField
                id="password"
                label="Password"
                name="pw"
                variant="standard"
                value={pw}
                onChange={this.updateFieldState}
                type="password"
              />
            </div>
            <div className="submitButton">
              <Button variant="contained" onClick={this.attemptLogin}>
                Login
              </Button>
            </div>
          </form>
        </div>
      </>
    );
  }
}

export default LoginForm;
