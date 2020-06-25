const errHandler = require("./errorHandling");
const Constants = require("../config/constant");
const bcrypt = require("bcryptjs");

//import models
const Admin = require("../model/Admin");
const Tpo = require("../model/Tpo");
const Student = require("../model/Student");

// import validations
const {
  adminPutValidation,
  studentPutValidation,
  tpoPutValidation,
} = require("../config/validation");

//To Get all the admins data
const AdminGet = function (req, res) {
  if (req.session.user_type == Constants.admin) {
    Admin.find({}, (err, results) => {
      if (err || !results) {
        return res
          .status(Constants.er_failure)
          .json(errHandler.errorHandler(err));
      }
      return res.status(Constants.success).json(results);
    });
  } else {
    return res
      .status(Constants.er_authorization_failed)
      .json(errHandler.unauthorizedErrorHandler());
  }
};

// To get single Admin data using id
const AdminGetById = function (req, res) {

  if (req.session.user_type == Constants.admin) {
    Admin.findOne({
        _id: req.params.id,
      },
      (err, results) => {
        if (err || !results) {
          return res
            .status(Constants.er_not_found)
            .json(errHandler.idNotFoundErrorHandler());
        }
        return res.status(Constants.success).json(results);
      }
    );
  } else {
    return res
      .status(Constants.er_authorization_failed)
      .json(errHandler.unauthorizedErrorHandler());
  }
};

//To change or update the admin's data by using their id
const AdminPut = async function (req, res) {
  const body = req.body;
  if (req.session.user_type == Constants.admin) {
    //VALIDATE THE DATA BEFORE WE MAKE A Admin
    const {
      error
    } = adminPutValidation(body);
    if (error) {
      return res
        .status(Constants.er_failure)
        .json(errHandler.validationErrorHandler(error));
    }
    if (body.password) {
      const salt = bcrypt.genSaltSync(Constants.saltRound);
      const hashedPassword = bcrypt.hashSync(body.password, salt);
      body.password = hashedPassword;
    }
    await Admin.findOneAndUpdate({
        _id: req.params.id,
      },
      body, async (err, result) => {
        if (err) {
          return res.status(Constants.er_failure).json(errHandler.errorHandler(err));
        }
        await Admin.findOne({
            _id: req.params.id
          }).then((results) => {
            if (!results) {
              return res
                .status(Constants.er_not_found)
                .json(errHandler.codeNotFoundErrorHandler());
            } else {
              res.status(Constants.success).json(results);
            }
          })
          .catch((err) => {
            return res.status(Constants.er_failure).json(errHandler.errorHandler(err));
          });
      })
  } else {
    return res
      .status(Constants.er_authorization_failed)
      .json(errHandler.unauthorizedErrorHandler());
  }
};

//To delete the admin's data by using their id
const AdminDelete = function (req, res) {

  if (req.session.user_type == Constants.admin) {
    Admin.findByIdAndRemove({
        _id: req.params.id,
      },
      (err, results) => {
        if (err) {
          return res
            .status(Constants.er_failure)
            .json(errHandler.errorHandler(err));
        }
        if (!results) {
          return res
            .status(Constants.er_not_found)
            .json(errHandler.idNotFoundErrorHandler());
        }
        return res.status(Constants.success).json({
          message: "Data deleted successfully",
        });
      }
    );
  } else {
    return res
      .status(Constants.er_authorization_failed)
      .json(errHandler.unauthorizedErrorHandler());
  }
};

// To get single Tpo data using id
const TpoGetBtId = function (req, res) {

  if (req.session.user_type == Constants.admin || Constants.admin) {
    Tpo.findOne({
        _id: req.params.id,
      },
      (err, results) => {
        if (err || !results) {
          return res
            .status(Constants.er_not_found)
            .json(errHandler.idNotFoundErrorHandler());
        }
        return res.status(Constants.success).json(results);
      }
    );
  } else {
    return res
      .status(Constants.er_authorization_failed)
      .json(errHandler.unauthorizedErrorHandler());
  }
};

//To get all the tpo's data
const TpoGet = function (req, res) {

  if (req.session.user_type == Constants.admin || Constants.tpo) {
    Tpo.find({}, (err, results) => {
      if (err || !results) {
        return res
          .status(Constants.er_failure)
          .json(errHandler.errorHandler(err));
      }
      return res.status(Constants.success).json(results);
    });
  } else {
    return res
      .status(Constants.er_authorization_failed)
      .json(errHandler.unauthorizedErrorHandler());
  }
};

