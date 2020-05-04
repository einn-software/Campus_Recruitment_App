import React,{Component} from 'react';
import './style1.css';
import usrimg from '../login/usrimg.png';
import Header from '../header';
import Footer from '../footer';

class CollegeRegister extends Component{
    render(){
        return(
            <div className='conatiner-fluid'>
              <div className='container-fluid'>
                <div className="row">
                 <Header />
                </div>
              </div>
              <div className='container'>
             <div className="row justify-content-center">
                  <div className='col-lg-3 col-md-3 col-sm-3'>
                    <div className='register-container'>
                      <div className='avatar'>
                        <img src={usrimg} alt='College' height='100px' width='100px' className='userimg' />
                      </div>
                    <div className='text'>College</div>
                     <div className='form-box'>
                      <form action='' method='POST'>
                        <input name='name' type='text' placeholder='name' /><br />
                        <input name='email' type='text' placeholder='email' /><br />
                        <input type= 'password' placeholder='password'/><br />
                        <input name='phone' type='text' placeholder='phone' /><br />
                        <input name='code' type='text' placeholder='College-code' /><br />
                        <input name='address' type='text' placeholder='address' /><br />
                        <button type='submit' className='btn btn-info btn-block login'>Sign Up</button>
                      </form>
                     </div>
                   </div>
                  </div>
                </div> 
               </div> 
                <div className='container-fluid'>
                 <div className="row">
                  <Footer />
                 </div>
                </div> 
            </div>
        );
    }
}

export default CollegeRegister;