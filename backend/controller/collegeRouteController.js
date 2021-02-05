const errHandler = require("./errorHandling");
const Constants = require("../config/constant");
const {
  logger,
  printLogsWithBody
} = require("../config/logger");
//import models
const College = require("../model/College");
const Tpo = require("../model/Tpo");
const Student = require("../model/Student");

// import validations
const {
  collegeValidation,
  collegePutValidation,
} = require("../config/validation");

function randomCodeGenerate() {
  const collegeCode = Math.floor(Constants.code_min + Math.random() * Constants.code_max)
  logger.info(`Function randomCodeGenerate(), code: ${collegeCode}`);
  return collegeCode;
}

// to add a college
const CollegeAdd = async function (req, res) {
  printLogsWithBody(req);
  if (req.session.user_type == Constants.admin) {
    //LETS VALIDATE THE DATA BEFORE WE ADD A college
    const {
      error
    } = collegeValidation(req.body);
    if (error) {
      logger.error(errHandler.validationErrorHandler(error));
      return res
        .status(Constants.er_failure)
        .json(errHandler.validationErrorHandler(error));
    }
    //Checking if the college is already in the database
    const collegeExist = await College.findOne({
      email: req.body.email
    });
    if (collegeExist) {
      logger.error(`If(collegeExist: ${collegeExist}) - `, errHandler.thisEmailExistErrorHandler(req.body.email));
      return res
        .status(Constants.er_failure)
        .json(errHandler.thisEmailExistErrorHandler(req.body.email));
    }
    // Create a new college
    const college = new College({
      name: req.body.name,
      code: randomCodeGenerate(),
      address: req.body.address,
      university: req.body.university,
      email: req.body.email,
      phone: req.body.phone,
    });
    try {
      const user = await college.save();
      logger.info(user)
      return res.status(Constants.success).json(user);
    } catch (err) {
      logger.error(`Error in saving college - `, errHandler.errorHandler(err));
      return res
        .status(Constants.er_failure)
        .json(errHandler.errorHandler(err));
    }
  } else {
    logger.error(`If user is not an admin - `, errHandler.unauthorizedErrorHandler());
    return res
      .status(Constants.er_authorization_failed)
      .json(errHandler.unauthorizedErrorHandler());
  }
};

//To Get all the colleges data
const CollegeGet = function (req, res) {
  printLogsWithBody(req);
  College.find({}, (err, results) => {
    if (err || !results) {
      logger.error(`Function College.find({}, callback) - `, errHandler.errorHandler(err));
      return res
        .status(Constants.er_failure)
        .json(errHandler.errorHandler(err));
    }
    logger.info(results)
    return res.status(Constants.success).json(results);
  });
};

// To get single college data using id
const CollegeGetByCode = function (req, res) {
  printLogsWithBody(req);
  if (
    req.session.user_type == Constants.admin ||
    req.session.user_type == Constants.tpo ||
    req.session.user_type == Constants.student
  ) {
    College.findOne({
        code: req.params.code
      },
      (err, results) => {
        if (err || !results) {
          logger.error(`Function College.findOne({code: ${req.params.code}}, callback) - `, errHandler.codeNotFoundErrorHandler());
          return res
            .status(Constants.er_not_found)
            .json(errHandler.codeNotFoundErrorHandler());
        }
        logger.info(results)
        return res.status(Constants.success).json(results);
      }
    );
  } else {
    logger.error(`If user is not a student, admin or tpo - `, errHandler.unauthorizedErrorHandler());
    return res
      .status(Constants.er_authorization_failed)
      .json(errHandler.unauthorizedErrorHandler());
  }
};

//To change or update the college's data by using their id
const CollegePut = function (req, res) {
  printLogsWithBody(req);
  if (req.session.user_type == Constants.admin || req.session.user_type == Constants.tpo) {
    const body = req.body;
    //VALIDATE THE DATA BEFORE WE MAKE A College
    const {
      error
    } = collegePutValidation(body);
    if (error) {
      logger.error(errHandler.validationErrorHandler(error));
      return res
        .status(Constants.er_failure)
        .json(errHandler.validationErrorHandler(error));
    }
    College.findOneAndUpdate({
        code: req.params.code,
      },
      body, {
        new: true,
      },
      (err, result) => {
        if (err) {
          logger.error(`Function College.findOneAndUpdate({code: ${req.params.code}}, body, callback) - `, errHandler.errorHandler(err));
          return res
            .status(Constants.er_failure)
            .json(errHandler.errorHandler(err));
        }
        if (!result) {
          logger.error(`Function College.findOneAndUpdate({code: ${req.params.code}}, body, callback) - `, errHandler.codeNotFoundErrorHandler());
          return res
            .status(Constants.er_not_found)
            .json(errHandler.codeNotFoundErrorHandler());
        }
        if (body.name) {
          Student.find({
              code: req.params.code,
            },
            (result) => {
              Student.updateMany({
                  college: body.name,
                },
                (err, resp) => {
                  if (err || !resp) {
                    logger.error(`Function Student.updateMany({college: ${body.name}}, callback) - `, errHandler.errorHandler(err));
                    return res
                      .status(Constants.er_failure)
                      .json(errHandler.errorHandler(err));
                  }
                }
              );
            }
          );
          Tpo.find({
              code: req.params.code,
            },
            (result) => {
              Tpo.updateMany({
                  college: body.name,
                },
                (err, resp) => {
                  if (err || !resp) {
                    logger.error(`Function Tpo.updateMany({college: ${body.name}}, callback) - `, errHandler.errorHandler(err));
                    return res
                      .status(Constants.er_failure)
                      .json(errHandler.errorHandler(err));
                  }
                }
              );
            }
          );
        }
        logger.info(result)
        return res.status(Constants.success).json(result);
      }
    );
  } else {
    logger.error(`If user is neither an admin nor a tpo - `, errHandler.unauthorizedErrorHandler());
    return res
      .status(Constants.er_authorization_failed)
      .json(errHandler.unauthorizedErrorHandler());
  }
};

//To delete the college's data by using their id
const CollegeDelete = function (req, res) {
  printLogsWithBody(req);
  if (req.session.user_type == Constants.admin) {
    College.findByIdAndRemove({
        _id: req.params.id
      },
      (err, results) => {
        if (err) {
          logger.error(`Function College.findByIdAndRemove({_id: ${req.params.id}}, callback) - `, errHandler.errorHandler(err));
          return res
            .status(Constants.er_failure)
            .json(errHandler.errorHandler(err));
        }
        if (!results) {
          logger.error(`Function College.findByIdAndRemove({_id: ${req.params.id}}, callback) - `, errHandler.idNotFoundErrorHandler('college id'));
          return res
            .status(Constants.er_not_found)
            .json(errHandler.idNotFoundErrorHandler('college id'));
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
    logger.error(`If user is not an admin - `, errHandler.unauthorizedErrorHandler());
    return res
      .status(Constants.er_authorization_failed)
      .json(errHandler.unauthorizedErrorHandler());
  }
};

module.exports = {
  CollegeDelete,
  CollegeGet,
  CollegeGetByCode,
  CollegePut,
  CollegeAdd,
};
