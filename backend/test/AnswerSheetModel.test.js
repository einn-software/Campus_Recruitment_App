"use strict";
const QuestionPapers = require("../model/QuestionPaper");
const QuestionCollections = require("../model/QuestionCollections");
const Instructions = require("../model/Instruction");
const Students = require("../model/Student");
const AnswerSheets = require("../model/StudentAnswerSheet");
const assert = require("assert");
const logger = require("../config/logger");
var answer_id = '';
var paper_id = '';
var instruction_id = '';
var questions_id = '';
var std_id = '';

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
        })

    const student1 = new Students({
        name: "Tushar",
        email: "tushar2@gmail.com",
        password: "ssssss44",
        phone: 7878787878,
        roll: 201007,
        branch: "CS",
        college: "nTC",
        code: 2346
    });
    student1.save()
        .then((res) => {
            std_id = res._id;
            done();
        })
})
before((done) => {
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
            done();
        })
        .catch((error) => {
            logger.log("error", error);
        });
})

describe("Create Tests for Answer Sheet Model", () => {
    it("Create Answer Sheet", (done) => {
        const answer = new AnswerSheets({
            question_paper_id: paper_id,
            student_id: std_id,
            question_id: questions_id,
            selected_option: 4,
            state: 4,
            marks_rewarded: 0,
            question_max_marks: 4
        });
        answer.save()
            .then((res) => {
                answer_id = res._id;
                assert(!answer.isNew);
            })
            .catch((error) => {
                logger.log("error", error);
            });
        done();
    });
});

// Read Tests
describe("Answer Sheet Read Tests", () => {
    it("Read Answer Sheet", (done) => {
        AnswerSheets.findOne({
            _id: answer_id
        }).then((reg) => {
            assert(answer_id.toString() === reg._id.toString());
        });
        done();
    });
});

// update all tests
describe("Answer Sheet Update Tests", () => {
    it("update Answer Sheet", () => {
        var updater = ({
            marks_rewarded: 5
        });
        AnswerSheets.findByIdAndUpdate({
                _id: answer_id
            }, updater, {
                new: true
            })
            .then((data) => {
                assert(data.marks_rewarded !== 0);
            });
    });
});

//All delete tests
describe("Answer Sheet Delete Tests from db", () => {
    it("Delete Answer Sheet", (done) => {
        AnswerSheets.findByIdAndRemove({
            _id: answer_id
        }, (data) => {
            assert(data == null);
            done();
        }).exec();
    });
});

after(() => {
    Instructions.findByIdAndRemove({
        _id: instruction_id
    }).exec();
    QuestionCollections.findByIdAndRemove({
        _id: questions_id
    }).exec();
    QuestionPapers.findByIdAndRemove({
        _id: paper_id
    }).exec();
    Students.findByIdAndRemove({
        email: "tushar2@gmail.com"
    }).exec();
})