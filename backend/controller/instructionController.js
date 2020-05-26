//import models
const Instruction = require("../model/Instruction");

// import validations
const { instructionValidation } = require("../config/validation");
const verify = require("../config/verifyToken");

//instructions
const InstructionCont =
  (verify, async (req, res) => {
    //LETS VALIDATE THE DATA BEFORE WE ADD A INSTRUCTION
    const {
      error
    } = instructionValidation(req.body);
    if (error) return res.status(`${failure}`).json(errorHandler(error));
  
    // Create a new instruction
    const instructions = new Instructions({
      code: req.body.code,
      message: req.body.message,
      year: req.body.year,
      month: req.body.month,
      day: req.body.day,
    });
    try {
      const instructions = await instructions.save();
      res.status(`${success}`).json(instructions);
    } catch (err) {
      res.status(`${failure}`).send(errorHandler(err));
    }
  });
  
//Get instruction

const InstructionContGet =
  (verify,
  async (req, res) => {
    Instruction.findOne(
      {
        _id: req.params.id,
      },
      (err, response) => {
        if (err) {
          console.log(err);
          return;
        }
        if (!response) {
          return res.json({
            message: "Record not Found",
          });
        }
        return res.json(response);
      }
    );
  });

//Put instruction

const InstructionContPut =
  (verify,
  function (req, res, next) {
    Instruction.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      req.body
    )
      .then((data) => {
        if (admin === null) {
          return done(null, false, {
            message: "Something went wrong , Please try again",
          });
        } else {
          res.status(200).json(data);
        }
      })
      .catch(() => {
        res.status(400).json({
          message: "Data not found",
        });
      });
  });

//Delete Instruction

const InstructionContDelete =
  (verify,
  function (req, res) {
    Instruction.findOneAndRemove({
      _id: req.params.id,
    })
      .then((admin) => {
        if (admin === null) {
          return done(null, false, {
            message: "Something went wrong , Please try again",
          });
        } else {
          res.status(200).json({
            message: "Instruction deleted successfully",
          });
        }
      })
      .catch(() => {
        res.status(400).json({
          message: "Data not found",
        });
      });
  });

module.exports = {
  InstructionCont,
  InstructionContGet,
  InstructionContPut,
  InstructionContDelete,
};
