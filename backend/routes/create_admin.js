var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var studentSchema = mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    roll:{
        type: Number,
        require: true
    },
    mobile:{
        type: Number,
        require: true
    },
    email:{
        type: String,
        require: true
    },
    branch:{
        type: String,
        require: true
    }
});


var submit = module.exports = mongoose.model('submit',studentSchema,"students");

//add entery to database
module.exports.addsubmit = function(students,callback){
    submit.create(students,callback);
}
