const mongoose = require("mongoose");
const resultsSchema = new mongoose.Schema({
  roll: { type: Number, required: true, unique: true},
  name: { type: String, required: true, min: 6 },
  code: { type: Number, required: true, min: 6 },
  question_paper_id: { type: String, min: 4, max: 30, required: true },
  question_attempt: { type: Number, min: 1, max: 30, required: true },
  correct_attempt: { type: Number, min: 1, max: 30, required: true },
  total_marks_scored: { type: Number, min: 2, max: 30, required: true },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Results", resultsSchema);
