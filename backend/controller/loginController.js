//import models
const Admin = require("../model/Admin");
const Tpo = require("../model/Tpo");
const {
  logger,
  printLogs
} = require("../config/logger");
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
async function createToken(user, role) {
  return jwt.sign({_id: user._id,
    user_type: role
  },
  process.env.TOKEN_SECRET
);
}

function createAndSendSession(req, res, user, token, role) {
  //To store or access session data, we use the request property req.session, which is (generally) serialized as JSON by the store.
  req.session.email = user.email,
    req.session._id = user._id,
    req.session.token = token,
    req.session.user_type = role;
    const result = {
      email: user.email,
      _id: user._id,
      token: token,
      user_type: role
    }
    return result;
}

//Admin Login
const AdminLogin = (async (req, res) => {
  printLogs(req);
  const {
    error
  } = loginValidation(req.body);
  if (error) {
    logger.error(errHandler.validationErrorHandler(error));
    return res.status(Constants.er_failure).json(errHandler.validationErrorHandler(error));
  }

  //Checking if the admin is not in the database
  const user = await Admin.findOne({
    email: req.body.email
  });
  if (!user) {
    logger.error(`Function Admin.findOne({email: ${req.body.email}}) - `, errHandler.emailNotFoundErrorHandler());
    return res
      .status(Constants.er_not_found)
      .json(errHandler.emailNotFoundErrorHandler());
  }
  const role = Constants.admin;
  await ValidPassword(req, res, user);
  const token = await createToken(user, role);

  const finalResponse = await createAndSendSession(req, res, user, token, role);

  logger.info(finalResponse);
  const cook=  res.status(Constants.success).cookie("SESSIONID", token, {httpOnly:true, secure:true}).header({"auth-token": token}).json(finalResponse);
  return cook;

});

//Student Login

const StudentLogin = (async (req, res) => {
  printLogs(req);
  const {
    error
  } = studentloginValidation(req.body);
  if (error) {
    logger.error(errHandler.validationErrorHandler(error));
    return res.status(Constants.er_failure).json(errHandler.validationErrorHandler(error));
  }
  //Checking if the student is not in the database
  const user = await Student.findOne({
    code: req.body.code,
    roll: req.body.roll
  });
  if (!user) {
    logger.error(`Function Student.findOne({code: ${req.body.code}, roll: ${req.body.roll}}) - `, errHandler.notFoundRollCodeErrorHandler());
    return res
      .status(Constants.er_not_found)
      .json(errHandler.notFoundRollCodeErrorHandler());
  }
  const role = Constants.student;
  await ValidPassword(req, res, user);
  const token = await createToken(user);
  const finalResponse = await createAndSendSession(req, res, user, token, role);
  logger.info(finalResponse)
  return res.status(Constants.success).cookie("SESSIONID", token, {httpOnly:true, secure:true}).header({"auth-token": token}).header("auth-token", token).json(finalResponse);
});

//Tpo Login

const TpoLogin = (async (req, res) => {
  printLogs(req);
  const {
    error
  } = loginValidation(req.body);
  if (error) {
    logger.error(errHandler.validationErrorHandler(error));
    return res.status(Constants.er_failure).json(errHandler.validationErrorHandler(error));
  }
  //Checking if the tpo is not in the database
  const user = await Tpo.findOne({
    email: req.body.email,
  });
  if (!user) {
    logger.error(`Function Tpo.findOne({email: ${req.body.email}}) - `, errHandler.emailNotFoundErrorHandler());
    return res
      .status(Constants.er_not_found)
      .json(errHandler.emailNotFoundErrorHandler());
  }
  const role = Constants.tpo;
  await ValidPassword(req, res, user);
  const token = await createToken(user);
  const finalResponse = await createAndSendSession(req, res, user, token, role);
  logger.info(finalResponse)
  return res.status(Constants.success).cookie("SESSIONID", token, {httpOnly:true, secure:true}).header({"auth-token": token}).header("auth-token", token).json(finalResponse);
});

module.exports.StudentLogin = StudentLogin
module.exports.AdminLogin = AdminLogin
module.exports.TpoLogin = TpoLogin
