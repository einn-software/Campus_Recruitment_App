"use strict";
const QuestionCollections = require("../model/QuestionCollections");
const assert = require("assert");
const logger = require("../config/logger");

var id = '';

describe("Test Cases for Question Collection", () => {
    it("Questions Create Test", (done) => {
        const ques = new QuestionCollections({
            question: "what is the capital of india?",
            topic: "G.K",
            options: [{
                    index: 1,
                    option: "Mumbai"
                },
                {
                    index: 2,
                    option: "Kerala"
                },
                {
                    index: 3,
                    option: "Delhi"
                },
                {
                    index: 4,
                    option: "Lucknow"
                },
            ],
            answer: 3,
            weight: 6
        });
        ques.save()
            .then((res) => {
                id = res._id;
                assert(!ques.isNew); //if instruct is saved to db then it is not new
                done();
            })
            .catch((error) => {
                logger.log("error", error);
            });
    });
});

//All read Tests
describe("Questions Read Test", () => {
    it("Read questions", (done) => {
        QuestionCollections.findOne({
            _id: id
        }).then((questionCollections) => {
            assert(id.toString() === questionCollections._id.toString());
            done();
        });
    });
});

// All update test
describe("Questions Update Tests", () => {
    it("update and save", () => {
        let updateBody = {
            question: "what is the capital of Japan?",
            topic: "G.K",
            options: [{
                    index: 1,
                    option: "Tokyo"
                },
                {
                    index: 1,
                    option: "Kerala"
                },
                {
                    index: 1,
                    option: "Delhi"
                },
                {
                    index: 1,
                    option: "Lucknow"
                },
            ],
            answer: 1,
            weight: 6
        };
        QuestionCollections.findByIdAndUpdate({
                _id: id
            }, updateBody, {
                new: true
            })
            .then((questionCollections) => {
                assert(
                    questionCollections.question !== "what is the capital of India?"
                );
            });
    });
});

//All delete tests
describe("Questions Delete Test", () => {
    it("Delete questions", (done) => {
        QuestionCollections
            .findByIdAndRemove({
                _id: id
            }, (collection) => {
                assert(collection == null);
                done();
            });
    });
});