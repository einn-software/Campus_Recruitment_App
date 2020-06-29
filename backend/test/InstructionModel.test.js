// const mongoose = require("mongoose");
// const Instructions = require("../model/Instruction");
// const assert = require("assert");
// mongoose.Promise = global.Promise;

// before((done) => {
//     mongoose.connect("mongodb://localhost/TestingModel", {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     });

//     mongoose.connection
//         .once("open", () => {
//             // console.log("connected"))
//             done();
//         })
//         .on("error", (error) => {
//             console.log("your error", error);
//         });
// });

// beforeEach((done) => {
//     mongoose.connection.collections.instructions.drop(() => {
//         done();
//     });
// });

// describe("Create Tests for Instruction model", () => {
//     it("Create a instruction in db", (done) => {
//         // assert(true);

//         const instruct = new Instructions({
//             code: 2345,
//             year: 2020,
//             month: 11,
//             day: 23,
//             message: "This is a test message",
//         });
//         instruct
//             .save()
//             .then(() => {
//                 assert(!instruct.isNew); //if instruct is saved to db then it is not new
//                 done();
//             })
//             .catch((error) => {
//                 console.log("error", error);
//             });
//     });
// });

// //All read Tests

// describe("Read instructions", () => {
//     let KITE;

//     beforeEach((done) => {
//         KITE = Instructions({
//             code: 2345,
//             year: 2020,
//             month: 11,
//             day: 23,
//             message: "This is a test message",
//         });
//         KITE.save().then(() => {
//             done();
//         });
//     });
//     it("Read College ", (done) => {
//         Instructions.find({
//             code: 2345
//         }).then((instructions) => {
//             assert(KITE._id.toString() === instructions[0]._id.toString());
//             done();
//         });
//     });
// });

// //All delete tests

// describe("Delete instructions", () => {
//     let AKG;

//     beforeEach((done) => {
//         AKG = Instructions({
//             code: 2345,
//             year: 2020,
//             month: 11,
//             day: 23,
//             message: "This is a test message",
//         });
//         AKG.save().then(() => done());
//     });
//     it("Delete college ", (done) => {
//         Instructions.findByIdAndDelete(AKG._id)
//             .then(() => Instructions.findOne({
//                 code: 2345
//             }))
//             .then((instructions) => {
//                 assert(instructions == null);
//                 done();
//             });
//     });
// });

// //update all tests

// describe("Update Tets", () => {
//     let updater;
//     beforeEach((done) => {
//         updater = new Instructions({
//             code: 2345,
//             year: 2020,
//             month: 11,
//             day: 23,
//             message: "This is a test message",
//         });
//         updater.save().then(() => done());
//     });

//     it("set and save", () => {
//         updater.set("code", "2346");
//         updater
//             .save()
//             .then(() => Instructions.find({}))
//             .then((instructions) => {
//                 assert(instructions[0].code !== 2345);
//             });
//     });
// });