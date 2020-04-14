const mongoose = require('mongoose');
const  studentSchema = new mongoose.Schema({
    name :{ type:String,
      required:true,
      min:6,
     },
    email :{ type:String,
      required:true,
      min:6,
     },
    password :{ type:String,
      required:true,
      min:6,
     },
    phone :{ type:Number,
      required:true,
      min:6,
     },
    roll: { type:Number,
      required:true,
      min:6,
     },
    branch: { type:String,
      required:true,
      min:6,
     },
    college: { type:String,
      required:true,
      min:6,
      max:255,
     },
     date: {
        type: Date,
        default: Date.now
    }
});
  module.exports = mongoose.model('Student', studentSchema);