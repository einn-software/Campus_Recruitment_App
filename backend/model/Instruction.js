const mongoose = require("mongoose");

const instructionSchema = new mongoose.Schema({
  code: { type: Number, required: true, min: 4},
  message: { type: String, required: true },
  year: { type: Number, required: true },
  month: { type: Number, required: true },
  day: { type: Number, required: true },
});

module.exports = mongoose.model("Instruction", instructionSchema);
