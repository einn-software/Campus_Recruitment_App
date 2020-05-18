const mongoose = require("mongoose");
const tpoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 1024
  },
  phone: {
    type: Number,
    required: true
  },
  designation: {
    type: String,
    required: true,
    max: 23,
    min: 6
  },
  college: {
    type: String,
    required: true,
    max: 40,
    min: 6
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
module.exports = mongoose.model("Tpo", tpoSchema);