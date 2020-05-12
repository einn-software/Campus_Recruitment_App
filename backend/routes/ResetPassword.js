const router = require("express").Router();
const Admin = require("../model/Admin");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { SENDGRID_API, EMAIL } = require("../config/key");
//

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: SENDGRID_API,
    },
  })
);

//Reset Password
router.post("/reset-password", (req, res) => {
  const token = req.header("auth-token");
  Admin.findOne({ email: req.body.email }).then((admin) => {
    if (!admin) {
      return res
        .status(422)
        .json({ error: "admin dont exists with that email" });
    }
    admin.resetToken = token;
    admin.expireToken = Date.now() + 3600000;
    admin.save().then((result) => {
      transporter.sendMail({
        to: admin.email,
        from: "riya.singhal@einn.in",
        subject: "password reset",
        html: `
                    <p>You requested for password reset</p>
                    <h5>click in this <a href="${EMAIL}/reset/${token}">link</a> to reset password</h5>
                    `,
      });
      res.json({ message: "check your email" });
    });
  });
});

router.post("/new-password", (req, res) => {
  const newPassword = req.body.password;
  const sentToken = req.body.token;
  Admin.findOne({ resetToken: sentToken, expireToken: { $gt: Date.now() } })
    .then((admin) => {
      if (!admin) {
        return res.status(422).json({ error: "Try again session expired" });
      }
      bcrypt.hash(newPassword, 12).then((hashedpassword) => {
        admin.password = hashedpassword;
        admin.resetToken = undefined;
        admin.expireToken = undefined;
        admin.save().then((savedadmin) => {
          res.json({ message: "password updated success" });
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});
module.exports = router;
