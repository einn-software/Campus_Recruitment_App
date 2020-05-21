const mongoose = require("mongoose");
const Students = require("../model/Student");

const url = "mongodb://localhost/Models";
const connect = mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true});

connect.then((db) => {
  console.log("connected to the server");

  var newStudent = Students({
    name: "shikha",
    email: "shikha.g@gmail.com",
    password: "ss2611",
    phone: "7898766554",
    roll: "34567",
    branch:"computer science and engg",
    college:"Nitra Technical Campus",
    code: 80989,
    exam_start_time:'2012-12-09'
  });

  newStudent
    .save()
    .then((student) => {
      console.log(student);
      return Students.find({}).exec();
    })
    .then((students) => {
      console.log(students);

      return Students.deleteOne({});
    })
    .then(() => {
      return mongoose.connection.close();
    })  
    .catch((err) => {
      console.log(err);
    });
});
