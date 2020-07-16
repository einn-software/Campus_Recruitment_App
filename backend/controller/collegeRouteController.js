const errHandler = require("./errorHandling");
const Constants = require("../config/constant");

//import models
const College = require("../model/College");
const Tpo = require("../model/Tpo");
const Student = require("../model/Student");

// import validations
const {
    collegeValidation,
    collegePutValidation,
} = require("../config/validation");
const logger = require("../config/logger");


function randomCodeGenerate() {
    return Math.floor(Constants.code_min + Math.random() * Constants.code_max);
}

// to add a college
const CollegeAdd = async function(req, res) {
    if (req.session.user_type == Constants.admin) {
        //LETS VALIDATE THE DATA BEFORE WE ADD A college
        const {
            error
        } = collegeValidation(req.body);
        if (error) {
            logger.log('error', errHandler.validationErrorHandler(error));
            return res
                .status(Constants.er_failure)
                .json(errHandler.validationErrorHandler(error));
        }
        //Checking if the college is already in the database
        const collegeExist = await College.findOne({
            email: req.body.email,
        });
        if (collegeExist) {
            logger.log('error', `Function College.findOne({email: ${req.body.email}})`, errHandler.emailExistErrorHandler());
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
            logger.info("Successfully added", user);
            return res.status(Constants.success).json(user);
        } catch (err) {
            logger.log("error", errHandler.errorHandler(err))
            return res
                .status(Constants.er_failure)
                .json(errHandler.errorHandler(err));
        }
    } else {
        logger.log("error", `({user_type:${req.session.user_type}})`, errHandler.unauthorizedErrorHandler())
        return res
            .status(Constants.er_authorization_failed)
            .json(errHandler.unauthorizedErrorHandler());
    }
};

//To Get all the colleges data
const CollegeGet = function(req, res) {
    College.find({}, (err, results) => {
        if (err || !results) {
            logger.log("error", "Function College.find({})", errHandler.errorHandler(err))
            return res
                .status(Constants.er_failure)
                .json(errHandler.errorHandler(err));
        }
        logger.info(results)
        return res.status(Constants.success).json(results);
    });
};

// To get single college data using id
const CollegeGetByCode = function(req, res) {
    if (
        req.session.user_type == Constants.admin ||
        Constants.tpo ||
        Constants.student
    ) {
        College.findOne({
                code: req.params.code,
            },
            (err, results) => {
                if (err || !results) {
                    logger.log("error", `Function College.findOne({code: ${req.params.code}})`, errHandler.codeNotFoundErrorHandler());
                    return res
                        .status(Constants.er_not_found)
                        .json(errHandler.codeNotFoundErrorHandler());
                }
                logger.info(results);
                return res.status(Constants.success).json(results);
            }
        );
    } else {
        logger.log("error", `({user_type:${req.session.user_type}})`, errHandler.unauthorizedErrorHandler())
        return res
            .status(Constants.er_authorization_failed)
            .json(errHandler.unauthorizedErrorHandler());
    }
};

//To change or update the college's data by using their id
const CollegePut = function(req, res) {
    if (req.session.user_type == Constants.admin || Constants.tpo) {
        const body = req.body;
        //VALIDATE THE DATA BEFORE WE MAKE A College
        const {
            error
        } = collegePutValidation(body);
        if (error) {
            logger.log('error', errHandler.validationErrorHandler(error));
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
                    logger.log("error", `Function College.findOneAndUpdate({code: ${req.params.code}, with body ${body}})`, errHandler.errorHandler(err));
                    return res
                        .status(Constants.er_failure)
                        .json(errHandler.errorHandler(err));
                }
                if (!result) {
                    logger.log("error", `Function College.findOneAndUpdate({code: ${req.params.code}})`, errHandler.codeNotFoundErrorHandler());
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
                                        logger.log("error", errHandler.errorHandler(err))
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
                                        logger.log("error", errHandler.errorHandler(err))
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
        logger.log("error", `({user_type:${req.session.user_type}})`, errHandler.unauthorizedErrorHandler())
        return res
            .status(Constants.er_authorization_failed)
            .json(errHandler.unauthorizedErrorHandler());
    }
};

//To delete the college's data by using their id
const CollegeDelete = function(req, res) {
    if (req.session.user_type == Constants.admin) {
        College.findByIdAndRemove({
                _id: req.params.id,
            },
            (err, results) => {
                if (err) {
                    logger.log("error", `Function College.findByIdAndRemove({_d: ${req.params.id}})`, errHandler.errorHandler(err));
                    return res
                        .status(Constants.er_failure)
                        .json(errHandler.errorHandler(err));
                }
                if (!results) {
                    logger.log("error", `Function College.findByIdAndRemove({_d: ${req.params.id}})`, errHandler.idNotFoundErrorHandler());
                    return res
                        .status(Constants.er_not_found)
                        .json(errHandler.idNotFoundErrorHandler('college id'));
                }
                logger.info({
                    message: "Data deleted successfully"
                })
                return res.status(Constants.success).json({
                    message: "Data deleted successfully",
                });
            }
        );
    } else {
        logger.log("error", `({user_type:${req.session.user_type}})`, errHandler.unauthorizedErrorHandler())
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