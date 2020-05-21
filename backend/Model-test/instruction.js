const mongoose = require("mongoose");
const Instructions = require("../model/instruction");

const url = "mongodb://localhost/Models";
const connect = mongoose.connect(url);

connect.then((db) => {
  console.log("connected to the server");

  var newInstruction = Instructions({
     code: 2345,
     year: 2020,
     month: 06,
     day: 23,
     message: 'Einn Campus'    
});

  newInstruction
    .save()
    .then((instruction) => {
      console.log(instruction);
      return Instructions.find({}).exec();
    })
    .then((instructions) => {
      console.log(instructions);

      return Instructions.deleteOne({});
    })
    .then(() => {
      return mongoose.connection.close();
    })
    .catch((err) => {
      console.log(err);
    });
});
