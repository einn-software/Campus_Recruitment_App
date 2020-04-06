const mongoose = require('mongoose');
const resultsSchema = new mongoose.Schema({
    
    student_id:{ type:Number,
        required:true,
       
       },
    question_paper_id:{ type:Number,
        required:true,
        
       },
    question_attempt:{ type:Number,
        required:true,
       
       },
    correct_attempt:{ type:Number,
        required:true,
    
       
       },
    total_marks_scored:{ type:Number,
        required:true,
       
       }
    

});

module.exports = mongoose.model('Results',resultsSchema);