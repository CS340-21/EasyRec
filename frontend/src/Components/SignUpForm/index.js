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
    this.changeFirstName = this.changeFirstName.bind(this);
    this.changeLastName = this.changeLastName.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.changeOrganization = this.changeOrganization.bind(this);
    this.changePW = this.changePW.bind(this);
    this.changeConfimation = this.changeConfimation.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  //Each of the following functions change the respective state values
  changeFirstName(e) {
    this.setState({ fname: e.target.value });
  }
  changeLastName(e) {
    this.setState({ lname: e.target.value });
  }
  changeEmail(e) {
    this.setState({ email: e.target.value });
  }
  changeOrganization(e) {
    this.setState({ org: e.target.value });
  }
  changePW(e) {
    this.setState({ pw: e.target.value });
  }
  changeConfimation(e) {
    this.setState({ confirmPw: e.target.value });
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
                variant="standard"
                fullWidth="true"
                value={this.state.fname}
                onChange={this.changeFirstName}
              />
            </div>
            <div>
              <h3>Last Name</h3>
              <TextField
                id="lastname"
                label="Last Name"
                variant="standard"
                fullWidth="true"
                value={this.state.lname}
                onChange={this.changeLastName}
              />
            </div>
            <div>
              <h3>Email</h3>
              <TextField
                id="firstname"
                label="Email"
                variant="standard"
                fullWidth="true"
                value={this.state.email}
                onChange={this.changeEmail}
              />
            </div>
            <div>
              <h3>Organization/Institution</h3>
              <TextField
                id="Organization/Institution"
                label="Organization/Institution"
                variant="standard"
                fullWidth="true"
                value={this.state.org}
                onChange={this.changeOrganization}
              />
            </div>
            <div>
              <h3>Password</h3>
              <TextField
                id="password"
                label="New Password"
                variant="standard"
                fullWidth="true"
                value={this.state.pw}
                onChange={this.changePW}
              />
            </div>
            <div>
              <h3>Confirm Password</h3>
              <TextField
                id="confirmpassword"
                label="Confirm Password"
                variant="standard"
                fullWidth="true"
                value={this.state.confirmPw}
                onChange={this.changeConfimation}
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
