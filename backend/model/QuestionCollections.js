const mongoose = require("mongoose");
const Constants = require("../config/constant");
const questionCollectionsSchema = new mongoose.Schema({
  question: {
    type: String,
    min: Constants.question_min_length,
    required: true
  },
  topic: {
    type: String,
    min: Constants.topic_min_length,
    max: Constants.topic_max_length,
    required: true
  },
  options: [{
      index: {
        type: Number,
        required: true
      },
      option: {
        type: String,
        min: Constants.option_min_length,
        required: true
      },
    },
    {
      index: {
        type: Number,
        required: true
      },
      option: {
        type: String,
        min: Constants.option_min_length,
        required: true
      },
    },
    {
      index: {
        type: Number,
        required: true
      },
      option: {
        type: String,
        min: Constants.option_min_length,
        required: true
      },
    },
    {
      index: {
        type: Number,
        required: true
      },
      option: {
        type: String,
        min: Constants.option_min_length,
        required: true
      },
    },
  ],
  answer: {
    type: Number,
    required: true,
    min: Constants.answer_min_length,
    max: Constants.answer_max_length
  },
  weight: {
    type: Number,
    min: Constants.weight_min_length,
    max: Constants.weight_max_length,
    required: true
  },
});

module.exports = mongoose.model(
  "QuestionCollection",
  questionCollectionsSchema
);