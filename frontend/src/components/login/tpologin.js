import React, { Component } from "react";
import "../style.css";
import Header from "../header";
import Footer from "../footer";
import usrimg from "./usrimg.png";

class TpoLogin extends Component {
  render() {
    return (
       <div className='container-fluid'>
         <div className='row'>
           <Header />
         </div>
         <div className='row d-flex justify-content-center'>
           <div className='col-lg-3 col-sm-3 col-md-3'>
             <div className='login-container'>
               <div className='avatar'>
                 <img src={usrimg} alt='tpo' height='100px' width='100px' className='userimg' />
               </div>
               <div className='text'>Tpo</div>
               <div className='form-box'>
                 <form action='' method='POST'>
                   <input name='email' type='text' placeholder='email' /><br />
                   <input type= 'password' placeholder='password'/><br />
                   <button type='submit' className='btn btn-info btn-block login'>Login</button>
                 </form>
                 <div className='container anc'>
                   <a href="#a" className='anc'>Forgot password?</a>
                 </div>
               </div>
             </div>
           </div>
         </div>
         <div className='row'>
           <Footer />
         </div>
       </div>        
    );
  }
}

export default TpoLogin;
