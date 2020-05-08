const mongoose = require("mongoose");
const testinstructionsSchema = new mongoose.Schema({
  college_code: { type: String, required: true, min: 3, max: 255 },
  date: {
    type: Date,
    default: Date.now,
  },
  message: { type: String, required: true },
});

module.exports = mongoose.model("testinstructions", testinstructionsSchema);
