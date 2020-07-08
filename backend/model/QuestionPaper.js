const mongoose = require("mongoose");
const Constants = require("../config/constant");
const questionPaperSchema = new mongoose.Schema({
  year: {
    type: Number,
    min: Constants.year_min_length,
    max: Constants.year_max_length,
    required: true
  },
  month: {
    type: Number,
    min: Constants.month_min_length,
    max: Constants.month_max_length,
    required: true
  },
  day: {
    type: Number,
    min: Constants.day_min_length,
    max: Constants.day_max_length,
    required: true
  },
  paper_name: {
    type: String,
    required: true,
    min: Constants.paper_name_min_length,
    max: Constants.paper_name_max_length
  },
  paper_max_marks: {
    type: Number,
    required: true,
    min: Constants.paper_max_marks_min_length,
    max: Constants.paper_max_marks_max_length
  },
  max_time: {
    type: Number,
    required: true
  },
  code: {
    type: Number,
    required: true,
    min: Constants.code_min_length,
    max: Constants.code_max_length
  },
  instructions_id: {
    type: mongoose.Types.ObjectId,
    ref: "Instruction",
    required: true
  },
  start_time: {
    type: String,
    required: true
  },
  trigger_type: {
    type: Number,
    required: true
  },
  enable: {
    type: Number,
    required: true
  },
  negative_marking_ratio: {
    type: Number,
    required: true,
    min: Constants.negative_marking_ratio_min_length,
    max: Constants.negative_marking_ratio_max_length
  },
  sections: [{
    section_name: {
      type: String,
      required: true,
      min: Constants.section_name_min_length,
      max: Constants.section_name_max_length
    },
    section_marks: {
      type: Number,
      required: true,
      min: Constants.section_marks_min_length,
      max: Constants.section_marks_max_length
    },
    num_of_questions: {
      type: Number,
      required: true,
      min: Constants.num_of_questions_min_length,
      max: Constants.num_of_questions_max_length
    },
    question_list: [{
        question_id: {
          type: mongoose.Types.ObjectId,
          ref: "QuestionCollection",
          required: true
       },
        question_marks: {
          type: Number,
          required: true,
          min: Constants.marks_min_length,
          max: Constants.marks_max_length
        }
      },
    ],
  }],
});

module.exports = mongoose.model("QuestionPaper", questionPaperSchema);