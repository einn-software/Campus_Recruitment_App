"use strict";
require("should");
const app = require("../index");
const request = require("supertest");
const agent = request.agent(app);
const Admins = require("../model/Admin");
const Constants = require("../config/constant");

before((done) => {
    const admin = {
        name: "Riya Singhal",
        email: "singhal231@gmail.com",
        password: "YeahcoolItIs",
        phone: "7586958412",
    };
    agent
        .post("/register/admins")
        .send(admin)
        .expect(Constants.success)
        .end((err, result) => {
            done();
        });

})

describe("Create Tests for admin forgot password", () => {
    it("It should return message for admin's forgot password", (done) => {
        agent
            .post("/forgot-password/admins")
            .send({
                email: "singhal231@gmail.com"
            })
            .expect(Constants.success)
            .end((err, results) => {
                results.body.should.have.property("Message");
                done();
            });
    });
});

describe("Create Tests for admin reset password", () => {
    it("It should return message for admin's reset password", (done) => {
        agent
            .post("/reset-password/admins")
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
    Admins.findOneAndRemove({
        email: "singhal231@gmail.com"
    }).exec();
    done();
})