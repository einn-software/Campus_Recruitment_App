import React, { Component } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
// import Login from './components/login';
// import Home from "./components/home";
import Admin from "./components/Dashboard/admin";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Admin />
      </div>
    );
  }
}
export default App;
