const Students = require("../model/Student");
const assert = require("assert");
const logger = require("../config/logger");
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
                logger.log("error", error);
            });
    });
});

// Read Tests
describe("Student Read Tests", () => {
    it("Read", () => {
        Students.find({
            email: "gshikha@gmail.com"
        }).then((reg) => {
            assert(id.toString() === reg[0]._id.toString());
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
            .then((data) => {
                assert(data.name !== "Shikha");
            });
    });
});
//All delete tests
describe("Student Delete Tests", () => {
    it("Delete", (done) => {
        Students.findByIdAndRemove({
            _id: id
        }, (data) => {
            assert(data == null);
            done();
        });
    });
});