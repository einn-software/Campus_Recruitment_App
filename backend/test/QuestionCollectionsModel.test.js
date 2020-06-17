// const mongoose = require("mongoose");
// const QuestionCollections = require("../model/QuestionCollections");
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
//   mongoose.connection.collections.questioncollections.drop(() => {
//     done();
//   });
// });

// describe("Create Tests", () => {
//   it("Create", (done) => {
//     // assert(true);

//     const Registration = new QuestionCollections({
//       question: "what is the capital of india?",
//       topic: "G.K",
//       options: [
//         { index: 1, option1: "Mumbai" },
//         { index: 2, option2: "Kerala" },
//         { index: 3, option3: "Delhi" },
//         { index: 4, option4: "Lucknow" },
//       ],
//       answer: 3,
//       weight: 6,
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
//     Register = new QuestionCollections({
//       question: "what is the capital of india?",
//       topic: "G.K",
//       options: [
//         { index: 1, option1: "Mumbai" },
//         { index: 2, option2: "Kerala" },
//         { index: 3, option3: "Delhi" },
//         { index: 4, option4: "Lucknow" },
//       ],
//       answer: 3,
//       weight: 6,
//     });
//     Register.save().then(() => {
//       done();
//     });
//   });
//   it("Read", (done) => {
//     QuestionCollections.find({
//       question: "what is the capital of India?",
//     }).then((questionCollections) => {
//       assert(Register._id.toString() === questionCollections[0]._id.toString());
//       done();
//     });
//   });
// });

// // All update test

// describe("Update Tests", () => {
//   let updater;
//   beforeEach((done) => {
//     updater = new QuestionCollections({
//       question: "what is the capital of india?",
//       topic: "G.K",
//       options: [
//         { index: 1, option1: "Mumbai" },
//         { index: 2, option2: "Kerala" },
//         { index: 3, option3: "Delhi" },
//         { index: 4, option4: "Lucknow" },
//       ],
//       answer: 3,
//       weight: 6,
//     });
//     updater.save().then(() => done());
//   });

//   it("set and save", () => {
//     updater.set({
//       question: "what is the capital of Japan?",
//       topic: "G.K",
//       options: [
//         { index: 1, option1: "Tokyo" },
//         { index: 1, option2: "Kerala" },
//         { index: 1, option3: "Delhi" },
//         { index: 1, option4: "Lucknow" },
//       ],
//       answer: 1,
//       weight: 6,
//     });
//     updater
//       .save()
//       .then(() => QuestionCollections.find({}))
//       .then((questionCollections) => {
//         assert(
//           questionCollections[0].question !== "what is the capital of India?"
//         );
//       });
//   });
// });

// //All delete tests

// describe("Delete Tests", () => {
//   let deleter;

//   beforeEach((done) => {
//     deleter = new QuestionCollections({
//         question: "what is the capital of india?",
//         topic: "G.K",
//         options: [
//           { index: 1, option1: "Mumbai" },
//           { index: 2, option2: "Kerala" },
//           { index: 3, option3: "Delhi" },
//           { index: 4, option4: "Lucknow" },
//         ],
//         answer: 3,
//         weight: 6,
//     });
//     deleter.save().then(() => done());
//   });
//   it("Delete", (done) => {
//     QuestionCollections
//       .findByIdAndDelete(deleter._id)
//       .then(() =>
//         QuestionCollections.findOne({
//           question: "what is the capital of India?",
//         })
//       )
//       .then((collection) => {
//         assert(collection == null);
//         done();
//       });
//   });
// });