import React, { Component } from "react";
import "./index.css";

export class FAQ extends Component {
  render() {
    return (
      <>
        <div id="faq-container">
          <h2>Frequently Asked Questions</h2>
          <div id="faq-questions">
            <ol>
              <li>
                How do I blahblahblah?<br></br>
                &bull; YOu gotta blahblahbla
              </li>
              <br></br>
              <li>
                How do I blahblahblah?<br></br>
                &bull; YOu gotta blahblahbla
              </li>
              <br></br>
              <li>
                How do I blahblahblah?<br></br>
                &bull; YOu gotta blahblahbla
              </li>
              <br></br>
              <li>
                How do I blahblahblah?<br></br>
                &bull; YOu gotta blahblahbla
              </li>
            </ol>
          </div>
        </div>
      </>
    );
  }
}

export default FAQ;
