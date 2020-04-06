const mongoose = require('mongoose');
const resultsSchema = new mongoose.Schema({
    
    student_id:{ type:String,
        required:true,
       
       },
       question_paper_id:{ type:String,
        min:4,
        max:30,
        required:true,
        
       },
    question_attempt:{ type:String,
        min:1,
        max:30,
        required:true,
       
       },
    correct_attempt:{ type:String,
        min:1,
        max:30,
        required:true,
    
       
       },
    total_marks_scored:{ type:String,
        min:2,
        max:30,
        required:true,
       
       },
       date: {
        type: Date,
        default: Date.now
    }
    

});

module.exports = mongoose.model('Results',resultsSchema);