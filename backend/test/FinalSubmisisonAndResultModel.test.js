"use strict";
const QuestionPapers = require("../model/QuestionPaper");
const QuestionCollections = require("../model/QuestionCollections");
const Instructions = require("../model/Instruction");
const Students = require("../model/Student");
const Results = require("../model/Result");
const FinalSubmission = require("../model/FinalSubmission");
const assert = require("assert");
const logger = require("../config/logger");
var endExam_id = '';
var paper_id = '';
var instruction_id = '';
var questions_id = '';
var std_id = '';
var std1_id = '';
var result_id = '';

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
        email: "tushar@gmail.com",
        password: "ssssss44",
        phone: "7878787878",
        roll: "201007",
        branch: "CSE",
        college: "nTC",
        code: 2346
    });
    student1.save()
        .then((res) => {
            std_id = res._id;
        })
    const student2 = new Students({
        name: "Vishal",
        email: "vishal@gmail.com",
        password: "ssssss44",
        phone: 7878787878,
        roll: 201008,
        branch: "CS",
        college: "nTC",
        code: 2346
    });
    student2.save()
        .then((res) => {
            std1_id = res._id;
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

describe("Create Tests for Final Submission Model", () => {
    it("Create final submission", (done) => {
        const endExam = new FinalSubmission({
            question_paper_id: paper_id,
            student_id: std_id
        });
        endExam.save()
            .then((res) => {
                endExam_id = res._id;
                assert(!endExam.isNew);
            })
            .catch((error) => {
                logger.log("error", error);
            });
        done();
    });
});

// Read Tests
describe("Final Submission Read Tests", () => {
    it("Read final submission", (done) => {
        FinalSubmission.findOne({
            _id: endExam_id
        }).then((reg) => {
            assert(endExam_id.toString() === reg._id.toString());
        });
        done();
    });
});

// update all tests
describe("final Submission Update Tests", () => {
    it("update final Submission", () => {
        var updater = ({
            student_id: std1_id
        });
        FinalSubmission.findByIdAndUpdate({
                _id: endExam_id
            }, updater, {
                new: true
            })
            .then((data) => {
                assert(data.student_id !== std_id);
            });
    });
});

describe("Create Tests for Result Model", () => {
    it("Create Result", (done) => {
        const result = new Results({
            question_paper_id: paper_id,
            student_id: std_id,
            name: "Tushar",
            code: 2346,
            roll: 201009,
        });
        result.save()
            .then((res) => {
                result_id = res._id;
                assert(!result.isNew);
                done();
            })
            .catch((error) => {
                logger.log("error", error);
            });
    });
});

// // Read Tests
describe("Result Read Tests", () => {
    it("Read", () => {
        Results.findOne({
            code: 2346
        }).then((reg) => {
            assert(result_id.toString() === reg._id.toString())
            done();
        });
    });
});

// update all tests
describe("Result Update Tests", () => {
    it("update", () => {
        let updater = ({
            code: 2345
        });
        Results.findByIdAndUpdate({
                _id: result_id
            }, updater, {
                new: true
            })
            .then((data) => {
                assert(data.code !== "2346");
            });
    });
});

//All delete tests
describe("final Submission Delete Tests from db", () => {
    it("Delete final Submission", (done) => {
        FinalSubmission.findByIdAndRemove({
            _id: endExam_id
        }, (data) => {
            assert(data == null);
            done();
        }).exec();
    });
});

describe("Result Delete Tests", () => {
    it("Delete", () => {
        Results.findOneAndRemove({
            code: 2346
        }, (data) => {
            assert(data === null);
        })
    });
});

after((done) => {
    Instructions.findByIdAndRemove({
        _id: instruction_id
    }).exec();
    QuestionCollections.findByIdAndRemove({
        _id: questions_id
    }).exec();
    QuestionPapers.findByIdAndRemove({
        _id: paper_id
    }).exec();
    Students.findOneAndRemove({
        _id: std_id
    }).exec();
    Students.findOneAndRemove({
        _id: std1_id
    }).exec();
    Results.findOneAndRemove({
        roll: 201009
    }).exec();
    done();
})