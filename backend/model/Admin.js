const mongoose = require("mongoose");
const Constants = require("../config/constant");
const adminSchema = new mongoose.Schema({
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
  }
});
module.exports = mongoose.model("Admin", adminSchema);