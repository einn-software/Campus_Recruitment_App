import React, { Component } from 'react';
import image from '../Images/banner-02.jpg'
import '../css/HomeBody.css';

class HomeBody extends Component {
    render() {
        return (
            <div>
                <img src={image} className="img-fluid" id="home-image" alt="" />
                <div className="content">
                    <h1 className="caption">InnoBit Systems welcomes you</h1>
                    <h4 className="short-caption">We Learn and create together</h4>
                    <a href="https://innobitsystems.com/" className="explorer">Explore Us</a>
                </div>
            </div>
        );
    }
}

export default HomeBody;