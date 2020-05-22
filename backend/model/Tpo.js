const mongoose = require("mongoose");
const tpoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 4,
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
    max: 1024
  },
  phone: {
    type: String,
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
  code: {
    type: Number,
    required: true,
    min: 4
  },
});
module.exports = mongoose.model("Tpo", tpoSchema);