const Tpos = require("../model/Tpo");
const assert = require("assert");
const logger = require("../config/logger");
var id = '';
describe("TPO Create Tests", () => {
    it("Create", (done) => {
        const Registration = new Tpos({
            name: "Shikha",
            email: "gshikha@gmail.com",
            password: "ssssss44",
            phone: "7878787878",
            designation: "CCC",
            code: 2345,
            college: "nTC",
        });
        Registration.save()
            .then((res) => {
                id = res._id;
                assert(!Registration.isNew); //if instruct is saved to db then it is not new
                done();
            })
            .catch((error) => {
                logger.log("error", error);
            });
    });
});
// Read Tests
describe("TPO Read Tests", () => {
    it("Read", (done) => {
        Tpos.find({
            name: "Shikha"
        }).then((reg) => {
            assert(id.toString() === reg[0]._id.toString());
            done();
        });
    });
});
// update all tests
describe("TPO Update Tests", () => {
    it("update", () => {
        updater = ({
            name: "Riya"
        });
        Tpos.findByIdAndUpdate({
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
describe("TPO Delete Tests", () => {
    it("Delete", (done) => {
        Tpos.findByIdAndRemove({
            _id: id
        }, (data) => {
            assert(data == null);
            done();
        });
    });
});