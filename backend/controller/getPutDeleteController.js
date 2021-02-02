const errHandler = require("./errorHandling");
const Constants = require("../config/constant");
const bcrypt = require("bcryptjs");
const {
  logger
} = require("../config/logger");
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
        logger.error(`Fuction Admin.find({}, callback) - `, errHandler.errorHandler(err));
        return res
          .status(Constants.er_failure)
          .json(errHandler.errorHandler(err));
      }
      logger.info(results);
      return res.status(Constants.success).json(results);
    });
  } else {
    logger.error(`If user is not an admin - `, errHandler.unauthorizedErrorHandler());
    return res
      .status(Constants.er_authorization_failed)
      .json(errHandler.unauthorizedErrorHandler());
  }
};

// To get single Admin data using id
const AdminGetById = function (req, res) {
  if (req.session.user_type == Constants.admin) {
    Admin.findOne({
        _id: req.params.id
      },
      (err, results) => {
        if (err || !results) {
          logger.error(`Fuction Admin.findOne({_id: ${req.params.id}}, callback) - `, errHandler.idNotFoundErrorHandler('admin id'));
          return res
            .status(Constants.er_not_found)
            .json(errHandler.idNotFoundErrorHandler('admin id'));
        }
        logger.info(results);
        return res.status(Constants.success).json(results);
      }
    );
  } else {
    logger.error(`If user is not an admin - `, errHandler.unauthorizedErrorHandler());
    return res
      .status(Constants.er_authorization_failed)
      .json(errHandler.unauthorizedErrorHandler());
  }
};

//To change or update the admin's data by using their id
const AdminPut = async function (req, res) {
  const body = req.body;
  if(req.session.user_type == Constants.admin) {
    //VALIDATE THE DATA BEFORE WE MAKE A Admin
    const {
      error
    } = adminPutValidation(body);
    if (error) {
      logger.error(errHandler.validationErrorHandler(error));
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
        body, {
          new: true
        }, async (err, result) => {
          if (err) {
            logger.error(`Fuction Admin.findOneAndUpdate({_id: ${req.params.id}}, callback) - `, errHandler.errorHandler(err));
            return res.status(Constants.er_failure).json(errHandler.errorHandler(err));
          }
          if (!result) {
            logger.error(`Fuction Admin.findOneAndUpdate({_id: ${req.params.id}}, callback) - `, errHandler.idNotFoundErrorHandler('admin id'));
            return res
              .status(Constants.er_not_found)
              .json(errHandler.idNotFoundErrorHandler('admin id'));
          } else {
            logger.info(result)
            res.status(Constants.success).json(result);
          }
        })
      .catch((err) => {
        logger.error(`Updating Admin's data`, errHandler.errorHandler(err));
        return res.status(Constants.er_failure).json(errHandler.errorHandler(err));
      });
  } else {
    logger.error(`If user is not an admin - `, errHandler.unauthorizedErrorHandler());
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
          logger.error(`Fuction Admin.findByIdAndRemove({_id: ${req.params.id}}, callback) - `, errHandler.errorHandler(err));
          return res
            .status(Constants.er_failure)
            .json(errHandler.errorHandler(err));
        }
        if (!results) {
          logger.error(`Fuction Admin.findByIdAndRemove({_id: ${req.params.id}}, callback) - `, errHandler.idNotFoundErrorHandler('admin id'));
          return res
            .status(Constants.er_not_found)
            .json(errHandler.idNotFoundErrorHandler('admin id'));
        }
        return res.status(Constants.success).json({
          message: "Data deleted successfully",
        });
      }
    );
  } else {
    logger.error(`If user is not an admin - `, errHandler.unauthorizedErrorHandler());
    return res
      .status(Constants.er_authorization_failed)
      .json(errHandler.unauthorizedErrorHandler());
  }
};

