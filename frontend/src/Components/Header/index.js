import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

const Header = () => {
  return (
    <React.Fragment>
      <div className="container">
        <div className="titleWrapper">
          <h1>Easy Recommendation</h1>
        </div>
        <div className="LinkWrapper">
          <Link to="/" className="navLink">
            Home
          </Link>
          <div className="dropdown">
            <div className="LinkWrapper">Account</div>
            <div className="dropdown-content">
              <Link to="/login">Log In</Link>
              <Link to="/signup">Sign Up</Link>
            </div>
          </div>
          <div className="dropdown">
            <div className="LinkWrapper">Resources</div>
            <div className="dropdown-content">
              <Link to="/templates">Templates</Link>
              <Link to="/faq">FAQ</Link>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Header;
