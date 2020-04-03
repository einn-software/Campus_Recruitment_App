const mongoose = require('mongoose');
const adminsSchema = new mongoose.Schema({

   name :String,
   
   email :String,
  
   password :String,

   phone : Number,

});

const collegesSchema = new mongoose.Schema({

    name :String,   
    email : String,
    password : String,
        
     phone :String,
    code :Number,
    address:String,
       
 });

 const  tposSchema = new mongoose.Schema({

    name :String,
    email :String,
    password : String,
    phone :Number,
    designation: String,
             
     
    college:String,
 
 });

 const  studentsSchema = new mongoose.Schema({

    name:String,
    
    email :String,
      
    password :String,
      
    phone :Number,
  
    roll:Number,
    branch:String,
    college:String,
 });





 module.exports = mongoose.model('Admins', adminsSchema);
 module.exports = mongoose.model('Colleges', collegesSchema);
 module.exports = mongoose.model('Tpos', tposSchema);
 module.exports = mongoose.model('Students', studentsSchema);