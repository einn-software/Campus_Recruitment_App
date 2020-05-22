const mongoose = require("mongoose");
const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  email: {
    type: String,
    required: true,
    min: 13,
    max: 255
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  phone: {
    type: String,
    required: true,
  },
  roll: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  college: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  code: {
    type: Number,
    required: true,
    min: 4,
  },
  // exam_start_time: {
  //   default: Date,
  //   type: Date.UTC(),
  //   required: true
  // },
});
module.exports = mongoose.model("Student", studentSchema);