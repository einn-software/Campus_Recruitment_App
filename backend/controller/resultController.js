/*//import models
const Result = require("../model/Result");

// import validations
const { resultValidation } = require("../config/validation");
const verify = require("../config/verifyToken");

//Result
const ResultCont =
  (verify,
  async (req, res) => {
    // LETS VALIDATE THE DATA BEFORE WE ADD A RESULT
    const { error } = resultValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Checking if the studentid is already in the database
    const studentExist = await Result.findOne({
      student_id: req.body.student_id,
    });
    if (studentExist)
      return res.status(400).send("Student has already given the test");

    // Create Result
    const result = new Result({
      student_id: req.body.student_id,
      roll: req.body.roll,
      name: req.body.name,
      code: req.body.code,
      question_paper_id: req.body.question_paper_id,
      question_attempt: req.body.question_attempt,
      correct_attempt: req.body.correct_attempt,
      total_marks_scored: req.body.total_marks_scored,
    });
    try {
      const result = await result.save();
      res.json(Result);
    } catch (err) {
      res.status(400).json(err);
    }
  });

//Get Result

const ResultContGet =
  (verify,
  async (req, res) => {
    Result.findOne(
      {
        code: req.params.code,
        question_paper_id: req.params.question - paper - id,
      },
      (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        if (!results) {
          return res.json({
            message: "Record not Found",
          });
        }
        return res.json({
          results,
        });
      }
    );
  });
module.exports = { ResultCont, ResultContGet };
*/