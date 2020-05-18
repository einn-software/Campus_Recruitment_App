const mongoose = require("mongoose");
const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6
  },
  email: {
    type: String,
    required: true,
    min: 6
  },
  password: {
    type: String,
    required: true,
    min: 6
  },
  phone: {
    type: Number,
    required: true,
    min: 6
  },
  roll: {
    type: Number,
    required: true,
    unique: true,
    min: 6
  },
  branch: {
    type: String,
    required: true,
    min: 6
  },
  college: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  college_code: {
    type: String,
    required: true,
    min: 3
  },
  resetLink: {
    type: String,
    default: "",
  },
});
module.exports = mongoose.model("Student", studentSchema);