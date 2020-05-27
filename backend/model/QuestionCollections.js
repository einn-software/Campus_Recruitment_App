const mongoose = require("mongoose");

const questionCollectionsSchema = new mongoose.Schema({
  question: { type: String, required: true },
  topic: { type: String, required: true },
  options: [
    {
      option1: [{ type: String, required: true }],
      option2: [{ type: String, required: true }],
      option3: [{ type: String, required: true }],
      option4: [{ type: String, required: true }],
    },
  ],
  answer: { type: String, required: true },
  weight: { type: Number, required: true },
});

module.exports = mongoose.model("QuestionCollection", questionCollectionsSchema );
