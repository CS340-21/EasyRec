import React, { Component } from "react";
import { TextField, Button } from "@material-ui/core";
import "./index.css";

export class SignUpForm extends Component {
  render() {
    return (
      <>
        <div className="signupFormContainer">
          <form className="signupForm" action="login" method="post">
            <div>
              <h3>First Name</h3>
              <TextField
                id="firstname"
                label="First Name"
                variant="standard"
                fullWidth="true"
              />
            </div>
            <div>
              <h3>Last Name</h3>
              <TextField
                id="lastname"
                label="Last Name"
                variant="standard"
                fullWidth="true"
              />
            </div>
            <div>
              <h3>Email</h3>
              <TextField
                id="firstname"
                label="Email"
                variant="standard"
                fullWidth="true"
              />
            </div>
            <div>
              <h3>Username</h3>
              <TextField
                id="username"
                label="New Username"
                variant="standard"
                fullWidth="true"
              />
            </div>
            <div>
              <h3>Password</h3>
              <TextField
                id="password"
                label="New Password"
                variant="standard"
                fullWidth="true"
              />
            </div>
            <div>
              <h3>Confirm Password</h3>
              <TextField
                id="confirmpassword"
                label="Confirm Password"
                variant="standard"
                fullWidth="true"
              />
            </div>
            <div className="submitButton">
              <Button variant="contained">Create Account</Button>
            </div>
          </form>
        </div>
      </>
    );
  }
}

export default SignUpForm;
