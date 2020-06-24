const Instructions = require('../model/Instruction');
const errHandler = require("./errorHandling");
const Constants = require('../config/constant');
// import validations
const {
  instructionValidation,
  instructionPutValidation
} = require("../config/validation");

//instructions
const InstructionAdd = (async (req, res) => {
  if (req.session.user_type == Constants.admin) {
    //LETS VALIDATE THE DATA BEFORE WE ADD A INSTRUCTION
    const {
      error
    } = instructionValidation(req.body);
    if (error) return res.status(Constants.er_failure).json(errHandler.validationErrorHandler(error));

    //Checking if the instruction is already in the database
    const instructionExist = await Instructions.findOne({
      code: req.body.code,
    });
    if (instructionExist) return res.status(Constants.er_failure).json(errHandler.emailExistErrorHandler());

    // Create a new instruction
    const instructions = new Instructions({
      code: req.body.code,
      message: req.body.message,
      year: req.body.year,
      month: req.body.month,
      day: req.body.day,
    });
    try {
      const instruction = await instructions.save();
      return res.status(Constants.success).json(instruction);
    } catch (err) {
      return res.status(Constants.er_failure).json(errHandler.errorHandler(err));
    }
  } else {
    return res
      .status(Constants.er_authorization_failed)
      .json(errHandler.unauthorizedErrorHandler());
  }
});


//To Get all the instructions data
const InstructionGet = (function (req, res) {
  if (req.session.user_type == Constants.admin) {
    Instructions.find({}, (err, results) => {
      if (err || !results) {
        return res
          .status(Constants.er_failure)
          .json(errHandler.errorHandler(err));
      }
      return res.status(Constants.success).json(results);
    });
  } else {
    return res
      .status(Constants.er_authorization_failed)
      .json(errHandler.unauthorizedErrorHandler());
  }
});

// To get single instruction data using id
const InstructionGetById = (function (req, res) {
  if (req.session.user_type == Constants.admin || Constants.student) {
    Instructions.findOne({
        _id: req.params.id,
      },
      (err, results) => {
        if (err || !results) {
          return res.status(Constants.er_not_found).json(errHandler.idNotFoundErrorHandler());
        }
        return res.status(Constants.success).json(results);
      }
    );
  } else {
    return res
      .status(Constants.er_authorization_failed)
      .json(errHandler.unauthorizedErrorHandler());
  }
});

//To change or update the instruction's data by using their id
const InstructionPut =
  (function (req, res) {

    const body = req.body;
    //VALIDATE THE DATA
    const {
      error
    } = instructionPutValidation(body);
    if (error) {
      return res.status(Constants.er_failure).json(errHandler.validationErrorHandler(error));
    }
    if (req.session.user_type == Constants.admin) {
      Instructions.findOneAndUpdate({
          _id: req.params.id,
        },
        body, async (err, result) => {
          if (err) {
            return res.status(Constants.er_failure).json(errHandler.errorHandler(err));
          }
          await Instructions.findOne({
              _id: req.params.id
            })
            .then((results) => {
              if (!results) {
                return res
                  .status(Constants.er_not_found)
                  .json(errHandler.idNotFoundErrorHandler());
              } else {
                res.status(Constants.success).json(results);
              }
            })
            .catch((err) => {
              return res.status(Constants.er_failure).json(errHandler.errorHandler(err));
            });
        })
    } else {
      return res
        .status(Constants.er_authorization_failed)
        .json(errHandler.unauthorizedErrorHandler());
    }
  });

// To Delete all the instructions at once
const InstructionDeleteAtOnce =
  (function (req, res) {

    if (req.session.user_type == Constants[1]) {
      Instructions.deleteMany({},
        (err, results) => {
          if (err) {
            return res.status(Constants.er_failure).json(errHandler.errorHandler(err));
          }
          if (!results) {
            return res
              .status(Constants.er_not_found)
              .json(errHandler.idNotFoundErrorHandler());
          }
          return res.status(Constants.success).json({
            message: "Data deleted successfully"
          });
        }
      );
    } else {
      return res
        .status(Constants.er_authorization_failed)
        .json(errHandler.unauthorizedErrorHandler());
    }
  });

//To delete the instruction's data by using their id
const InstructionDelete =
  (function (req, res) {

    if (req.session.user_type == Constants.admin) {
      Instructions.findByIdAndRemove({
          _id: req.params.id,
        },
        (err, results) => {
          if (err) {
            return res.status(Constants.er_failure).json(errHandler.errorHandler(err));
          }
          if (!results) {
            return res
              .status(Constants.er_not_found)
              .json(errHandler.idNotFoundErrorHandler());
          }
          return res.status(Constants.success).json({
            message: "Data deleted successfully"
          });
        }
      );
    } else {
      return res
        .status(Constants.er_authorization_failed)
        .json(errHandler.unauthorizedErrorHandler());
    }
  });

module.exports = {
  InstructionAdd,
  InstructionDelete,
  InstructionPut,
  InstructionGetById,
  InstructionGet,
  InstructionDeleteAtOnce,
}