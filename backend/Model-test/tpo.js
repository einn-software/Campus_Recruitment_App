const mongoose = require("mongoose");
const Tpos = require("../model/tpo");

const url = "mongodb://localhost/Models";
const connect = mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connect.then((db) => {
  console.log("connected to the server");

  var newTpo = Tpos({
    name: "Avnish tyagi",
    email: "avnish.ty@gmail.com",
    password: "ss2012",
    phone: "7898764559",
    designation: "Head of department",
    college: "Nitra Technical Campus",
    code: 80989,
  });

  newTpo
    .save()
    .then((tpo) => {
      console.log(tpo);
      return Tpos.find({}).exec();
    })
    .then((tpos) => {
      console.log(tpos);

      return Tpos.deleteOne({});
    })
    .then(() => {
      return mongoose.connection.close();
    })
    .catch((err) => {
      console.log(err);
    });
});
