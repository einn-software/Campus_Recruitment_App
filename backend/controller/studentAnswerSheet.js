//importing modules to be used
const errHandler = require("./errorHandling");
const Constants = require("../config/constant");

//importing model
const AnswerSheet = require("../model/StudentAnswerSheet");

// importing validation
const {
  studentAnswerSheetValidation,
  answerSheetPutValidation,
} = require("../config/validation");

const AnswerSheetAdd = async (req, res) => {
  //LETS VALIDATE THE DATA BEFORE WE ADD A response
  const {
    error
  } = studentAnswerSheetValidation(req.body);
  if (error)
    return res
      .status(Constants.er_failure)
      .json(errHandler.validationErrorHandler(error));

  //Checking if the question is already answered(post) in the database
  const answerExist = await AnswerSheet.findOne({
    student_id: req.body.student_id,
    question_paper_id: req.body.question_paper_id,
    question_id: req.body.question_id,
  });
  if (answerExist)
    return res
      .status(Constants.er_failure)
      .json(errHandler.answerExistErrorHandler());

  // Create a new response(answer) in the answerSheet
  const answerSet = new AnswerSheet({
    student_id: req.body.student_id,
    question_paper_id: req.body.question_paper_id,
    question_id: req.body.question_id,
    selected_option: req.body.selected_option,
    state: req.body.state,
    marks_rewarded: 0,
    question_max_marks: req.body.question_max_marks
  });
  try {
    await answerSet.save();
    const answer = await AnswerSheet.findOne({
      question_id: req.body.question_id
    }, {
      "marks": 0
    })
    return res.status(Constants.success).json(answer);
  } catch (err) {
    return res.status(Constants.er_failure).json(errHandler.errorHandler(err));
  }
};

// To get the answerSheet using id
const AnswerSheetGetById = function (req, res) {
  AnswerSheet.find({
      student_id: req.params.student_id,
      question_paper_id: req.params.question_paper_id,
    }, {
      "marks": 0
    },
    (err, results) => {
      if (err || !results) {
        return res
          .status(Constants.er_not_found)
          .json(errHandler.idNotFoundErrorHandler());
      }
      return res.status(Constants.success).json(results);
    }
  );
};

//To change or update the answerSheet's data by using their id
const AnswerSheetPut = function (req, res) {

  const body = req.body;
  //VALIDATE THE DATA
  const {
    error
  } = answerSheetPutValidation(body);
  if (error) {
    return res
      .status(Constants.er_failure)
      .json(errHandler.validationErrorHandler(error));
  }
  AnswerSheet.findOneAndUpdate({
        _id: req.params.id,
      },
      body
    )
    .then(async (results) => {
      if (!results) {
        return res
          .status(Constants.er_not_found)
          .json(errHandler.idNotFoundErrorHandler());
      } else {
        const answer = await AnswerSheet.findOne({
          _id: req.params.id
        }, {
          "marks": 0
        })
        return res.status(Constants.success).json(answer);
      }
    })
    .catch((err) => {
      return res
        .status(Constants.er_failure)
        .json(errHandler.errorHandler(err));
    });
};

//To delete the answerSheet's data by using their id
const AnswerSheetDeleteById = function (req, res) {
  if (req.session.user_type == Constants.admin) {
    AnswerSheet.findByIdAndRemove({
        _id: req.params.id,
      },
      (err, results) => {
        if (err) {
          return res
            .status(Constants.er_failure)
            .json(errHandler.errorHandler(err));
        }
        if (!results) {
          return res
            .status(Constants.er_not_found)
            .json(errHandler.idNotFoundErrorHandler());
        }
        return res.status(Constants.success).json({
          message: "Data deleted successfully",
        });
      }
    );
  } else {
    return res
      .status(Constants.er_authorization_failed)
      .json(errHandler.unauthorizedErrorHandler());
  }
};

//To delete the answerSheet's data by using their student-id and question-paper-id
const AnswerSheetDeleteByStudentId = function (req, res) {
  if (req.session.user_type == Constants.admins) {
    AnswerSheet.findByIdAndRemove({
        student_id: req.params.student_id,
        question_paper_id: req.params.question_paper_id,
      },
      (err, results) => {
        if (err) {
          return res
            .status(Constants.er_failure)
            .json(errHandler.errorHandler(err));
        }
        if (!results) {
          return res
            .status(Constants.er_not_found)
            .json(errHandler.idNotFoundErrorHandler());
        }
        return res.status(Constants.success).json({
          message: "Data deleted successfully",
        });
      }
    );
  } else {
    return res
      .status(Constants.er_authorization_failed)
      .json(errHandler.unauthorizedErrorHandler());
  }
};
module.exports = {
  AnswerSheetAdd,
  AnswerSheetGetById,
  AnswerSheetPut,
  AnswerSheetDeleteById,
  AnswerSheetDeleteByStudentId,
};