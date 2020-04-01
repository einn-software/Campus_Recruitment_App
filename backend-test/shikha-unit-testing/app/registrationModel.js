const mongoose = require('mongoose');
const adminsSchema = new mongoose.Schema({

   name :
   { type:String,
    required:true,
    min:6,
    max:255,
   
   },
   email :
   { type:String,
      required:true,
      min:15,
      max:255,
     
   },
   password :
   { 
      type:String,
      required:true,
      min:6,
      max:1024,
   },
   phone : 
   {
      type:Number,
      required:true,
      
   }

});

const collegesSchema = new mongoose.Schema({

    name :
    { type:String,
      required:true,
      min:6,
      max:255,
     
     },
    email : 
    { type:String,
      required:true,
      min:15,
      max:255,
     
    },
    password : 
    { type:String,
      required:true,
      min:6,
      max:255,
     
     },
    phone :
    { type:String,
      required:true,
     
     },
    code : 
    { type:Number,
      required:true,
      min:6,
     
     },
    address :
    { type:String,
      required:true,
      min:13,
      max:255,
     
     }
 
 });

 const  tposSchema = new mongoose.Schema({

    name :
    { type:String,
      required:true,
      min:6,
      max:255,
     
     },
    email :
     { type:String,
      required:true,
      min:15,
      max:255,
     
     },
    password : 
    { type:String,
      required:true,
      min:6,
      max:1024,
     
     },
    phone : 
    { type:Number,
      required:true,
      
     
     },
    designation: 
    { type:String,
      required:true,
      max:23,
        
     },
    college: 
    { type:String,
      required:true,
      max:40,
     
     }
 
 });

 const  studentsSchema = new mongoose.Schema({

    name :{ type:String,
      required:true,
      min:6,
      max:255,
     
     },
    email :{ type:String,
      required:true,
      min:6,
      max:255,
     
     },
    password :{ type:String,
      required:true,
      min:6,
      max:255,
     
     },
    phone :{ type:Number,
      required:true,
      min:6,
      max:255,
     
     },
    roll: { type:Number,
      required:true,
      min:6,
      max:255,
     
     },
    branch: { type:String,
      required:true,
      min:6,
      max:255,
     
     },
    college: { type:String,
      required:true,
      min:6,
      max:255,
     
     }
 
 });





 module.exports = mongoose.model('Admins', adminsSchema);
 module.exports = mongoose.model('Colleges', collegesSchema);
 module.exports = mongoose.model('Tpos', tposSchema);
 module.exports = mongoose.model('Students', studentsSchema);