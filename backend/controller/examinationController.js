const errHandler = require("./errorHandling");
const Constants = require("../config/constant");
const {
  logger,
  printLogsWithBody
} = require("../config/logger");
//import models
const QuestionCollections = require("../model/QuestionCollections");
const QuestionPapers = require("../model/QuestionPaper");

// import validations
const {
  questionCollectionsValidation,
  questionCollectionsPutValidation,
  questionPaperValidation,
  questionPaperPutValidation,
  questionPaperPatchValidation
} = require("../config/validation");

//Question Collection API
// const QuestionAdd = async (req, res) => {
//   if (req.session.user_type == Constants.admin) {
//     //LETS VALIDATE THE DATA BEFORE WE ADD A COLLECTION
//     const {
//       error
//     } = questionCollectionsValidation(req.body);
//     if (error) {
//       logger.error(errHandler.validationErrorHandler(error));
//       return res
//         .status(Constants.er_failure)
//         .json(errHandler.validationErrorHandler(error));
//     }
//     //Checking if the question is already in the database
//     const questionExist = await QuestionCollections.findOne({
//       question: req.body.question,
//     });

//     if (questionExist) {
//       logger.error(`If (questionExist: ${questionExist}) - `, errHandler.questionExistErrorHandler());
//       return res
//         .status(Constants.er_failure)
//         .json(errHandler.questionExistErrorHandler());
//     }
//     // Create a new questionCollection
//     const questionCollection = new QuestionCollections({
//       question: req.body.question,
//       topic: req.body.topic,
//       options: req.body.options,
//       answer: req.body.answer,
//       weight: req.body.weight,
//     });
//     try {
//       const questions = await questionCollection.save();
//       logger.info(questions);
//       res.status(Constants.success).json(questions);
//     } catch (err) {
//       logger.error(`Error in saving Question - `, errHandler.errorHandler(err));
//       res
//         .status(Constants.er_failure)
//         .json(errHandler.errorHandler(err));
//     }
//   } else {
//     logger.error(`If user is not an admin - `, errHandler.unauthorizedErrorHandler());
//     return res
//       .status(Constants.er_authorization_failed)
//       .json(errHandler.unauthorizedErrorHandler());
//   }
// };

//Question Collection API
const QuestionAdd = async (req, res) => {
  if (req.session.user_type == Constants.admin) {
    //LETS VALIDATE THE DATA BEFORE WE ADD A COLLECTION
    let len = req.body.questions.length;
    for (let i =0; i< len; i++){
    const {
      error
    } = questionCollectionsValidation(req.body.questions[i]);
    if (error) {
      logger.error(errHandler.validationErrorHandler(error));
      return res
        .status(Constants.er_failure)
        .json(errHandler.validationErrorHandler(error));
    }
    //Checking if the question is already in the database
    const questionExist = await QuestionCollections.findOne({
      question: req.body.questions[i].question,
    });

    if (questionExist) {
      logger.error(`If (questionExist: ${questionExist}) - `, errHandler.questionExistErrorHandler());
      return res
        .status(Constants.er_failure)
        .json(errHandler.questionExistErrorHandler());
    }
    // Create a new questionCollection
    const questionCollection = new QuestionCollections({
      question: req.body.questions[i].question,
      topic: req.body.questions[i].topic,
      options: req.body.questions[i].options,
      answer: req.body.questions[i].answer,
      weight: req.body.questions[i].weight,
    });
    try {
      const questions = await questionCollection.save();
      logger.info(questions);
      res.status(Constants.success).json(questions);
    } catch (err) {
      logger.error(`Error in saving Question - `, errHandler.errorHandler(err));
      res
        .status(Constants.er_failure)
        .json(errHandler.errorHandler(err));
    }
  }
  } else {
    logger.error(`If user is not an admin - `, errHandler.unauthorizedErrorHandler());
    return res
      .status(Constants.er_authorization_failed)
      .json(errHandler.unauthorizedErrorHandler());
  }
};

// Get QuestionCollection
const QuestionGet = function (req, res) {
  if (req.session.user_type == Constants.student || req.session.user_type == Constants.admin) {
    QuestionCollections.find({}, {
      answer: 0
    }, (err, results) => {
      if (err || !results) {
        logger.error(`Function QuestionCollections.find({}, callback) - `, errHandler.errorHandler(err));
        return res
          .status(Constants.er_failure)
          .json(errHandler.errorHandler(err));
      }
      logger.info(results);
      return res.status(Constants.success).json(results);
    });
  } else {
    logger.error(`If user is neither an admin nor a student - `, errHandler.unauthorizedErrorHandler());
    return res
      .status(Constants.er_authorization_failed)
      .json(errHandler.unauthorizedErrorHandler());
  }
};

