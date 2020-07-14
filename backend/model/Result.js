const mongoose = require("mongoose");
const Constants = require("../config/constant");
const resultSchema = new mongoose.Schema({
  student_id: {
    type: mongoose.Types.ObjectId,
    ref: "Student",
    required: true
  },
  roll: {
    type: String,
    required: true,
    min: Constants.roll_min_length,
    max: Constants.roll_max_length
  },
  name: {
    type: String,
    required: true,
    min: Constants.name_min_length,
    max: Constants.name_max_length,
  },
  code: {
    type: Number,
    required: true,
    min: Constants.code_min_length,
    max: Constants.code_max_length
  },
  question_paper_id: {
    type: mongoose.Types.ObjectId,
    ref: "QuestionPaper",
    required: true
  },
  question_attempt: {
    type: Number,
    min: Constants.question_attempt_min_length,
    max: Constants.question_attempt_max_length
  },
  correct_attempt: {
    type: Number,
    min: Constants.correct_attempt_min_length,
    max: Constants.correct_attempt_max_length
  },
  total_marks: {
    type: Number,
    min: Constants.total_marks_min_length,
    max: Constants.total_marks_max_length
  },
  total_number_of_questions: {
    type: Number,
    min: Constants.total_number_of_questions_min_length,
    max: Constants.total_number_of_questions_max_length
  },
  total_marks_scored: {
    type: Number,
    max: Constants.total_marks_scored_max_length
  }
});

module.exports = mongoose.model("Result", resultSchema);