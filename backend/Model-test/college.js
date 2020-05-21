const mongoose = require("mongoose");
const Colleges = require("../model/College");

const url = "mongodb://localhost/Models";
const connect = mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true});

connect.then((db) => {
  console.log("connected to the server");

  var newCollege = Colleges({
    name: "Ajay Kumar Garg",
    email: "shikha.g@gmail.com",
    university: "Apj Abdul Kalam University",
    phone: "7898766559",
    code: 80989,
    address:'Dasna NH-24, Ghaziabad'
  });

  newCollege
    .save()
    .then((college) => {
      console.log(college);
      return Colleges.find({}).exec();
    })
    .then((colleges) => {
      console.log(colleges);

      return Colleges.deleteOne({});
    })
    .then(() => {
      return mongoose.connection.close();
    })  
    .catch((err) => {
      console.log(err);
    });
});
c 