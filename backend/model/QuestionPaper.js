const mongoose = require("mongoose");
const questionPaperSchema = new mongoose.Schema({
  year: { type: Number, required: true },
  month: { type: Number, required: true },
  day: { type: Number, required: true },
  paper_name: { type: String, required: true },
  max_marks: { type: Number, required: true },
  max_time: { type: String, required: true },
  code: { type: Number, required: true, min: 6 },
  start_time: { type: Date, required: true },
  sections: [
    {
      marks: { type: Number, required: true },
      numOfQuestion: { type: Number, required: true },
      question_list: [
        { question_id: { type: String, required: true  } },
        { marks: { type: Number, required: true } },
      ],
    },
  ],
});

module.exports = mongoose.model("QuestionPaper", questionPaperSchema);
