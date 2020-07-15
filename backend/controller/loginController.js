//import models
const Admin = require("../model/Admin");
const Tpo = require("../model/Tpo");
const Constants = require("../config/constant");
const Student = require("../model/Student");
const logger = require("../config/logger");
const errHandler = require("./errorHandling");
// import validations
const {
    studentloginValidation,
    loginValidation,
} = require("../config/validation");

//import jwt token for login
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

//A Function for Check if the password is correct or not
async function ValidPassword(req, user) {
    const validPass = await bcrypt.compare(req.body.password, user.password);
    return validPass;
}

function md5PasswordCheck(req) {
    const newPass = req.body.password;
    let hash = crypto.createHash("md5").update(newPass).digest("hex");
    return hash
}

//Function for Create and assign a token
async function createToken(user) {
    return jwt.sign({
            _id: user._id,
        },
        process.env.TOKEN_SECRET
    );
}

function createAndSendSession(req, res, user, token, user_type) {
    //To store or access session data, we use the request property req.session, which is (generally) serialized as JSON by the store.
    (req.session.email = user.email),
    (req.session._id = user._id),
    (req.session.token = token),
    (req.session.user_type = user_type);
}

function response(req) {
    const responseObject = {
        email: req.session.email,
        _id: req.session._id,
        token: req.session.token,
        user_type: req.session.user_type,
    };
    return responseObject;
}

//Admin Login
const AdminLogin = async(req, res) => {
    const {
        error
    } = loginValidation(req.body);
    if (error) {
        logger.log("error", "validation error", error.details);
        return res
            .status(Constants.er_failure)
            .json(errHandler.validationErrorHandler(error));
    }
    //Checking if the admin is not in the database
    const user = await Admin.findOne({
        email: req.body.email,
    });
    if (!user) {
        logger.log("error", errHandler.emailNotFoundErrorHandler());
        return res
            .status(Constants.er_not_found)
            .json(errHandler.emailNotFoundErrorHandler());
    }
    const user_type = Constants.admin;
    const validPass = await ValidPassword(req, user);
    if (!validPass) {
        const hashedPAssword = md5PasswordCheck(req);
        if (!(hashedPAssword == user.password)) {
            logger.log("error", errHandler.invalidPasswordErrorHandler());
            return res
                .status(Constants.er_authentication_failed)
                .json(errHandler.invalidPasswordErrorHandler());
        }
    }
    const token = await createToken(user);
    await createAndSendSession(req, res, user, token, user_type);
    const result = await response(req);
    logger.info("Successfully Logged In", result);
    return res.status(Constants.success).header("auth-token", token).json(result);
};

//Student Login

const StudentLogin = async(req, res) => {
    const {
        error
    } = studentloginValidation(req.body);
    if (error) {
        logger.log("error", "validation error", error.details);
        return res
            .status(Constants.er_failure)
            .json(errHandler.validationErrorHandler(error));
    }
    //Checking if the student is not in the database
    const user = await Student.findOne({
        code: req.body.code,
        roll: req.body.roll,
    });
    if (!user) {
        logger.log("error", errHandler.notFoundRollCodeErrorHandler());
        return res
            .status(Constants.er_not_found)
            .json(errHandler.notFoundRollCodeErrorHandler());
    }
    const user_type = Constants.student;
    const validPass = await ValidPassword(req, user);
    if (!validPass) {
        const hashedPAssword = md5PasswordCheck(req);
        if (!(hashedPAssword == user.password)) {
            logger.log("error", errHandler.invalidPasswordErrorHandler());
            return res
                .status(Constants.er_authentication_failed)
                .json(errHandler.invalidPasswordErrorHandler());
        }
    }
    const token = await createToken(user);
    await createAndSendSession(req, res, user, token, user_type);
    const result = await response(req);
    logger.info("Successfully Logged In", result);
    return res.status(Constants.success).header("auth-token", token).json(result);
};

//Tpo Login

const TpoLogin = async(req, res) => {
    const {
        error
    } = loginValidation(req.body);
    if (error) {
        logger.log("error", "validation error", error.details);
        return res
            .status(Constants.er_failure)
            .json(errHandler.validationErrorHandler(error));
    }
    //Checking if the tpo is not in the database
    const user = await Tpo.findOne({
        email: req.body.email,
    });
    if (!user) {
        logger.log("error", errHandler.emailNotFoundErrorHandler());
        return res
            .status(Constants.er_not_found)
            .json(errHandler.emailNotFoundErrorHandler());
    }
    const user_type = Constants.tpo;
    const validPass = await ValidPassword(req, user);
    if (!validPass) {
        const hashedPAssword = md5PasswordCheck(req);
        if (!(hashedPAssword == user.password)) {
            logger.log("error", errHandler.invalidPasswordErrorHandler());
            return res
                .status(Constants.er_authentication_failed)
                .json(errHandler.invalidPasswordErrorHandler());
        }
    }
    const token = await createToken(user);
    await createAndSendSession(req, res, user, token, user_type);
    const result = await response(req);
    logger.info("Successfully Logged In", result);
    return res.status(Constants.success).header("auth-token", token).json(result);
};

module.exports.StudentLogin = StudentLogin;
module.exports.AdminLogin = AdminLogin;
module.exports.TpoLogin = TpoLogin;