// Get QuestionCollection By Id
const QuestionGetById = function (req, res) {
  if (req.session.user_type == Constants.student || req.session.user_type == Constants.admin) {
    QuestionCollections.findOne({
        _id: req.params.id
      }, {
        answer: 0
      },
      (err, results) => {
        if (err || !results) {
          logger.error(`Function QuestionCollections.findOne({_id: ${req.params.id}}, callback) - `, errHandler.idNotFoundErrorHandler('question id'));
          return res
            .status(Constants.er_not_found)
            .json(errHandler.idNotFoundErrorHandler('question id'));
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
};

//Put QuestionCollection
const QuestionPut = function (req, res) {
  if (req.session.user_type == Constants.admin) {
    const body = req.body;
    //VALIDATE THE DATA
    const {
      error
    } = questionCollectionsPutValidation(body);
    if (error) {
      logger.error(errHandler.validationErrorHandler(error));
      return res
        .status(Constants.er_failure)
        .json(errHandler.validationErrorHandler(error));
    }
    QuestionCollections.findOneAndUpdate({
          _id: req.params.id,
        },
        body, {
          new: true
        }, async (err, result) => {
          if (err) {
            logger.error(`Function QuestionCollections.findOneAndUpdate({_id: ${req.params.id}}, callback) - `, errHandler.errorHandler(err));
            return res.status(Constants.er_failure).json(errHandler.errorHandler(err));
          }
          if (!result) {
            logger.error(`Function QuestionCollections.findOneAndUpdate({_id: ${req.params.id}}, callback) - `, errHandler.errorHandler(err));
            return res
              .status(Constants.er_not_found)
              .json(errHandler.idNotFoundErrorHandler('question id'));
          } else {
            logger.info(result)
            return res.status(Constants.success).json(result);
          }
        })
      .catch((err) => {
        logger.error(`Error in updating question - `, errHandler.errorHandler(err));
        return res
          .status(Constants.er_failure)
          .json(errHandler.errorHandler(err));
      });
  } else {
    logger.error(`If user is not an admin - `, errHandler.unauthorizedErrorHandler());
    return res
      .status(Constants.er_authorization_failed)
      .json(errHandler.unauthorizedErrorHandler());
  }
};

//Delete QuestionCollection
const QuestionDelete = function (req, res) {
  if (req.session.user_type == Constants.admin) {
    QuestionCollections.findByIdAndRemove({
        _id: req.params.id,
      },
      (err, results) => {
        if (err) {
          logger.error(`Function QuestionCollections.findOneAndRemove({_id: ${req.params.id}}, callback) - `, errHandler.errorHandler(err));
          return res
            .status(Constants.er_failure)
            .json(errHandler.errorHandler(err));
        }
        if (!results) {
          logger.error(`Function QuestionCollections.findOneAndRemove({_id: ${req.params.id}}, callback) - `, errHandler.idNotFoundErrorHandler('question id'));
          return res
            .status(Constants.er_not_found)
            .json(errHandler.idNotFoundErrorHandler('question id'));
        }
        logger.info({
          message: "Deleted successfully",
        })
        return res.status(Constants.success).json({
          message: "Deleted successfully",
        });
      }
    );
  } else {
    logger.error(`If user is not an admin - `, errHandler.unauthorizedErrorHandler());
    return res
      .status(Constants.er_authorization_failed)
      .json(errHandler.unauthorizedErrorHandler());
  }
};

//Post Question Paper
const QuestionPaperAdd = async (req, res) => {
  if (req.session.user_type == Constants.admin) {
    let len = req.body.papers.length;
    for (let i =0; i< len; i++){
    //LETS VALIDATE THE DATA BEFORE WE ADD A PAPER
    const {
      error
    } = questionPaperValidation(req.body.papers[i]);
    if (error) {
      logger.error(errHandler.validationErrorHandler(error));
      return res.status(Constants.er_failure).send(error.details[0].message);
    }
    //Checking if the question paper is already in the database
    const questionPaperExist = await QuestionPapers.findOne({
      year: req.body.papers[i].year,
      month: req.body.papers[i].month,
      day: req.body.papers[i].day,
      code: req.body.papers[i].code,
      start_time: req.body.papers[i].start_time,
    });
    if (questionPaperExist) {
      logger.error(`If (questionPaperExist: ${questionPaperExist}) - `, errHandler.questionPaperExistErrorHandler());
      return res
        .status(Constants.er_failure)
        .json(errHandler.questionPaperExistErrorHandler());
    }
    // Create a new questionPaper
    const questionPapers = new QuestionPapers({
      year: req.body.papers[i].year,
      month: req.body.papers[i].month,
      day: req.body.papers[i].day,
      paper_name: req.body.papers[i].paper_name,
      paper_max_marks: req.body.papers[i].paper_max_marks,
      max_time: req.body.papers[i].max_time,
      instructions_id: req.body.papers[i].instructions_id,
      code: req.body.papers[i].code,
      start_time: req.body.papers[i].start_time,
      trigger_type: req.body.papers[i].trigger_type,
      enable: req.body.papers[i].enable,
      negative_marking_ratio: req.body.papers[i].negative_marking_ratio,
      sections: req.body.papers[i].sections,
    });
    try {
      const savedPapers = await questionPapers.save();
      logger.log(savedPapers);
      res.status(Constants.success).json(savedPapers);
    } catch (err) {
      logger.error(`Error in saving question paper - `, errHandler.errorHandler(err));
      res
        .status(Constants.er_failure)
        .json(errHandler.errorHandler(err));
    }
  }
  } else {
    logger.error(`If user is not an admin - `, errHandler.unauthorizedErrorHandler());
    return res
      .status(Constants.er_authorization_failed)
      .json(errHandler.unauthorizedErrorHandler());

  };
}

// Get aLl the Question Papers
const AllQuestionPaperGet = function (req, res) {
  if (req.session.user_type == Constants.admin) {
    QuestionPapers.find({}, (err, results) => {
      if (err || !results) {
        logger.error(`Function QuestionPaper.find({}, callback) - `, errHandler.errorHandler(err));
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
};

//Get QuestionPaper

const QuestionPaperGet = (req, res) => {
  if  (req.session.user_type == Constants.student || req.session.user_type == Constants.admin) {
    QuestionPapers.findOne({
        code: req.params.code,
        year: req.params.year,
        month: req.query.month,
        day: req.query.day
      },
      (err, results) => {
        if (err || !results) {
          logger.error(`Function QuestionPapers.findOne({
            code: ${req.params.code},
            year: ${req.params.year},
            month: ${req.query.month},
            day: ${req.query.day}
          }, callback) - `, errHandler.dataNotFoundErrorHandler());
          return res
            .status(Constants.er_not_found)
            .json(errHandler.dataNotFoundErrorHandler());
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
};

//Get QuestionPaper by Tpo using code

const QuestionPaperIdGetByTpo = (req, res) => {
  if (req.session.user_type == Constants.tpo || req.session.user_type == Constants.admin) {
    QuestionPapers.find({
        code: req.params.code
      }, {
        _id: 1,
        year: 1,
        month: 1,
        day: 1,
        paper_name: 1
      },
      (err, results) => {
        if (err || !results || results.length == 0) {
          logger.error(`Function QuestionPapers.find({code: ${req.params.code}}, callback) - `, errHandler.codeNotFoundErrorHandler());
          return res
            .status(Constants.er_not_found)
            .json(errHandler.codeNotFoundErrorHandler());
        }
        logger.info(results);
        return res.status(Constants.success).json(results);
      }
    );
  } else {
    logger.error(`If user is neither an admin nor a tpo - `, errHandler.unauthorizedErrorHandler());
    return res
      .status(Constants.er_authorization_failed)
      .json(errHandler.unauthorizedErrorHandler());
  }
};

// Get QuestionPaper By Id
const QuestionPaperGetById = function (req, res) {
  if (req.session.user_type == Constants.admin || req.session.user_type == Constants.student) {
    QuestionPapers.findOne({
        _id: req.params.id,
      },
      (err, results) => {
        if (err || !results) {
          logger.error(`Function QuestionPapers.findOne({id: ${req.params.id}}, callback) - `, errHandler.idNotFoundErrorHandler('question-paper id'));
          return res
            .status(Constants.er_not_found)
            .json(errHandler.idNotFoundErrorHandler('question-paper id'));
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
};


//Put QuestionPaper
const QuestionPaperPut = function (req, res) {
  if (req.session.user_type == Constants.admin) {
    const body = req.body;
    //VALIDATE THE DATA
    const {
      error
    } = questionPaperPutValidation(body);
    if (error) {
      logger.error(errHandler.validationErrorHandler(error));
      return res
        .status(Constants.er_failure)
        .json(errHandler.validationErrorHandler(error));
    }
    QuestionPapers.findByIdAndUpdate({
          _id: req.params.id,
        },
        body, {
          new: true
        }, async (err, result) => {
          if (err) {
            logger.error(`Function QuestionPapers.findByIdAndUpdate({id: ${req.params.id}}, callback) - `, errHandler.errorHandler(err));
            return res.status(Constants.er_failure).json(errHandler.errorHandler(err));
          }
          if (!result) {
            logger.error(`Function QuestionPapers.findByIdAndUpdate({id: ${req.params.id}}, callback) - `, errHandler.idNotFoundErrorHandler('question-paper id'));
            return res
              .status(Constants.er_not_found)
              .json(errHandler.idNotFoundErrorHandler('question-paper id'));
          } else {
            logger.log(result)
            return res.status(Constants.success).json(result);
          }
        })
      .catch((err) => {
        logger.error(`Error in updating question paper - `, errHandler.errorHandler(err));
        return res
          .status(Constants.er_failure)
          .json(errHandler.errorHandler(err));
      });
  } else {
    logger.error(`If user is not an admin - `, errHandler.unauthorizedErrorHandler());
    return res
      .status(Constants.er_authorization_failed)
      .json(errHandler.unauthorizedErrorHandler());
  }
};

//Patch Question Paper
const QuestionPaperPatch = function (req, res) {
  printLogsWithBody(req);
  if (req.session.user_type == Constants.admin) {
    const body = req.body;
    //VALIDATE THE DATA
    const {
      error
    } = questionPaperPatchValidation(body);
    if (error) {
      logger.error(errHandler.validationErrorHandler(error));
      return res
        .status(Constants.er_failure)
        .json(errHandler.validationErrorHandler(error));
    }
    QuestionPapers.findByIdAndUpdate({
          _id: req.params.id,
        },
        body, {
          new: true
        }
      )
      .then(async (results) => {
        if (!results) {
          logger.error(`Function QuestionPapers.findByIdAndUpdate({id: ${req.params.id}}, callback) - `, errHandler.idNotFoundErrorHandler('question-paper id'));
          return res
            .status(Constants.er_not_found)
            .json(errHandler.idNotFoundErrorHandler('question-paper id'));
        } else {
          logger.info(results);
          return res.status(Constants.success).json(results);
        }
      })
      .catch((err) => {
        logger.error(`Error in updating question paper - `, errHandler.errorHandler(err));
        return res
          .status(Constants.er_failure)
          .json(errHandler.errorHandler(err));
      });
  } else {
    logger.error(`If user is not an admin - `, errHandler.unauthorizedErrorHandler());
    return res
      .status(Constants.er_authorization_failed)
      .json(errHandler.unauthorizedErrorHandler());
  }
};

//Delete QuestionPaper
const QuestionPaperDelete = function (req, res) {
  if (req.session.user_type == Constants.admin) {
    QuestionPapers.findByIdAndRemove({
        _id: req.params.id,
      },
      (err, results) => {
        if (err) {
          logger.error(`Function QuestionPapers.findByAndRemove({id: ${req.params.id}}, callback) - `, errHandler.errorHandler(err));
          return res
            .status(Constants.er_failure)
            .json(errHandler.errorHandler(err));
        }
        if (!results) {
          logger.error(`Function QuestionPapers.findByAndRemove({id: ${req.params.id}}, callback) - `, errHandler.idNotFoundErrorHandler('question-paper id'));
          return res
            .status(Constants.er_not_found)
            .json(errHandler.idNotFoundErrorHandler('question-paper id'));
        }
        logger.info({
          message: "Deleted successfully",
        })
        return res.status(Constants.success).json({
          message: "Deleted successfully",
        });
      }
    );
  } else {
    logger.error(`If user is not an admin - `, errHandler.unauthorizedErrorHandler());
    return res
      .status(Constants.er_authorization_failed)
      .json(errHandler.unauthorizedErrorHandler());
  }
};

module.exports = {
  QuestionAdd,
  QuestionGet,
  QuestionGetById,
  QuestionPut,
  QuestionDelete,
  QuestionPaperAdd,
  QuestionPaperGet,
  QuestionPaperIdGetByTpo,
  QuestionPaperGetById,
  QuestionPaperPut,
  QuestionPaperPatch,
  QuestionPaperDelete,
  AllQuestionPaperGet
};
