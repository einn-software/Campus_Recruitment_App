import React, { Component } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
<<<<<<< HEAD
// import Login from './components/login';
// import Home from "./components/home";
import Admin from "./components/Dashboard/admin";
=======
//import Home from "./components/home";
import AdminLogin from "./components/login/adminlogin";
import StudentLogin from "./components/login/studentlogin";
import TpoLogin from "./components/login/tpologin";
import CollegeLogin from "./components/login/collegelogin";

>>>>>>> 702626d9990f4554f2dfb0a5ce55050285833765

class App extends Component {
  render() {
    return (
      <div className="App">
<<<<<<< HEAD
        <Admin />
=======
        <StudentLogin />
>>>>>>> 702626d9990f4554f2dfb0a5ce55050285833765
      </div>
    );
  }
}
export default App;