// To get single Tpo data using id
const TpoGetBtId = function (req, res) {
  if (req.session.user_type == Constants.admin || req.session.user_type == Constants.tpo) {
    Tpo.findOne({
        _id: req.params.id,
      },
      (err, results) => {
        if (err || !results) {
          logger.error(`Fuction Tpo.findOne({_id: ${req.params.id}}, callback) - `, errHandler.idNotFoundErrorHandler('tpo id'));
          return res
            .status(Constants.er_not_found)
            .json(errHandler.idNotFoundErrorHandler('tpo id'));
        }
        logger.info(results);
        return res.status(Constants.success).json(results);
      }
    );
  } else {
    logger.error(`If user is neither an admin nor a tpo - `, errHandler.unauthorizedErrorHandler());
    return res
      .status(Constants.er_authorization_failed)
      .json(errHandler.unauthorizedErrorHandler());
  }
};

//To get all the tpo's data
const TpoGet = function (req, res) {
  if (req.session.user_type == Constants.admin || req.session.user_type == Constants.tpo) {
    Tpo.find({}, (err, results) => {
      if (err || !results) {
        logger.error(`Fuction Tpo.find({}, callback) - `, errHandler.errorHandler(err));
        return res
          .status(Constants.er_failure)
          .json(errHandler.errorHandler(err));
      }
      logger.info(results);
      return res.status(Constants.success).json(results);
    });
  } else {
    logger.error(`If user is neither an admin nor a tpo - `, errHandler.unauthorizedErrorHandler());
    return res
      .status(Constants.er_authorization_failed)
      .json(errHandler.unauthorizedErrorHandler());
  }
};

//To change or update the tpo's data by using their id
const TpoPut = function (req, res) {
  const body = req.body;
  if (req.session.user_type == Constants.tpo || req.session.user_type == Constants.admin) {
    //VALIDATE THE DATA
    const {
      error
    } = tpoPutValidation(body);
    if (error) {
      logger.error(errHandler.validationErrorHandler(error));
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
          _id: req.params.id
        },
        body, {
          new: true
        }, async (err, result) => {
          if (err) {
            logger.error(`Fuction Tpo.findOneAndUpdate({_id: ${req.params.id}}, callback) - `, errHandler.errorHandler(err));
            return res.status(Constants.er_failure).json(errHandler.errorHandler(err));
          }
          if (!result) {
            logger.error(`Fuction Tpo.findOneAndUpdate({_id: ${req.params.id}}, callback) - `, errHandler.idNotFoundErrorHandler('tpo id'));
            return res
              .status(Constants.er_not_found)
              .json(errHandler.idNotFoundErrorHandler('tpo id'));
          } else {
            logger.info(result);
            res.status(Constants.success).json(result);
          }
        })
      .catch((err) => {
        logger.error(`Error in updating Tpo's data - `, errHandler.errorHandler(err));
        return res.status(Constants.er_failure).json(errHandler.errorHandler(err));
      });
  } else {
    logger.error(`If user is not an admin - `, errHandler.unauthorizedErrorHandler());
    return res
      .status(Constants.er_authorization_failed)
      .json(errHandler.unauthorizedErrorHandler());
  }
};

//To delete the tpo's data by using their id
const TpoDelete = function (req, res) {
  if (req.session.user_type == Constants.tpo || req.session.user_type == Constants.admin) {
    Tpo.findByIdAndRemove({
        _id: req.params.id,
      },
      (err, results) => {
        if (err) {
          logger.error(`Fuction Tpo.findByIdAndRemove({_id: ${req.params.id}}, callback) - `, errHandler.errorHandler(err));
          return res
            .status(Constants.er_failure)
            .json(errHandler.errorHandler(err));
        }
        if (!results) {
          logger.error(`Fuction Tpo.findByIdAndRemove({_id: ${req.params.id}}, callback) - `, errHandler.idNotFoundErrorHandler('tpo id'));
          return res
            .status(Constants.er_not_found)
            .json(errHandler.idNotFoundErrorHandler('tpo id'));
        }
        logger.info({
          message: "Data deleted successfully",
        })
        return res.status(Constants.success).json({
          message: "Data deleted successfully",
        });
      }
    );
  } else {
    logger.error(`If user is not a tpo - `, errHandler.unauthorizedErrorHandler());
    return res
      .status(Constants.er_authorization_failed)
      .json(errHandler.unauthorizedErrorHandler());
  }
};

