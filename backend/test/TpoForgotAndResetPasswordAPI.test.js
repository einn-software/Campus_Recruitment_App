"use strict";
require("should");
const app = require("../index");
const request = require("supertest");
const agent = request.agent(app);
const Tpos = require("../model/Tpo");
const Constants = require("../config/constant");

before((done) => {
    const tpo = {
        name: "Suchitra",
        email: "suchitra@gmail.com",
        password: "ssssss44",
        phone: "7878787878",
        designation: "CCC",
        code: 2345,
        college: "nTC",
    };
    agent
        .post("/register/tpos")
        .send(tpo)
        .expect(Constants.success)
        .end((err, result) => {
            done();
        });
})

describe("Create Tests for tpo forgot password", () => {
    it("It should return message for tpo's forgot password", (done) => {
        agent
            .post("/forgot-password/tpos")
            .send({
                email: "suchitra@gmail.com"
            })
            .expect(Constants.success)
            .end((err, results) => {
                results.body.should.have.property("Message");
                done();
            });
    });
});

describe("Create Tests for tpo reset password", () => {
    it("It should return message for tpo's reset password", (done) => {
        agent
            .post("/reset-password/tpos")
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
    Tpos.findOneAndRemove({
        email: "suchitra@gmail.com"
    }).exec();
    done();
})