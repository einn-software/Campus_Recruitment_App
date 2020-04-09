const mongoose = require('mongoose');
const CollegeTestSchema = new mongoose.Schema({
    
paper_id:{
    type:Number,
    required:true
},
})

module.exports = mongoose.model('collegeTest',CollegeTestSchema);