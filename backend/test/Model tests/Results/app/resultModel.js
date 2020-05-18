const mongoose = require('mongoose');
const resultsSchema = new mongoose.Schema({
    
    student_id:Number,
    question_paper_id:Number,
    question_attempt:Number,   
    correct_attempt:Number,
    total_marks_scored:Number, 

});

const Results = mongoose.model('Results',resultsSchema);
module.exports = Results;