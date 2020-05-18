import React from 'react';
import {Navbar ,NavbarBrand} from 'reactstrap';
import './App.css'
import image from "./components/logo.png";
import AdminRegister from './components/register/adminRegister';
//import CollegeRegister from './components/register/collegeRegister';
//import StudentRegister from './components/register/studentRegister';
//import AdminLogin from './components/login/adminlogin';

//import TpoRegister from './components/register/tpoRegister';

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
}

export default App;
