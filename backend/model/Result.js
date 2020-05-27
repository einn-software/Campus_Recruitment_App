const mongoose = require("mongoose");
const resultSchema = new mongoose.Schema({
  roll: { type: String, required: true, unique: true},
  name: { type: String, required: true, min: 6 },
  code: { type: Number, required: true, min: 6 },
  question_paper_id: { type: String,required: true },
  question_attempt: { type: Number, required: true },
  correct_attempt: { type: Number, required: true },
  total_marks_scored: { type: Number, required: true }
});

module.exports = mongoose.model("Result", resultSchema);
