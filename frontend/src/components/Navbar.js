import React, { Component } from 'react';
import logo from '../Images/logo.png'
import '../css/Navbar.css';

class Navbar extends Component {
    render() {
        return (
            <div>

                <nav className="navbar navbar-expand-lg navbar-light">
                    <img src={logo} className="d-inline-block img-responsive" id="logo" alt="" />
                    <a className="navbar-brand" href="#" id="text">Campus Recruiter</a>

                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle btn btn-light buttons rounded" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="fa fa-user" id="icons"></i>Register
        </a>
                                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                    <a className="dropdown-item" href="#">As a student</a>
                                    <a className="dropdown-item" href="#">As a tpo</a>
                                </div>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle btn btn-light buttons rounded" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="fa fa-lock" id="icons"></i>Login
        </a>
                                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                    <a className="dropdown-item" href="#">As a student</a>
                                    <a className="dropdown-item" href="#">As a tpo</a>
                                    <a className="dropdown-item" href="#">As a admin</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Navbar;