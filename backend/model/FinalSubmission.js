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
    },
    roll: {
        type: String,
        required: true,
        min: Constants.roll_min_length,
        max: Constants.roll_max_length
    },
    name: {
        type: String,
        required: true,
        min: Constants.name_min_length,
        max: Constants.name_max_length,
    },
    code: {
        type: Number,
        required: true,
        min: Constants.code_min_length,
        max: Constants.code_max_length
    }
});

module.exports = mongoose.model("FinalSubmission", finalSubmissionSchema);