import React, {Component} from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Login from './components/login';

class App extends Component{
  render() { 
   return (
    <div className="App">
     <Login />

    </div>
    );
  }
}
export default App;
