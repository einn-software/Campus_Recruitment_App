const mongoose = require("mongoose");
const testinstructionsSchema = new mongoose.Schema({
  college_code: { type: String, required: true, min: 3, max: 255 },
  message: { type: String, required: true },
  date: {
    type: String,
    required: true,
    min: 10,
  },
});

module.exports = mongoose.model("testinstructions", testinstructionsSchema);
