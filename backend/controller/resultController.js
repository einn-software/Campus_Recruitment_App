//import model
const Result = require("../model/Result");
const Student = require("../model/Student");
const QuestionPapers = require("../model/QuestionPaper");
const {
  totalAttemptQuestions,
  calculateMarks,
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
const {
  logger
} = require("../config/logger");

//Result Post

async function resultCal(req, res) {
  const {
    error
  } = resultValidation(req.body);
  if (error) {
    logger.error(errHandler.validationErrorHandler(error));
    return res
      .status(Constants.er_failure)
      .json(errHandler.validationErrorHandler(error));
  }
  let array = await calculateMarks(req, res);
  //Checking if the studentid is already in the database
  const resultExist = await Result.findOne({
    student_id: req.body.student_id,
    question_paper_id: req.body.question_paper_id,
  });
  if (resultExist) {
    logger.error(`If (resultExist: ${resultExist}), - {message: "You have already submitted the result for this exam"}`);
    return res.status(Constants.success).json({
      message: "You have already submitted the result for this exam"
    });
  }
  const student = await Student.findOne({
      _id: req.body.student_id
    },
    (err, std) => {
      if (err || !std) {
        logger.error(`Function Student.findOne({_id: ${req.body.student_id}}) - `, errHandler.idNotFoundErrorHandler('student id'));
        return res
          .status(Constants.er_not_found)
          .json(errHandler.idNotFoundErrorHandler('student id'));
      }
      logger.info(std);
      return std;
    }
  );
  var totalNumberOfQuestions = 0;
  const paper = await QuestionPapers.findOne({
      _id: req.body.question_paper_id
    },
    (err, exam) => {
      if (err) {
        logger.error(`Function QuestionPapers.findOne({_id: ${req.body.question_paper_id}}) - `, errHandler.idNotFoundErrorHandler('question paper id'))
        return res
          .status(Constants.er_not_found)
          .json(errHandler.idNotFoundErrorHandler('question paper id'));
      }
      logger.info(exam);
      return exam;
    });
  var section = paper.sections;
  section.forEach(countNumberOfQuestions);

  function countNumberOfQuestions(item) {
    totalNumberOfQuestions += item.num_of_questions;
    return totalNumberOfQuestions;
  }

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
    total_number_of_questions: totalNumberOfQuestions,
    total_marks: paper.paper_max_marks
  });
  await result.save();
  return result;
}

const ResultAdd = async function (req, res) {
  const result = await resultCal(req, res);
  try {
    logger.info(result);
    return res.status(Constants.success).json(result);
  } catch (err) {
    logger.error(errHandler.errorHandler(err))
    return res.status(Constants.er_failure).json(errHandler.errorHandler(err));
  }
};

const SaveResult = async function (req, res) {
  const result = await resultCal(req, res);
  try {
    logger.info(result);
    return result;
  } catch {
    return;
  }
};

//Get Result By Paper Id
const ResultGetByPaperIdAndCode = function (req, res) {
  if (req.session.user_type == Constants.tpo || req.session.user_type == Constants.admin) {
    Result.find({
        code: req.params.code,
        question_paper_id: req.params.question_paper_id
      },
      (err, results) => {
        if (err || !results) {
          logger.error(`Fuction Result.findOne({code: ${req.params.code}, question_paper_id: ${req.params.question_paper_id}} callback) - `, errHandler.notFoundCodeIdErrorHandler());
          return res
            .status(Constants.er_not_found)
            .json(errHandler.notFoundCodeIdErrorHandler());
        }
        if (results.length === 0) {
          logger.error(`Fuction Result.findOne({code: ${req.params.code}, question_paper_id: ${req.params.question_paper_id}}, callback) - `, errHandler.notFoundCodeIdErrorHandler());
          return res
            .status(Constants.er_not_found)
            .json(errHandler.notFoundResultErrorHandler);
        }
        return res.status(Constants.success).json(results);
      }
    );
  } else {
    logger.error(`If user is neither an admin nor a tpo - `, errHandler.unauthorizedErrorHandler());
    return res
      .status(Constants.er_authorization_failed)
      .json(errHandler.unauthorizedErrorHandler());
  }
};

//Get Result By Paper Id and roll

const ResultGetByPaperIdRollAndCode = function (req, res) {
  if (
    req.session.user_type == Constants.admin ||
    req.session.user_type == Constants.tpo ||
    req.session.user_type == Constants.student
  ) {
    Result.findOne({
        code: req.params.code,
        roll: req.params.roll,
        question_paper_id: req.params.question_paper_id,
      },
      (err, results) => {
        if (err || !results) {
          logger.error(`Function Result.findOne({code: ${req.params.code}, roll: ${req.params.roll}, question_paper_id: ${req.params.question_paper_id}}, callback) - `, errHandler.codeRollIdNotFoundErrorHandler())
          return res
            .status(Constants.er_not_found)
            .json(errHandler.codeRollIdNotFoundErrorHandler());
        }
        if (results.length == 0) {
          logger.error(`Function Result.findOne({code: ${req.params.code}, roll: ${req.params.roll}, question_paper_id: ${req.params.question_paper_id}}, callback) - `, errHandler.notFoundResultErrorHandler)
          return res
            .status(Constants.er_not_found)
            .json(errHandler.notFoundResultErrorHandler());
        }
        logger.info(results);
        return res.status(Constants.success).json(results);
      }
    );
  } else {
    logger.error(`If user is not an admin or student or tpo - `, errHandler.unauthorizedErrorHandler());
    return res
      .status(Constants.er_authorization_failed)
      .json(errHandler.unauthorizedErrorHandler());
  }
};

module.exports = {
  ResultAdd,
  ResultGetByPaperIdAndCode,
  ResultGetByPaperIdRollAndCode,
  SaveResult,
};
