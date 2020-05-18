const router = require("express").Router();
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../model/Admin");
const College = require("../model/College");
const Tpo = require("../model/Tpo");
const Student = require("../model/Student");

// Admin foegot and reset Pssword
/* Request a password reset email and make a reset password token */
router.post("/admin/forgot_password", async (request, response) => {
  const user = await Admin.findOne({
    email: request.body.email,
  });
  if (user === null) {
    console.error("email not in database");
    res.status(404).json({
      Error: "Email not found in db",
      Status_code: 404
    });
  } else {
    /* Create a password reset token */
    const token = jwt.sign({
        _id: user._id,
      },
      process.env.TOKEN_SECRET, {
        expiresIn: "20m"
      }
    );
    console.log(`New reset token for ${user.email}: ${token}`);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "innobiteinn@gmail.com",
        pass: "Einn03021999",
      },
    });

    const mailOptions = {
      from: "innobiteinn@gmail.com",
      to: request.body.email,
      subject: "Link To Reset Password",
      text: "You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n" +
        "Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n" +
        `http://localhost:80/admin/reset_pssword/${token}\n\n` +
        "If you did not request this, please ignore this email and your password will remain unchanged.\n",
    };
    user.updateOne({
      resetLink: token
    }, (error, success) => {
      if (error) {
        return res.json({
          Error: error,
          Status_code: 400
        }).status(400);
      } else {
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
            return res.json({
              Error: error,
              Status_code: 400
            }).status(400);
          } else {
            console.log("Email sent: " + info.response);
            response.json({
              Message: "Recovery email sent, Please check your email inbox and spam folder",
              Status_code: 200
            });
          }
        });
      }
    });
  }
});

/* Reset a password using */
router.post(
  "/admin/reset_password",
  async (request, response) => {
    const {
      resetLink,
      newPassword
    } = request.body;
    if (resetLink) {
      jwt.verify(resetLink, process.env.TOKEN_SECRET, function (err, res) {
        if (err) {
          return res
            .status(400)
            .json({
              Error: "Incorrect Token or Expierd token",
              Status_code: 400
            });
        } else {
          Admin.findOne({
            resetLink
          }, (err, user) => {
            if (err || !user) {
              return res
                .status(404)
                .json({
                  error: "User with this token does not exist",
                  Status_code: 404
                });
            } else {
              console.log("user exists in db");
              /* Once again store password securely */
              const salt = bcrypt.genSaltSync(10);
              const hashedNewPassword = bcrypt.hashSync(
                request.body.newPassword,
                salt
              );
              /* Save to database */
              user.password = hashedNewPassword;
              /* Now reset the token */
              user.resetLink = null;
              user.save();
              console.log("password updated");
              response.json({
                Message: `Password for ${user.email} successfully reset`,
                Status_code: 200
              });
            }
          });
        }
      });
    } else {
      return res.status(404).json({
        error: "Reset Link is not found",
        Status_code: 404
      });
    }
  }
);

// Student foorgot and reset Password
/* Request a password reset email and make a reset password token */
router.post("/student/forgot_password", async (request, response) => {
  const user = await Student.findOne({
    email: request.body.email,
  });
  if (user === null) {
    console.error("email not in database");
    res.status(404).json({
      Error: "Email not found in db",
      Status_code: 404
    });
  } else {
    /* Create a password reset token */
    const token = jwt.sign({
        _id: user._id,
      },
      process.env.TOKEN_SECRET, {
        expiresIn: "20m"
      }
    );
    console.log(`New reset token for ${user.email}: ${token}`);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "innobiteinn@gmail.com",
        pass: "Einn03021999",
      },
    });

    const mailOptions = {
      from: "innobiteinn@gmail.com",
      to: request.body.email,
      subject: "Link To Reset Password",
      text: "You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n" +
        "Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n" +
        `http://localhost:80/admin/reset_pssword/${token}\n\n` +
        "If you did not request this, please ignore this email and your password will remain unchanged.\n",
    };
    user.updateOne({
      resetLink: token
    }, (error, success) => {
      if (error) {
        return res.json({
          Error: error,
          Status_code: 400
        }).status(400);
      } else {
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
            return res.json({
              Error: error,
              Status_code: 400
            }).status(400);
          } else {
            console.log("Email sent: " + info.response);
            response.json({
              Message: "Recovery email sent, Please check your email inbox and spam folder",
              Status_code: 200
            });
          }
        });
      }
    });
  }
});

/* Reset a password using */
router.post(
  "/student/reset_password",
  async (request, response) => {
    const {
      resetLink,
      newPassword
    } = request.body;
    if (resetLink) {
      jwt.verify(resetLink, process.env.TOKEN_SECRET, function (err, res) {
        if (err) {
          return res
            .status(400)
            .json({
              Error: "Incorrect Token or Expierd token",
              Status_code: 400
            });
        } else {
          Student.findOne({
            resetLink
          }, (err, user) => {
            if (err || !user) {
              return res
                .status(404)
                .json({
                  error: "User with this token does not exist",
                  Status_code: 404
                });
            } else {
              console.log("user exists in db");
              /* Once again store password securely */
              const salt = bcrypt.genSaltSync(10);
              const hashedNewPassword = bcrypt.hashSync(
                request.body.newPassword,
                salt
              );
              /* Save to database */
              user.password = hashedNewPassword;
              /* Now reset the token */
              user.resetLink = null;
              user.save();
              console.log("password updated");
              response.json({
                Message: `Password for ${user.email} successfully reset`,
                Status_code: 200
              });
            }
          });
        }
      });
    } else {
      return res.status(404).json({
        error: "Reset Link is not found",
        Status_code: 404
      });
    }
  }
);

