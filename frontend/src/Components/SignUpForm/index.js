import React, { Component } from "react";
import { TextField, Button } from "@material-ui/core";
import "./index.css";

export class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: "",
      lname: "",
      email: "",
      org: null,
      pw: "",
      confirmPw: "",
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
        email: this.state.email,
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
    const props = this.props;
    return (
      <>
        <div className="signupFormContainer">
          <form className="signupForm" action="login" method="post">
            <div>
              <h3>First Name</h3>
              <TextField
                id="firstname"
                label="First Name"
                name="fname"
                variant="standard"
                fullWidth="true"
                value={this.state.fname}
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
                value={this.state.lname}
                onChange={this.updateFieldState}
              />
            </div>
            <div>
              <h3>Email</h3>
              <TextField
                id="firstname"
                label="Email"
                name="email"
                variant="standard"
                fullWidth="true"
                value={this.state.email}
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
                value={this.state.org}
                onChange={this.updateFieldState}
              />
            </div>
            <div>
              <h3>Password</h3>
              <TextField
                id="password"
                label="New Password"
                name="pw"
                variant="standard"
                fullWidth="true"
                value={this.state.pw}
                onChange={this.updateFieldState}
              />
            </div>
            <div>
              <h3>Confirm Password</h3>
              <TextField
                id="confirmpassword"
                label="Confirm Password"
                name="confirmPw"
                variant="standard"
                fullWidth="true"
                value={this.state.confirmPw}
                onChange={this.updateFieldState}
              />
            </div>
            <div className="submitButton">
              <Button variant="contained" onClick={this.submitForm}>
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
