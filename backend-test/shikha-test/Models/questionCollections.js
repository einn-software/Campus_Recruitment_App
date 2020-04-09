const mongoose = require('mongoose');
const questionCollectionsSchema = new mongoose.Schema({
    
    question:{ type:Number,
        required:true,
        
       
       },
    topic:{ type:String,
        required:true,
        
       
       },
    options:[{option1:{ type:String,
        required:true}},{option2:{ type:string, required:true}},{option3:{type:string, required:true}},{option4:{type:string}},{option5:{type:string}}    
    ],
    answer:{ type:Number,
        required:true,
    
       
       },
    weight:{ type:Number,
        required:true,
       
       }
    

});

module.exports = mongoose.model('questionCollections',questionCollectionsSchema);