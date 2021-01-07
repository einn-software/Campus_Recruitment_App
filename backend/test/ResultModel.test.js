const mongoose = require("mongoose");
const Results = require("../model/Result");
const assert = require("assert");
mongoose.Promise = global.Promise;

before((done) => {
  mongoose.connect("mongodb://localhost/TestingModel", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  mongoose.connection
    .once("open", () => {
      done();
    })
    .on("error", (error) => {
      console.log("your error", error);
    });
});

beforeEach((done) => {
  mongoose.connection.collections.results.drop(() => {
    done();
  });
});

//create tests

describe("Create Tests", () => {
  it("Create Result", () => {
    const student = new Results({
      roll: "1233",
      name:"shikha",
      code:12222,
      question_paper_id: "22223",
      question_attempt: 5,
      correct_attempt: 6,
      total_marks_scored: 30,
    });
    student
      .save()
      .then(() => {
        assert(!student.isNew);
      })
      .catch((error) => {
        console.log("error", error);
      });
  });
});

//All read Tests

describe("Read Results", () => {
  let Register;

  beforeEach((done) => {
    Register = new Results({
        roll: "1233",
        name:"shikha",
        code:12222,
        question_paper_id: "22223",
        question_attempt: 5,
        correct_attempt: 6,
        total_marks_scored: 30,
    });
    Register.save().then(() => {
      done();
    });
  });
  it("Read", (done) => {
    Results.find({ roll:"1233"  }).then((results) => {
      assert(Register._id.toString() === results[0]._id.toString());
      done();
    });
  });
});

//All delete tests

describe("Delete Results", () => {
  let deleteRes;

  beforeEach((done) => {
    deleteRes = Results({
        roll: "1233",
        name:"shikha",
        code:12222,
        question_paper_id: "22223",
        question_attempt: 5,
        correct_attempt: 6,
        total_marks_scored: 30,
    });
    deleteRes.save().then(() => done());
  });
  it("Delete result ", (done) => {
    Results.findByIdAndDelete(deleteRes._id)
      .then(() => Results.findOne({ roll: "1233" }))
      .then((Result) => {
        assert(Result == null);
        done();
      });
  });
});

//all update tests

describe("Update Tests", () => {
  let updater;
  beforeEach((done) => {
    updater = new Results({
        roll: "1233",
        name:"shikha",
        code:12222,
        question_paper_id: "22223",
        question_attempt: 5,
        correct_attempt: 6,
        total_marks_scored: 30,
    });
    updater.save().then(() => done());
  });

  it("set and save", () => {
    updater.set({
        roll: "1234",
        name:"shikha",
        code:12222,
        question_paper_id: "22223",
        question_attempt: 5,
        correct_attempt: 6,
        total_marks_scored: 30,
    });
    updater
      .save()
      .then(() => Results.find({}))
      .then((Results) => {
        assert(Results[0].roll !== "1233");
      });
  });
});
