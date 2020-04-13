const mongoose = require('mongoose');
const testinstructionsSchema = new mongoose.Schema({
    
   college: { type:String,
      required:true,
      min:6,
      max:255,
     
     },
   date:{ type:Date,
      required:true,
      min:6,
      max:255,
     
     },
   message: { type:String,
      required:true,
      min:6,
      max:255,
     
     },

});

module.exports = mongoose.model('testinstructions',testinstructionsSchema);

