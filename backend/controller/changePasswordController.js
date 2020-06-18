const nodemailer = require("nodemailer");
const errHandler = require("./errorHandling");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Constants = require("../config/constant");
const Admin = require("../model/Admin");
const Tpo = require("../model/Tpo");
const Student = require("../model/Student");
// import validations
const {
  reqPasswordBodyValidation
} = require("../config/validation");
const {
  er_not_found
} = require("../config/constant");
const {
  Console
} = require("winston/lib/winston/transports");

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
      `http://45.122.120.109:3800/admin/reset_pssword/${token}\n\n` +
      "If you did not request this, please ignore this email and your password will remain unchanged.\n",
  };
  request.session.email = request.body.email;
  request.session.resetLink = token;
  return mailOptions;
}

async function resetPassword(request, response, err, user) {
  if (err || !user) {
    return response.status(Constants.er_not_found).json(errHandler.userNotFoundErrorHandler());
  } else {
    const {
      error
    } = reqPasswordBodyValidation(request.body);
    if (error) return response.status(Constants.er_failure).json(errHandler.validationErrorHandler(error));
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
  return response.status(Constants.success).json({
    Message: `Password for ${user.email} successfully reset`
  });
}

// Admin forgot and reset Pssword
/* Request a password reset email and make a reset password token */

const AdminForgotPassword = async (request, response) => {
  const user = await Admin.findOne({
    email: request.body.email,
  });
  if (user === null) {
    response.status(404).json(errHandler.emailNotFoundErrorHandler());
  }
  const transporter = await createTransporter();
  const mailOptions = await createMailOptions(request, user);

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      return response.status(Constants.er_failure).json(errHandler.errorHandler(err));
    }
    return response.status(Constants.success).json({
      Message: "Recovery email sent, Please check your email inbox and spam folder",
    });
  })
}

/* Reset a password using */
const AdminResetPassword = async (request, response) => {
  if (request.session.resetLink) {
    jwt.verify(request.session.resetLink, process.env.TOKEN_SECRET, function (err, res) {
      if (err) {
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
    return response.status(Constants.er_not_found).json(errHandler.tokenNotFoundErrorHandler());
  }
};

// Tpo forgot and reset Pssword
/* Request a password reset email and make a reset password token */
const TpoForgotPassword = async (request, response) => {
  const user = await Tpo.findOne({
    email: request.body.email,
  });
  if (user === null) {
    response.status(404).json(errHandler.emailNotFoundErrorHandler());
  }
  const transporter = await createTransporter();
  const mailOptions = await createMailOptions(request, user);

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      return response.status(Constants.er_failure).json(errHandler.errorHandler(err));
    }
    return response.status(Constants.success).json({
      Message: "Recovery email sent, Please check your email inbox and spam folder",
    });
  })
}

/* Reset a password using */
const TpoResetPassword = async (request, response) => {
  if (request.session.resetLink) {
    jwt.verify(request.session.resetLink, process.env.TOKEN_SECRET, function (err, res) {
      if (err) {
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
    return response.status(Constants.er_not_found).json(errHandler.tokenNotFoundErrorHandler());
  }
};

// Student foegot and reset Pssword
/* Request a password reset email and make a reset password token */
const StudentForgotPassword = async (request, response) => {
  const user = await Student.findOne({
    email: request.body.email,
  });
  if (user === null) {
    response.status(404).json(errHandler.emailNotFoundErrorHandler());
  }
  const transporter = await createTransporter();
  const mailOptions = await createMailOptions(request, user);

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      return response.status(Constants.er_failure).json(errHandler.errorHandler(err));
    }
    return response.status(Constants.success).json({
      Message: "Recovery email sent, Please check your email inbox and spam folder",
    });
  })
}

/* Reset a password using */
const StudentResetPassword = async (request, response) => {
  if (request.session.resetLink) {
    jwt.verify(request.session.resetLink, process.env.TOKEN_SECRET, function (err, res) {
      if (err) {
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