//To change or update the tpo's data by using their id
const TpoPut = function (req, res) {

  const body = req.body;

  if (req.session.user_type == Constants.tpo) {
    //VALIDATE THE DATA
    const {
      error
    } = tpoPutValidation(body);
    if (error) {
      return res
        .status(Constants.er_failure)
        .json(errHandler.validationErrorHandler(error));
    }
    if (body.password) {
      const salt = bcrypt.genSaltSync(Constants.saltRound);
      const hashedPassword = bcrypt.hashSync(body.password, salt);
      body.password = hashedPassword;
    }
    Tpo.findOneAndUpdate({
        _id: req.params.id,
      },
      body, async (err, result) => {
        if (err) {
          return res.status(Constants.er_failure).json(errHandler.errorHandler(err));
        }
        await Tpo.findOne({
            _id: req.params.id
          }).then((results) => {
            if (!results) {
              return res
                .status(Constants.er_not_found)
                .json(errHandler.codeNotFoundErrorHandler());
            } else {
              res.status(Constants.success).json(results);
            }
          })
          .catch((err) => {
            return res.status(Constants.er_failure).json(errHandler.errorHandler(err));
          });
      })
  } else {
    return res
      .status(Constants.er_authorization_failed)
      .json(errHandler.unauthorizedErrorHandler());
  }
};

//To delete the tpo's data by using their id
const TpoDelete = function (req, res) {

  if (req.session.user_type == Constants.tpo) {
    Tpo.findByIdAndRemove({
        _id: req.params.id,
      },
      (err, results) => {
        if (err) {
          return res
            .status(Constants.er_failure)
            .json(errHandler.errorHandler(err));
        }
        if (!results) {
          return res
            .status(Constants.er_not_found)
            .json(errHandler.idNotFoundErrorHandler());
        }
        return res.status(Constants.success).json({
          message: "Data deleted successfully",
        });
      }
    );
  } else {
    return res
      .status(Constants.er_authorization_failed)
      .json(errHandler.unauthorizedErrorHandler());
  }
};

// To get single student data using id
const StudentGetById = function (req, res) {

  if (
    req.session.user_type == Constants.admin ||
    Constants.tpo ||
    Constants.student
  ) {
    Student.findOne({
        _id: req.params.id,
      },
      (err, results) => {
        if (err || !results) {
          return res
            .status(Constants.er_not_found)
            .json(errHandler.idNotFoundErrorHandler());
        }
        return res.status(Constants.success).json(results);
      }
    );
  } else {
    return res
      .status(Constants.er_authorization_failed)
      .json(errHandler.unauthorizedErrorHandler());
  }
};

// To get all student's data
const StudentGet = function (req, res) {

  if (req.session.user_type == Constants.admin || Constants.tpo) {
    Student.find({
        code: req.params.code,
      },
      (err, results) => {
        if (err || !results) {
          return res
            .status(Constants.er_not_found)
            .json(errHandler.codeNotFoundErrorHandler());
        }
        return res.status(Constants.success).json(results);
      }
    );
  } else {
    return res
      .status(Constants.er_authorization_failed)
      .json(errHandler.unauthorizedErrorHandler());
  }
};

//Update student's info
const StudentPut = async function (req, res) {

  const body = req.body;

  if (req.session.user_type == Constants.student) {
    //VALIDATE THE DATA
    const {
      error
    } = studentPutValidation(body);
    if (error) {
      return res
        .status(Constants.er_failure)
        .json(errHandler.validationErrorHandler(error));
    }
    if (body.password) {
      const salt = bcrypt.genSaltSync(Constants.saltRound);
      const hashedPassword = bcrypt.hashSync(body.password, salt);
      body.password = hashedPassword;
    }
    await Student.findOneAndUpdate({
        _id: req.params.id
      },
      body, async (err, result) => {
        if (err) {
          return res.status(Constants.er_failure).json(errHandler.errorHandler(err));
        }
        await Student.findOne({
            _id: req.params.id
          }).then((results) => {
            if (!results) {
              return res
                .status(Constants.er_not_found)
                .json(errHandler.codeNotFoundErrorHandler());
            } else {
              res.status(Constants.success).json(results);
            }
          })
          .catch((err) => {
            return res.status(Constants.er_failure).json(errHandler.errorHandler(err));
          });
      })
  } else {
    return res
      .status(Constants.er_authorization_failed)
      .json(errHandler.unauthorizedErrorHandler());
  }
};

// delete a student from the db
const StudentDelete = function (req, res) {

  if (req.session.user_type == Constants.student) {
    Student.findByIdAndRemove({
        _id: req.params.id,
      },
      (err, results) => {
        if (err) {
          return res
            .status(Constants.er_failure)
            .json(errHandler.errorHandler(err));
        }
        if (!results) {
          return res
            .status(Constants.er_not_found)
            .json(errHandler.idNotFoundErrorHandler());
        }
        return res.status(Constants.success).json({
          message: "Data deleted successfully",
        });
      }
    );
  } else {
    return res
      .status(Constants.er_authorization_failed)
      .json(errHandler.unauthorizedErrorHandler());
  }
};

module.exports.AdminGetById = AdminGetById;
module.exports.AdminGet = AdminGet;
module.exports.AdminPut = AdminPut;
module.exports.AdminDelete = AdminDelete;
module.exports.TpoGetBtId = TpoGetBtId;
module.exports.TpoGet = TpoGet;
module.exports.TpoPut = TpoPut;
module.exports.TpoDelete = TpoDelete;
module.exports.StudentGetById = StudentGetById;
module.exports.StudentGet = StudentGet;
module.exports.StudentPut = StudentPut;
module.exports.StudentDelete = StudentDelete;