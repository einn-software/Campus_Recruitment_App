import React, { Component } from "react";
import "./App.css";
import image from "./logoeinn.png";

class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-custom">
        <div className="title">
          Campus Recruitment
          <div className="logo">
            <img src={image} className="head" width="60" height="60" alt="" />
          </div>
        </div>
      </nav>
    );
  }
}

export default Header;
