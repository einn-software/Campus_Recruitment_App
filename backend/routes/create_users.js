var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var studentSchema = mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    roll:{
        type: String,
        require: true
    },
    mobile:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true
    },
    branch:{
        type: String,
        require: true
    },
    college:{
        type: String,
        require: true
    }
});


var adminModel = module.exports = mongoose.model('admin',studentSchema,"students");

//add entery to database
module.exports.addAdmin = function(data){
    //adminModel.create(data,callback);
    var admin = new adminModel(data);
    return admin.save()
}
