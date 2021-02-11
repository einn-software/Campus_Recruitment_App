"use strict";
require("should");
const app = require("../index");
const request = require("supertest");
const agent = request.agent(app);
const Admins = require("../model/Admin");
const Instructions = require("../model/Instruction");
const QuestionCollections = require("../model/QuestionCollections");
const QuesPaper = require("../model/QuestionPaper");
const Constants = require("../config/constant");
const logger = require("../config/logger");

var loggedInToken = '';
var studentToken = '';
var ques_id = '';
var admin_id = '';
var std_id = '';
var paper_id = '';
var inst_id = '';
var answer_id = '';
const Students = require("../model/Student");

before((done) => {
    const student = {
        name: "Tushar",
        email: "tushar1@gmail.com",
        password: "ssssss44",
        phone: "7878787878",
        roll: "201008",
        branch: "CSE",
        college: "nTC",
        code: 2346
    };
    agent
        .post("/register/students")
        .send(student)
        .expect(Constants.success)
        .end((err, results) => {
            if (err) logger.log('error', err);
            std_id = results.body._id;
            done();
        });
})
before((done) => {
    const studentLogin = {
        roll: "201008",
        code: 2346,
        password: "ssssss44"
    };
    agent
        .post("/login/students")
        .send(studentLogin)
        .expect(Constants.success)
        .end((err, results) => {
            if (err) logger.log('error', err);
            studentToken = results.body.token;
            done();
        });
});
before((done) => {
    const admin = {
        name: "Riya Singhal",
        email: "riyasinghal@gmail.com",
        password: "YeahcoolItIs",
        phone: "7586958412",
    };
    agent
        .post("/register/admins")
        .send(admin)
        .expect(Constants.success)
        .end((err, results) => {
            if (err) logger.log('error', err);
            admin_id = results.body._id;
            done();
        })
});
before((done) => {
    const adminLogin = {
        email: "riyasinghal@gmail.com",
        password: "YeahcoolItIs",
    };
    agent
        .post("/login/admins")
        .send(adminLogin)
        .expect(Constants.success)
        .end((err, results) => {
            if (err) logger.log('error', err);
            loggedInToken = results.body.token;
            done();
        })
})
before((done) => {
    agent
        .post('/questions')
        .set('auth-token', loggedInToken)
        .send({
            "question": "What makes tracking activity more essential?",
            "topic": "Computer Science",
            "options": [{
                    "index": 1,
                    "option": " No need to follow rules"
                },
                {
                    "index": 2,
                    "option": "It schedules, estimates and follows resource allocation"
                },
                {
                    "index": 3,
                    "option": "All of the mentioned"
                },
                {
                    "index": 4,
                    "option": "None of the mentioned"
                }
            ],
            "answer": 3,
            "weight": 5
        })
        .expect(Constants.success)
        .end((err, results) => {
            ques_id = results.body._id;
            done();
        });
})

