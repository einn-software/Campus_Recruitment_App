const nodemailer = require("nodemailer");
const errHandler = require("./errorHandling");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Constants = require('../config/constant');
const Admin = require("../model/Admin");
const Tpo = require("../model/Tpo");
const Student = require("../model/Student");
// import validations
const {
  reqEmailBodyValidation,
  reqPasswordBodyValidation
} = require("../config/validation");

function emailValidation(request, response, next) {
  const {
    error
  } = reqEmailBodyValidation(request.body);
  if (error) {
    return response.status(Constants.er_failure).json(errHandler.validationErrorHandler(error));
  }
  next();
}

function passwordValidation(request, response, next) {
  const {
    error
  } = reqPasswordBodyValidation(request.body);
  if (error) {
    return response.status(Constants.er_failure).json(errHandler.validationErrorHandler(error));
  }
  next();
}

function transporterSendeMail(request, response, user) {
  /* Create a password reset token */
  const token = jwt.sign({
      _id: user._id,
    },
    process.env.TOKEN_SECRET, {
      expiresIn: "20m",
    }
  );
  // create reusable transporter object using the gmail transport
  //transporter is going to be an object of transport that is able to send mail
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EINN_EMAIL, // generated ethereal user
      pass: process.env.EINN_EMAIL_PASSWORD, // generated ethereal password
    },
  });
  // data(mailOptions) defines the mail content
  const mailOptions = {
    from: process.env.EINN_EMAIL,
    to: request.body.email,
    subject: "Link To Reset Password",
    text: "You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n" +
      "Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n" +
      `http://45.122.120.109:3800/admin/reset_pssword/${token}\n\n` +
      "If you did not request this, please ignore this email and your password will remain unchanged.\n",
  };
  request.session.email = request.body.email
  request.session.resetLink = token
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return response.status(Constants.er_failue).json(errorHandler(error));
    } else {
      return response.status(Constants.success).json({
        Message: "Recovery email sent, Please check your email inbox and spam folder",
      });
    }
  });
}

function resetPassword(request, response) {
  (err, user) => {
    if (err) {
      return response.status(Constants.er_failue).json(errorHandler(error));
    }
    if (!user) {
      return response.status(Constants.er_not_found).json(emailNotFoundErrorHandler());
    } else {
      /* Once again store password securely */
      const salt = bcrypt.genSaltSync(Constants.saltRound);
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
      return response.status(Constants.success).json({
        Message: `Password for ${user.email} successfully reset`
      });
    }
  }
}

function verifyToken(request, response, next) {
  jwt.verify(request.session.resetLink, process.env.TOKEN_SECRET, function (err, res) {
    if (err) {
      return response.status(Constants.er_failure).json(errHandler.invalidTokenErrorHandler(err));
    }
    next();
  });
}

// Admin forgot and reset Pssword
/* Request a password reset email and make a reset password token */
const AdminForgotPassword = async function (request, response, next) {
  await emailValidation(request, response, next);
  const user = await Admin.findOne({
    email: request.body.email,
  });
  if (!user) {
    return response.status(Constants.er_not_found).json(emailNotFoundErrorHandler());
  } else {
    await transporterSendeMail(request, response, user);
  }
}


/* Reset a password using */
const AdminResetPassword = async function (request, response, next) {
  await passwordValidation(request, response, next);
  if (request.session.resetLink) {
    await verifyToken(request, response, next);
    await Admin.findOne({
        email: request.session.email
      },
      await resetPassword(request, response)
    );
  } else {
    return response.status(Constants.er_not_found).json(errHandler.resetLinkNotFoundErrorHandler());
  }
};


// Tpo forgot and reset Pssword
/* Request a password reset email and make a reset password token */
const TpoForgotPassword = async function (request, response, next) {
  await emailValidation(request, response, next);
  const user = await Tpo.findOne({
    email: request.body.email,
  });
  if (!user) {
    return response.status(Constants.er_not_found).json(emailNotFoundErrorHandler());
  } else {
    await transporterSendeMail(request, response, user);
  }
}


/* Reset a password using */
const TpoResetPassword = async function (request, response, next) {
  await passwordValidation(request, response, next);
  if (request.session.resetLink) {
    await verifyToken(request, response, next);
    await Tpo.findOne({
        email: request.session.email
      },
      await resetPassword(request, response)
    );
  } else {
    return response.status(Constants.er_not_found).json(errHandler.resetLinkNotFoundErrorHandler());
  }
};


// Student foegot and reset Pssword
/* Request a password reset email and make a reset password token */
const StudentForgotPassword = async function (request, response, next) {
  await emailValidation(request, response, next);
  const user = await Student.findOne({
    email: request.body.email,
  });
  if (!user) {
    return response.status(Constants.er_not_found).json(emailNotFoundErrorHandler());
  } else {
    await transporterSendeMail(request, response, user);
  }
}


/* Reset a password using */
const StudentResetPassword = async function (request, response, next) {
  await passwordValidation(request, response, next);
  if (request.session.resetLink) {
    await verifyToken(request, response, next);
    await Student.findOne({
        email: request.session.email
      },
      await resetPassword(request, response)
    );
  } else {
    return response.status(Constants.er_not_found).json(errHandler.resetLinkNotFoundErrorHandler());
  }
};

module.exports = {
  AdminResetPassword,
  AdminForgotPassword,
  TpoResetPassword,
  TpoForgotPassword,
  StudentResetPassword,
  StudentForgotPassword
}