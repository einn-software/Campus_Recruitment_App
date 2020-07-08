"use strict";
require("should");
const request = require("supertest");
const app = require("../index");
const agent = request.agent(app);
const logger = require("../config/logger");
var loggedInToken = '';
var id = '';
var code = 0;
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
        .expect(200)
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
        .expect(200)
        .end((err, results) => {
            if (err) logger.log('error', err);
            loggedInToken = results.body.token;
            done();
        })
})

describe("Add college Testing:", () => {
    const college = {
        "name": "Nitra Technical Campus",
        "email": "nitra802@ntc.ac.in",
        "phone": "8090778901",
        "university": "APJ Abdul Kalam University",
        "address": "Sanjay Nagar, Ghaziabad"
    };
    it("should return access denied:", (done) => {
        agent
            .post("/colleges")
            .set('auth-token', '')
            .send(college)
            .expect(400)
            .end((err, results) => {
                results.body.should.have.property("error_info");
                done();
            });
    });
    it("should return a registered college:", (done) => {
        agent
            .post("/colleges")
            .set('auth-token', loggedInToken)
            .send(college)
            .expect(200)
            .end((err, results) => {
                id = results.body._id;
                code = results.body.code;
                results.body.should.have.property("_id");
                done();
            });
    });
});

describe("GET college Testing:", () => {
    it("should return a list of colleges:", (done) => {
        agent
            .get("/colleges")
            .expect(200)
            .end((err, results) => {
                if (err) logger.log('error', err);
                results.body.should.be.an.Array();
                done();
            })
    });
    it("should return a error: Path not defined:", (done) => {
        agent
            .get("/collees")
            .expect(404)
            .end((err, results) => {
                results.body.should.have.property("error_info");
                done();
            });
    });
});

describe("GET college by code Testing:", () => {
    it("should return a college:", (done) => {
        agent
            .get(`/colleges/${code}`)
            .set('auth-token', loggedInToken)
            .expect(200)
            .end((err, results) => {
                if (err) logger.log('error', err);
                results.body.should.have.property("name");
                done();
            })
    });
    it("should return a error: Id not found:", (done) => {
        agent
            .get(`/colleges/58465464613545`)
            .set('auth-token', loggedInToken)
            .expect(200)
            .end((err, results) => {
                results.body.should.have.property("error_info");
                done();
            });
    });
});

describe("Change(PUT) college's data by Id Testing:", () => {
    const body = {
        name: "RKGIT"
    }
    it("should return a college after changing it's data:", (done) => {
        agent
            .set('auth-token', loggedInToken)
            .put(`/colleges/${code}`)
            .send(body)
            .expect(200)
            .end((err, results) => {
                if (err) logger.log('error', err);
                results.body.should.have.property("name").which.is.equal('RKGIT');
                done();
            })
    });
    it("should return a error: authentication error:", (done) => {
        agent
            .set('auth-token', '')
            .put(`/colleges/${code}`)
            .send(body)
            .expect(200)
            .end((err, results) => {
                results.body.should.have.property("error_info");
                done();
            });
    });
});
describe("DELETE college by Id Testing:", () => {
    it("should return a message about deleted college:", (done) => {
        agent
            .delete(`/colleges/${id}`)
            .set('auth-token', loggedInToken)
            .expect(200)
            .end((err, results) => {
                if (err) logger.log('error', err);
                results.body.should.have.property("message");
                done();
            })
    });
    it("should return a error: no user found in databse:", (done) => {
        agent
            .delete(`/colleges/${id}`)
            .set('auth-token', loggedInToken)
            .expect(200)
            .end((err, results) => {
                results.body.should.have.property("error_info");
                done();
            });
    });
});

after((done) => {
    agent
        .delete(`/admins/${admin_id}`)
        .set('auth-token', loggedInToken)
        .expect(200)
        .end((err, results) => {
            if (err) logger.log('error', err);
            done();
        })
})