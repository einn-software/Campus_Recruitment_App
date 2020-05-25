const mongoose = require("mongoose");
const collegeSchema = new mongoose.Schema({
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
  university: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  phone: {
    type: String,
    required: true,
  },
  code: {
    type: Number,
    required: true,
    min: 4
  },
  address: {
    type: String,
    required: true,
    min: 13,
    max: 255
  }
});
module.exports = mongoose.model("College", collegeSchema);