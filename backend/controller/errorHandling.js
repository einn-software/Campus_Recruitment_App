const Constants = require('../config/constant');

function randomGenerate() {
  return `${Math.floor((Constants.ref_min) + Math.random() * (Constants.ref_max))}`;
}

// Error Handlers
function errorHandler(error) {
  const err = {
    status: Constants.er_failure,
    message: error.details[0].message,
    error_info: error.name,
    server_msg: error._message,
    server_error_ref: Date.now() + randomGenerate(),
  };
  return err;
}

function noRouteErrorHandler(error) {
  const err = {
    status: Constants.er_failure,
    message: "path is not defined",
    error_info: error.name,
    server_msg: "User requested on wrong/invalid path",
    server_error_ref: Date.now() + randomGenerate(),
  };
  return err;
}


function unauthorizedErrorHandler() {
  const err = {
    status: Constants.er_authorizationFailed, //403
    message: "Unauthorized access",
    error_info: "Authrization Error",
    server_msg: "Authrization Error: the user is not authorized to access this data",
    server_error_ref: Date.now() + randomGenerate(),
  };
  return err;
}

function emailNotFoundErrorHandler(error) {
  const err = {
    status: Constants.er_notFound, //404
    message: "Email not found, Please register yourself",
    error_info: "Login Error, As email is not registerd in database",
    server_msg: "No user is registered with this email, So can't login the user",
    server_error_ref: Date.now() + randomGenerate(),
  };
  return err;
}

function emailExistErrorHandler() {
  const err = {
    status: Constants.er_failure, //400
    message: "Already registered with this email, Please try to login",
    error_info: "Registeration Error, As email is already in database",
    server_msg: "Email already exist in the database, So can't register the same user twice",
    server_error_ref: Date.now() + randomGenerate(),
  };
  return err;
}

function invalidPasswordErrorHandler() {
  const err = {
    status: Constants.er_authorizationFailed, //403
    message: "Invalid password, please try again later",
    error_info: "Athentication Error",
    server_msg: "Athentication Error: invalid password",
    server_error_ref: Date.now() + randomGenerate(),
  };
  return err;
}

function idNotFoundErrorHandler() {
  const err = {
    status: Constants.er_notFound, //404
    message: "Please provide a valid id",
    error_info: "Not Found Error, As id is not found in database",
    server_msg: "No user is registered with this id, So can't get the user",
    server_error_ref: Date.now() + randomGenerate(),
  };
  return err;
}

function notFoundRollCodeErrorHandler() {
  const err = {
    status: Constants.er_authenticationFailed, //404
    message: "Roll no. and code not found, Please register yourself",
    error_info: "Login Error, As roll no. and code are not registerd in database",
    server_msg: "No user is registered with this roll no. and code, So can't login the user",
    server_error_ref: Date.now() + randomGenerate(),
  };
  return err;
}

function codeRollErrorHandler() {
  const err = {
    status: Constants.er_failure, //400
    message: "Either Roll no. or code must be unique",
    error_info: "Registertion Error",
    server_msg: "Registeration Error: Either Roll no. or code must be unique",
    server_error_ref: Date.now() + randomGenerate(),
  };
  return err;
}

module.exports = {
  errorHandler,
  emailExistErrorHandler,
  emailNotFoundErrorHandler,
  codeRollErrorHandler,
  notFoundRollCodeErrorHandler,
  idNotFoundErrorHandler,
  invalidPasswordErrorHandler,
  unauthorizedErrorHandler,
  noRouteErrorHandler
}