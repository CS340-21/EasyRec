import React, { Component, useEffect, useState } from "react";
import { TextField, Button } from "@material-ui/core";
import "./index.css";

export class LoginForm extends Component {
  render() {
    return (
      <>
        <div className="formContainer">
          <form className="loginForm" action="login" method="post">
            <div className="entryField">
              {/* <h2>Username</h2> */}
              <TextField id="email" label="Email" variant="standard" />
            </div>
            <div className="entryField">
              {/* <h2>Password</h2> */}
              <TextField id="password" label="Password" variant="standard" />
            </div>
            <div className="submitButton">
              <Button variant="contained">Login</Button>
            </div>
          </form>
        </div>
      </>
    );
  }
}

export default LoginForm;
