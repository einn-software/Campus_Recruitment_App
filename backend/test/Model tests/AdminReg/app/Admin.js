const mongoose = require('mongoose');
const adminSchema = new mongoose.Schema({
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
   
});
  module.exports = mongoose.model('Admin', adminSchema);