// To get single student data using id
const StudentGetById = function (req, res) {
  if (
    req.session.user_type == Constants.admin ||
    req.session.user_type == Constants.tpo ||
    req.session.user_type == Constants.student
  ) {
    Student.findOne({
        _id: req.params.id,
      },
      (err, results) => {
        if (err || !results) {
          logger.error(`Fuction Student.findOne({_id: ${req.params.id}}, callback) - `, errHandler.idNotFoundErrorHandler('student id'));
          return res
            .status(Constants.er_not_found)
            .json(errHandler.idNotFoundErrorHandler('student id'));
        }
        logger.info(results);
        return res.status(Constants.success).json(results);
      }
    );
  } else {
    logger.error(`If user is not an admin or a student or tpo - `, errHandler.unauthorizedErrorHandler());
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
          logger.error(`Fuction Student.find({code: ${req.params.code}}, callback) - `, errHandler.codeNotFoundErrorHandler());
          return res
            .status(Constants.er_not_found)
            .json(errHandler.codeNotFoundErrorHandler());
        }
        logger.info(results);
        return res.status(Constants.success).json(results);
      }
    );
  } else {
    logger.error(`If user is neither an admin nor a tpo - `, errHandler.unauthorizedErrorHandler());
    return res
      .status(Constants.er_authorization_failed)
      .json(errHandler.unauthorizedErrorHandler());
  }
};

//Update student's info
const StudentPut = async function (req, res) {
  const body = req.body;
  if (req.session.user_type == Constants.student || req.session.user_type == Constants.tpo || req.session.user_type == Constants.admin) {
    //VALIDATE THE DATA
    const {
      error
    } = studentPutValidation(body);
    if (error) {
      logger.error(errHandler.validationErrorHandler(error));
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
        body, {
          new: true
        }, async (err, result) => {
          if (err) {
            logger.error(`Fuction Student.findOneAndUpdate({_id: ${req.params.id}}, callback) - `, errHandler.errorHandler(err));
            return res.status(Constants.er_failure).json(errHandler.errorHandler(err));
          }
          if (!result) {
            logger.error(`Fuction Student.findOneAndUpdate({_id: ${req.params.id}}, callback) - `, errHandler.idNotFoundErrorHandler('student id'));
            return res
              .status(Constants.er_not_found)
              .json(errHandler.idNotFoundErrorHandler('student id'));
          } else {
            logger.info(result);
            res.status(Constants.success).json(result);
          }
        })
      .catch((err) => {
        logger.error(`Error in updating student's data - `, errHandler.errorHandler(err))
        return res.status(Constants.er_failure).json(errHandler.errorHandler(err));
      });
  } else {
    logger.error(`If user is not a student - `, errHandler.unauthorizedErrorHandler());
    return res
      .status(Constants.er_authorization_failed)
      .json(errHandler.unauthorizedErrorHandler());
  }
};

// delete a student from the db
const StudentDelete = function (req, res) {
  if (req.session.user_type == Constants.student || req.session.user_type == Constants.tpo || req.session.user_type == Constants.admin) {
    Student.findByIdAndRemove({
        _id: req.params.id,
      },
      (err, results) => {
        if (err) {
          logger.error(`Fuction Student.findByIdAndRemove({_id: ${req.params.id}}, callback) - `, errHandler.errorHandler(err));
          return res
            .status(Constants.er_failure)
            .json(errHandler.errorHandler(err));
        }
        if (!results) {
          logger.error(`Fuction Student.findByIdAndRemove({_id: ${req.params.id}}, callback) - `, errHandler.idNotFoundErrorHandler('student id'));
          return res
            .status(Constants.er_not_found)
            .json(errHandler.idNotFoundErrorHandler('student id'));
        }
        logger.info({
          message: "Data deleted successfully",
        })
        return res.status(Constants.success).json({
          message: "Data deleted successfully",
        });
      }
    );
  } else {
    logger.error(`If user is not a student - `, errHandler.unauthorizedErrorHandler());
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
