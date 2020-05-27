const Instructions = require('../model/instruction');
const errHandler = require("./errorHandling");
const verify = require('../config/verifyToken');
const Constants = require('../config/constant');
// import validations
const {
  instructionValidation,
  instructionPutValidation
} = require("../config/validation");

//testinstructions
const instructionAdd = (verify, async (req, res) => {
  //LETS VALIDATE THE DATA BEFORE WE ADD A INSTRUCTION
  const {
    error
  } = instructionValidation(req.body);
  if (error) return res.status(`${Constants.er_failure}`).json(errHandler.validationErrorHandler(error));

  //Checking if the college is already in the database
  const collegeExist = await Instructions.findOne({
    code: req.body.code,
  });
  if (collegeExist) return res.status(`${Constants.er_failure}`).json(errHandler.emailExistErrorHandler());

  // Create a new instruction
  const instructions = new Instructions({
    code: req.body.code,
    message: req.body.message,
    year: req.body.year,
    month: req.body.month,
    day: req.body.day,
  });
  try {
    const instructions = await Instructions.save();
    res.status(`${Constants.success}`).json(instructions);
  } catch (err) {
    res.status(`${Constants.er_failure}`).json(errHandler.errorHandler(err));
  }
});

//To Get all the instructions data
const instructionGet = (verify, function (req, res) {
  if (req.session.user_type == Constants[1]) {
    Instructions.find({}, (err, results) => {
      if (err) {
        return res
          .status(`${Constants.er_failure}`)
          .json(errHandler.errorHandler(err));
      }
      return res.status(`${Constants.success}`).json(results);
    });
  } else {
    return res
      .status(`${Constants.er_authorizationFailed}`)
      .json(errHandler.unauthorizedErrorHandler());
  }
});

// To get single instruction data using id
const instructionGetById = (verify, function (req, res) {
  if (req.session.user_type == 1) { //Todo
    Instructions.findOne({
        _id: req.params.id,
      },
      (err, results) => {
        if (err) {
          return res.status(`${Constants.er_notFound}`).json(errHandler.idNotFoundErrorHandler());
        }
        return res.status(`${Constants.success}`).json(results);
      }
    );
  } else {
    return res
      .status(`${Constants.er_authorizationFailed}`)
      .json(errHandler.unauthorizedErrorHandler());
  }
});

//To change or update the instruction's data by using their id
const instructionPut =
  (verify,
    function (req, res) {
      const body = req.body;
      //VALIDATE THE DATA BEFORE WE MAKE A Admin
      const {
        error
      } = instructionPutValidation(body);
      if (error) {
        return res.status(`${Constants.er_failure}`).json(errHandler.validationErrorHandler(error));
      }
      if (req.session.user_type == Constants[1]) {
        Instructions.findOneAndUpdate({
              _id: req.params.id,
            },
            body
          )
          .then((results) => {
            if (!results) {
              return res
                .status(`${Constants.er_notFound}`)
                .json(errHandler.idNotFoundErrorHandler());
            } else {
              res.status(`${Constants.success}`).json(results);
            }
          })
          .catch((err) => {
            return res.status(`${Constants.er_failure}`).json(errHandler.errorHandler(err));
          });
      } else {
        return res
          .status(`${Constants.er_authorizationFailed}`)
          .json(errHandler.unauthorizedErrorHandler());
      }
    });

//To delete the instruction's data by using their id
const instructionDelete =
  (verify,
    function (req, res) {
      if (req.session.user_type == Constants[1]) {
        Instructions.findByIdAndRemove({
            _id: req.params.id,
          },
          (err, results) => {
            if (err) {
              return res.status(`${Constants.er_failure}`).json(errHandler.errorHandler(err));
            }
            if (!results) {
              return res
                .status(`${Constants.er_notFound}`)
                .json(errHandler.idNotFoundErrorHandler());
            }
            return res.status(`${Constants.success}`);
          }
        );
      } else {
        return res
          .status(`${Constants.er_authorizationFailed}`)
          .json(errHandler.unauthorizedErrorHandler());
      }
    });

module.exports.instructionAdd = instructionAdd
module.exports.instructionDelete = instructionDelete
module.exports.instructionPut = instructionPut
module.exports.instructionGetById = instructionGetById
module.exports.instructionGet = instructionGet