import React, { Component } from "react";
import "../style.css";

class Admin extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <aside className="col-md-4">
            <div className="text text0">
              <h5>
                Click the button to upload test papers & answer keys over the
                server
              </h5>
            </div>
            <div className="btn">
              <button className="upload-btn">Upload</button>
            </div>
          </aside>
          <section className="col-md-4">
            <div className="text text1">
              <h5>Click the button to manage the Student data</h5>
            </div>
            <div className="btn">
              <button className="manage-student-btn">Manage Students</button>
            </div>
          </section>
          <aside className="col-md-4">
            <div className="text text2">
              <h5>Click the button to manage the college data</h5>
            </div>
            <div className="btn">
              <button className="manage-college-btn">Manage Colleges</button>
            </div>
          </aside>
        </div>
      </div>
    );
  }
}
export default Admin;
