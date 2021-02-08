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

function createHashedPassword(password) {
  //Hash password
  const salt = bcrypt.genSaltSync(Constants.saltRound);
  const hashedPassword = bcrypt.hashSync(password, salt);
  return hashedPassword;
}

//To register a new admin
const AdminRegister = async (req, res) => {
  printLogs(req);
  let len = req.body.admins.length;
    for (let i =0; i< len; i++){
  // VALIDATE THE DATA BEFORE WE MAKE A Admin
  const {
    error
  } = adminRegisterValidation(req.body.admins[i]);
  if (error) {
    logger.error(errHandler.validationErrorHandler(error));
    return res
      .status(Constants.er_failure)
      .json(errHandler.validationErrorHandler(error));
  }

  //Checking if the admin is already in the database
  const emailExist = await Admin.findOne({
    email: req.body.admins[i].email,
  });
  if (emailExist) {
    logger.error(`If(emailExist: ${emailExist}) - `, errHandler.thisEmailExistErrorHandler(req.body.admins[i].email));
    return res
      .status(Constants.er_failure)
      .json(errHandler.thisEmailExistErrorHandler(req.body.admins[i].email));
  }

  // Create a new admin
  const admin = new Admin({
    name: req.body.admins[i].name,
    email: req.body.admins[i].email,
    password: await createHashedPassword(req.body.admins[i].password),
    phone: req.body.admins[i].phone,
  });
  try {
    const user = await admin.save();
    logger.info(user);
    return res.status(Constants.success).json(user);
  }
  catch (error) {
    logger.error('Error in saving the admin - ', errHandler.errorHandler(error));
    return res
      .status(Constants.er_failure)
      .json(errHandler.errorHandler(error));
  }
}
};

// To register a new tpo
const TpoRegister = async (req, res) => {
  printLogs(req);
  let len = req.body.tpos.length;
    for (let i =0; i< len; i++){
  // LETS VALIDATE THE DATA BEFORE WE MAKE A Tpo
  const {
    error
  } = tpoRegisterValidation(req.body.tpos[i]);
  if (error) {
    logger.error(errHandler.validationErrorHandler(error));
    return res
      .status(Constants.er_failure)
      .json(errHandler.validationErrorHandler(error));
  }

  //Checking if the tpo is already in the database
  const emailExist = await Tpo.findOne({
    email: req.body.tpos[i].email,
  });
  if (emailExist) {
    logger.error(`If(emailExist: ${emailExist}) - `, errHandler.thisEmailExistErrorHandler(req.body.tpos[i].email));
    return res
      .status(Constants.er_failure)
      .json(errHandler.thisEmailExistErrorHandler(req.body.tpos[i].email));
  }

  // Create a new tpo
  const tpo = new Tpo({
    name: req.body.tpos[i].name,
    email: req.body.tpos[i].email,
    password: await createHashedPassword(req.body.tpos[i].password),
    phone: req.body.tpos[i].phone,
    designation: req.body.tpos[i].designation,
    college: req.body.tpos[i].college,
    code: req.body.tpos[i].code,
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
}
};

//To register a new student
const StudentRegister = async (req, res) => {
  printLogs(req);
  let len = req.body.students.length;
    for (let i =0; i< len; i++){
  // LETS VALIDATE THE DATA BEFORE WE MAKE A USER
  const {
    error
  } = studentRegisterValidation(req.body.students[i]);
  if (error) {
    logger.error(errHandler.validationErrorHandler(error));
    return res
      .status(Constants.er_failure)
      .json(errHandler.validationErrorHandler(error));
  }
  //Checking if the student is already in the database
  const emailExist = await Student.findOne({
    email: req.body.students[i].email,
  });
  if (emailExist) {
    logger.error(`If(emailExist: ${emailExist}) - `, errHandler.thisEmailExistErrorHandler(req.body.students[i].email));
    return res
      .status(Constants.er_failure)
      .json(errHandler.thisEmailExistErrorHandler(req.body.students[i].email));
  }
  const rollCodeExist = await Student.findOne({
    roll: req.body.students[i].roll,
    code: req.body.students[i].code,
  });
  if (rollCodeExist) {
    logger.error(`If(rollCodeExist: ${rollCodeExist}) - `, errHandler.codeRollErrorHandler());
    return res
      .status(Constants.er_failure)
      .json(errHandler.codeRollErrorHandler());
  }
  // Create a new student
  const student = new Student({
    name: req.body.students[i].name,
    email: req.body.students[i].email,
    password: await createHashedPassword(req.body.students[i].password),
    phone: req.body.students[i].phone,
    roll: req.body.students[i].roll,
    branch: req.body.students[i].branch,
    college: req.body.students[i].college,
    code: req.body.students[i].code,
    exam_start_time: req.body.students[i].exam_start_time,
  });
  try {
    const user = await student.save();
    logger.info(user);
    return res.status(Constants.success).json(user);
  } catch (err) {
    logger.error('Error in saving the admin - ', errHandler.errorHandler(error));
    res.status(Constants.er_failure).json(errHandler.errorHandler(err));
  }
}
};

module.exports.AdminRegister = AdminRegister;
module.exports.StudentRegister = StudentRegister;
module.exports.TpoRegister = TpoRegister;
