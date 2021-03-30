import React, { Component, useEffect, useState } from "react";
import { TextField, Button } from "@material-ui/core";
import "./index.css";

export class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };

    this.updateFieldState = this.updateFieldState.bind(this);
    this.attemptLogin = this.attemptLogin.bind(this);
  }

  //Updates respective state from Textfields
  updateFieldState(e) {
    const key = e.target.name;
    this.setState({ [key]: e.target.value });
  }

  attemptLogin(e) {
    console.log("attempting login", this.state.username, this.state.password);
    const reqOptions = {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }),
    };

    fetch("https://eazyrec.herokuapp.com/api/token-auth/", reqOptions).then(
      async (res) => {
        let d = await res.json();
        console.log(d);
      }
    );
    e.preventDefault();
  }
  render() {
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
                value={this.state.username}
                onChange={this.updateFieldState}
              />
            </div>
            <div className="entryField">
              <TextField
                id="password"
                label="Password"
                name="password"
                variant="standard"
                value={this.state.password}
                onChange={this.updateFieldState}
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
