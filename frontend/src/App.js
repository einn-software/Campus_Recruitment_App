import React, { Component } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
// import Login from './components/login';
// import Home from "./components/home";
//import Admin from "./components/Dashboard/admin";
import College from "./components/Dashboard/College";
//import Home from "./components/home";
// import AdminLogin from "./components/login/adminlogin";
// import StudentLogin from "./components/login/studentlogin";
// import TpoLogin from "./components/login/tpologin";
// import CollegeLogin from "./components/login/collegelogin";

class App extends Component {
  render() {
    return (
      <div className="App">
        <College />
      </div>
    );
  }
}
export default App;
