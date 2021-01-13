const mongoose = require("mongoose");
const Constants = require("../config/constant");
const instructionSchema = new mongoose.Schema({
  code: {
    type: Number,
    required: true,
    min: Constants.code_min_length,
    max: Constants.code_max_length
  },
  message: {
    type: String,
    min: Constants.message_min_length,
    required: true
  },
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
});

module.exports = mongoose.model("Instruction", instructionSchema);