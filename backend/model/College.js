const mongoose = require("mongoose");
const Constants = require("../config/constant");
const collegeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: Constants.name_min_length,
    max: Constants.name_max_length,
  },
  code: {
    type: Number,
    required: true,
    min: Constants.code_min_length,
    max: Constants.code_max_length
  },
  address: {
    type: String,
    required: true,
    min: Constants.address_min_length,
    max: Constants.address_max_length
  },
  university: {
    type: String,
    required: true,
    min: Constants.university_min_length,
    max: Constants.university_max_length
  },
  email: {
    type: String,
    required: true,
    max: Constants.email_min_length,
    min: Constants.email_max_length,
  },
  phone: {
    type: String,
    required: true,
    min: Constants.phone_min_length,
    max: Constants.phone_max_length
  }

});
module.exports = mongoose.model("College", collegeSchema);