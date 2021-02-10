"use strict";
require("should");
const app = require("../index");
const request = require("supertest");
const agent = request.agent(app);
const logger = require("../config/logger");
const Admins = require("../model/Admin");
const Constants = require("../config/constant");

var token = "";
var id = "";
var admin_id = "";

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
            if (err) logger.log(err);
            token = results.body.token;
            done();
        });
});

describe("Create Tests", () => {
    it("It should return instructions", (done) => {
        agent
            .post("/instructions")
            .set("auth-token", token)
            .send({
                code: 2349,
                year: 2020,
                month: 11,
                day: 23,
                message: "This is a test message",
            })
            .expect(Constants.success)
            .end((err, results) => {
                id = results.body._id;
                results.body.should.have.property("_id");
                done();
            });
    });
});

// To get all instructions
describe("The GET method", async () => {
    it("should return a list of instructions:", (done) => {
        agent
            .get("/instructions")
            .set("auth-token", token)
            .expect(Constants.success)
            .end((err, results) => {
                if (err) logger.log("error", err);
                results.body.should.be.an.Array();
                done();
            });
    });
    it("should return a error: Path not defined:", (done) => {
        agent
            .get("/instructos")
            .set("auth-token", token)
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
            .get(`/instructions/${id}`)
            .set("auth-token", token)
            .expect(Constants.success)
            .end((err, results) => {
                if (err) logger.log("error", err);
                results.body.should.have.property("code");
                done();
            });
    });
    it("should return a error: Id not found:", (done) => {
        agent
            .get(`/instructions/58465464613545`)
            .set("auth-token", token)
            .expect(Constants.er_not_found)
            .end((err, results) => {
                results.body.should.have.property("error_info");
                done();
            });
    });
});

describe("Change(PUT) instruction's data by Id Testing:", () => {
    const body = {
        code: 2346,
    };
    it("should return a instruction after changing it's data:", (done) => {
        agent
            .set("auth-token", token)
            .put(`/instructions/${id}`)
            .send(body)
            .expect(Constants.success)
            .end((err, results) => {
                if (err) logger.log("error", err);
                results.body.should.have.property("code").which.is.equal(2346);
                done();
            });
    });
    it("should return a error: authentication error:", (done) => {
        agent
            .set("auth-token", "")
            .put(`/instructions/${id}`)
            .send(body)
            .expect(Constants.success)
            .end((err, results) => {
                results.body.should.have.property("error_info");
                done();
            });
    });
});
describe("DELETE instruction by Id Testing:", () => {
    it("should return a message about deleted instruction:", (done) => {
        agent
            .delete(`/instructions/${id}`)
            .set("auth-token", token)
            .expect(Constants.success)
            .end((err, results) => {
                if (err) logger.log("error", err);
                results.body.should.have.property("message");
                done();
            });
    });
    it("should return a error: no user found in databse:", (done) => {
        agent
            .delete(`/instructions/${id}`)
            .set("auth-token", token)
            .expect(Constants.success)
            .end((err, results) => {
                results.body.should.have.property("error_info");
                done();
            });
    });
});

describe("DELETE all instruction by Id Testing:", () => {
    it("should return a error: no user found in databse:", (done) => {
        agent
            .delete(`/instructions`)
            .set("auth-token", token)
            .expect(Constants.success)
            .end((err, results) => {
                results.body.should.have.property("error_info");
                done();
            });
    });
});

after((done) => {
    Admins.findOneAndRemove({
        _id: admin_id,
    }).exec();
    done();
});