const mongoose = require("mongoose");
const Constants = require("../config/constant");
const studentAnswerSheetSchema = new mongoose.Schema({
  student_id: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Student"
  },
  question_paper_id: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "QuestionPaper"
  },
  question_id: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "QuestionCollection"
  },
  selected_option: {
    type: Number,
    required: true
  },
  state: {
    type: Number,
    required: true,
  },
  marks_rewarded: {
    type: Number,
    required: true,
    min: Constants.marks_min_length,
    max: Constants.marks_max_length
  },
  question_max_marks: {
    type: Number,
    required: true,
    min: Constants.marks_min_length,
    max: Constants.marks_max_length
  }
});

module.exports = mongoose.model("StudentAnswerSheet", studentAnswerSheetSchema);