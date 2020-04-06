const mongoose = require('mongoose');
const questionPapersSchema = new mongoose.Schema({
    
    date:{ type:Date,
        required:true,
    
       
       },
    max_marks:{ type:Number,
        required:true,
    
       
       },
    max_time:{ type:Number,
        required:true,
       
       },
    college_id:{ type:Number,
        required:true,
    
       
       },
    sections : [{marks:{
        
         type:Number},numOfQuestion:{type:Number},questionIdList:{type:Number}
        
        }]
    

});

module.exports = mongoose.model('QuestionPapers',questionPapersSchema);