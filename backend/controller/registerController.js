const errHandler = require("./errorHandling");
const bcrypt = require("bcryptjs");
const Constants = require("../config/constant");
const {
  logger,
  printLogs
} = require("../config/logger");
//import models
const Admin = require("../model/Admin");
const Tpo = require("../model/Tpo");
const Student = require("../model/Student");

// import validations
const {
  adminRegisterValidation,
  studentRegisterValidation,
  tpoRegisterValidation,
} = require("../config/validation");

function createHashedPassword(req) {
  //Hash password
  const salt = bcrypt.genSaltSync(Constants.saltRound);
  const hashedPassword = bcrypt.hashSync(req.body.password, salt);
  return hashedPassword;
}

//To register a new admin
const AdminRegister = async (req, res) => {
  printLogs(req);
  // VALIDATE THE DATA BEFORE WE MAKE A Admin
  const {
    error
  } = adminRegisterValidation(req.body);
  if (error) {
    logger.error(errHandler.validationErrorHandler(error));
    return res
      .status(Constants.er_failure)
      .json(errHandler.validationErrorHandler(error));
  }

  //Checking if the admin is already in the database
  const emailExist = await Admin.findOne({
    email: req.body.email,
  });
  if (emailExist) {
    logger.error(`If(emailExist: ${emailExist}) - `, errHandler.thisEmailExistErrorHandler(req.body.email));
    return res
      .status(Constants.er_failure)
      .json(errHandler.thisEmailExistErrorHandler(req.body.email));
  }

  // Create a new admin
  const admin = new Admin({
    name: req.body.name,
    email: req.body.email,
    password: await createHashedPassword(req),
    phone: req.body.phone,
  });
  try {
    const user = await admin.save();
    logger.info(user);
    return res.status(Constants.success).json(user);
  } catch (error) {
    logger.error('Error in saving the admin - ', errHandler.errorHandler(error));
    return res
      .status(Constants.er_failure)
      .json(errHandler.errorHandler(error));
  }
};

// To register a new tpo
const TpoRegister = async (req, res) => {
  printLogs(req);
  // LETS VALIDATE THE DATA BEFORE WE MAKE A Tpo
  const {
    error
  } = tpoRegisterValidation(req.body);
  if (error) {
    logger.error(errHandler.validationErrorHandler(error));
    return res
      .status(Constants.er_failure)
      .json(errHandler.validationErrorHandler(error));
  }

  //Checking if the tpo is already in the database
  const emailExist = await Tpo.findOne({
    email: req.body.email,
  });
  if (emailExist) {
    logger.error(`If(emailExist: ${emailExist}) - `, errHandler.thisEmailExistErrorHandler(req.body.email));
    return res
      .status(Constants.er_failure)
      .json(errHandler.thisEmailExistErrorHandler(req.body.email));
  }

  // Create a new tpo
  const tpo = new Tpo({
    name: req.body.name,
    email: req.body.email,
    password: await createHashedPassword(req),
    phone: req.body.phone,
    designation: req.body.designation,
    college: req.body.college,
    code: req.body.code,
  });
  try {
    const user = await tpo.save();
    logger.info(user);
    return res.status(Constants.success).json(user);
  } catch (err) {
    logger.error('Error in saving the admin - ', errHandler.errorHandler(error));
    return res
      .status(Constants.er_failure)
      .json(errHandler.errorHandler(error));
  }
};

//To register a new student
const StudentRegister = async (req, res) => {
  printLogs(req);
  // LETS VALIDATE THE DATA BEFORE WE MAKE A USER
  const {
    error
  } = studentRegisterValidation(req.body);
  if (error) {
    logger.error(errHandler.validationErrorHandler(error));
    return res
      .status(Constants.er_failure)
      .json(errHandler.validationErrorHandler(error));
  }
  //Checking if the student is already in the database
  const emailExist = await Student.findOne({
    email: req.body.email,
  });
  if (emailExist) {
    logger.error(`If(emailExist: ${emailExist}) - `, errHandler.thisEmailExistErrorHandler(req.body.email));
    return res
      .status(Constants.er_failure)
      .json(errHandler.thisEmailExistErrorHandler(req.body.email));
  }
  const rollCodeExist = await Student.findOne({
    roll: req.body.roll,
    code: req.body.code,
  });
  if (rollCodeExist) {
    logger.error(`If(rollCodeExist: ${rollCodeExist}) - `, errHandler.codeRollErrorHandler());
    return res
      .status(Constants.er_failure)
      .json(errHandler.codeRollErrorHandler());
  }
  // Create a new student
  const student = new Student({
    name: req.body.name,
    email: req.body.email,
    password: await createHashedPassword(req),
    phone: req.body.phone,
    roll: req.body.roll,
    branch: req.body.branch,
    college: req.body.college,
    code: req.body.code,
    exam_start_time: req.body.exam_start_time,
  });
  try {
    const user = await student.save();
    logger.info(user);
    return res.status(Constants.success).json(user);
  } catch (err) {
    logger.error('Error in saving the admin - ', errHandler.errorHandler(error));
    res.status(Constants.er_failure).json(errHandler.errorHandler(err));
  }
};

module.exports.AdminRegister = AdminRegister;
module.exports.StudentRegister = StudentRegister;
module.exports.TpoRegister = TpoRegister;