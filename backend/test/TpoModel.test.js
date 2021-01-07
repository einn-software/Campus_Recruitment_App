const mongoose = require("mongoose");
const Tpos = require("../model/Tpo");
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
  mongoose.connection.collections.tpos.drop(() => {
    done();
  });
});

describe("Create Tests", () => {
  it("Create", (done) => {
    // assert(true);

    const Registration = new Tpos({
      name: "Shikha",
      email: "gshikha@gmail.com",
      password: "ssssss44",
      phone: "7878787878",
      designation: "CCC",
      code: 23456,
      college: "nTC",
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
    Register = new Tpos({
      name: "Shikha",
      email: "gshikha@gmail.com",
      password: "ssssss44",
      phone: "7878787878",
      designation: "CCC",
      code: 23456,
      college: "nTC",
    });
    Register.save().then(() => {
      done();
    });
  });
  it("Read", (done) => {
    Tpos.find({ name: "Shikha" }).then((reg) => {
      assert(Register._id.toString() === reg[0]._id.toString());
      done();
    });
  });
});

// All update test

describe("Update Tests", () => {
  let updater;
  beforeEach((done) => {
    updater = new Tpos({
      name: "Shikha",
      email: "gshikha@gmail.com",
      password: "ssssss44",
      phone: "7878787878",
      designation: "CCC",
      code: 23456,
      college: "nTC",
    });
    updater.save().then(() => done());
  });

  it("set and save", () => {
    updater.set({
      name: "ria",
      email: "ria@gmail.com",
      password: "rrrr44",
      phone: "4878787878",
      designation: "VVV",
      code: 23456,
      college: "KITE",
    });
    updater
      .save()
      .then(() => Tpos.find({}))
      .then((Tpos) => {
        assert(Tpos[0].name !== "Shikha");
      });
  });
});

//All delete tests

describe("Delete Tests", () => {
  let deleter;

  beforeEach((done) => {
    deleter = new Tpos({
      name: "Shikha",
      email: "gshikha@gmail.com",
      password: "ssssss44",
      phone: "7878787878",
      designation: "CCC",
      code: 23456,
      college: "nTC",
    });
    deleter.save().then(() => done());
  });
  it("Delete", (done) => {
    Tpos.findByIdAndDelete(deleter._id)
      .then(() => Tpos.findOne({ name: "Shikha" }))
      .then((Tpo) => {
        assert(Tpo == null);
        done();
      });
  });
});
