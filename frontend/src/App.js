import React, { Component } from "react";
<<<<<<< HEAD
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
=======
import {Navbar ,NavbarBrand} from 'reactstrap';
import './App.css'
import image from "./logoeinn.png";


import AdminRegister from './components/register/adminRegister';
// import Home from "./components/home";
//import College from "./components/Dashboard/College";

function App() {
  return (
    <div className="App">
      <Navbar light className='nav'>
        <div className='container'>
          <NavbarBrand href='/'>
          <img
            src={image}
            width="60"
            height="60"
            className='navLogo'
            alt=""
          />
          <div className='col-lg-4 col-md-4 col-sm-4 title'>
            Campus Recruitment
          </div>
          </NavbarBrand>
        </div>
      </Navbar>
       <AdminRegister/>     
    </div>
  );
>>>>>>> 9316a6a36793b61294db6ea8e89f0c5059cc626c
}
export default App;