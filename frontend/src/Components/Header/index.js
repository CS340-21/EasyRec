import React from "react"
import "./index.css"

const Header = () => {
    return (
        <React.Fragment>
            <div className="container">
                <div className="titleWrapper">
                    <h1>Easy Recommendation</h1>
                </div> 
                <div className="navLinkWrapper">
                    <a href="/" className="navLink">Home</a>
                    <div className="dropdown">
                        <button className="navLinkWrapper">Account</button>
                        <div className="dropdown-content">
                            <a href="#">Log In</a>
                            <a href="#">Sign Up</a>
                        </div>
                    </div>
                    <div className="dropdown">
                        <button className="navLinkWrapper">Resources</button>
                        <div className="dropdown-content">
                            <a href="#">Templates</a>
                            <a href="#">FAQ</a>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Header
