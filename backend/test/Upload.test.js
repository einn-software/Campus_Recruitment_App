"use strict";
require("should");
const app = require("../index");
const request = require("supertest");
const agent = request.agent(app);
const logger = require("../config/logger");
const Admins = require("../model/Admin");
const fs = require("fs");
const Constants = require("../config/constant");

var token = "";
var admin_id = "";

before((done) => {
    const admin = {
        name: "Riya Singhal",
        email: "riyasin@gmail.com",
        password: "YeahcoolItIs",
        phone: "7586958412",
    };
    agent
        .post("/register/admins")
        .send(admin)
        .expect(Constants.success)
        .end((err, results) => {
            if (err) logger.log("error", err);
            admin_id = results.body._id;
            done();
        });
});
before((done) => {
    const adminLogin = {
        email: "riyasin@gmail.com",
        password: "YeahcoolItIs",
    };
    agent
        .post("/login/admins")
        .send(adminLogin)
        .expect(Constants.success)
        .end((err, results) => {
            if (err) logger.log("error", err);
            token = results.body.token;
            done();
        });
});

describe("Create Tests", () => {
    it("It should return message", (done) => {
        agent
            .post("/upload")
            .set('Accept', 'application.json')
            .field("auth-token", token)
            .field('email', 'riyasin@gmail.com')
            .attach("file", fs.readFileSync("./test/testfile.xlsx"), "testfile.xlsx")
            .expect(Constants.success)
            .end((err, results) => {
                results.body.should.have.property("message");
                done();
            });
    });
    it("It should return error- provide valid email", (done) => {
        agent
            .post("/upload")
            .set('Accept', 'application.json')
            .field("auth-token", token)
            .field('email', '')
            .attach("file", fs.readFileSync("./test/testfile.xlsx"), "testfile.xlsx")
            .expect(Constants.success)
            .end((err, results) => {
                results.body.should.have.property("error_info");
                done();
            });
    });
});

describe("Create Tests", () => {
    it("It should return message", (done) => {
        agent
            .post("/upload/android-logs")
            .set('Accept', 'application.json')
            .field('email', 'riyasin@gmail.com')
            .attach("file", fs.readFileSync("./test/txttestfile.txt"), "txttestfile.txt")
            .expect(Constants.success)
            .end((err, results) => {
                results.body.should.have.property("message");
                done();
            });
    });
    it("It should return error- provide valid file", (done) => {
        agent
            .post("/upload")
            .set('Accept', 'application.json')
            .field("auth-token", token)
            .field('email', '')
            .attach("file", fs.readFileSync("./test/testfile.xlsx"), "testfile.xlsx")
            .expect(Constants.success)
            .end((err, results) => {
                results.body.should.have.property("error_info");
                done();
            });
    });
});

after((done) => {
    Admins.findByIdAndRemove({
        _id: admin_id,
    }).exec();
    done();
});