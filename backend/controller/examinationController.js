//import models
const QuestionCollections = require("../model/QuestionCollections");
const QuestionPaper = require("../model/QuestionPaper");

// import validations
const {
  questionCollectionsValidation,
  questionPaperValidation,
} = require("../config/validation");

//Question Collection
const QuestionCollectionCont =
  (verify,
  async (req, res) => {
    //LETS VALIDATE THE DATA BEFORE WE ADD A COLLECTION
    const { error } = questionCollectionsValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    // Create a new questionCollection
    const questionCollection = new QuestionCollections({
      question: req.body.question,
      topic: req.body.topic,
      options: req.body.options,
      answer: req.body.answer,
      weight: req.body.weight,
    });
    try {
      const Collection = await questionCollection.save();
      res.send(Collection, {
        message: "Question added successfully into the database",
      });
    } catch (err) {
      res.status(400).send(err);
    }
  });

//Get QuestionCollection

const QuestionCollectionContGet =
  (verify,
  async (req, res) => {
    QuestionCollections.findOne(
      {
        _id: req.params.id,
      },
      (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        if (!results) {
          return res.json({
            success: 0,
            message: "Record not Found",
          });
        }
        return res.json({
          success: 1,
          data: results,
        });
      }
    );
  });

//Put QuestionCollection

const QuestionCollectionContPut =
  (verify,
  function (req, res, next) {
    QuestionCollections.findByIdAndUpdate(
      {
        _id: req.params.id,
      },
      req.body
    )
      .then(function () {
        QuestionCollections.findOne({
          _id: req.params.id,
        }).then(function (QuestionCollection) {
          res.send(QuestionCollection);
        });
      })
      .catch(err, () => {
        res.status(400).send("Please provide a valid id");
      });
  });

//Delete QuestionCollection

const QuestionCollectionContDelete =
  (verify,
  function (req, res, next) {
    questionCollections
      .findByIdAndRemove({
        _id: req.params.id,
      })
      .then(function () {
        res.send("Your account has been succesfully deleted").status(200);
      })
      .catch(() => {
        res.status(400).send("Please provide a valid id");
      });
  });

//Post Question Paper

const QuestionPaperCont =
  (verify,
  async (req, res) => {
    //LETS VALIDATE THE DATA BEFORE WE ADD A PAPER
    const { error } = questionPaperValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Checking if the studentid is already in the database
    const collegeExist = await QuestionPaper.findOne({
      college_id: req.body.college_id,
    });
    if (collegeExist)
      return res
        .status(400)
        .send("This college has already submitted the test");

    // Create a new questionPaper
    const questionPapers = new QuestionPaper({
      date: req.body.date,
      max_marks: req.body.max_marks,
      max_time: req.body.max_time,
      college_code: req.body.college_code,
      sections: req.body.sections,
    });
    try {
      const savedPapers = await questionPapers.save();
      res.send(savedPapers);
    } catch (err) {
      res.status(400).send(err);
    }
  });
//Get QuestionPaper

const QuestionPaperContGet =
  (verify,
  async (req, res) => {
    QuestionPaper.findOne(
      {
        college_code: req.params.college_code,
      },
      (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        if (!results) {
          return res.json({
            success: 0,
            message: "Record not Found",
          });
        }
        return res.json({
          success: 1,
          data: results,
        });
      }
    );
  });

//Put QuestionPaper

const QuestionPaperContPut =
  (verify,
  function (req, res, next) {
    QuestionPaper.findOneAndUpdate(
      {
        college_code: req.params.college_code,
      },
      req.body
    )
      .then((Paper) => {
        if (Paper === null) {
          return done(null, false, {
            message: "Something went wrong , Please try again",
          });
        } else {
          res.status(200).send(Paper);
        }
      })
      .catch(() => {
        res.status(400).send("Data not found");
      });
  });

//Delete QuestionPaper

const QuestionPaperContDelete =
  (verify,
  function (req, res, next) {
    QuestionPaper.findOneAndRemove({
      college_code: req.params.college_code,
    })
      .then((Paper) => {
        if (Paper === null) {
          return done(null, false, {
            message: "Something went wrong , Please try again",
          });
        } else {
          res.status(200).send("Successfully Deleted");
        }
      })
      .catch(() => {
        res.status(400).send("Data not found");
      });
  });

module.exports = {
  QuestionCollectionCont,
  QuestionCollectionContGet,
  QuestionCollectionContPut,
  QuestionCollectionContDelete,
  QuestionPaperCont,
  QuestionPaperContGet,
  QuestionPaperContPut,
  QuestionPaperContDelete,
};
