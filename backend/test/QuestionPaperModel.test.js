// const mongoose = require("mongoose");
// const QuestionPapers = require("../model/QuestionPaper");
// const QuestionCollections = require("../model/QuestionCollections");
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
//     mongoose.connection.collections.questionpapers.drop(() => {
//         done();
//     });
// });

// before((done) => {
//     mongoose.connection.collections.instructions.drop(() => {
//         done();
//     });
// });

// before((done) => {
//     mongoose.connection.collections.questioncollections.drop(() => {
//         done();
//     });
// });

// const Registration = new QuestionCollections({
//     question: "what is the capital of india?",
//     topic: "G.K",
//     options: [{
//             index: 1,
//             option: "Mumbai"
//         },
//         {
//             index: 2,
//             option: "Kerala"
//         },
//         {
//             index: 3,
//             option: "Delhi"
//         },
//         {
//             index: 4,
//             option: "Lucknow"
//         },
//     ],
//     answer: 3,
//     weight: 6,
// });
// Registration.save()
//     .then((done) => {
//         done();
//     })
// const instruct = new Instructions({
//     code: 2345,
//     year: 2020,
//     month: 11,
//     day: 23,
//     message: "This is a test message",
// });
// instruct
//     .save()
//     .then((done) => {
//         done();
//     })

// //create tests

// describe("Test Cases for question Paper", () => {
//     it("Create questionPaper", () => {
//         const paper = new QuestionPapers({
//             year: 2020,
//             month: 12,
//             day: 20,
//             paper_name: "DATA STRUCTURE",
//             paper_max_marks: 50,
//             max_time: 60,
//             instructions_id: instruct._id,
//             code: 2346,
//             start_time: "8:00 pm",
//             trigger_type: 2,
//             enable: 1,
//             negative_marking_ratio: 0.25,
//             sections: [{
//                 section_name: "A",
//                 section_marks: 10,
//                 num_of_questions: 5,
//                 question_List: [{
//                     question_id: Registration._id,
//                     question_marks: 4,
//                 }, ],
//             }, ],
//         });
//         paper
//             .save()
//             .then(() => {
//                 assert(!paper.isNew);
//             })
//             .catch((error) => {
//                 console.log("error", error);
//             });
//     });
// });

// //All read Tests

// describe("Read Tests", () => {
//     let QuestionP;

//     beforeEach((done) => {
//         QuestionP = new QuestionPapers({
//             year: 2020,
//             month: 12,
//             day: 20,
//             paper_name: "DATA STRUCTURE",
//             paper_max_marks: 50,
//             max_time: 60,
//             instructions_id: instruct._id,
//             code: 2346,
//             start_time: "8:00 pm",
//             trigger_type: 2,
//             enable: 1,
//             negative_marking_ratio: 0.25,
//             sections: [{
//                 section_name: "A",
//                 section_marks: 10,
//                 num_of_questions: 5,
//                 question_List: [{
//                     question_id: Registration._id,
//                     question_marks: 4,
//                 }, ],
//             }, ],
//         });
//         QuestionP.save().then(() => done());
//     });
//     it("Read", (done) => {
//         QuestionPapers.findOne({
//             paper_name: "DATA STRUCTURE"
//         }).then((questionPaper) => {
//             assert(QuestionP.paper_name === "DATA STRUCTURE");
//             done();
//         });
//     });
// });

// //All delete tests

// describe("Delete Tests", () => {
//     let deleter;

//     beforeEach((done) => {
//         deleter = new QuestionPapers({
//             year: 2020,
//             month: 12,
//             day: 20,
//             paper_name: "DATA STRUCTURE",
//             paper_max_marks: 50,
//             max_time: 60,
//             instructions_id: instruct._id,
//             code: 2346,
//             start_time: "8:00 pm",
//             trigger_type: 2,
//             enable: 1,
//             negative_marking_ratio: 0.25,
//             sections: [{
//                 section_name: "A",
//                 section_marks: 10,
//                 num_of_questions: 5,
//                 question_List: [{
//                     question_id: Registration._id,
//                     question_marks: 4,
//                 }, ],
//             }, ],
//         });
//         deleter.save().then(() => done());
//     });
//     it("Delete", (done) => {
//         QuestionPapers
//             .findByIdAndDelete(deleter._id)
//             .then(() => QuestionPapers.findOne({
//                 name: "Shikha"
//             }))
//             .then((questionPapers) => {
//                 assert(questionPapers == null);
//                 done();
//             });
//     });
// });

// //update all tests
// describe("Update Tests", () => {
//     let updater;
//     beforeEach((done) => {
//         updater = new QuestionPapers({
//             year: 2020,
//             month: 12,
//             day: 20,
//             paper_name: "DATA STRUCTURE",
//             paper_max_marks: 50,
//             max_time: 60,
//             instructions_id: instruct._id,
//             code: 2346,
//             start_time: "8:00 pm",
//             trigger_type: 2,
//             enable: 1,
//             negative_marking_ratio: 0.25,
//             sections: [{
//                 section_name: "A",
//                 section_marks: 10,
//                 num_of_questions: 5,
//                 question_List: [{
//                     question_id: Registration._id,
//                     question_marks: 4,
//                 }, ],
//             }, ],
//         });
//         updater.save().then(() => done());
//     });
//     it("set and save", () => {
//         updater.set({
//             year: 2020,
//             month: 12,
//             day: 20,
//             paper_name: "DATA STRUCTURE",
//             paper_max_marks: 100,
//             max_time: 120,
//             instructions_id: instruct._id,
//             code: 2346,
//             start_time: "8:00 pm",
//             trigger_type: 2,
//             enable: 1,
//             negative_marking_ratio: 0.25,
//             sections: [{
//                 section_name: "A",
//                 section_marks: 10,
//                 num_of_questions: 5,
//                 question_List: [{
//                     question_id: Registration._id,
//                     question_marks: 4,
//                 }, ],
//             }, ],
//         });
//         updater
//             .save()
//             .then(() => QuestionPapers.find({}))
//             .then((questionPapers) => {
//                 assert(questionPapers[0].code !== 23456);
//             });
//     });
// });