//import models
const Admin = require("../model/Admin");
const Tpo = require("../model/Tpo");
const Constants = require('../config/constant');
const Student = require("../model/Student");
const errHandler = require("./errorHandling");
// import validations
const {
  studentloginValidation,
  loginValidation,
} = require("../config/validation");

//import jwt token for login
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

//A Function for Check if the password is correct or not
async function ValidPassword(req, res, user) {
  const validPass = await bcrypt.compare(req.body.password, user.password);

  if (!validPass) {
    const newPass = req.body.password
    let hash = crypto.createHash('md5').update(newPass).digest("hex")
    if (!(hash == user.password)) {
      return res
        .status(Constants.er_authentication_failed)
        .json(errHandler.invalidPasswordErrorHandler());
    }
  }
}

//Function for Create and assign a token
async function createToken(user) {
  return jwt.sign({
      _id: user._id,
    },
    process.env.TOKEN_SECRET
  );
}

function createAndSendSession(req, res, user, token, user_type) {
  //To store or access session data, we use the request property req.session, which is (generally) serialized as JSON by the store.
  req.session.email = user.email,
    req.session._id = user._id,
    req.session.token = token,
    req.session.user_type = user_type


}

//Admin Login
const AdminLogin = (async (req, res) => {
  const {
    error
  } = loginValidation(req.body);
  if (error) {
    return res.status(Constants.er_failure).json(errHandler.validationErrorHandler(error));
  }

  //Checking if the admin is not in the database
  const user = await Admin.findOne({
    email: req.body.email,
  });
  if (!user) {
    return res
      .status(Constants.er_not_found)
      .json(errHandler.emailNotFoundErrorHandler());
  }
  const user_type = Constants.admin;
  await ValidPassword(req, res, user);
  const token = await createToken(user);
  await createAndSendSession(req, res, user, token, user_type);
  return res.status(Constants.success).header("auth-token", token).json({
    email: req.session.email,
    _id: req.session._id,
    token: req.session.token,
    user_type: req.session.user_type
  });
});

//Student Login

const StudentLogin = (async (req, res) => {
  const {
    error
  } = studentloginValidation(req.body);
  if (error)
    return res.status(Constants.er_failure).json(errHandler.validationErrorHandler(error));

  //Checking if the student is not in the database
  const user = await Student.findOne({
    code: req.body.code,
    roll: req.body.roll,
  });
  if (!user)
    return res
      .status(Constants.er_not_found)
      .json(errHandler.notFoundRollCodeErrorHandler());

  const user_type = Constants.student;
  await ValidPassword(req, res, user);
  const token = await createToken(user);
  await createAndSendSession(req, res, user, token, user_type);
  return res.status(Constants.success).header("auth-token", token).json({
    email: req.session.email,
    _id: req.session._id,
    token: req.session.token,
    user_type: req.session.user_type
  });
});

//Tpo Login

const TpoLogin = (async (req, res) => {
  const {
    error
  } = loginValidation(req.body);
  if (error)
    return res.status(Constants.er_failure).json(errHandler.validationErrorHandler(error));

  //Checking if the tpo is not in the database
  const user = await Tpo.findOne({
    email: req.body.email,
  });
  if (!user)
    return res
      .status(Constants.er_not_found)
      .json(errHandler.emailNotFoundErrorHandler());

  const user_type = Constants.tpo;
  await ValidPassword(req, res, user);
  const token = await createToken(user);
  await createAndSendSession(req, res, user, token, user_type);
  return res.status(Constants.success).header("auth-token", token).json({
    email: req.session.email,
    _id: req.session._id,
    token: req.session.token,
    user_type: req.session.user_type
  });
});

module.exports.StudentLogin = StudentLogin
module.exports.AdminLogin = AdminLogin
module.exports.TpoLogin = TpoLogin