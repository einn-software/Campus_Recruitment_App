"use strict";
const QuestionPapers = require("../model/QuestionPaper");
const QuestionCollections = require("../model/QuestionCollections");
const Instructions = require("../model/Instruction");
const Students = require("../model/Student");
const FinalSubmission = require("../model/FinalSubmission");
const assert = require("assert");
const logger = require("../config/logger");
var paper_id = '';
var instruction_id = '';
var questions_id = '';

before((done) => {
    const instruct = new Instructions({
        code: 2346,
        year: 2020,
        month: 11,
        day: 23,
        message: "This is a test message",
    });
    instruct
        .save()
        .then((res) => {
            instruction_id = res._id;
        })
    const questions = new QuestionCollections({
        question: "what is the capital of india?",
        topic: "G.K",
        options: [{
                index: 1,
                option: "Mumbai"
            },
            {
                index: 2,
                option: "Kerala"
            },
            {
                index: 3,
                option: "Delhi"
            },
            {
                index: 4,
                option: "Lucknow"
            },
        ],
        answer: 3,
        weight: 6,
    });
    questions.save()
        .then((res) => {
            questions_id = res._id;
            done();
        })
})


//create tests
describe("Test Cases for question Paper", () => {
    it("Create questionPaper", () => {
        const paper = new QuestionPapers({
            year: 2020,
            month: 11,
            day: 23,
            paper_name: "DATA STRUCTURE",
            paper_max_marks: 10,
            max_time: 30,
            instructions_id: instruction_id,
            code: 2346,
            start_time: "8:00 pm",
            trigger_type: 2,
            enable: 1,
            negative_marking_ratio: 0.25,
            sections: [{
                section_name: "A",
                section_marks: 10,
                num_of_questions: 5,
                question_List: [{
                    question_id: questions_id,
                    question_marks: 10,
                }, ],
            }, ],
        });
        paper
            .save()
            .then((res) => {
                paper_id = res._id;
                assert(!paper.isNew);
            })
            .catch((error) => {
                logger.log("error", error);
            });
    });
});

//All read Tests
describe("Question Paper Read Tests", () => {
    it("Read Paper", (done) => {
        QuestionPapers.findOne({
            paper_name: "DATA STRUCTURE"
        }).then((questionPaper) => {
            assert(questionPaper.paper_name === "DATA STRUCTURE");
            done();
        });
    });
});

//update all tests
describe("Question paper Update Tests", () => {
    it("update Question paper", () => {
        var updater = ({
            code: 2348
        });
        QuestionPapers.findByIdAndUpdate({
                _id: paper_id
            }, updater, {
                new: true
            })
            .then((data) => {
                assert(data.code !== 2346);
            });
    });
});

//All delete tests
describe("Paper Delete Tests", () => {
    it("Delete Paper", (done) => {
        QuestionPapers
            .findByIdAndRemove({
                _id: paper_id
            }, (questionPapers) => {
                assert(questionPapers === null);
                done();
            });
    });
});

after((done) => {
    Instructions.findByIdAndRemove({
        _id: instruction_id
    }).exec();
    QuestionCollections.findByIdAndRemove({
        _id: questions_id
    }).exec();
    done();
})