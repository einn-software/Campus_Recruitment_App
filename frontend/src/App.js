import React, { Component } from "react";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
//import Home from "./components/home";
//import AdminLogin from "./components/login/adminlogin";
//import StudentLogin from "./components/login/studentlogin";
//import TpoLogin from "./components/login/tpologin";
//import CollegeLogin from "./components/login/collegelogin";
//import AdminRegister from './components/register/adminregister';
//import CollegeRegister from './components/register/collegeregister';
import TpoRegister from './components/register/tporegister';
//import StudentRegister from './components/register/studentregister';


class App extends Component {
  render() {
    return (
      <div className="App">
        <TpoRegister />
      </div>
    );
  }
}
export default App;
