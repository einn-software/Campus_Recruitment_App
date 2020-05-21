const mongoose = require("mongoose");
const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6,
  },
  email: {
    type: String,
    required: true,
    min: 13,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
  phone: {
    type: String,
    required: true,
  },
  roll: {
    type: String,
    required: true,
    unique: true,
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
  exam_start_time:{
    default:Date.now(),
    required: true
  },
  resetLink: {
    type: String,
    default: "",
  },
});
module.exports = mongoose.model("Student", studentSchema);
