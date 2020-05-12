const mongoose = require("mongoose");
const resultsSchema = new mongoose.Schema({
  roll: { type: Number, required: true },
  question_paper_id: { type: Number, min: 3, required: true },
  question_attempt: { type: String, min: 1, required: true },
  correct_attempt: { type: String, min: 1, required: true },
  total_marks_scored: { type: Number, min: 1, required: true },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Results", resultsSchema);
