// const mongoose = require("mongoose");
// const Admins = require("../model/Admin");
// const assert = require("assert");
// mongoose.Promise = global.Promise;

// before((done) => {
//   mongoose.connect("mongodb://localhost/TestingModel", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });

//   mongoose.connection
//     .once("open", () => {
//       // console.log("connected"))
//       done();
//     })
//     .on("error", (error) => {
//       console.log("your error", error);
//     });
// });

// beforeEach((done) => {
//   mongoose.connection.collections.admins.drop(() => {
//     done();
//   });
// });

// describe("Create Tests", () => {
//   it("Create Admin", (done) => {
//     // assert(true);

//     const Registration = new Admins({
//       name: "Shikha",
//       email: "gshikha@gmail.com",
//       password: "ssssss44",
//       phone: "7878787878",
//     });
//     Registration.save()
//       .then(() => {
//         assert(!Registration.isNew); //if instruct is saved to db then it is not new
//         done();
//       })
//       .catch((error) => {
//         console.log("error", error);
//       });
//   });
// });

// //All read Tests

// describe("Read Tests", () => {
//   let Register;

//   beforeEach((done) => {
//     Register = new Admins({
//       name: "Shikha",
//       email: "gshikha@gmail.com",
//       password: "ssssss44",
//       phone: "7878787878",
//     });
//     Register.save().then(() => {
//       done();
//     });
//   });
//   it("Read", (done) => {
//     Admins.find({ name: "Shikha" }).then((reg) => {
//       assert(Register._id.toString() === reg[0]._id.toString());
//       done();
//     });
//   });
// });

// //update all tests

// describe("Update Tests", () => {
//   let updater;
//   beforeEach((done) => {
//     updater = new Admins({
//       name: "Shikha",
//       email: "gshikha@gmail.com",
//       password: "ssssss44",
//       phone: "7878787878",
//     });
//     updater.save().then(() => done());
//   });

//   it("set and save", () => {
//     updater.set({
//       name: "Riya",
//       email: "ria@gmail.com",
//       password: "rrrrrrr55",
//       phone: "6756765790",
//     });
//     updater
//       .save()
//       .then(() => Admins.find({}))
//       .then((Admin) => {
//         assert(Admin[0].name !== "Shikha");
//       });
//   });
// });

// //All delete tests

// describe("Delete Tests", () => {
//   let deleter;

//   beforeEach((done) => {
//     deleter = new Admins({
//       name: "Shikha",
//       email: "gshikha@gmail.com",
//       password: "ssssss44",
//       phone: "7878787878",
//     });
//     deleter.save().then(() => done());
//   });
//   it("Delete", (done) => {
//     Admins.findByIdAndDelete(deleter._id)
//       .then(() => Admins.findOne({ name: "Shikha" }))
//       .then((Admin) => {
//         assert(Admin == null);
//         done();
//       });
//   });
// });