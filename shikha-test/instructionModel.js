var mongoose = require('mongoose');
var testinstructionsSchema = new mongoose.Schema({
    
   college: String,
   data: String,
   message: String,

});

var testinstructionsModel = mongoose.model("instructions",testinstructionsSchema);
var instructions = new testinstructionsModel({

     college: "Any",
     data : "class",
     message: "Any",


});

console.log('TestinstructionModel' + instructions);
