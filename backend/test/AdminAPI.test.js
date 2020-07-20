"use strict";
require("should"); //should is an expressive, readable, framework-agnostic assertion library. require('should')) should extends the Object.prototype with a single non-enumerable getter that allows you to express how that object should behave
const request = require("supertest"); //provide a high-level abstraction for testing HTTP,
const mongoose = require("mongoose");
const app = require("../index");
const agent = request.agent(app);
const logger = require("../config/logger");
const Constants = require("../config/constant");

before((done) => {
    mongoose.connect(process.env.TEST_DB_CONNECT, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    mongoose.connection
        .once('open', () => {
            logger.log('info', "started");
            done();
        })
        .on('error', (error) => {
            logger.log("error", error);
        });
});

var loggedInToken = '';
var id = '';

describe("Admin Registration Testing:", () => {
    it("should return validation error:", (done) => {
        const admin = {
            name: "Riya Singhal",
            email: "riya@gmail.com",
            password: "YeIs",
            phone: "7586958412",
        };
        agent
            .post("/register/admins")
            .send(admin)
            .expect(400)
            .end((err, results) => {
                results.body.should.have.property("error_info");
                done();
            });
    });
    it("should return a registered admin:", (done) => {
        const admin = {
            name: "Riya Singhal",
            email: "riya@gmail.com",
            password: "YeahcoolItIs",
            phone: "7586958412",
        };
        agent
            .post("/register/admins")
            .send(admin)
            .expect(Constants.success)
            .end((err, results) => {
                id = results.body._id;
                results.body.should.have.property("_id");
                done();
            });
    });
});
describe("Admin Login Testing:", () => {
    it("should return a session having field token:", (done) => {
        const admin = {
            email: "riya@gmail.com",
            password: "YeahcoolItIs",
        };
        agent
            .post("/login/admins")
            .send(admin)
            .expect(Constants.success)
            .end((err, results) => {
                if (err) logger.log('error', err);
                loggedInToken = results.body.token;
                results.body.should.have.property("token");
                done();
            });
    });

    it("should return a authentication error - invalid password:", (done) => {
        const admin = {
            email: "riya@gmail.com",
            password: "YeIs",
        };
        agent
            .post("/login/admins")
            .send(admin)
            .expect(Constants.er_authentication_failed)
            .end((err, results) => {
                results.body.should.have.property("error_info");
                done();
            });
    });
});

describe("GET Admin Testing:", () => {
    it("should return a list of admins:", (done) => {
        agent
            .set('auth-token', loggedInToken)
            .get("/admins")
            .expect(Constants.success)
            .end((err, results) => {
                if (err) logger.log('error', err);
                results.body.should.be.an.Array();
                done();
            })
    });
    it("should return a error: token not found:", (done) => {
        agent
            .set('auth-token', '')
            .get("/admins")
            .expect(Constants.er_not_found)
            .end((err, results) => {
                results.body.should.have.property("error_info");
                done();
            });
    });
});

describe("GET Admin by Id Testing:", () => {
    it("should return a admin:", (done) => {
        agent
            .get(`/admins/${id}`)
            .set('auth-token', loggedInToken)
            .expect(Constants.success)
            .end((err, results) => {
                if (err) logger.log('error', err);
                results.body.should.have.property("name");
                done();
            })
    });
    it("should return a error: Id not found:", (done) => {
        agent
            .get(`/admins/58465464613545`)
            .set('auth-token', loggedInToken)
            .expect(Constants.er_not_found)
            .end((err, results) => {
                results.body.should.have.property("error_info");
                done();
            });
    });
});

describe("Change(PUT) Admin's data by Id Testing:", () => {
    const body = {
        name: "Radhika Singhal"
    }
    it("should return a admin after changing it's data:", (done) => {
        agent
            .set('auth-token', loggedInToken)
            .put(`/admins/${id}`)
            .send(body)
            .expect(Constants.success)
            .end((err, results) => {
                if (err) logger.log('error', err);
                results.body.should.have.property("name").which.is.equal('Radhika Singhal');
                done();
            })
    });
    it("should return a error: authentication error:", (done) => {
        agent
            .set('auth-token', '')
            .put(`/admins/${id}`)
            .send(body)
            .expect(Constants.er_authentication_failed)
            .end((err, results) => {
                results.body.should.have.property("error_info");
                done();
            });
    });
});
describe("DELETE Admin by Id Testing:", () => {
    it("should return a message about deleted admin:", (done) => {
        agent
            .delete(`/admins/${id}`)
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
            .delete(`/admins/${id}`)
            .set('auth-token', loggedInToken)
            .expect(Constants.er_not_found)
            .end((err, results) => {
                results.body.should.have.property("error_info");
                done();
            });
    });
});