const mongoose = require('mongoose');
const CollegeTestSchema = new mongoose.Schema({

college_id:{
    
    type:Number,
    required:true
},

date: {
    type: Date,
    default: Date.now
},

paper_id:{
    type:Number,
    required:true
},
})

module.exports = mongoose.model('collegeTest',CollegeTestSchema);