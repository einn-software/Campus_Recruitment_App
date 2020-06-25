const errHandler = require("./errorHandling");
const Constants = require('../config/constant');

//import models
const College = require("../model/College");

// import validations
const {
    collegeValidation,
    collegePutValidation
} = require("../config/validation");

function randomCodeGenerate() {
    return Math.floor((Constants.code_min) + Math.random() * (Constants.code_max));
}

// to add a college
const CollegeAdd = (async function (req, res) {
    if (req.session.user_type == Constants.admin) {
        //LETS VALIDATE THE DATA BEFORE WE ADD A college
        const {
            error
        } = collegeValidation(req.body);
        if (error) return res.status(Constants.er_failure).json(errHandler.validationErrorHandler(error));

        //Checking if the college is already in the database
        const collegeExist = await College.findOne({
            email: req.body.email
        });
        if (collegeExist) return res.status(Constants.er_failure).json(errHandler.emailExistErrorHandler());

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
            return res.status(Constants.success).json(user);
        } catch (err) {
            return res.status(Constants.er_failure).json(errHandler.errorHandler(err));
        }
    } else {
        return res
            .status(Constants.er_authorization_failed)
            .json(errHandler.unauthorizedErrorHandler());
    }
});

//To Get all the colleges data
const CollegeGet = function (req, res) {
    College.find({}, (err, results) => {
        if (err) {
            return res
                .status(Constants.er_failure)
                .json(errHandler.errorHandler(err));
        }
        return res.status(Constants.success).json(results);
    });
};




// To get single college data using id
const CollegeGetByCode = function (req, res) {
    if (req.session.user_type == Constants.admin || Constants.tpo || Constants.student) {
        College.findOne({
                code: req.params.code,
            },
            (err, results) => {
                if (err || !results) {
                    return res.status(Constants.er_not_found).json(errHandler.codeNotFoundErrorHandler());
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

//To change or update the college's data by using their id
const CollegePut =
    (function (req, res) {
        if (req.session.user_type == Constants.admin || Constants.tpo) {
            const body = req.body;
            //VALIDATE THE DATA BEFORE WE MAKE A College
            const {
                error
            } = collegePutValidation(body);
            if (error) {
                return res.status(Constants.er_failure).json(errHandler.validationErrorHandler(error));
            }
            College.findOneAndUpdate({
                    code: req.params.code,
                },
                body, (err, result) => {
                    if (err) {
                        return res.status(Constants.er_failure).json(errHandler.errorHandler(err));
                    }
                    College.findOne({
                            code: req.params.code
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
    });

//To delete the college's data by using their id
const CollegeDelete =
    (function (req, res) {
        if (req.session.user_type == Constants.admin) {
            College.findByIdAndRemove({
                    _id: req.params.id,
                },
                (err, results) => {
                    if (err) {
                        return res.status(Constants.er_failure).json(errHandler.errorHandler(err));
                    }
                    if (!results) {
                        return res
                            .status(Constants.er_not_found)
                            .json(errHandler.idNotFoundErrorHandler());
                    }
                    return res.status(Constants.success).json({
                        message: "Data deleted successfully"
                    });
                }
            );
        } else {
            return res
                .status(Constants.er_authorization_failed)
                .json(errHandler.unauthorizedErrorHandler());
        }
    });

module.exports = {
    CollegeDelete,
    CollegeGet,
    CollegeGetByCode,
    CollegePut,
    CollegeAdd
}