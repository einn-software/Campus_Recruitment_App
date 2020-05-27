//import models
const Admin = require("../model/Admin");
const Tpo = require("../model/Tpo");
const Student = require("../model/Student");
const errHandler = require("./errorHandling");
const Constants = require('../config/constant');
// import validations
const {
  studentloginValidation,
  loginValidation,
} = require("../config/validation");

//import jwt token for login
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const success = 200;
const failure = 400;

//Admin Login

const AdminLogin = async (req, res) => {
  const {
    error
  } = loginValidation(req.body);
  if (error) {
    return res.status(`${Constants.er_failure}`).json(errHandler.validationErrorHandler(error));
  }

  //Checking if the admin is not in the database
  const admin = await Admin.findOne({
    email: req.body.email,
  });
  if (!admin) {
    return res
      .status(`${Constants.er_notFound}`)
      .json(errHandler.emailNotFoundErrorHandler());
  }

  //Check if the password is correct
  const validPass = await bcrypt.compare(req.body.password, admin.password);
  if (!validPass)
    return res
      .status(`${Constants.er_authenticationFailed}`)
      .json(errHandler.invalidPasswordErrorHandler());

  //Create and assign a token
  const token = jwt.sign({
      _id: admin._id,
    },
    process.env.TOKEN_SECRET
  );
  //To store or access session data, we use the request property req.session, which is (generally) serialized as JSON by the store.
  (req.session.email = admin.email),
  (req.session._id = admin._id),
  (req.session.token = token),
  (req.session.user_type = Constants[1]),
  res.status(`${Constants.success}`).header("auth-token", token).json({
    email: req.session.email,
    _id: req.session._id,
    token: req.session.token,
    user_type: req.session.user_type,
  });
};

//Student Login

const StudentLogin = async (req, res) => {
  const {
    error
  } = studentloginValidation(req.body);
  if (error)
    return res.status(`${Constants.er_failure}`).json(errHandler.validationErrorHandler(error));

  //Checking if the student is not in the database
  const student = await Student.findOne({
    code: req.body.code,
    roll: req.body.roll,
  });
  if (!student)
    return res
      .status(`${Constants.er_notFound}`)
      .json(errHandler.notFoundRollCodeErrorHandler());

  //Check if the password is correct
  const validPass = await bcrypt.compare(req.body.password, student.password);
  if (!validPass)
    return res
      .status(`${Constants.er_authorizationFailed}`)
      .json(errHandler.invalidPasswordErrorHandler());

  //Create and assign a token
  const token = jwt.sign({
      _id: student._id,
    },
    process.env.TOKEN_SECRET
  );
  req.session.email = student.email;
  req.session._id = student._id;
  req.session.token = token;
  req.session.user_type = Constants[3];
  res.status(`${Constants.success}`).header("auth-token", token).json({
    email: req.session.email,
    _id: req.session._id,
    token: req.session.token,
    user_type: req.session.user_type,
  });
};

//Tpo Login

const TpoLogin = async (req, res) => {
  const {
    error
  } = loginValidation(req.body);
  if (error)
    return res.status(`${Constants.er_failure}`).json(errHandler.validationErrorHandler(error));

  //Checking if the tpo is not in the database
  const tpo = await Tpo.findOne({
    email: req.body.email,
  });
  if (!tpo)
    return res
      .status(`${Constants.er_notFound}`)
      .json(errHandler.emailNotFoundErrorHandler());

  //Check if the password is correct
  const validPass = await bcrypt.compare(req.body.password, tpo.password);
  if (!validPass)
    return res
      .status(`${Constants.er_authorizationFailed}`)
      .json(errHandler.invalidPasswordErrorHandler());

  //Create and assign a token
  const token = jwt.sign({
      _id: tpo._id,
    },
    process.env.TOKEN_SECRET
  );
  req.session.email = tpo.email;
  req.session._id = tpo._id;
  req.session.token = token;
  req.session.user_type = Constants[2];
  res.status(`${Constants.success}`).header("auth-token", token).json({
    email: req.session.email,
    _id: req.session._id,
    token: req.session.token,
    user_type: req.session.user_type,
  });
};

module.exports.StudentLogin = StudentLogin
module.exports.AdminLogin = AdminLogin
module.exports.TpoLogin = TpoLogin