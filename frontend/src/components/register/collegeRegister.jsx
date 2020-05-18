import React, { Component } from "react";
import { Button, FormGroup, Form, Input, FormFeedback } from "reactstrap";
import "../styles.css";
import usrimg from "../usrimg.png";

class CollegeRegister extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
      phone: "",
      college_code: "",
      address: "",
      touched: {
        name: false,
        email: false,
        password: false,
        phone: false,
        college_code: false,
        address:false,
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

  validate(name, email, password, phone,college_code,address) {
    const errors = {
      name: "",
      email: "",
      password: "",
      phone: "",
      college_code: "",
      address:"",
    };

    if (this.state.touched.name) {
      if (name.length < 3) {
        errors.name = "Name should be greater than 3 characters";
        this.isValid = false;
      } else if (name.length > 17) {
        errors.name = "Name should be not be greater than 10 characters";
        this.isValid = false;
      }
    }

    if (
      this.state.touched.email &&
      email.split("").filter((x) => x === "@").length !== 1
    ) {
      errors.email = "Email should contain a @ symbol";
      this.isValid = false;
    }

    if (this.state.touched.password) {
      if (password.length < 8) {
        errors.password = "Password should be 8 characters long";
        this.isValid = false;
      } else if (password.length > 15) {
        errors.password =
          "Password should be not be greater than 15 characters";
        this.isValid = false;
      }
    }

    const reg = /^\d+$/;
    if (this.state.touched.phone && !reg.test(phone)) {
      errors.phone = "Phone field should contain only numbers";
      this.isValid = false;
    }

    if (this.state.touched.college_code && !reg.test(college_code)) {
      errors.college_code = "College Code should contain only numbers";
      this.isValid = false;
    }

    if (this.state.touched.address) {
        if (address.length < 8) {
          errors.name = "Address should be greater than 3 characters";
          this.isValid = false;
        } else if (address.length > 17) {
          errors.address = "Address should be not be greater than 10 characters";
          this.isValid = false;
        }
      }
  

    if (
      this.state.dirty &&
      errors.name === "" &&
      errors.email === "" &&
      errors.password === "" &&
      errors.phone === "" &&
      errors.college_code === "" &&
      errors.address === ""
    ) {
      this.isValid = true;
    }

    return errors;
  }

  render() {
    const errors = this.validate(
      this.state.name,
      this.state.email,
      this.state.password,
      this.state.phone,
      this.state.college_code,
      this.state.address
      );
    return (
      <div>
        <div className="row d-flex justify-content-center">
          <div className=" col-md-3">
            <div className="register-container">
              <div className="avatar">
                <img
                  src={usrimg}
                  alt="College"
                  height="100px"
                  width="100px"
                  className="userimg"
                />
              </div>
              <div className="NameText">College</div>
              <div className="form-box">
                <Form onSubmit={this.handleSubmit}>
                  <FormGroup row>
                    <Input
                      name="name"
                      id="name"
                      type="text"
                      placeholder="Name"
                      value={this.state.name}
                      invalid={errors.name !== ""}
                      onBlur={this.handleBlur("name")}
                      onChange={this.handleInputChange}
                    />
                    <FormFeedback>{errors.name}</FormFeedback>
                  </FormGroup>
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
                    <Input
                      name="phone"
                      type="text"
                      id="phone"
                      placeholder="Phone"
                      value={this.state.phone}
                      invalid={errors.phone !== ""}
                      onBlur={this.handleBlur("phone")}
                      onChange={this.handleInputChange}
                    />
                    <FormFeedback>{errors.phone}</FormFeedback>
                  </FormGroup>
                  <FormGroup row>
                    <Input
                      name="college_code"
                      id="college_code"
                      type="text"
                      placeholder="College code"
                      value={this.state.college_code}
                      invalid={errors.college_code !== ""}
                      onBlur={this.handleBlur("college_code")}
                      onChange={this.handleInputChange}
                    />
                    <FormFeedback>{errors.college_code}</FormFeedback>
                  </FormGroup>
                  <FormGroup row>
                    <Input
                      name="address"
                      id="address"
                      type="text"
                      placeholder="address"
                      value={this.state.address}
                      invalid={errors.address !== ""}
                      onBlur={this.handleBlur("address")}
                      onChange={this.handleInputChange}
                    />
                    <FormFeedback>{errors.address}</FormFeedback>
                  </FormGroup>
                 
                  <FormGroup row>
                    <Button type="submit" className="btn">
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

export default CollegeRegister;
