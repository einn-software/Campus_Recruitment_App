const errHandler = require("../controller/errorHandling");
const Constants = require("../config/constant");

const QuestionCollections = require("../model/QuestionCollections");
const AnswerSheet = require("../model/StudentAnswerSheet");
const QuestionPaper = require("../model/QuestionPaper");

async function fetchNegativeMarks(req, res) {
  let negative_marks = 0;
  await QuestionPaper.findOne({
      _id: req.body.question_paper_id,
    },
    (err, result) => {
      if (err || !result) {
        return res
          .status(Constants.er_not_found)
          .json(errHandler.idNotFoundErrorHandler());
      } else {
        negative_marks = result.negative_marking_ratio;
        return negative_marks;
      }
    }
  );
  return negative_marks;
}

async function callStudentResponseList(req, res) {
  let ans_sheet = await AnswerSheet.find({
      $and: [{
          student_id: req.body.student_id,
          question_paper_id: req.body.question_paper_id,
        },
        {
          $or: [{
              state: Constants.markedForReview,
            },
            {
              state: Constants.answered,
            },
          ],
        },
      ],
    },
    (err, responseSheet) => {
      if (err || !responseSheet) {
        return res
          .status(Constants.er_not_found)
          .json(errHandler.idNotFoundErrorHandler());
      } else {
        const sheet = responseSheet;
        return sheet;
      }
    }
  );
  return ans_sheet;
}

async function fetchAnswerByQuestionId(req, res, id) {
  let ans = 0;
  await QuestionCollections.findOne({
      _id: id,
    },
    (err, result) => {
      if (err || !result) {
        return res
          .status(Constants.er_not_found)
          .json(errHandler.idNotFoundErrorHandler());
      }
      ans = result.answer;
      return ans;
    }
  );
  return ans;
}

async function totalAttemptQuestions(req, res) {
  let count = await AnswerSheet.find({
    $and: [{
        student_id: req.body.student_id,
        question_paper_id: req.body.question_paper_id,
      },
      {
        $or: [{
            state: Constants.markedForReview,
          },
          {
            state: Constants.answered,
          },
        ],
      },
    ],
  }).countDocuments((err, length) => {
    if (err || !length) {
      return res
        .status(Constants.er_not_found)
        .json(errHandler.idNotFoundErrorHandler());
    } else {
      return length;
    }
  });
  return count;
}

async function calculateMarks(req, res) {
  let cal = await callStudentResponseList(req, res);
  let ng = await fetchNegativeMarks(req, res);
  let count = 0;
  let sum = 0;
  let marks = 0;
  for (let i = 0; i < cal.length; i++) {
    let selected_anwser = cal[i].selected_option;
    let id = cal[i].question_id;
    let ans = await fetchAnswerByQuestionId(req, res, id);
    if (ans !== selected_anwser) {
      marks = cal[i].question_max_marks * ng;
      sum = sum - marks;
    } else {
      count = count + 1;
      marks = cal[i].marks_rewarded = cal[i].question_max_marks;
      cal[i].save();
      sum = sum + marks;
    }
  }
  return [sum, count];
}

module.exports.totalAttemptQuestions = totalAttemptQuestions;
module.exports.calculateMarks = calculateMarks;