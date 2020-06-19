const mongoose = require("mongoose");
const Colleges = require("../model/College");
const assert = require("assert");
mongoose.Promise = global.Promise;

before((done) => {
    mongoose.connect("mongodb://localhost/TestingModel", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    mongoose.connection
        .once("open", () => {
            // console.log("connected"))
            done();
        })
        .on("error", (error) => {
            console.log("your error", error);
        });
});

beforeEach((done) => {
    mongoose.connection.collections.colleges.drop(() => {
        done();
    });
});

describe("Create Tests for College Model", () => {
    it("Create College", (done) => {
        // assert(true);

        const Registration = new Colleges({
            name: "NTc",
            email: "gshikha@gmail.com",
            university: "Apj Abdul Kalam",
            phone: "7878787878",
            code: 2010,
            address: "avantika",
        });
        Registration.save()
            .then(() => {
                assert(!Registration.isNew); //if instruct is saved to db then it is not new
                done();
            })
            .catch((error) => {
                console.log("error", error);
            });
    });
});

//All read Tests

describe("Read Tests", () => {
    let Register;

    beforeEach((done) => {
        Register = new Colleges({
            name: "NTC",
            email: "gshikha@gmail.com",
            university: "Apj Abdul Kalam",
            phone: "7878787878",
            code: 2010,
            address: "avantika",
        });
        Register.save().then(() => {
            done();
        });
    });
    it("Read", (done) => {
        Colleges.find({
            name: "NTC"
        }).then((reg) => {
            assert(Register._id.toString() === reg[0]._id.toString());
            done();
        });
    });
});

//update all tests

describe("Update Tests", () => {
    let updater;
    beforeEach((done) => {
        updater = new Colleges({
            name: "NTC",
            email: "gshikha@gmail.com",
            university: "Apj Abdul Kalam",
            phone: "7878787878",
            code: 2010,
            address: "avantika",
        });
        updater.save().then(() => done());
    });

    it("set and save", () => {
        updater.set({
            name: "KITE",
            email: "ria@gmail.com",
            university: "Apj Abdul Kalam",
            phone: "7848787878",
            code: 2010,
            address: "gzb",
        });
        updater
            .save()
            .then(() => Colleges.find({}))
            .then((College) => {
                assert(College[0].name !== "Shikha");
            });
    });
});

//All delete tests

describe("Delete Tests", () => {
    let deleter;

    beforeEach((done) => {
        deleter = new Colleges({
            name: "NTC",
            email: "gshikha@gmail.com",
            university: "Apj Abdul Kalam",
            phone: "7878787878",
            code: 2010,
            address: "avantika",
        });
        deleter.save().then(() => done());
    });
    it("Delete", (done) => {
        Colleges.findByIdAndDelete(deleter._id)
            .then(() => Colleges.findOne({
                name: "NTC"
            }))
            .then((College) => {
                assert(College == null);
                done();
            });
    });
});