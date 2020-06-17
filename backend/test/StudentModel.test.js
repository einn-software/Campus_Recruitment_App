// const mongoose = require("mongoose");
// const Students = require("../model/Student");
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
//   mongoose.connection.collections.students.drop(() => {
//     done();
//   });
// });

// describe("Create Tests", () => {
//   it("Create", (done) => {
//     // assert(true);

//     const Registration = new Students({
//       name: "Shikha",
//       email: "gshikha@gmail.com",
//       password: "ssssss44",
//       phone: 7878787878,
//       roll: 201002,
//       branch: "CS",
//       college: "nTC",
//       code: 23456,
//       exam_start_time: "2012-09-23 23:00:00"
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
//     Register = new Students({
//       name: "Shikha",
//       email: "gshikha@gmail.com",
//       password: "ssssss44",
//       phone: 7878787878,
//       roll: 201002,
//       branch: "CS",
//       college: "nTC",
//       code: 23456,
//       exam_start_time: "2012-09-23 23:00:00"
//     });
//     Register.save().then(() => {
//       done();
//     });
//   });
//   it("Read", (done) => {
//     Students.find({ name: "Shikha" }).then((reg) => {
//       assert(Register._id.toString() === reg[0]._id.toString());
//       done();
//     });
//   });
// });

// // All update test

// describe("Update Tests", () => {
//   let updater;
//   beforeEach((done) => {
//     updater = new Students({
//       name: "Shikha",
//       email: "gshikha@gmail.com",
//       password: "ssssss44",
//       phone: 7878787878,
//       roll: 201002,
//       branch: "CS",
//       college: "nTC",
//       code: 23456,
//       exam_start_time: "2012-09-23 23:00:00"
//     });
//     updater.save().then(() => done());
//   });

//   it("set and save", () => {
//     updater.set({
//       name: "ria",
//       email: "ria@gmail.com",
//       password: "rrrr44",
//       phone: "4878787878",
//       roll: "2010021",
//       branch: "CS",
//       college: "KITE",
//       code: 23456,
//       exam_start_time: "2012-09-23 23:00:00"
//     });
//     updater
//       .save()
//       .then(() => Students.find({}))
//       .then((Students) => {
//         assert(Students[0].name !== "Shikha");
//       });
//   });
// });

// //All delete tests

// describe("Delete Tests", () => {
//   let deleter;

//   beforeEach((done) => {
//     deleter = new Students({
//       name: "Shikha",
//       email: "gshikha@gmail.com",
//       password: "ssssss44",
//       phone: "7878787878",
//       roll: "201002",
//       code: 23456,
//       branch: "Computer Science and Engineering",
//       college: "Nitra Technical Campus",
//       exam_start_time: "2012-09-23 23:00:00"
//     });
//     deleter.save().then(() => done());
//   });
//   it("Delete", (done) => {
//     Students.findByIdAndDelete(deleter._id)
//       .then(() => Students.findOne({ name: "Shikha" }))
//       .then((Student) => {
//         assert(Student == null);
//         done();
//       });
//   });
// });