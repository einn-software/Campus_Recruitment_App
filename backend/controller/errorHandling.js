const Constants = require("../config/constant");

function randomGenerate() {
  return `${Math.floor(Constants.ref_min + Math.random() * Constants.ref_max)}`;
}

// Error Handlers
function errorHandler(error) {
  const err = {
    status: Constants.er_failure,
    message: error.message,
    error_info: error.name,
    server_msg: error._message || error.type,
    server_error_ref: Date.now() + randomGenerate(),
  };
  return err;
}

function validationErrorHandler(error) {
  const err = {
    status: Constants.er_failure,
    message: error.details[0].message,
    error_info: error.name,
    server_msg: "This error is generated because" + error.message,
    server_error_ref: Date.now() + randomGenerate(),
  };
  return err;
}

function validationWithEmailErrorHandler(error, email) {
  const err = {
    status: Constants.er_failure,
    message: error.details[0].message + ` for the student ${email}`,
    error_info: error.name,
    server_msg: "This error is generated because" + error.message,
    server_error_ref: Date.now() + randomGenerate(),
  };
  return err;
}

function noRouteErrorHandler() {
  const err = {
    status: Constants.er_failure,
    message: "Please check the path and try again",
    error_info: "ReferenceError",
    server_msg: "User requested on wrong/invalid path",
    server_error_ref: Date.now() + randomGenerate(),
  };
  return err;
}

function unauthorizedErrorHandler() {
  const err = {
    status: Constants.er_authorization_failed, //403
    message: "Unauthorized access",
    error_info: "Authrization Error",
    server_msg: "Authrization Error: the user is not authorized to access this data",
    server_error_ref: Date.now() + randomGenerate(),
  };
  return err;
}

function emailNotFoundErrorHandler() {
  const err = {
    status: Constants.er_not_found, //404
    message: "Email not found, Please register yourself",
    error_info: "Login Error",
    server_msg: "No user is registered with this email, So can't login the user",
    server_error_ref: Date.now() + randomGenerate(),
  };
  return err;
}

function thisEmailExistErrorHandler(email) {
  const err = {
    status: Constants.er_failure, //400
    message: `Already registered with the email ${email}, try to login`,
    error_info: "Registeration Error",
    server_msg: `${email} already exist in the database, So can't register the same user twice`,
    server_error_ref: Date.now() + randomGenerate(),
  };
  return err;
}

function codeExistErrorHandler() {
  const err = {
    status: Constants.er_failure, //400
    message: `Instructions already exist for this code`,
    error_info: "Error",
    server_msg: "Instructions already exist for this code, so can't add new instuctions with the same code",
    server_error_ref: Date.now() + randomGenerate(),
  };
  return err;
}

function codeRollWithEmailErrorHandler(email, roll, code) {
  const err = {
    status: Constants.er_failure, //400
    message: `Found duplicate Roll number(${roll}), please check the data of the student ${email}`,
    error_info: "Registertion Error",
    server_msg: `Registeration Error: Either Roll no. (${roll}) or code (${code}) must be unique of the user ${email}`,
    server_error_ref: Date.now() + randomGenerate(),
  };
  return err;
}

function answerExistErrorHandler() {
  const err = {
    status: Constants.er_failure, //400
    message: "Already answered",
    error_info: "Error in Posting data",
    server_msg: "The question is already answered and saved in database",
    server_error_ref: Date.now() + randomGenerate(),
  };
  return err;
}

function submissionExistErrorHandler() {
  const err = {
    status: Constants.er_failure, //400
    message: "Sorry!, You already submitted your exam",
    error_info: "Error in submitting the exam",
    server_msg: "The exam is already submitted and saved in database",
    server_error_ref: Date.now() + randomGenerate(),
  };
  return err;
}

function invalidPasswordErrorHandler() {
  const err = {
    status: Constants.er_authentication_failed, //401
    message: "Invalid password, please try again",
    error_info: "Athentication Error",
    server_msg: "Athentication Error: invalid password",
    server_error_ref: Date.now() + randomGenerate(),
  };
  return err;
}

function invalidTokenErrorHandler(error) {
  const err = {
    status: Constants.er_authentication_failed, //401
    message: "Invalid Token",
    error_info: error.name,
    server_msg: error.name + " : Token is invalid or expired",
    server_error_ref: Date.now() + randomGenerate(),
  };
  return err;
}

function tokenNotFoundErrorHandler() {
  const err = {
    status: Constants.er_authentication_failed, //401
    message: "Access denied",
    error_info: "Authentication Error",
    server_msg: "Authentication Error, Token is not found",
    server_error_ref: Date.now() + randomGenerate(),
  };
  return err;
}

function userNotFoundErrorHandler() {
  const err = {
    status: Constants.er_not_found, //404
    message: "User does not exist",
    error_info: "Not Found Error",
    server_msg: "Can't change the password as user with this token does not exist",
    server_error_ref: Date.now() + randomGenerate(),
  };
  return err;
}

