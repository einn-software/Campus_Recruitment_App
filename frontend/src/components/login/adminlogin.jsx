import React, { Component } from "react";
import { Button, FormGroup, Form, Input, FormFeedback } from "reactstrap";
import "../styles.css";
import usrimg from "../usrimg.png";

class AdminLogin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      touched: {
        email: false,
        password: false,
      },
      isValid: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    if (this.isValid === true) {
      console.log("Current State is :" + JSON.stringify(this.state));
      alert("Current State is :" + JSON.stringify(this.state));
      event.preventDefault();
    } else {
      alert("Form is not Valid");
    }
  }

  handleBlur = (field) => (evt) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
  };

  validate(email,password){
    const errors={
     email:"",
     password:""
    }
  }

  render() {
    const errors = this.validate(
      this.state.email,
      this.state.password,
    );
    return (
      <div>
        <div className="row d-flex justify-content-center">
          <div className=" col-md-3">
            <div className="login-container">
              <div className="avatar">
                <img
                  src={usrimg}
                  alt="Admin"
                  height="100px"
                  width="100px"
                  className="userimg"
                />
              </div>
              <div className="NameText">Admin</div>
              <div className="form-box">
                <Form onSubmit={this.handleSubmit}>
                  <FormGroup row>
                    <Input
                      name="email"
                      id="email"
                      type="email"
                      placeholder="Email"
                      value={this.state.email}
                      invalid={errors.email !== ""}
                      onBlur={this.handleBlur("email")}
                      onChange={this.handleInputChange}
                    />
                    <FormFeedback>{errors.email}</FormFeedback>
                  </FormGroup>
                  <FormGroup row>
                    <Input
                      name="password"
                      type="password"
                      id="password"
                      placeholder="Password"
                      value={this.state.password}
                      invalid={errors.password !== ""}
                      onBlur={this.handleBlur("password")}
                      onChange={this.handleInputChange}
                    />
                    <FormFeedback>{errors.password}</FormFeedback>
                  </FormGroup>

                  <FormGroup row>
                    <Button type="submit" className="btn ">
                      Sign Up
                    </Button>
                  </FormGroup>
                </Form>
                <div className="container anc">
                  <a href="#a" className="anc">
                    Forgot password?
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminLogin;
