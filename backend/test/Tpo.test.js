"use strict";
require("should");
const request = require("supertest");
const app = require("../index");
const agent = request.agent(app);
const logger = require("../config/logger");
const Constants = require("../config/constant");

var loggedInToken = '';
var id = '';

describe("Tpo Registration Testing:", () => {
    it("should return a registered tpo:", (done) => {
        const tpo = {
            name: "Riya Singhal",
            email: "riya@gmail.com",
            password: "YeahcoolItIs",
            phone: "7586958412",
            designation: "Director and Teacher",
            college: "Nitra Technical Campus",
            code: "5473",
        };
        agent
            .post("/register/tpos")
            .send(tpo)
            .expect(Constants.success)
            .end((err, results) => {
                id = results.body._id;
                results.body.should.have.property("_id");
                done();
            });
    });
    it("should return email already registered:", (done) => {
        const tpo = {
            name: "Riya Singhal",
            email: "riya@gmail.com",
            password: "YeahcoolItIs",
            phone: "7586958412",
            designation: "Director and Teacher",
            college: "Nitra Technical Campus",
            code: "5473",
        };
        agent
            .post("/register/tpos")
            .send(tpo)
            .expect(400)
            .end((err, results) => {
                results.body.should.have.property("error_info");
                done();
            });
    });
});
describe("Tpo Login Testing:", () => {
    it("should return a session having field token:", (done) => {
        const tpo = {
            email: "riya@gmail.com",
            password: "YeahcoolItIs",
        };
        agent
            .post("/login/tpos")
            .send(tpo)
            .expect(Constants.success)
            .end((err, results) => {
                loggedInToken = results.body.token;
                results.body.should.have.property("token");
                done();
            });
    });
    it("should return a error - email is not registered:", (done) => {
        const tpo = {
            email: "riyasinghal@gmail.com",
            password: "YeahcoolItIs",
        };
        agent
            .post("/login/tpos")
            .send(tpo)
            .expect(Constants.er_failure)
            .end((err, results) => {
                results.body.should.have.property("error_info");
                done();
            });
    });
});

describe("GET Tpo Testing:", () => {
    it("should return a list of tpos:", (done) => {
        agent
            .set('auth-token', loggedInToken)
            .get("/tpos")
            .expect(Constants.success)
            .end((err, results) => {
                if (err) logger.log('error', err);
                results.body.should.be.an.Array();
                done();
            })
    });
    it("should return a error: Path not defined:", (done) => {
        agent
            .set('auth-token', '')
            .get("/tposs")
            .expect(Constants.er_not_found)
            .end((err, results) => {
                results.body.should.have.property("error_info");
                done();
            });
    });
});

describe("GET Tpo by Id Testing:", () => {
    it("should return a tpo:", (done) => {
        agent
            .get(`/tpos/${id}`)
            .set('auth-token', loggedInToken)
            .expect(Constants.success)
            .end((err, results) => {
                if (err) logger.log('error', err);
                results.body.should.have.property("designation");
                done();
            })
    });
    it("should return a error: Id not found:", (done) => {
        agent
            .get(`/tpos/58465464613545`)
            .set('auth-token', loggedInToken)
            .expect(Constants.er_not_found)
            .end((err, results) => {
                results.body.should.have.property("error_info");
                done();
            });
    });
});

describe("Change(PUT) Tpo's data by Id Testing:", () => {
    const body = {
        name: "Shikha Gputa"
    }
    it("should return a Tpo after changing it's data:", (done) => {
        agent
            .set('auth-token', loggedInToken)
            .put(`/tpos/${id}`)
            .send(body)
            .expect(Constants.success)
            .end((err, results) => {
                if (err) logger.log('error', err);
                results.body.should.have.property("name").which.is.equal('Shikha Gputa');
                done();
            })
    });
    it("should return a error: access denied:", (done) => {
        agent
            .set('auth-token', '')
            .put(`/tpos/${id}`)
            .send(body)
            .expect(Constants.success)
            .end((err, results) => {
                results.body.should.have.property("error_info");
                done();
            });
    });
});
describe("DELETE Tpo by Id Testing:", () => {
    it("should return a message about deleted Tpo:", (done) => {
        agent
            .delete(`/tpos/${id}`)
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
            .delete(`/tpos/${id}`)
            .set('auth-token', loggedInToken)
            .expect(Constants.success)
            .end((err, results) => {
                results.body.should.have.property("error_info");
                done();
            });
    });
});