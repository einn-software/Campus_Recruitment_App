var xlsx = require("xlsx");
const errHandler = require("./errorHandling");
const bcrypt = require("bcryptjs");
const Constants = require("../config/constant");
const Student = require("../model/Student");
const {
    studentRegisterValidation
} = require("../config/validation");


const UploadFile = async function (req, res) {
    if (req.session.user_type == Constants.tpo) {
        const file1 = req.file.originalname
        var wb = xlsx.readFile(`./uploads/${file1}`);
        var docs = wb.SheetNames;
        for (var i = 0; i < docs.length; i++) {
            var loop = wb.Sheets[docs[i]];
            const data = await xlsx.utils.sheet_to_json(loop);
            await StudentListRegister(data, res);
        }
        res.json({
            "message": "Successfull"
        });
    } else {
        return res
            .status(Constants.er_authorization_failed)
            .json(errHandler.unauthorizedErrorHandler());
    }
};

//To register a new student
const StudentListRegister = async (data, res) => {
    let arr = [];
    let docs = data;
    for (var j = 0; j < data.length; j++) {
        data[j].phone = String(data[j].phone);
        data[j].roll = String(data[j].roll);
    }
    // Create a new student
    for (var i = 0; i < docs.length; i++) {
        // LETS VALIDATE THE DATA BEFORE WE MAKE A USER
        const {
            error
        } = studentRegisterValidation(docs[i]);
        if (error) {
            const err1 = errHandler.validationWithEmailErrorHandler(error, docs[i].email);
            arr.push(err1);
        } else {
            //Checking if the student is already in the database
            const emailExist = await Student.findOne({
                email: docs[i].email,
            });
            if (emailExist) {
                const err2 = errHandler.thisEmailExistErrorHandler(docs[i].email);
                arr.push(err2);
            } else {
                const rollCodeExist = await Student.findOne({
                    roll: docs[i].roll,
                    code: docs[i].code,
                });
                if (rollCodeExist) {
                    const err3 = errHandler.codeRollWithEmailErrorHandler(docs[i].email, docs[i].roll, docs[i].code);
                    arr.push(err3);
                } else {
                    const salt = bcrypt.genSaltSync(Constants.saltRound);
                    const hashedPassword = bcrypt.hashSync(docs[i].password, salt);
                    docs[i].password = hashedPassword;
                    const student = new Student(docs[i]);
                    const user = await student.save();
                    arr.push(user);
                }
            }
        }
    }
};

module.exports.UploadFile = UploadFile;