const mongoose = require("mongoose");
const resultsSchema = new mongoose.Schema({
  roll: { type: Number, required: true, unique: true, min: 6 },
  question_paper_id: { type: Number, min: 4, max: 30, required: true },
  question_attempt: { type: String, min: 1, max: 30, required: true },
  correct_attempt: { type: String, min: 1, max: 30, required: true },
  total_marks_scored: { type: Number, min: 2, max: 30, required: true },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Results", resultsSchema);
