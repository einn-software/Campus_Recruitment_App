const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    email:{
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    password:{
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
    phone : 
    {
       type:Number,
       required:true,
       
    },
    date: {
        type: Date,
        default: Date.now
    }
});

 
//  const collegeSchema = new mongoose.Schema({
 
//      name :
//      { type:String,
//        required:true,
//        min:6,
//        max:255,
//       },
//      email : 
//      { type:String,
//        required:true,
//        min:6,
//        max:255,
      
//      },
//      password : 
//      { type:String,
//        required:true,
//        min:6,
//        max:255,
      
//       },
//      phone :
//      { type:String,
//        required:true,
//        min:10,
//       },
//      code : 
//      { type:Number,
//        required:true,
//        min:6,
      
//       },
//      address :
//      { type:String,
//        required:true,
//        min:13,
//        max:255,
      
//       }
  
//   });
 
//   const  tpoSchema = new mongoose.Schema({
 
//      name :
//      { type:String,
//        required:true,
//        min:6,
//        max:255,
      
//       },
//      email :
//       { type:String,
//        required:true,
//        min:6,
//        max:255,
      
//       },
//      password : 
//      { type:String,
//        required:true,
//        min:6,
//        max:1024,
      
//       },
//      phone : 
//      { type:Number,
//        required:true,
       
      
//       },
//      designation: 
//      { type:String,
//        required:true,
//        max:23,
//        min:6,
//       },
//      college: 
//      { type:String,
//        required:true,
//        max:40,
//        min:6,
//       }
  
//   });
 
//  
  
//   });
 
  module.exports = mongoose.model('User', userSchema);
 
//   module.exports = mongoose.model('College', collegeSchema);
//   module.exports = mongoose.model('Tpo', tpoSchema);
