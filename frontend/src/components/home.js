import React, {Component} from 'react';
import './style.css';
import Footer from './footer';
import Header from './header';


class Home extends Component {
    render(){
        return(
            
              <div className='container-fluid'>
                <div className='container'>
                    <div className='col-md-12'>
                     <Header />
                    </div>
                </div>
                
                
                
              </div>
        
        );
    }
}
export default Home;