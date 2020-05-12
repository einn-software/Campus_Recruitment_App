const mongoose = require("mongoose");
const collegeSchema = new mongoose.Schema({
  name: { type: String, required: true, min: 6, max: 255 },
  email: { type: String, required: true, min: 6, max: 255 },
  password: { type: String, required: true, min: 6, max: 255 },
  phone: { type: Number, required: true, min: 10 },
  college_code: { type: String, required: true, min: 3 },
  address: { type: String, required: true, min: 13, max: 255 },
});
module.exports = mongoose.model("College", collegeSchema);
