const mongoose = require("mongoose");
const Admins = require("../model/Admin");

const url = "mongodb://localhost/Models";
const connect = mongoose.connect(url);

connect.then((db) => {
  console.log("connected to the server");

  var newAdmin = Admins({
    name: "shikha",
    email: "shikha.g@gmail.com",
    password: "ss2611",
    phone: "7898766554",
  });

  newAdmin
    .save()
    .then((admin) => {
      console.log(admin);
      return Admins.find({}).exec();
    })
    .then((admins) => {
      console.log(admins);

      return Admins.deleteOne({});
    })
    .then(() => {
      return mongoose.connection.close();
    })
    .catch((err) => {
      console.log(err);
    });
});
