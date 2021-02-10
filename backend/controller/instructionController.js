const Instructions = require('../model/Instruction');
const errHandler = require("./errorHandling");
const Constants = require('../config/constant');
const {
  logger
} = require("../config/logger");
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
    if (error) {

      logger.error(errHandler.validationErrorHandler(error));
      return res.status(Constants.er_failure).json(errHandler.validationErrorHandler(error));
    }
    //Checking if the instruction is already in the database
    const instructionExist = await Instructions.findOne({
      code: req.body.code,
    });
    if (instructionExist) {
      logger.error(`If (instructionExist: ${instructionExist}) - `, errHandler.codeExistErrorHandler());
      return res.status(Constants.er_failure).json(errHandler.codeExistErrorHandler());
    }

    // Create a new instruction
    const instructions = new Instructions({
      code: req.body.code,
      message: req.body.message,
      year: req.body.year,
      month: req.body.month,
      day: req.body.day,
    });
    console.log(instructions)
    try {
      const instruction = await instructions.save();
      logger.info(instruction);
      return res.status(Constants.success).json(instruction);
    } catch (err) {
      logger.error(`Error in saving instruction - `, errHandler.errorHandler(err))
      return res.status(Constants.er_failure).json(errHandler.errorHandler(err));
    }
  } else {
    logger.error(`logIf user is not an admin - `, errHandler.unauthorizedErrorHandler());
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
        logger.error(`Fuction Instructions.find({}}, callback) - `, errHandler.errorHandler(err));
        return res
          .status(Constants.er_failure)
          .json(errHandler.errorHandler(err));
      }
      logger.info(results);
      return res.status(Constants.success).json(results);
    });
  } else {
    logger.error(`If user is not an admin - `, errHandler.unauthorizedErrorHandler());
    return res
      .status(Constants.er_authorization_failed)
      .json(errHandler.unauthorizedErrorHandler());
  }
});

// To get single instruction data using id
const InstructionGetById = (function (req, res) {
  if (req.session.user_type == Constants.admin || req.session.user_type == Constants.student) {
    Instructions.findOne({
        _id: req.params.id
      },
      (err, results) => {
        if (err || !results) {
          logger.error(`Fuction Instructions.findOne({ _id: ${req.params.id}}, callback) - `, errHandler.idNotFoundErrorHandler('instruction id'));
          return res.status(Constants.er_not_found).json(errHandler.idNotFoundErrorHandler('instruction id'));
        }
        logger.info(results);
        return res.status(Constants.success).json(results);
      }
    );
  } else {
    logger.error(`If user is neither an admin nor a student - `, errHandler.unauthorizedErrorHandler());
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
      logger.error(errHandler.validationErrorHandler(error));
      return res.status(Constants.er_failure).json(errHandler.validationErrorHandler(error));
    }
    if (req.session.user_type == Constants.admin) {
      Instructions.findOneAndUpdate({
            _id: req.params.id,
          },
          body, {
            new: true
          }, async (err, result) => {
            if (err) {
              logger.error(`Fuction Instructions.findOneAndUpdate({ _id: ${req.params.id}}, callback) - `, errHandler.errorHandler(err));
              return res.status(Constants.er_failure).json(errHandler.errorHandler(err));
            }
            if (!result) {
              logger.error(`Fuction Instructions.findOneAndUpdate({ _id: ${req.params.id}}, callback) - `, errHandler.idNotFoundErrorHandler('instruction id'));
              return res
                .status(Constants.er_not_found)
                .json(errHandler.idNotFoundErrorHandler('instruction id'));
            } else {
              res.status(Constants.success).json(result);
            }
          })
        .catch((err) => {
          logger.error('Error in Updating instruction - ', errHandler.errorHandler(err));
          return res.status(Constants.er_failure).json(errHandler.errorHandler(err));
        });
    } else {
      logger.error(`If user is not an admin - `, errHandler.unauthorizedErrorHandler());
      return res
        .status(Constants.er_authorization_failed)
        .json(errHandler.unauthorizedErrorHandler());
    }
  });

// To Delete all the instructions at once
const InstructionDeleteAtOnce =
  (function (req, res) {
    if (req.session.user_type == Constants.admin) {
      Instructions.deleteMany({},
        (err, results) => {
          if (err || !results) {
            logger.error(`Fuction Instructions.deleteMany({}, callback) - `, errHandler.errorHandler(err));
            return res.status(Constants.er_failure).json(errHandler.errorHandler(err));
          }
          logger.info({
            message: "Data deleted successfully"
          })
          return res.status(Constants.success).json({
            message: "Data deleted successfully"
          });
        }
      );
    } else {
      logger.error(`If user is not an admin - `, errHandler.unauthorizedErrorHandler());
      return res
        .status(Constants.er_authorization_failed)
        .json(errHandler.unauthorizedErrorHandler());
    }
  });

//To delete the instruction's data by using their id
const InstructionDelete =
  (function (req, res) {
    //printLogsWithBody(req);
    if (req.session.user_type == Constants.admin) {
      Instructions.findByIdAndRemove({
          _id: req.params.id,
        },
        (err, results) => {
          if (err) {
            logger.error(`Fuction Instructions.findByIdAndRemove({ _id: ${req.params.id}}, callback) - `, errHandler.errorHandler(err));
            return res.status(Constants.er_failure).json(errHandler.errorHandler(err));
          }
          if (!results) {
            logger.error(`Fuction Instructions.findByIdAndRemove({ _id: ${req.params.id}}, callback) - `, errHandler.idNotFoundErrorHandler('instruction id'));
            return res
              .status(Constants.er_not_found)
              .json(errHandler.idNotFoundErrorHandler('instruction id'));
          }
          return res.status(Constants.success).json({
            message: "Data deleted successfully"
          });
        }
      );
    } else {
      logger.error(`If user is not an admin - `, errHandler.unauthorizedErrorHandler());
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
