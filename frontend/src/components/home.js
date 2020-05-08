import React, { Component } from "react";
import "./style.css";

class Home extends Component {
  render() {
    return (
      <div className="row">
        <div className="container-index">
          <div className="container-inside-index">
            <div className="first-text">
              <h5>We learn and create together ​</h5>
            </div>
            <div className="second-text">
              <h6>
                We build your software product with our product thinking and
                technology delivery expertise​
              </h6>
            </div>
            <div className="btn"></div>
            <button className="register-btn">Register</button>
            <button className="login-btn">Login</button>
          </div>
        </div>
      </div>
    );
  }
}
export default Home;
