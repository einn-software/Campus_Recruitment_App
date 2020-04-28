import React, { Component } from "react";
import "./style.css";
import image from "./logoeinn.png";

class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-custom navbar-dark">
        <div className="logo">
          <img src={image} className="head" width="60" height="60" alt="" />
        </div>
        <div className="title">
          <p>Campus Recruitment</p>
        </div>
      </nav>
    );
  }
}

export default Header;
