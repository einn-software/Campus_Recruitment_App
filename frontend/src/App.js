import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import HomeBody from './components/HomeBody';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Navbar />
      <HomeBody />
      <Footer />
    </div>
  );
}

export default App;
