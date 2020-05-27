const errHandler = require("./errorHandling");
const verify = require('../config/verifyToken');
const Constants = require('../config/constant');
const bcrypt = require('bcrypt');

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

//To register a new admin
const AdminRegister = async (req, res, next) => {
  // VALIDATE THE DATA BEFORE WE MAKE A Admin
  const {
    error
  } = adminRegisterValidation(req.body);
  if (error) {
    return res.status(`${Constants.er_failure}`).json(errHandler.errorHandler(error));
  }

  //Checking if the admin is already in the database
  const emailExist = await Admin.findOne({
    email: req.body.email,
  });
  if (emailExist) {
    return res.status(`${Constants.er_failure}`).json(errHandler.emailExistErrorHandler());
  }

  //Hash password
  const salt = await bcrypt.genSalt(10); //TODO Should be defined in macro
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Create a new admin
  const admin = new Admin({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    phone: req.body.phone,
  });
  try {
    const user = await admin.save();
    res.status(`${Constants.success}`).json(user);
  } catch (error) {
    return res.status(`${Constants.er_failure}`).json(errHandler.errorHandler(error));
  }
};

// To register a new tpo
const TpoRegister = async (req, res) => {
  // LETS VALIDATE THE DATA BEFORE WE MAKE A Tpo
  const {
    error
  } = tpoRegisterValidation(req.body);
  if (error) {
    return res.status(`${Constants.er_failure}`).json(errHandler.errorHandler(error));
  }

  //Checking if the tpo is already in the database
  const emailExist = await Tpo.findOne({
    email: req.body.email,
  });
  if (emailExist) {
    return res.status(`${Constants.er_failure}`).json(errHandler.emailExistErrorHandler());
  }

  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Create a new tpo
  const tpo = new Tpo({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    phone: req.body.phone,
    designation: req.body.designation,
    college: req.body.college,
    code: req.body.code,
  });
  try {
    const user = await tpo.save();
    res.status(`${Constants.success}`).json(user);
  } catch (err) {
    return res.status(`${Constants.er_failure}`).json(errHandler.errorHandler(error));
  }
};


//To register a new student
const StudentRegister = async (req, res) => {
  // LETS VALIDATE THE DATA BEFORE WE MAKE A USER
  const {
    error
  } = studentRegisterValidation(req.body);
  if (error)
    return res.status(`${Constants.er_failure}`).json(errHandler.errorHandler(error));

  //Checking if the student is already in the database
  const emailExist = await Student.findOne({
    email: req.body.email,
  });
  if (emailExist) return res.status(`${Constants.er_failure}`).json(errHandler.emailExistErrorHandler());

  const rollCodeExist = await Student.findOne({
    roll: req.body.roll,
    code: req.body.code,
  });
  if (rollCodeExist)
    return res.status(`${Constants.er_failure}`).json(errHandler.codeRollErrorHandler());

  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Create a new student
  const student = new Student({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    phone: req.body.phone,
    roll: req.body.roll,
    branch: req.body.branch,
    college: req.body.college,
    code: req.body.code,
  });
  try {
    const user = await student.save();
    res.status(`${Constants.success}`).json(user);
  } catch (err) {
    res.status(`${Constants.er_failure}`).json(errHandler.errorHandler(err));
  }
};

module.exports.AdminRegister = AdminRegister
module.exports.StudentRegister = StudentRegister
module.exports.TpoRegister = TpoRegister