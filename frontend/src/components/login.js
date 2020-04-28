import React, { Component } from "react";
import "./style.css";
import Header from "./header";
import Footer from "./footer";
import usrimg from "./usrimg.png";

class Login extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <Header />
        </div>

        <div className="row d-flex justify-content-center">
          <div className="col-lg-3">
            <div className="login-container">
              <div className="avatar">
                <img
                  src={usrimg}
                  alt="admin"
                  height="100px"
                  width="100px"
                  className="userimg"
                />
              </div>
              <div className="text">Admin</div>
              <div className="form-box">
                <form action="" method="POST">
                  <input name="email" type="text" placeholder="email" />
                  <br />
                  <input type="password" placeholder="password" />
                  <br />
                  <button
                    className="btn btn-info btn-block login"
                    type="submit"
                  >
                    Login
                  </button>
                </form>
                <div className="container anc">
                  <a href="#a" className="anc">
                    {" "}
                    Forget password?
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <Footer />
        </div>
      </div>
    );
  }
}

export default Login;
