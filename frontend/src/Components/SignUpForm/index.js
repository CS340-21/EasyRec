import React, { Component } from "react";
import { TextField, Button } from "@material-ui/core";
import "./index.css";

export class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: "",
      lname: "",
      e_mail: "",
      org: null,
      pw: "",
      confirmPw: "",
      readyToSubmit: false,
    };

    //bin this keyword to functions
    this.updateFieldState = this.updateFieldState.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  //Updates respective state from Textfields
  updateFieldState(e) {
    const key = e.target.name;
    this.setState({ [key]: e.target.value });
  }

  //Submit post request with forms information
  submitForm(e) {
    const reqOptions = {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        password: this.state.pw,
        email: this.state.e_mail,
        first_name: this.state.fname,
        last_name: this.state.lname,
        oragnization: this.state.org,
      }),
    };

    fetch("https://eazyrec.herokuapp.com/api/register/", reqOptions).then(
      async (res) => {
        let d = await res.json();
        console.log(d);
      }
    );
    e.preventDefault();
  }

  render() {
    const {
      fname,
      lname,
      e_mail,
      org,
      pw,
      confirmPw,
      readyToSubmit,
    } = this.state;
    return (
      <>
        <div className="signupFormContainer">
          <form className="signupForm">
            <div>
              <h3>First Name</h3>
              <TextField
                id="firstname"
                label="First Name"
                name="fname"
                variant="standard"
                fullWidth="true"
                value={fname}
                autoComplete="no"
                required="true"
                onChange={this.updateFieldState}
              />
            </div>
            <div>
              <h3>Last Name</h3>
              <TextField
                id="lastname"
                label="Last Name"
                name="lname"
                variant="standard"
                fullWidth="true"
                value={lname}
                autoComplete="no"
                required="true"
                onChange={this.updateFieldState}
              />
            </div>
            <div>
              <h3>Email</h3>
              <TextField
                id="email"
                label="Email"
                name="e_mail"
                variant="standard"
                fullWidth="true"
                value={e_mail}
                autoComplete="no"
                required="true"
                onChange={this.updateFieldState}
              />
            </div>
            <div>
              <h3>Organization/Institution</h3>
              <TextField
                id="Organization/Institution"
                label="Organization/Institution"
                name="org"
                variant="standard"
                fullWidth="true"
                value={org}
                autoComplete="no"
                onChange={this.updateFieldState}
              />
            </div>
            <div>
              <h3>Password</h3>
              <TextField
                id="password"
                label="New Password"
                name="pw"
                type="password"
                variant="standard"
                fullWidth="true"
                value={pw}
                autoComplete="no"
                required="true"
                onChange={this.updateFieldState}
              />
            </div>
            <div>
              <h3>Confirm Password</h3>
              <TextField
                id="confirmpassword"
                label="Confirm Password"
                name="confirmPw"
                type="password"
                variant="standard"
                fullWidth="true"
                value={confirmPw}
                autoComplete="no"
                required="true"
                onChange={this.updateFieldState}
                error={pw !== confirmPw}
                helperText={pw !== confirmPw ? "Passwords don't match!" : ""}
              />
            </div>
            <div className="submitButton">
              <Button
                variant="contained"
                // disabled={!readyToSubmit}
                onClick={this.submitForm}
              >
                Create Account
              </Button>
            </div>
          </form>
        </div>
      </>
    );
  }
}

export default SignUpForm;
