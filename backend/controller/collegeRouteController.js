const errHandler = require("./errorHandling");
const verify = require('../config/verifyToken');
const Constants = require('../config/constant');
const bcrypt = require('bcrypt');

//import models
const College = require("../model/College");

// import validations
const {
    collegeValidation,
    collegePutValidation
} = require("../config/validation");

function randomCodeGenerate() {
    return `${Math.floor((Constants.code_min) + Math.random() * (Constants.code_max))}`;
}

// to add a college
const collegeAdd = (verify, async (req, res) => {
    if (req.session.user_type == Constants[1]) {
        //LETS VALIDATE THE DATA BEFORE WE ADD A college
        const {
            error
        } = collegeValidation(req.body);
        if (error) return res.status(`${Constants.er_failure}`).json(errHandler.errorHandler(error));

        //Checking if the college is already in the database
        const collegeExist = await College.findOne({
            email: req.body.email
        });
        if (collegeExist) return res.status(`${Constants.er_failure}`).json(errHandler.emailExistErrorHandler());

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
            res.status(`${Constants.success}`).json(user);
        } catch (err) {
            res.status(`${Constants.er_failure}`).json(errHandler.errorHandler(err));
        }
    } else {
        return res
            .status(`${Constants.er_authorizationFailed}`)
            .json(errHandler.unauthorizedErrorHandler());
    }
});

//To Get all the colleges data
const collegeGet = (verify, function (req, res) {
    if (req.session.user_type == Constants[1]) {
        College.find({}, (err, results) => {
            if (err) {
                return res
                    .status(`${Constants.er_failure}`)
                    .json(errHandler.errorHandler(err));
            }
            return res.status(`${Constants.success}`).json(results);
        });
    } else {
        return res
            .status(`${Constants.er_authorizationFailed}`)
            .json(errHandler.unauthorizedErrorHandler());
    }
});

// To get single college data using id
const collegeGetById = (verify, function (req, res) {
    if (req.session.user_type == Constants[1]) { //Todo
        College.findOne({
                _id: req.params.id,
            },
            (err, results) => {
                if (err) {
                    return res.status(`${Constants.er_notFound}`).json(errHandler.idNotFoundErrorHandler());
                }
                return res.status(`${Constants.success}`).json(results);
            }
        );
    } else {
        return res
            .status(`${Constants.er_authorizationFailed}`)
            .json(errHandler.unauthorizedErrorHandler());
    }
});

//To change or update the college's data by using their id
const collegePut =
    (verify,
        function (req, res) {
            if (req.session.user_type == Constants[1]) {
                const body = req.body;
                //VALIDATE THE DATA BEFORE WE MAKE A College
                const {
                    error
                } = collegePutValidation(body);
                if (error) {
                    return res.status(`${Constants.er_failure}`).json(errHandler.errorHandler(error));
                }
                colleges.findOneAndUpdate({
                            _id: req.params.id,
                        },
                        body
                    )
                    .then((results) => {
                        if (!results) {
                            return res
                                .status(`${Constants.er_notFound}`)
                                .json(errHandler.idNotFoundErrorHandler());
                        } else {
                            res.status(`${Constants.success}`).json(results);
                        }
                    })
                    .catch((err) => {
                        return res.status(`${Constants.er_failure}`).json(errHandler.errorHandler(err));
                    });
            } else {
                return res
                    .status(`${Constants.er_authorizationFailed}`)
                    .json(errHandler.unauthorizedErrorHandler());
            }
        });

//To delete the college's data by using their id
const collegeDelete =
    (verify,
        function (req, res) {
            if (req.session.user_type == Constants[1]) {
                College.findByIdAndRemove({
                        _id: req.params.id,
                    },
                    (err, results) => {
                        if (err) {
                            return res.status(`${Constants.er_failure}`).json(errHandler.errorHandler(err));
                        }
                        if (!results) {
                            return res
                                .status(`${Constants.er_notFound}`)
                                .json(errHandler.idNotFoundErrorHandler());
                        }
                        return res.status(`${Constants.success}`);
                    }
                );
            } else {
                return res
                    .status(`${Constants.er_authorizationFailed}`)
                    .json(errHandler.unauthorizedErrorHandler());
            }
        });

module.exports.collegeDelete = collegeDelete
module.exports.collegeGet = collegeGet
module.exports.collegeGetById = collegeGetById
module.exports.collegePut = collegePut
module.exports.collegeAdd = collegeAdd