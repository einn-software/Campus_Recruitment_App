import React, { Component } from "react";
// import Home from "./components/home";
//import College from "./components/Dashboard/College";
import Header from "./header";
import Footer from "./footer";
class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Footer />
      </div>
    );
  }
}
export default App;
