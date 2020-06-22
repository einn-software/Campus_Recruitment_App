const mongoose = require("mongoose");
const Constants = require("../config/constant");
const finalSubmissionSchema = new mongoose.Schema({
    question_paper_id: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "QuestionPaper"
    },
    student_id: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Student"
    }
});

module.exports = mongoose.model("FinalSubmission", finalSubmissionSchema);