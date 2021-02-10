"use strict";
const Instructions = require("../model/Instruction");
const assert = require("assert");
const logger = require("../config/logger");
var id = '';

describe("Create Tests for Instruction model", () => {
    it("Create a instruction in db", (done) => {
        const instruct = new Instructions({
            code: 2345,
            year: 2020,
            month: 11,
            day: 23,
            message: "This is a test message",
        });
        instruct
            .save()
            .then((res) => {
                id = res._id;
                assert(!instruct.isNew); //if instruct is saved to db then it is not new
                done();
            })
            .catch((error) => {
                logger.log("error", error);
            });
    });
});

// Read Tests
describe("Instructions Read Tests", () => {
    it("Read", () => {
        Instructions.findOne({
            code: 2345
        }).then((reg) => {
            assert(id.toString() === reg._id.toString());
        });
    });
});

// update all tests
describe("Instructions Update Tests", () => {
    it("update", () => {
        let updater = ({
            code: 2346
        });
        Instructions.findByIdAndUpdate({
                _id: id
            }, updater, {
                new: true
            })
            .then((data) => {
                assert(data.code !== "2345");
            });
    });
});

//All delete tests
describe("Instructions Delete Tests", () => {
    it("Delete", (done) => {
        Instructions.findByIdAndRemove({
            _id: id
        }, (data) => {
            assert(data == null);
            done();
        });
    });
});