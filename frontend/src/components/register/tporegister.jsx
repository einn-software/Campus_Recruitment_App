import React,{Component} from 'react';
import '../style.css';
import usrimg from '../login/usrimg.png';
import Header from '../header';
import Footer from '../footer';
    
class TpoRegister extends Component {
  constructor(props){
      super(props)

  this.state = { 
     name: ""  ,
     email:"",
     password:"",
     phone:"", 
     designation:"",
     college:"",     
     
   }
   this.handleSubmit = this.handleSubmit.bind(this)
} 

namehandler = (event) => {
  this.setState({
      name: event.target.value
  })
}

emailhandler = (event) => {
  this.setState({
      email: event.target.value
  })
}

passwordhandler = (event) => {
  this.setState({
      password: event.target.value
  })
}

phonehandler = (event) => {
  this.setState({
      phone: event.target.value
  })
}


designationhandler = (event) => {
    this.setState({
        designation: event.target.value
    })
  }

  
collegehandler = (event) => {
    this.setState({
        college: event.target.value
    })
  }

handleSubmit = (event) => {
   alert(`${this.state.name} Registered Successfully!!`)
   console.log(this.state);
   this.setState({
       name:"",
       email:"",
       password:"",
       phone:"",
       designation:"",
       college:"",
   })
  event.preventDefault()

}

    render(){
        return(
            <div className='conatiner-fluid'>
                <div className="row">
                 <Header />
                </div>
             <div className="row d-flex justify-content-center">
                  <div className='col-lg-3 col-md-3 col-sm-3'>
                    <div className='register-container TpoReg'>
                      <div className='avatar'>
                        <img src={usrimg} alt='Tpo' height='100px' width='100px' className='userimg' />
                      </div>
                    <div className='text'>Tpo</div>
                     <div className='form-box'>
                      <form action='' method='POST' onSubmit={this.handleSubmit}>
                        <input name='name' type='text' placeholder='name' value={this.state.name} onChange={this.namehandler}/><br />
                        <input name='email' type='text' placeholder='email' value={this.state.email} onChange={this.emailhandler} /><br />
                        <input type= 'password' placeholder='password' value={this.state.password} onChange={this.passwordhandler}/><br />
                        <input name='phone' type='text' placeholder='phone' value={this.state.phone} onChange={this.phonehandler}/><br />
                        <input name='roll' type='text' placeholder='designation' value={this.state.designation} onChange={this.designationhandler}/><br />
                        <input name='college' type='text' placeholder='college' value={this.state.college} onChange={this.collegehandler}/><br />
                        <button type='submit' value='submit' className='btn btn-primary btn-block login'>Sign Up</button>
                      </form>
                     </div>
                   </div>
                  </div>
                </div> 
            
                 <div className="row">
                  <Footer />
                 </div>
            </div>
        );
    }
}

export default TpoRegister;