before((done) => {
    agent
        .post("/instructions")
        .set("auth-token", loggedInToken)
        .send({
            code: 2346,
            year: 2020,
            month: 11,
            day: 23,
            message: "This is a test message",
        })
        .expect(Constants.success)
        .end((err, results) => {
            inst_id = results.body._id;
            done();
        });
})
before((done) => {
    const paper = new QuesPaper({
        year: 2020,
        month: 11,
        day: 23,
        paper_name: "DATA STRUCTURE",
        paper_max_marks: 10,
        max_time: 30,
        instructions_id: inst_id,
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
                question_id: ques_id,
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

// Student Answer Sheet Create Test
describe("Create Tests", () => {
    it("It should return student answer sheet", (done) => {
        agent
            .post("/student-answers")
            .set("auth-token", studentToken)
            .send({
                student_id: std_id,
                question_paper_id: paper_id,
                question_id: ques_id,
                selected_option: 3,
                state: 4,
                question_max_marks: 5
            })
            .expect(Constants.success)
            .end((err, results) => {
                answer_id = results.body._id;
                results.body.should.have.property("_id");
                done();
            });
    });
});

// To get all student answer sheet
describe("The GET method", async () => {
    it("should return a list of student answer sheet:", (done) => {
        agent
            .get(`/student-answers/${std_id}/${paper_id}`)
            .set("auth-token", studentToken)
            .expect(Constants.success)
            .end((err, results) => {
                if (err) logger.log("error", err);
                results.body.should.be.an.Array();
                done();
            });
    });
    it("should return a error: Path not defined:", (done) => {
        agent
            .get("/student-answerss")
            .set("auth-token", studentToken)
            .expect(Constants.er_not_found)
            .end((err, results) => {
                results.body.should.have.property("error_info");
                done();
            });
    });
});

describe("Change(PUT) student answer sheet's data by Id Testing:", () => {
    const body = {
        state: 5
    };
    it("should return a student answer sheet after changing it's data:", (done) => {
        agent
            .set("auth-token", studentToken)
            .put(`/student-answers/${answer_id}`)
            .send(body)
            .expect(Constants.success)
            .end((err, results) => {
                if (err) logger.log("error", err);
                results.body.should.have.property("state").which.is.equal(5);
                done();
            });
    });
    it("should return a error: authentication error:", (done) => {
        agent
            .set("auth-token", "")
            .put(`/student answer sheet/${answer_id}`)
            .send(body)
            .expect(Constants.er_authentication_failed)
            .end((err, results) => {
                results.body.should.have.property("error_info");
                done();
            });
    });
});

// Final Submission API Test Case
describe("Create Tests for final submission", () => {
    it("It should return a message", () => {
        agent
            .post("/final-submission")
            .set("auth-token", studentToken)
            .send({
                student_id: std_id,
                question_paper_id: paper_id
            })
            .expect(Constants.success)
            .end((err, results) => {
                answer_id = results.body._id;
                results.body.should.have.property("message");
            });
    });
});

// Result API test cases
describe("Get Tests case for Result", () => {
    it("It should return a result", (done) => {
        agent
            .get(`/colleges/2346/results/20158/question-papers/${paper_id}`)
            .set("auth-token", loggedInToken)
            .send()
            .expect(Constants.er_not_found)
            .end((err, results) => {
                results.body.should.have.property("error_info");
                done();
            });
    });
});

describe("Get Tests case for Result", () => {
    it("It should return a result array", (done) => {
        agent
            .get(`/colleges/2346/results/${paper_id}`)
            .set("auth-token", loggedInToken)
            .send()
            .expect(Constants.success)
            .end((err, results) => {
                results.body.should.be.an.Array();
                done();
            });
    });
});

// answer sheet delete
describe("DELETE student answer sheet by Id Testing:", () => {
    it("should return a error: no id found in databse:", (done) => {
        agent
            .delete(`/student-answers/${answer_id}`)
            .set("auth-token", studentToken)
            .expect(Constants.er_not_found)
            .end((err, results) => {
                console.log(results.body)
                results.body.should.have.property("error_info");
                done();
            });
    });
});

describe("DELETE all student answers from sheet by Id Testing:", () => {
    it("should return a message:", (done) => {
        agent
            .delete(`/student-answer/${std_id}/${paper_id}`)
            .set("auth-token", loggedInToken)
            .expect(Constants.success)
            .end((err, results) => {
                results.body.should.have.property("message");
                done();
            });
    });
});


after((done) => {
    Admins.findByIdAndRemove({
        _id: admin_id
    }).exec();
    Instructions.findByIdAndRemove({
        _id: inst_id
    }).exec();
    QuestionCollections.findByIdAndRemove({
        _id: ques_id
    }).exec();
    QuesPaper.findOneAndRemove({
        _id: paper_id
    }).exec();
    Students.findOneAndRemove({
        email: "tushar1@gmail.com"
    }).exec();
    done();
})