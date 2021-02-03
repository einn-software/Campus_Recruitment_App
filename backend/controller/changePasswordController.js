const nodemailer = require("nodemailer");
const errHandler = require("./errorHandling");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  logger,
  printLogs,
  printLogsWithBody
} = require("../config/logger");
const Constants = require("../config/constant");
const Admin = require("../model/Admin");
const Tpo = require("../model/Tpo");
const Student = require("../model/Student");
// import validations
const {
  reqPasswordBodyValidation
} = require("../config/validation");

function createToken(user) {
  const token = jwt.sign({
      _id: user._id,
    },
    process.env.TOKEN_SECRET, {
      expiresIn: "20m",
    }
  );
  return token;
}

function createTransporter() {
  // create reusable transporter object using the gmail transport
  //transporter is going to be an object of transport that is able to send mail
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EINN_EMAIL, // generated ethereal user
      pass: process.env.EINN_EMAIL_PASSWORD, // generated ethereal password
    },
  });
  return transporter;
}

async function createMailOptions(request, user) {
  const token = await createToken(user);
  const mailOptions = {
    from: process.env.EINN_EMAIL,
    to: request.body.email,
    subject: "Link To Reset Password",
    text: "You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n" +
      "Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n" +
      `http://localhost:4200/reset-password/admins/\n\n` +
      "If you did not request this, please ignore this email and your password will remain unchanged.\n",
  };
  request.session.email = request.body.email;
  request.session.resetLink = token;
  return mailOptions;
}

async function resetPassword(request, response, err, user) {
  if (err || !user) {
    logger.error(`Function resetPassword(request, response, err, user:{${user}}) - `, errHandler.userNotFoundErrorHandler())
    return response.status(Constants.er_not_found).json(errHandler.userNotFoundErrorHandler());
  } else {
    const {
      error
    } = reqPasswordBodyValidation(request.body);
    if (error) {
      logger.error(errHandler.validationErrorHandler(error));
      return response.status(Constants.er_failure).json(errHandler.validationErrorHandler(error));
    }
    /* Once again store password securely */
    const salt = bcrypt.genSaltSync(10);
    const hashedNewPassword = bcrypt.hashSync(
      request.body.newPassword,
      salt
    );
    /* Save to database */
    user.password = hashedNewPassword;
    /* Now reset the token */
    request.session.resetLink = null;
    request.session.email = null;
    user.save();
  }
  logger.info({
    message: `Password for ${user.email} successfully reset`
  })
  return response.status(Constants.success).json({
    message: `Password for ${user.email} successfully reset`
  });
}

// Admin forgot and reset Pssword
/* Request a password reset email and make a reset password token */

const AdminForgotPassword = async (request, response) => {
  printLogsWithBody(request);
  const user = await Admin.findOne({
    email: request.body.email,
  });
  if (user === null) {
    logger.error(`Admin.findOne({email: ${request.session.email}}) - `, errHandler.emailNotFoundErrorHandler())
    response.status(404).json(errHandler.emailNotFoundErrorHandler());
  }
  const transporter = await createTransporter();
  const mailOptions = await createMailOptions(request, user);

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      logger.error(`Function transporter.sendMail(mailOptions, callback) - `, errHandler.errorHandler(err))
      return response.status(Constants.er_failure).json(errHandler.errorHandler(err));
    }
    logger.info({
      message: "Recovery email sent, Please check your email inbox and spam folder",
    })
    return response.status(Constants.success).json({
      message: "Recovery email sent, Please check your email inbox and spam folder",
    });
  })
}

/* Reset a password using */
const AdminResetPassword = async (request, response) => {
  printLogs(request)
  if (request.session.resetLink) {
    jwt.verify(request.session.resetLink, process.env.TOKEN_SECRET, function (err, res) {
      if (err) {
        logger.error(`Function jwt.verify(${request.session.resetLink}, process.env.TOKEN_SECRET, callback) - `, errHandler.invalidTokenErrorHandler(err))
        return res.status(Constants.er_failure)
          .json(errHandler.invalidTokenErrorHandler(err));
      }
      Admin.findOne({
          email: request.session.email
        },
        async (err, user) => {
          await resetPassword(request, response, err, user)
        }
      );
    })
  } else {
    logger.error(`If(!${request.session.resetLink}) - `, errHandler.tokenNotFoundErrorHandler());
    return response.status(Constants.er_not_found).json(errHandler.tokenNotFoundErrorHandler());
  }
};

