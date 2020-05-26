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
    adminPutValidation,
    studentPutValidation,
    tpoPutValidation,
} = require("../config/validation");

//To Get all the admins data
const AdminGet = (verify, function (req, res) {
    if (req.session.user_type == Constants[1]) {
        Admin.find({}, (err, results) => {
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

// To get single Admin data using id
const AdminGetById = (verify, function (req, res) {
    if (req.session.user_type == 1) {
        Admin.findOne({
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

//To change or update the admin's data by using their id
const AdminPut =
    (verify,
        function (req, res) {
            const body = req.body;
            //VALIDATE THE DATA BEFORE WE MAKE A Admin
            const {
                error
            } = adminPutValidation(body);
            if (error) {
                return res.status(`${Constants.er_failure}`).json(errHandler.errorHandler(error));
            }
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(body.password, salt);
            body.password = hashedPassword;
            if (req.session.user_type == Constants[1]) {
                Admin.findOneAndUpdate({
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

//To delete the admin's data by using their id
const AdminDelete =
    (verify,
        function (req, res) {
            if (req.session.user_type == Constants[1]) {
                Admin.findByIdAndRemove({
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


// To get single Tpo data using id
const TpoGetBtId = (verify, function (req, res) {
    if (req.session.user_type == 2) {
        Tpo.findOne({
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

//To get all the tpo's data 
const TpoGet = (verify, function (req, res) {
    if (req.session.user_type == Constants[2]) {
        Tpo.find({}, (err, results) => {
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

//To change or update the tpo's data by using their id
const TpoPut =
    (verify,
        function (req, res) {
            const body = req.body;
            //VALIDATE THE DATA BEFORE WE MAKE A Admin
            const {
                error
            } = tpoPutValidation(body);
            if (error) {
                return res.status(`${Constants.er_failure}`).json(errHandler.errorHandler(error));
            }
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(body.password, salt);
            body.password = hashedPassword;
            if (req.session.user_type == Constants[2]) {
                Tpo.findOneAndUpdate({
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

//To delete the tpo's data by using their id
const TpoDelete =
    (verify,
        function (req, res) {
            if (req.session.user_type == Constants[2]) {
                Tpo.findByIdAndRemove({
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

// To get single student data using id
const StudentGetById = (verify, function (req, res) {
    if (req.session.user_type == 1 || 2 || 3) {
        Student.findOne({
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

// To get all student's data
const StudentGet = (verify, function (req, res) {
    if (req.session.user_type == 3) {
        Student.find({}, (err, results) => {
            if (err) {
                return res.status(`${Constants.er_notFound}`).json(errHandler.idNotFoundErrorHandler());
            }
            return res.status(`${Constants.success}`).json(results);
        });
    } else {
        return res
            .status(`${Constants.er_authorizationFailed}`)
            .json(errHandler.unauthorizedErrorHandler());
    }
});

//Update student's info
const StudentPut = (verify, function (req, res) {
    const body = req.body;
    //VALIDATE THE DATA BEFORE WE MAKE A Admin
    const {
        error
    } = studentPutValidation(body);
    if (error) {
        return res.status(`${Constants.er_failure}`).json(errHandler.errorHandler(error));
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(body.password, salt);
    body.password = hashedPassword;
    if (req.session.user_type == 3) {
        Student.findOneAndUpdate({
                    _id: req.params.id,
                },
                body
            )
            .then((results) => {
                if (!results) {
                    return res.status(`${Constants.er_notFound}`).json(errHandler.idNotFoundErrorHandler());
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

// delete a student from the db
const StudentDelete = (verify, function (req, res) {
    if (req.session.user_type == 3) {
        Student.findByIdAndRemove({
                _id: req.params.id,
            },
            (err, results) => {
                if (err) {
                    return res.status(`${Constants.er_failure}`).json(errHandler.errorHandler(err));
                }
                if (!results) {
                    return res.status(`${Constants.er_notFound}`).json(errHandler.idNotFoundErrorHandler());
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

module.exports.AdminGetById = AdminGetById
module.exports.AdminGet = AdminGet
module.exports.AdminPut = AdminPut
module.exports.AdminDelete = AdminDelete
module.exports.TpoGetBtId = TpoGetBtId
module.exports.TpoGet = TpoGet
module.exports.TpoPut = TpoPut
module.exports.TpoDelete = TpoDelete
module.exports.StudentGetById = StudentGetById
module.exports.StudentGet = StudentGet
module.exports.StudentPut = StudentPut
module.exports.StudentDelete = StudentDelete