function idNotFoundErrorHandler(text) {
  const err = {
    status: Constants.er_not_found, //404
    message: `Please provide a valid id`,
    error_info: `Not Found Error, As id (${text}) is not found in database`,
    server_msg: `No data present with this id (${text}), So can't get the response`,
    server_error_ref: Date.now() + randomGenerate(),
  };
  return err;
}

function invalidFileErrorHandler(fileformat) {
  const err = {
    status: Constants.er_failure,
    message: `Please provide a valid ${fileformat} file`,
    error_info: "Not Found Error",
    server_msg: "file type is not valid, So can't get the response",
    server_error_ref: Date.now() + randomGenerate(),
  };
  return err;
}

function validEmailNotFoundErrorHandler() {
  const err = {
    status: Constants.er_failure,
    message: "Please provide a valid email",
    error_info: "Not Found Error",
    server_msg: "No email found, So can't get the response",
    server_error_ref: Date.now() + randomGenerate(),
  };
  return err;
}

function dataNotFoundErrorHandler() {
  const err = {
    status: Constants.er_not_found, //404
    message: "Data of the url parameters or query is not a valid data, plese check it and try again",
    error_info: "Not Found Error, As data is not found in database",
    server_msg: "No data present with this data, So can't get the response",
    server_error_ref: Date.now() + randomGenerate(),
  };
  return err;
}

function codeNotFoundErrorHandler() {
  const err = {
    status: Constants.er_not_found, //404
    message: "Please provide a valid code",
    error_info: "Not Found Error, As code is not found in database",
    server_msg: "No data present with this code, So can't get the response",
    server_error_ref: Date.now() + randomGenerate(),
  };
  return err;
}

function codeRollIdNotFoundErrorHandler() {
  const err = {
    status: Constants.er_not_found, //404
    message: "Please provide a valid code/question-paper-id/roll no",
    error_info: "Not Found Error, As code or question-paper id or roll is not found in database",
    server_msg: "No data present with the entered data, So can't get the response",
    server_error_ref: Date.now() + randomGenerate(),
  };
  return err;
}

function notFoundRollCodeErrorHandler() {
  const err = {
    status: Constants.er_not_found, //404
    message: "Roll no. or code not found, Please register yourself",
    error_info: "Login Error, As roll no. or code are not registerd in database",
    server_msg: "No user is registered with this roll no. or code, So can't login the user",
    server_error_ref: Date.now() + randomGenerate(),
  };
  return err;
}

function notFoundCodeIdErrorHandler() {
  const err = {
    status: Constants.er_not_found, //404
    message: "Please provide a valid id or code",
    error_info: "Not Found Error, As Id or code are not in database",
    server_msg: "No data found with this Id or code",
    server_error_ref: Date.now() + randomGenerate(),
  };
  return err;
}

function notFoundResultErrorHandler() {
  const err = {
    status: Constants.er_not_found, //404
    message: "No result found",
    error_info: "Not Found Error",
    server_msg: "No result found corresponnding to the student and question-paper id",
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

function questionExistErrorHandler() {
  const err = {
    status: Constants.er_failure, //400
    message: "Question Already Exist, Add different Question",
    error_info: "Error, As question is already in database",
    server_msg: "question  already exist in the database, So can't add the same question twice",
    server_error_ref: Date.now() + randomGenerate(),
  };
  return err;
}

function questionPaperExistErrorHandler() {
  const err = {
    status: Constants.er_failure, //400
    message: "Question paper already exist, Add different question paper",
    error_info: "Error, As question paper is already in database",
    server_msg: "question paper already exist in the database, So can't add the same question paper twice",
    server_error_ref: Date.now() + randomGenerate(),
  };
  return err;
}

module.exports = {
  errorHandler,
  thisEmailExistErrorHandler,
  validationWithEmailErrorHandler,
  codeRollWithEmailErrorHandler,
  emailNotFoundErrorHandler,
  codeRollErrorHandler,
  notFoundRollCodeErrorHandler,
  idNotFoundErrorHandler,
  invalidPasswordErrorHandler,
  unauthorizedErrorHandler,
  noRouteErrorHandler,
  validationErrorHandler,
  invalidTokenErrorHandler,
  userNotFoundErrorHandler,
  tokenNotFoundErrorHandler,
  answerExistErrorHandler,
  questionExistErrorHandler,
  questionPaperExistErrorHandler,
  submissionExistErrorHandler,
  codeNotFoundErrorHandler,
  codeRollIdNotFoundErrorHandler,
  dataNotFoundErrorHandler,
  notFoundCodeIdErrorHandler,
  notFoundResultErrorHandler,
  validEmailNotFoundErrorHandler,
  invalidFileErrorHandler,
  codeExistErrorHandler,
};