const mongoose = require("mongoose");
const QuestionPapers = require("../model/QuestionPaper");
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
  mongoose.connection.collections.questionpapers.drop(() => {
    done();
  });
});

//create tests

describe("Create Tests", () => {
  it("Create questionPaper", () => {
    const paper = new QuestionPapers({
      year: 2020,
      month: 12,
      day: 20,
      paper_name: "DATA STRUCTURE",
      max_marks: 50,
      max_time: " three hours",
      code: 23456,
      start_time: "2020-12-20 08:00:00",
      section: [
        {
          marks: 10,
          numofQuestion: 5,
          question_List: [
            {
              question_id: "2349",
              marks: 234,
            },
          ],
        },
      ],
    });
    paper
      .save()
      .then(() => {
        assert(!paper.isNew);
      })
      .catch((error) => {
        console.log("error", error);
      });
  });
});

//All read Tests

describe("Read Tests", () => {
  let QuestionP;

  beforeEach((done) => {
    QuestionP = new QuestionPapers({
        year: 2020,
        month: 12,
        day: 20,
        paper_name: "DATA STRUCTURE",
        max_marks: 50,
        max_time: " three hours",
        code: 23456,
        start_time: "2020-12-20 08:00:00",
        section: [
          {
            marks: 10,
            numofQuestion: 5,
            question_List: [
              {
                question_id: "2349",
                marks: 234,
              },
            ],
          },
        ],
      });
    QuestionP.save().then(() => done());
  });
  it("Read", (done) => {
    QuestionPapers.findOne({paper_name: "DATA STRUCTURE" }).then((questionPaper) => {
      assert(QuestionP.paper_name === "DATA STRUCTURE");
      done();
    });
  });
});

//All delete tests

describe("Delete Tests", () => {
  let deleter;

  beforeEach((done) => {
    deleter = new QuestionPapers({
        year: 2020,
        month: 12,
        day: 20,
        paper_name: "DATA STRUCTURE",
        max_marks: 50,
        max_time: " three hours",
        code: 23456,
        start_time: "2020-12-20 08:00:00",
        section: [
          {
            marks: 10,
            numofQuestion: 5,
            question_List: [
              {
                question_id: "2349",
                marks: 234,
              },
            ],
          },
        ],
      });
    deleter.save().then(() => done());
  });
  it("Delete", (done) => {
    QuestionPapers
      .findByIdAndDelete(deleter._id)
      .then(() => QuestionPapers.findOne({ name: "Shikha" }))
      .then((questionPapers) => {
        assert(questionPapers == null);
        done();
      });
  });
});

//update all tests
describe("Update Tests", () => {
  let updater;
  beforeEach((done) => {
    updater = new QuestionPapers({
        year: 2020,
        month: 12,
        day: 20,
        paper_name: "DATA STRUCTURE",
        max_marks: 50,
        max_time: " three hours",
        code: 23456,
        start_time: "2020-12-20 08:00:00",
        section: [
          {
            marks: 10,
            numofQuestion: 5,
            question_List: [
              {
                question_id: "2349",
                marks: 234,
              },
            ],
          },
        ],
      });
    updater.save().then(() => done());
  });
  it("set and save", () => {
    updater.set({
        year: 2020,
        month: 12,
        day: 20,
        paper_name: "DATA Analysis",
        max_marks: 50,
        max_time: " three hours",
        code: 23457,
        start_time: "2020-12-20 08:00:00",
        section: [
          {
            marks: 10,
            numofQuestion: 5,
            question_List: [
              {
                question_id: "2349",
                marks: 234,
              },
            ],
          },
        ],
      });
    updater
      .save()
      .then(() => QuestionPapers.find({}))
      .then((questionPapers) => {
        assert(questionPapers[0].code !== 23456);
      });
  });
});
