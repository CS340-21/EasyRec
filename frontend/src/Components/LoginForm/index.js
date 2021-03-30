import React, { Component, useEffect, useState } from "react";
import { TextField, Button } from "@material-ui/core";
import "./index.css";

export class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      usernameError: false,
      pw: "",
      passwordError: false,
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
    const d = await res.json();
    console.log(d);

    // .then(
    //   async (res) => {
    //     let d = await res.json();
    //     console.log(d);
    //   }
    // );
    e.preventDefault();
  }
  render() {
    const { username, usernameError, pw, passwordError } = this.state;
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
