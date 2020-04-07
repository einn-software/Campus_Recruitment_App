const mongoose = require('mongoose');
const questionCollectionsSchema = new mongoose.Schema({
    
    question:{ type:Number,
        required:true,
        
       
       },
    topic:{ type:String,
        required:true,
        
       
       },
    options:{ type:Number,
        required:true,
       
       },
    answer:{ type:Number,
        required:true,
    
       
       },
    weight:{ type:Number,
        required:true,
       
       }
    

});

module.exports = mongoose.model('questionCollections',questionCollectionsSchema);