var xlsx = require("xlsx");
const nodemailer = require("nodemailer");
const errHandler = require("./errorHandling");
const bcrypt = require("bcryptjs");
const Constants = require("../config/constant");
const Student = require("../model/Student");
const { studentRegisterValidation } = require("../config/validation");

function sendMail(req, res, email) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EINN_EMAIL, // generated ethereal user
      pass: process.env.EINN_EMAIL_PASSWORD, // generated ethereal password
    },
  });
  const mailOptions = {
    from: process.env.EINN_EMAIL,
    to: email,
    subject: "List of registered students",
    text:
      "We are glad to have you with us. You are receiving this because you have requested for the registeration of the students.\n\n" +
      "Please check the attached file, Ii's having information that students are registered or not. To register the remaining students, you are advised to send the file again of unregistered students after correcting their data.\n\n" +
      "Thank You.\n\n",
    attachments: [
      {
        filename: "Registered Students.xlsx",
        path: "./registered/Registered Students.xlsx",
      },
      {
        filename: "Unregistered Students.xlsx",
        path: "./unregistered/Unregistered Students.xlsx",
      },
    ],
  };
  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      return res
        .status(Constants.er_failure)
        .json(errHandler.errorHandler(err));
    }
    return;
  });
}

const UploadFile = async function (req, res) {
  if (req.session.user_type == Constants.tpo) {
    const email = req.body.email;
    req.session.fileName = req.file.originalname;
    // const file1 = req.file.originalname
    FileConversion(req, res, email);
    res.json({
      message: "Successfull",
    });
  } else {
    return res
      .status(Constants.er_authorization_failed)
      .json(errHandler.unauthorizedErrorHandler());
  }
};

const FileConversion = async (req, res, email) => {
  var registeredStudentsFile = [];
  if (req.session.fileName) {
    var file1 = req.session.fileName;
    var wb = xlsx.readFile(`./uploads/${file1}`);
    var docs = wb.SheetNames;
    for (var i = 0; i < docs.length; i++) {
      var sheet = wb.Sheets[docs[i]];
      const data = await xlsx.utils.sheet_to_json(sheet);
      registeredStudentsFile = await StudentListRegister(data, res);
    }
    const newErrorWB = xlsx.utils.book_new();
    const newErrorWS = xlsx.utils.json_to_sheet(registeredStudentsFile[0]);
    const newWB = xlsx.utils.book_new();
    const newWS = xlsx.utils.json_to_sheet(registeredStudentsFile[1]);
    xlsx.utils.book_append_sheet(
      newErrorWB,
      newErrorWS,
      "Unregistered students list"
    );
    xlsx.utils.book_append_sheet(newWB, newWS, "Registeration Sheet");
    xlsx.writeFile(newErrorWB, "./unregistered/Unregistered Students.xlsx");
    xlsx.writeFile(newWB, "./registered/Registered Students.xlsx");
    sendMail(req, res, email);
    req.session.fileName = null;
  }
};

//To register a new student
const StudentListRegister = async (data, res) => {
  let errorArray = [];
  let userArray = [];
  let docs = data;
  for (var j = 0; j < data.length; j++) {
    data[j].password = String(data[j].password);
    data[j].phone = String(data[j].phone);
    data[j].roll = String(data[j].roll);
  }
  // Create a new student
  for (var i = 0; i < docs.length; i++) {
    // LETS VALIDATE THE DATA BEFORE WE MAKE A USER
    const { error } = studentRegisterValidation(docs[i]);
    if (error) {
      const err1 = errHandler.validationWithEmailErrorHandler(
        error,
        docs[i].email
      );
      errorArray.push({
        message: err1.message,
      });
    } else {
      //Checking if the student is already in the database
      const emailExist = await Student.findOne({
        email: docs[i].email,
      });
      if (emailExist) {
        const err2 = errHandler.thisEmailExistErrorHandler(docs[i].email);
        errorArray.push({
          message: err2.message,
        });
      } else {
        const rollCodeExist = await Student.findOne({
          roll: docs[i].roll,
          code: docs[i].code,
        });
        if (rollCodeExist) {
          const err3 = errHandler.codeRollWithEmailErrorHandler(
            docs[i].email,
            docs[i].roll,
            docs[i].code
          );
          errorArray.push({
            message: err3.message,
          });
        } else {
          const realPassword = docs[i].password;
          const salt = bcrypt.genSaltSync(Constants.saltRound);
          const hashedPassword = bcrypt.hashSync(docs[i].password, salt);
          docs[i].password = hashedPassword;
          const student = new Student(docs[i]);
          await student.save().then(() => {
            docs[i].password = realPassword;
            userArray.push(docs[i]);
          });
        }
      }
    }
  }
  return [errorArray, userArray];
};

module.exports.UploadFile = UploadFile;
