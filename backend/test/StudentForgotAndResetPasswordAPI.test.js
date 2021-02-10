"use strict";
require("should");
const app = require("../index");
const request = require("supertest");
const agent = request.agent(app);
const Students = require("../model/Student");
const Constants = require("../config/constant");

before((done) => {
    const students = {
        name: "Shikha",
        email: "gshikha@gmail.com",
        password: "ssssss44",
        phone: "87878787845",
        roll: "201002",
        branch: "Computer Science",
        college: "nTC",
        code: 2345
    };
    agent
        .post("/register/students")
        .send(students)
        .expect(Constants.success)
        .end((err, result) => {
            done();
        });
})

describe("Create Tests for student forgot password", () => {
    it("It should return message for student's forgot password", (done) => {
        agent
            .post("/forgot-password/students")
            .send({
                email: "gshikha@gmail.com"
            })
            .expect(Constants.success)
            .end((err, results) => {
                results.body.should.have.property("Message");
                done();
            });
    });
});

describe("Create Tests for student reset password", () => {
    it("It should return message for student's reset password", (done) => {
        agent
            .post("/reset-password/students")
            .send({
                newPassword: "RiyaTesting"
            })
            .expect(Constants.success)
            .end((err, results) => {
                results.body.should.have.property("Message");
                done();
            });
    });
});
after((done) => {
    Students.findOneAndRemove({
        email: "gshikha@gmail.com"
    }).exec();
    done();
})