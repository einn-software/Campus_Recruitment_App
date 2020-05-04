import React, { Component } from "react";
import "./style.css";
import image from "./logoeinn.png";

class Header extends Component {
  render() {
    return (
      <nav className= "navbar navbar-custom navbar-dark">
        <div className="logo">
          <img
            src={image}
<<<<<<< HEAD
            className="head"
=======
            className="text-center head"
>>>>>>> d56346c002361f1dc60ec0f7192a745e2664d7d9
            width="60"
            height="60"
            alt=""
          />
        </div>
        <div className="title">
          <p>Campus Recruitment</p>
        </div>
      </nav>
    );
  }
}

export default Header;