const Colleges = require("../model/College");
const assert = require("assert");
var id = '';

describe("Create Tests for College Model", () => {
    it("Create College", (done) => {
        // assert(true);

        const Registration = new Colleges({
            name: "NTC",
            email: "gshikha@gmail.com",
            university: "Apj Abdul Kalam",
            phone: "7878787878",
            code: 2010,
            address: "avantika",
        });
        Registration.save()
            .then((res) => {
                id = res._id;
                assert(!Registration.isNew); //if instruct is saved to db then it is not new
                done();
            })
            .catch((error) => {
                console.log("error", error);
            });
    });
});

// Read Tests
describe("College Read Tests", () => {
    it("Read", (done) => {
        Colleges.find({
            name: "NTC"
        }).then((reg) => {
            assert(id.toString() === reg[0]._id.toString());
            done();
        });
    });
});

// update all tests
describe("College Update Tests", () => {
    it("update", () => {
        updater = ({
            name: "RKGIT"
        });
        Colleges.findByIdAndUpdate({
                _id: id
            }, updater, {
                new: true
            })
            .then((Admin) => {
                assert(Admin.name !== "NTC");
            });
    });
});

//All delete tests
describe("College Delete Tests", () => {
    it("Delete", (done) => {
        Colleges.findByIdAndRemove({
            _id: id
        }, (Admin) => {
            assert(Admin == null);
            done();
        });
    });
});