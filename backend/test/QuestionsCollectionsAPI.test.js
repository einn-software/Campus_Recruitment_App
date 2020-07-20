"use strict";
require("should");
const app = require("../index");
const request = require("supertest");
const agent = request.agent(app);
const Admins = require("../model/Admin");
const logger = require("../config/logger");
const Constants = require("../config/constant");

var loggedInToken = '';
var id = '';
var admin_id = '';

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
        });
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

describe("Create Tests", () => {
    it('It should return a saved question', (done) => {
        agent
            .post('/questions')
            .set('auth-token', loggedInToken)
            .send({
                "question": "What makes a activity more essential?",
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
                id = results.body._id;
                results.body.should.have.property("_id");
                done();
            });
    });
})

// To get all questions
describe('The GET method', async () => {
    it("should return a list of questions:", (done) => {
        agent
            .get("/questions")
            .set('auth-token', loggedInToken)
            .expect(Constants.success)
            .end((err, results) => {
                if (err) logger.log('error', err);
                results.body.should.be.an.Array();
                done();
            })
    });
    it("should return a error: Path not defined:", (done) => {
        agent
            .get("/instructos")
            .set('auth-token', loggedInToken)
            .expect(Constants.er_not_found)
            .end((err, results) => {
                results.body.should.have.property("error_info");
                done();
            });
    });
});

describe("GET instruction by code Testing:", () => {
    it("should return a instruction:", (done) => {
        agent
            .get(`/questions/${id}`)
            .set('auth-token', loggedInToken)
            .expect(Constants.success)
            .end((err, results) => {
                if (err) logger.log('error', err);
                results.body.should.have.property("weight");
                done();
            })
    });
    it("should return a error: Id not found:", (done) => {
        agent
            .get(`/questions/58465464613545`)
            .set('auth-token', loggedInToken)
            .expect(Constants.er_not_found)
            .end((err, results) => {
                results.body.should.have.property("error_info");
                done();
            });
    });
});

describe("Change(PUT) question's data by Id Testing:", () => {
    const body = {
        weight: 2
    }
    it("should return a question after changing it's data:", (done) => {
        agent
            .set('auth-token', loggedInToken)
            .put(`/questions/${id}`)
            .send(body)
            .expect(Constants.success)
            .end((err, results) => {
                if (err) logger.log('error', err);
                results.body.should.have.property("weight").which.is.equal(2);
                done();
            })
    });
    it("should return a error: authentication error:", (done) => {
        agent
            .set('auth-token', '')
            .put(`/questions/${id}`)
            .send(body)
            .expect(Constants.success)
            .end((err, results) => {
                results.body.should.have.property("error_info");
                done();
            });
    });
});
describe("DELETE questions by Id Testing:", () => {
    it("should return a message about deleted questions:", (done) => {
        agent
            .delete(`/questions/${id}`)
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
            .delete(`/questions/${id}`)
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
    done();
})