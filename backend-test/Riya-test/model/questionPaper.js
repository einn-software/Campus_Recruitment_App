const mongoose = require('mongoose');
const questionPaperSchema = new mongoose.Schema({
    
    date:{ type:Date,
        required:true,
    
       
       },
    max_marks:{ type:Number,
        required:true,
    
       
       },
    max_time:{ type:String,
        required:true,
       
       },
    college_id:{ type:Number,
        required:true,
    
       },
    sections : [{marks:[{
        
        type:Number,required:true}],numOfQuestion:[{type:Number,required:true}],questionIdList:[{type:Number,required:true}]
       
       }]
    
    

});

module.exports = mongoose.model('questionPaper',questionPaperSchema);