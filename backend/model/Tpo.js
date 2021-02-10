const mongoose = require("mongoose");
const Constants = require("../config/constant");
const tpoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: Constants.name_min_length,
    max: Constants.name_max_length,
  },
  email: {
    type: String,
    required: true,
    max: Constants.email_min_length,
    min: Constants.email_max_length,
  },
  password: {
    type: String,
    required: true,
    min: Constants.password_min_length,
    max: Constants.password_max_length,
  },
  phone: {
    type: String,
    required: true,
    min: Constants.phone_min_length,
    max: Constants.phone_max_length
  },
  designation: {
    type: String,
    required: true,
    max: Constants.designation_min_length,
    min: Constants.designation_max_length
  },
  college: {
    type: String,
    required: true,
    max: Constants.college_min_length,
    min: Constants.college_max_length
  },
  code: {
    type: Number,
    required: true,
    min: Constants.code_min_length,
    max: Constants.code_max_length
  }
});
module.exports = mongoose.model("Tpo", tpoSchema);