// Tpo forgot and reset Pssword
/* Request a password reset email and make a reset password token */
const TpoForgotPassword = async (request, response) => {
  printLogsWithBody(request);
  const user = await Tpo.findOne({
    email: request.body.email,
  });
  if (user === null) {
    logger.error(`Function Tpo.findOne({email: ${request.session.email}}) - `, errHandler.emailNotFoundErrorHandler())
    response.status(404).json(errHandler.emailNotFoundErrorHandler());
  }
  const transporter = await createTransporter();
  const mailOptions = await createMailOptions(request, user);

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      logger.error(`Function transporter.sendMail(mailOptions, callback) - `, errHandler.errorHandler(err))
      return response.status(Constants.er_failure).json(errHandler.errorHandler(err));
    }
    logger.info({
      message: "Recovery email sent, Please check your email inbox and spam folder",
    })
    return response.status(Constants.success).json({
      message: "Recovery email sent, Please check your email inbox and spam folder",
    });
  })
}

/* Reset a password using */
const TpoResetPassword = async (request, response) => {
  printLogs(request)
  if (request.session.resetLink) {
    jwt.verify(request.session.resetLink, process.env.TOKEN_SECRET, function (err, res) {
      if (err) {
        logger.error(`Function jwt.verify(${request.session.resetLink}, process.env.TOKEN_SECRET, callback) - `, errHandler.invalidTokenErrorHandler(err))
        return res.status(Constants.er_failure)
          .json(errHandler.invalidTokenErrorHandler(err));
      }
      Tpo.findOne({
          email: request.session.email
        },
        async (err, user) => {
          await resetPassword(request, response, err, user)
        }
      );
    })
  } else {
    logger.error(`If(!${request.session.resetLink}) - `, errHandler.tokenNotFoundErrorHandler());
    return response.status(Constants.er_not_found).json(errHandler.tokenNotFoundErrorHandler());
  }
};

// Student foegot and reset Pssword
/* Request a password reset email and make a reset password token */
const StudentForgotPassword = async (request, response) => {
  printLogsWithBody(request);
  const user = await Student.findOne({
    email: request.body.email,
  });
  if (user === null) {
    logger.error(`Function Student.findOne({email: ${request.session.email}}) - `, errHandler.emailNotFoundErrorHandler())
    response.status(404).json(errHandler.emailNotFoundErrorHandler());
  }
  const transporter = await createTransporter();
  const mailOptions = await createMailOptions(request, user);

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      logger.error(`Function transporter.sendMail(mailOptions, callback) - `, errHandler.errorHandler(err))
      return response.status(Constants.er_failure).json(errHandler.errorHandler(err));
    }
    logger.info({
      message: "Recovery email sent, Please check your email inbox and spam folder",
    })
    return response.status(Constants.success).json({
      message: "Recovery email sent, Please check your email inbox and spam folder",
    });
  })
}

/* Reset a password using */
const StudentResetPassword = async (request, response) => {
  printLogs(request)
  if (request.session.resetLink) {
    jwt.verify(request.session.resetLink, process.env.TOKEN_SECRET, function (err, res) {
      if (err) {
        logger.error(`Function jwt.verify(${request.session.resetLink}, process.env.TOKEN_SECRET, callback) - `, errHandler.invalidTokenErrorHandler(err))
        return res.status(Constants.er_failure)
          .json(errHandler.invalidTokenErrorHandler(err));
      }
      Student.findOne({
          email: request.session.email
        },
        async (err, user) => {
          await resetPassword(request, response, err, user)
        }
      );
    })
  } else {
    logger.error(`If(!${request.session.resetLink}) - `, errHandler.tokenNotFoundErrorHandler());
    return response.status(Constants.er_not_found).json(errHandler.tokenNotFoundErrorHandler());
  }
};

module.exports = {
  AdminResetPassword,
  AdminForgotPassword,
  TpoResetPassword,
  TpoForgotPassword,
  StudentResetPassword,
  StudentForgotPassword,
};
