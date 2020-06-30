const Students = require("../model/Student");
const assert = require("assert");

var id = '';

describe("Students Create Tests", () => {
    it("Create", (done) => {
        const Registration = new Students({
            name: "Shikha",
            email: "gshikha@gmail.com",
            password: "ssssss44",
            phone: 7878787878,
            roll: 201002,
            branch: "CS",
            college: "nTC",
            code: 2345
        });
        Registration.save()
            .then((res) => {
                id = res._id
                assert(!Registration.isNew); //if instruct is saved to db then it is not new
                done();
            })
            .catch((error) => {
                console.log("error", error);
            });
    });
});

// Read Tests
describe("Student Read Tests", () => {
    it("Read", (done) => {
        Students.find({
            name: "Shikha"
        }).then((reg) => {
            assert(id.toString() === reg[0]._id.toString());
            done();
        });
    });
});

// update all tests
describe("Student Update Tests", () => {
    it("update", () => {
        updater = ({
            name: "Riya"
        });
        Students.findByIdAndUpdate({
                _id: id
            }, updater, {
                new: true
            })
            .then((Admin) => {
                assert(Admin.name !== "Shikha");
            });
    });
});

//All delete tests
describe("Student Delete Tests", () => {
    it("Delete", (done) => {
        Students.findByIdAndRemove({
            _id: id
        }, (Admin) => {
            assert(Admin == null);
            done();
        });
    });
});