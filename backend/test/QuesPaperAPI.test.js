"use strict";
require("should");
const app = require("../index");
const request = require("supertest");
const agent = request.agent(app);
const Admins = require("../model/Admin");
const Instructions = require("../model/Instruction");
const QuestionCollections = require("../model/QuestionCollections");
const logger = require("../config/logger");
const Constants = require("../config/constant");

var loggedInToken = '';
var ques_id = '';
var admin_id = '';
var id = '';
var inst_id = '';

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
            if (err) logger.log(err);
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
            if (err) logger.log(err);
            loggedInToken = results.body.token;
            done();
        })
})
before((done) => {
    const ques = new QuestionCollections({
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
        weight: 6
    });
    ques.save()
        .then((res) => {
            ques_id = res._id;
            done();
        })
})

before((done) => {
    agent
        .post("/instructions")
        .set("auth-token", loggedInToken)
        .send({
            code: 2345,
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

describe("Exam Create Tests", () => {
    it('It should return a saved question paper', (done) => {
        agent
            .post('/question-papers')
            .set('auth-token', loggedInToken)
            .send({
                year: 2021,
                month: 11,
                day: 23,
                paper_name: "Computer",
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
                    question_list: [{
                        question_id: ques_id,
                        question_marks: 10,
                    }, ],
                }, ],
            })
            .expect(Constants.success)
            .end((err, results) => {
                id = results.body._id;
                results.body.should.have.property("_id");
                done();
            });
    });
})

// To get exams by using id
describe("The GET method", async () => {
    it("should return a list of exam:", (done) => {
        agent
            .get(`/question-papers/${id}/questions`)
            .set("auth-token", loggedInToken)
            .expect(Constants.success)
            .end((err, results) => {
                if (err) logger.log("error", err);
                results.body.should.have.property("_id");
                done();
            });
    });
    it("should return a error: Path not defined:", (done) => {
        agent
            .get(`/ques-papers/${id}/questions`)
            .set("auth-token", loggedInToken)
            .expect(Constants.er_not_found)
            .end((err, results) => {
                results.body.should.have.property("error_info");
                done();
            });
    });
});

// To get questions using code and date
describe('The Exam GET method', async () => {
    it("should return a error: Wrong query parameters:", (done) => {
        agent
            .get("/colleges/2346/question-papers/2020/month=12&day=23")
            .set('auth-token', loggedInToken)
            .expect(404)
            .end((err, results) => {
                results.body.should.have.property("error_info");
                done();
            });
    });
});

describe("GET exam by code Testing:", () => {
    it("should return a exam:", (done) => {
        agent
            .get(`/question-papers/2346`)
            .set('auth-token', loggedInToken)
            .expect(Constants.success)
            .end((err, results) => {
                if (err) logger.log('error', err);
                results.body.should.be.an.Array();
                done();
            })
    });
    it("should return a error: Code not found:", (done) => {
        agent
            .get(`/question-papers/2485`)
            .set('auth-token', loggedInToken)
            .expect(Constants.er_not_found)
            .end((err, results) => {
                results.body.should.have.property("error_info");
                done();
            });
    });
});

describe("Change(PUT) exam's data by Id Testing:", () => {
    const body = {
        max_time: 15,
    }
    it("should return a exam after changing it's data:", (done) => {
        agent
            .set('auth-token', loggedInToken)
            .put(`/question-papers/${id}`)
            .send(body)
            .expect(Constants.success)
            .end((err, results) => {
                if (err) logger.log('error', err);
                results.body.should.have.property("max_time").which.is.equal(15);
                done();
            })
    });
    it("should return a error: authentication error:", (done) => {
        agent
            .set('auth-token', '')
            .put(`/question-papers/${id}`)
            .send(body)
            .expect(Constants.success)
            .end((err, results) => {
                results.body.should.have.property("error_info");
                done();
            });
    });
});

// Paper delete test case
describe("DELETE exam by Id Testing:", () => {
    it("should return a message about deleted exam:", (done) => {
        agent
            .delete(`/question-papers/${id}`)
            .set('auth-token', loggedInToken)
            .expect(Constants.success)
            .end((err, results) => {
                if (err) logger.log('error', err);
                results.body.should.have.property("message");
                done();
            })
    });
    it("should return a error: no user found in databse:", (done) => {
        agent
            .delete(`/question-papers/${id}`)
            .set('auth-token', loggedInToken)
            .expect(Constants.success)
            .end((err, results) => {
                results.body.should.have.property("error_info");
                done();
            });
    });
});

after((done) => {
    Admins.findOneAndRemove({
        _id: admin_id
    }).exec();
    Instructions.findByIdAndRemove({
        _id: inst_id
    }).exec();
    QuestionCollections.deleteOne({
        _id: ques_id
    }).exec();
    done();
})