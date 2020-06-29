//import model
const Result = require("../model/Result");
const Student = require("../model/Student");

const {
  totalAttemptQuestions,
  calculateMarks
} = require("../config/markscalculation");
// import validations
const {
  resultValidation
} = require("../config/validation");
const errHandler = require("./errorHandling");
const Constants = require("../config/constant");
const {
  func
} = require("@hapi/joi");

//Result Post

async function resultCal(req, res) {

  const {
    error
  } = resultValidation(req.body);
  if (error) {
    console.log("error");
    return res
      .status(Constants.er_failure)
      .json(errHandler.validationErrorHandler(error));
  }
  let array = await calculateMarks(req, res);
  //Checking if the studentid is already in the database
  const studentExist = await Result.findOne({
    student_id: req.body.student_id,
  });
  if (studentExist)
    return res
      .status(Constants.er_failure)
      .json(errHandler.studentExistErrorHandler());

  const student = await Student.findOne({
    _id: req.body.student_id
  }, (err, std) => {
    if (err) return res.status(Constants.er_not_found).json(errHandler.idNotFoundErrorHandler());
    return std;
  })

  // Create Result
  const result = new Result({
    student_id: req.body.student_id,
    roll: student.roll,
    name: student.name,
    code: student.code,
    question_paper_id: req.body.question_paper_id,
    question_attempt: await totalAttemptQuestions(req, res),
    correct_attempt: array[1],
    total_marks_scored: array[0],
  });
  return result;
}


const ResultAdd = async function (req, res) {
  const result = await resultCal(req, res);
  try {
    await result.save();
    return res.status(Constants.success).json(result);
  } catch (err) {
    return res.status(Constants.er_failure).json(errHandler.errorHandler(err));
  }
};

const SaveResult = async function (req, res) {
  const result = await resultCal(req, res);
  try {
    await result.save();
    return;
  } catch (err) {
    return res.status(Constants.er_failure).json(errHandler.errorHandler(err));
  }
};

//Get Result By Paper Id
const ResultGetByPaperIdAndCode = function (req, res) {
  if (req.session.user_type == Constants.tpo || Constants.admin) {
    Result.find({
        code: req.params.code,
        question_paper_id: req.params.question_paper_id,
      },
      (err, results) => {
        if (err || !results) {
          return res
            .status(Constants.er_not_found)
            .json(errHandler.notFoundCodeIdErrorHandler());
        }
        if (results.length === 0) return res
          .status(Constants.er_not_found)
          .json(errHandler.notFoundResultErrorHandler);
        return res.status(Constants.success).json(results);

      }
    );
  } else {
    return res
      .status(Constants.er_authorization_failed)
      .json(errHandler.unauthorizedErrorHandler());
  }
};

//Get Result By Paper Id and roll

const ResultGetByPaperIdRollAndCode = function (req, res) {
  if (req.session.user_type == Constants.admin || Constants.tpo || Constants.student) {
    Result.findOne({
        code: req.params.code,
        roll: req.params.roll,
        question_paper_id: req.params.question_paper_id,
      },
      (err, results) => {
        if (err || !results) {
          return res
            .status(Constants.er_not_found)
            .json(errHandler.codeRollIdNotFoundErrorHandler());
        }
        if (results.length == 0) return res
          .status(Constants.er_not_found)
          .json(errHandler.notFoundResultErrorHandler);
        return res.status(Constants.success).json(results);
      }
    );
  } else {
    return res
      .status(Constants.er_authorization_failed)
      .json(errHandler.unauthorizedErrorHandler());
  }
};


module.exports = {
  ResultAdd,
  ResultGetByPaperIdAndCode,
  ResultGetByPaperIdRollAndCode,
  SaveResult
};