const mongoose = require("mongoose");
const studentAnswerSheetSchema = new mongoose.schema({
  student_id: {
    type: String,
    required: true,
  },
  question_paper_id: {
    type: String,
    required: true,
  },
  question_collection_id: {
    type: String,
    required: true,
  },
  selected_option: {
    type: Number,
    required: true,
  },
  state: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("StudentAnswerSheet", studentAnswerSheetSchema);
