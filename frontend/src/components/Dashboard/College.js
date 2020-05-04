import React, { Component } from "react";
import "../style.css";
import Footer from "../footer";
import Header from "../header";
import image from "./result.jpg";

class College extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <Header />
        </div>
        <div className="container-fluid">
          <div className="row">
            <aside className="col-md-4">
              <div className="text text0">
                <h5>
                  Click the button to upload the list of interested studnets
                </h5>
              </div>
              <div className="btn">
                <button className="upload-btn">Upload</button>
              </div>
            </aside>
            <section className="col-md-4">
              <div className="img">
                <img
                  src={image}
                  className="resultimg"
                  width="300px"
                  height="200px"
                  alt=""
                />
              </div>
              <div className="btn">
                <button className="manage-student-btn">Result</button>
              </div>
            </section>
            <aside className="col-md-4">
              <div className="text text2">
                <h5>Click the button to know about the appeared students</h5>
              </div>
              <div className="btn">
                <button className="manage-college-btn">
                  appeared students
                </button>
              </div>
            </aside>
          </div>
        </div>

        <div className="row">
          <Footer />
        </div>
      </div>
    );
  }
}
export default College;
