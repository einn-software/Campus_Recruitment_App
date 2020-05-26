const errHandler = require("../errorHandling");
const success = 200;
const failure = 400;

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

//Admin Register
const AdminRegister = async (req, res, next) => {
  //LETS VALIDATE THE DATA BEFORE WE MAKE A Admin
  const { error } = adminRegisterValidation(req.body);
  if (error) {
    return res.status(`${failure}`).json(errHandler.errorHandler(error));
  }

  //Checking if the admin is already in the database
  const emailExist = await Admin.findOne({
    email: req.body.email,
  });
  if (emailExist) {
    return res.status(`${failure}`).json(errHandler.emailExistErrorHandler());
  }

  //Hash password
  const salt = await bcrypt.genSalt(10);
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
    res.status(`${success}`).json(user);
  } catch (error) {
    return res.status(`${failure}`).json(errHandler.errorHandler(error));
  }
};

//Admin Get

const AdminGet = async (req, res) => {
  if (req.session.user_type == 1) {
    Admin.find({}, (err, results) => {
      if (err) {
        return res
          .status(`${failure}`)
          .json(errHandler.errorHandler(err));
      }
      return res.status(`${success}`).json(results);
    });
  } else {
    return res
      .status(`${authorizationFailed}`)
      .json(errHandler.unauthorizedErrorHandler());
  }
};

//Admin put

const AdminPut =
  (verify,
  function (req, res) {
    const body = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(body.password, salt);
    body.password = hashedPassword;
    if (req.session.user_type == 1) {
      Admin.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        body
      )
        .then((results) => {
          if (!results) {
            return res
              .status(`${notFound}`)
              .json(errHandler.idNotFoundErrorHandler());
          } else {
            res.status(`${success}`).json(results);
          }
        })
        .catch((err) => {
          return res.status(`${failure}`).json(errHandler.errorHandler(err));
        });
    } else {
      return res
        .status(`${authorizationFailed}`)
        .json(errHandler.unauthorizedErrorHandler());
    }
  });

//Admin Delete

const AdminDelete =
  (verify,
  function (req, res) {
    if (req.session.user_type == 1) {
      Admin.findByIdAndRemove(
        {
          _id: req.params.id,
        },
        (err, results) => {
          if (err) {
            return res.status(`${failure}`).json(errHandler.errorHandler(err));
          }
          if (!results) {
            return res
              .status(`${notFound}`)
              .json(errHandler.idNotFoundErrorHandler());
          }
          return res.status(`${success}`);
        }
      );
    } else {
      return res
        .status(`${authorizationFailed}`)
        .json(errHandler.unauthorizedErrorHandler());
    }
  });

// Student Register
const StudentRegister = async (req, res) => {
  // LETS VALIDATE THE DATA BEFORE WE MAKE A USER
  const { error } = studentRegisterValidation(req.body);
  if (error)
    return res.status(`${failure}`).json(errHandler.errorHandler(error));

  //Checking if the student is already in the database
  const emailExist = await Student.findOne({
    email: req.body.email,
  });
  if (emailExist) return res.json(errHandler.emailExistErrorHandler());

  const rollCodeExist = await Student.findOne({
    roll: req.body.roll,
    code: req.body.code,
  });
  if (rollCodeExist)
    return res.status(`${failure}`).json(errHandler.codeRollErrorHandler());

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
    res.status(`${success}`).json(user);
  } catch (err) {
    res.status(`${failure}`).json(errHandler.errorHandler(err));
  }
};

const TpoRegister = async (req, res) => {
  // LETS VALIDATE THE DATA BEFORE WE MAKE A Tpo
  const { error } = tpoRegisterValidation(req.body);
  if (error) {
    return res.status(`${failure}`).json(errHandler.errorHandler(error));
  }

  //Checking if the tpo is already in the database
  const emailExist = await Tpo.findOne({
    email: req.body.email,
  });
  if (emailExist) {
    return res.status(`${failure}`).json(errHandler.emailExistErrorHandler());
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
    res.status(`${success}`).json(user);
  } catch (err) {
    return res.status(`${failure}`).json(errHandler.errorHandler(error));
  }
};

//Tpo Get

const TpoGet = async (req, res) => {
  if (req.session.user_type == 2) {
    Tpo.find({}, (err, results) => {
      if (err) {
        return res
          .status(`${failure}`)
          .json(errHandler.errorHandler(err));
      }
      return res.status(`${success}`).json(results);
    });
  } else {
    return res
      .status(`${authorizationFailed}`)
      .json(errHandler.unauthorizedErrorHandler());
  }
};

//Tpo Put

const TpoPut =
  (verify,
  function (req, res) {
    const body = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(body.password, salt);
    body.password = hashedPassword;
    if (req.session.user_type == 2) {
      Tpo.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        body
      )
        .then((results) => {
          if (!results) {
            return res
              .status(`${notFound}`)
              .json(errHandler.idNotFoundErrorHandler());
          } else {
            res.status(`${success}`).json(results);
          }
        })
        .catch((err) => {
          return res.status(`${failure}`).json(errHandler.errorHandler(err));
        });
    } else {
      return res
        .status(`${authorizationFailed}`)
        .json(errHandler.unauthorizedErrorHandler());
    }
  });

//Tpo Delete
const TpoDelete =
  (verify,
  function (req, res) {
    if (req.session.user_type == 2) {
      Tpo.findByIdAndRemove(
        {
          _id: req.params.id,
        },
        (err, results) => {
          if (err) {
            return res.status(`${failure}`).json(errHandler.errorHandler(err));
          }
          if (!results) {
            return res
              .status(`${notFound}`)
              .json(errHandler.idNotFoundErrorHandler());
          }
          return res.status(`${success}`);
        }
      );
    } else {
      return res
        .status(`${authorizationFailed}`)
        .json(errHandler.unauthorizedErrorHandler());
    }
  });

module.exports = {
  AdminRegister,
  AdminGet,
  AdminPut,
  AdminDelete,
  StudentRegister,
  TpoRegister,
  TpoGet,
  TpoPut,
  TpoDelete,
};
