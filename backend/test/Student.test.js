"use strict";
require("should");
const request = require("supertest");
const app = require("../index");
const agent = request.agent(app);

var loggedInToken = '';
var id = '';
var code = 0;

describe("Student Registration Testing:", () => {
    it("should return a registered student:", (done) => {
        const student = {
            name: "Riya Singhal",
            email: "riya@gmail.com",
            password: "YeahcoolItIs",
            phone: "7586958412",
            roll: "124578",
            branch: "Computer Science",
            college: "Nitra Technical Campus",
            code: 5473,
        };
        agent
            .post("/register/students")
            .send(student)
            .expect(200)
            .end((err, results) => {
                id = results.body._id;
                code = results.body.code;
                results.body.should.have.property("_id");
                done();
            });
    });
    it("should return a validation errror - branch is required:", (done) => {
        const student = {
            name: "Riya Singhal",
            email: "riyasinghal@gmail.com",
            password: "YeahcoolItIs",
            phone: "7586958412",
            roll: "124578",
            college: "Nitra Technical Campus",
            code: 5473,
        };
        agent
            .post("/register/students")
            .send(student)
            .expect(400)
            .end((err, results) => {
                results.body.should.have.property("error_info");
                done();
            });
    });
});
describe("Student Login Testing:", () => {
    it("should return a session having field token:", (done) => {
        const student = {
            code: "5473",
            roll: "124578",
            password: "YeahcoolItIs",
        };
        agent
            .post("/login/students")
            .send(student)
            .expect(200)
            .end((err, results) => {
                loggedInToken = results.body.token;
                results.body.should.have.property("token");
                done();
            });
    });
    it("should return a validation error - password is required:", (done) => {
        const student = {
            code: "5473",
            roll: "124578",
        };
        agent
            .post("/login/students")
            .send(student)
            .expect(400)
            .end((err, results) => {
                results.body.should.have.property("error_info");
                done();
            });
    });
});
describe("GET Student Testing:", () => {
    it("should return a list of Students:", (done) => {
        agent
            .set('auth-token', loggedInToken)
            .get(`/colleges/${code}/students`)
            .expect(200)
            .end((err, results) => {
                if (err) console.log(err);
                results.body.should.be.an.Array();
                done();
            })
    });
    it("should return a error: Path not defined:", (done) => {
        agent
            .set('auth-token', '')
            .get("/studens")
            .expect(200)
            .end((err, results) => {
                results.body.should.have.property("error_info");
                done();
            });
    });
});

describe("GET Student by Id Testing:", () => {
    it("should return a Student:", (done) => {
        agent
            .get(`/students/${id}`)
            .set('auth-token', loggedInToken)
            .expect(200)
            .end((err, results) => {
                if (err) console.log(err);
                results.body.should.have.property("branch");
                done();
            })
    });
    it("should return a error: Id not found:", (done) => {
        agent
            .get(`/students/58465464613545`)
            .set('auth-token', loggedInToken)
            .expect(200)
            .end((err, results) => {
                results.body.should.have.property("error_info");
                done();
            });
    });
});

describe("Change(PUT) student's data by Id Testing:", () => {
    const body = {
        name: "Shikha Gputa"
    }
    it("should return a student after changing it's data:", (done) => {
        agent
            .set('auth-token', loggedInToken)
            .put(`/students/${id}`)
            .send(body)
            .expect(200)
            .end((err, results) => {
                if (err) console.log(err);
                results.body.should.have.property("name").which.is.equal('Shikha Gputa');
                done();
            })
    });
    it("should return a error: access denied:", (done) => {
        agent
            .set('auth-token', '')
            .put(`/students/${id}`)
            .send(body)
            .expect(200)
            .end((err, results) => {
                results.body.should.have.property("error_info");
                done();
            });
    });
});
describe("DELETE student by Id Testing:", () => {
    it("should return a message about deleted student:", (done) => {
        agent
            .delete(`/students/${id}`)
            .set('auth-token', loggedInToken)
            .expect(200)
            .end((err, results) => {
                if (err) console.log(err);
                results.body.should.have.property("message");
                done();
            })
    });
    it("should return a error: no user found in databse:", (done) => {
        agent
            .delete(`/students/${id}`)
            .set('auth-token', loggedInToken)
            .expect(200)
            .end((err, results) => {
                results.body.should.have.property("error_info");
                done();
            });
    });
});