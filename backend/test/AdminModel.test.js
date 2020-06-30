const Admins = require("../model/Admin");
const assert = require("assert");

var id = '';

describe("Create Tests for Admin Model", () => {
    it("Create Admin", (done) => {
        const Registration = new Admins({
            name: "Shikha",
            email: "gshikha@gmail.com",
            password: "ssssss44",
            phone: "7878787878",
        });
        Registration.save()
            .then((result) => {
                id = result._id;
                assert(!Registration.isNew); //if instruct is saved to db then it is not new
                done();
            })
            .catch((error) => {
                console.log("error", error);
            });
    });
});

// Admin Read Tests
describe("Admin Read Tests", () => {
    it("Read", (done) => {
        Admins.find({
            name: "Shikha"
        }).then((reg) => {
            assert(id.toString() === reg[0]._id.toString());
            done();
        });
    });
});

// update all tests
describe("Admin Update Tests", () => {

    it("update", () => {
        updater = ({
            name: "Riya"
        });
        Admins.findByIdAndUpdate({
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
describe("Admin Delete Tests", () => {
    it("Delete", (done) => {
        Admins.findByIdAndRemove({
            _id: id
        }, (Admin) => {
            assert(Admin == null);
            done();
        });
    });
});