// College forgot and reset Password
/* Request a password reset email and make a reset password token */
router.post("/college/forgot_password", async (request, response) => {
  const user = await College.findOne({
    email: request.body.email,
  });
  if (user === null) {
    console.error("email not in database");
    res.status(404).json({
      Error: "Email not found in db",
      Status_code: 404
    });
  } else {
    /* Create a password reset token */
    const token = jwt.sign({
        _id: user._id,
      },
      process.env.TOKEN_SECRET, {
        expiresIn: "20m"
      }
    );
    console.log(`New reset token for ${user.email}: ${token}`);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "innobiteinn@gmail.com",
        pass: "Einn03021999",
      },
    });

    const mailOptions = {
      from: "innobiteinn@gmail.com",
      to: request.body.email,
      subject: "Link To Reset Password",
      text: "You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n" +
        "Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n" +
        `http://localhost:80/admin/reset_pssword/${token}\n\n` +
        "If you did not request this, please ignore this email and your password will remain unchanged.\n",
    };
    user.updateOne({
      resetLink: token
    }, (error, success) => {
      if (error) {
        return res.json({
          Error: error,
          Status_code: 400
        }).status(400);
      } else {
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
            return res.json({
              Error: error,
              Status_code: 400
            }).status(400);
          } else {
            console.log("Email sent: " + info.response);
            response.json({
              Message: "Recovery email sent, Please check your email inbox and spam folder",
              Status_code: 200
            });
          }
        });
      }
    });
  }
});

/* Reset a password using */
router.post(
  "/college/reset_password",
  async (request, response) => {
    const {
      resetLink,
      newPassword
    } = request.body;
    if (resetLink) {
      jwt.verify(resetLink, process.env.TOKEN_SECRET, function (err, res) {
        if (err) {
          return res
            .status(400)
            .json({
              Error: "Incorrect Token or Expierd token",
              Status_code: 400
            });
        } else {
          College.findOne({
            resetLink
          }, (err, user) => {
            if (err || !user) {
              return res
                .status(404)
                .json({
                  error: "User with this token does not exist",
                  Status_code: 404
                });
            } else {
              console.log("user exists in db");
              /* Once again store password securely */
              const salt = bcrypt.genSaltSync(10);
              const hashedNewPassword = bcrypt.hashSync(
                request.body.newPassword,
                salt
              );
              /* Save to database */
              user.password = hashedNewPassword;
              /* Now reset the token */
              user.resetLink = null;
              user.save();
              console.log("password updated");
              response.json({
                Message: `Password for ${user.email} successfully reset`,
                Status_code: 200
              });
            }
          });
        }
      });
    } else {
      return res.status(404).json({
        error: "Reset Link is not found",
        Status_code: 404
      });
    }
  }
);

// Tpo forgot and reset Password
/* Request a password reset email and make a reset password token */
router.post("/tpo/forgot_password", async (request, response) => {
  const user = await Tpo.findOne({
    email: request.body.email,
  });
  if (user === null) {
    console.error("email not in database");
    res.status(404).json({
      Error: "Email not found in db",
      Status_code: 404
    });
  } else {
    /* Create a password reset token */
    const token = jwt.sign({
        _id: user._id,
      },
      process.env.TOKEN_SECRET, {
        expiresIn: "20m"
      }
    );
    console.log(`New reset token for ${user.email}: ${token}`);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "innobiteinn@gmail.com",
        pass: "Einn03021999",
      },
    });

    const mailOptions = {
      from: "innobiteinn@gmail.com",
      to: request.body.email,
      subject: "Link To Reset Password",
      text: "You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n" +
        "Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n" +
        `http://localhost:80/admin/reset_pssword/${token}\n\n` +
        "If you did not request this, please ignore this email and your password will remain unchanged.\n",
    };
    user.updateOne({
      resetLink: token
    }, (error, success) => {
      if (error) {
        return res.json({
          Error: error,
          Status_code: 400
        }).status(400);
      } else {
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
            return res.json({
              Error: error,
              Status_code: 400
            }).status(400);
          } else {
            console.log("Email sent: " + info.response);
            response.json({
              Message: "Recovery email sent, Please check your email inbox and spam folder",
              Status_code: 200
            });
          }
        });
      }
    });
  }
});

/* Reset a password using */
router.post(
  "/tpo/reset_password",
  async (request, response) => {
    const {
      resetLink,
      newPassword
    } = request.body;
    if (resetLink) {
      jwt.verify(resetLink, process.env.TOKEN_SECRET, function (err, res) {
        if (err) {
          return res
            .status(400)
            .json({
              Error: "Incorrect Token or Expierd token",
              Status_code: 400
            });
        } else {
          Tpo.findOne({
            resetLink
          }, (err, user) => {
            if (err || !user) {
              return res
                .status(404)
                .json({
                  error: "User with this token does not exist",
                  Status_code: 404
                });
            } else {
              console.log("user exists in db");
              /* Once again store password securely */
              const salt = bcrypt.genSaltSync(10);
              const hashedNewPassword = bcrypt.hashSync(
                request.body.newPassword,
                salt
              );
              /* Save to database */
              user.password = hashedNewPassword;
              /* Now reset the token */
              user.resetLink = null;
              user.save();
              console.log("password updated");
              response.json({
                Message: `Password for ${user.email} successfully reset`,
                Status_code: 200
              });
            }
          });
        }
      });
    } else {
      return res.status(404).json({
        error: "Reset Link is not found",
        Status_code: 404
      });
    }
  }
);

module.exports = router;