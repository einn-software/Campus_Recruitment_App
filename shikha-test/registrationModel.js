var mongoose = require('mongoose');
var  adminsSchema = new mongoose.Schema({

   name :String,
   email : String,
   password : String,
   phone : Number

});

var  collegesSchema = new mongoose.Schema({

    name :String,
    email : String,
    password : String,
    phone : Number,
    code : Number,
    address : String
 
 });

 var  tposSchema = new mongoose.Schema({

    name :String,
    email : String,
    password : String,
    phone : Number,
    designation: String,
    college: String
 
 });

 var  studentsSchema = new mongoose.Schema({

    name :String,
    email : String,
    password : String,
    phone : Number,
    roll: Number,
    branch: String,
    college: String
 
 });



var adminsModel = mongoose.model('admins',adminsSchema);
var admins = new adminsModel({
   name : "XYZ",
   email: "xyz@gmail.com",
   password:"abc",
   phone: 8099234431,

});


var collegesModel = mongoose.model('colleges',collegesSchema);
var colleges = new collegesModel({
   name : "XYZ",
   email: "xyz@gmail.com",
   password:"abc",
   phone: 8099234431,
   code: 1234,
   address:"avantika"

});


var tposModel = mongoose.model('tpos',tposSchema);
var tpos = new tposModel({
   name : "XYZ",
   email: "xyz@gmail.com",
   password:"abc",
   phone: 8099234431,
   designation:"any",
   college:"any"

});



var studentsModel = mongoose.model('students',studentsSchema);
var students = new studentsModel({
   name : "XYZ",
   email: "xyz@gmail.com",
   password:"abc",
   phone: 8099234431,
   roll:12,
   branch:"cse",
   college:"any"

});

console.log("Admins MOdel" + admins);
console.log("colleges Model" + colleges);
console.log("Tpos Model" + tpos);
console.log("Students Model" + students);