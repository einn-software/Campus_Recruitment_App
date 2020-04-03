const mongoose = require('mongoose');
const testinstructionsSchema = new mongoose.Schema({
    
   college: String,
     
     
     
   date:Date,
    
   message: String,
    
     
     
     

});

const testinstructions = mongoose.model('testinstructions',testinstructionsSchema);
module.exports = testinstructions; 
