const errHandler = require("./errorHandling");
const Constants = require("../config/constant");

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
const QuestionAdd = async (req, res) => {
  if (req.session.user_type == Constants.admin) {
    //LETS VALIDATE THE DATA BEFORE WE ADD A COLLECTION
    const {
      error
    } = questionCollectionsValidation(req.body);
    if (error)
      return res
        .status(Constants.er_failure)
        .json(errHandler.validationErrorHandler(error));

    //Checking if the question is already in the database
    const questionExist = await QuestionCollections.findOne({
      question: req.body.question,
    });

    if (questionExist)
      return res
        .status(Constants.er_failure)
        .json(errHandler.questionExistErrorHandler());

    // Create a new questionCollection
    const questionCollection = new QuestionCollections({
      question: req.body.question,
      topic: req.body.topic,
      options: req.body.options,
      answer: req.body.answer,
      weight: req.body.weight,
    });
    try {
      const questions = await questionCollection.save();
      res.status(Constants.success).json(questions);
    } catch (err) {
      res
        .status(Constants.er_failure)
        .json(errHandler.errorHandler(err));
    }
  } else {
    return res
      .status(Constants.er_authorization_failed)
      .json(errHandler.unauthorizedErrorHandler());
  }
};

// Get QuestionCollection
const QuestionGet = function (req, res) {
  if (req.session.user_type == Constants.student || Constants.admin) {
    QuestionCollections.find({}, {
      answer: 0
    }, (err, results) => {
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
};

// Get QuestionCollection By Id
const QuestionGetById = function (req, res) {
  if (req.session.user_type == Constants.student || Constants.admin) {
    QuestionCollections.findOne({
        _id: req.params.id,
      }, {
        answer: 0
      },
      (err, results) => {
        if (err || !results) {
          return res
            .status(Constants.er_not_found)
            .json(errHandler.idNotFoundErrorHandler());
        }
        return res.status(Constants.success).json(results);
      }
    );
  } else {
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
            return res.status(Constants.er_failure).json(errHandler.errorHandler(err));
          }
          if (!result) {
            return res
              .status(Constants.er_not_found)
              .json(errHandler.idNotFoundErrorHandler());
          } else {
            return res.status(Constants.success).json(result);
          }
        })
      .catch((err) => {
        return res
          .status(Constants.er_failure)
          .json(errHandler.errorHandler(err));
      });
  } else {
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
          return res
            .status(Constants.er_failure)
            .json(errHandler.errorHandler(err));
        }
        if (!results) {
          return res
            .status(Constants.er_not_found)
            .json(errHandler.idNotFoundErrorHandler());
        }
        return res.status(Constants.success).json({
          message: "Deleted successfully",
        });
      }
    );
  } else {
    return res
      .status(Constants.er_authorization_failed)
      .json(errHandler.unauthorizedErrorHandler());
  }
};

//Post Question Paper
const QuestionPaperAdd = async (req, res) => {
  if (req.session.user_type == Constants.admin) {
    //LETS VALIDATE THE DATA BEFORE WE ADD A PAPER
    const {
      error
    } = questionPaperValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Checking if the question paper is already in the database
    const questionPaperExist = await QuestionPapers.findOne({
      paper_name: req.body.paper_name,
    });
    if (questionPaperExist)
      return res
        .status(Constants.er_failure)
        .json(errHandler.questionPaperExistErrorHandler());

    // Create a new questionPaper
    const questionPapers = new QuestionPapers({
      year: req.body.year,
      month: req.body.month,
      day: req.body.day,
      paper_name: req.body.paper_name,
      paper_max_marks: req.body.paper_max_marks,
      max_time: req.body.max_time,
      instructions_id: req.body.instructions_id,
      code: req.body.code,
      start_time: req.body.start_time,
      trigger_type: req.body.trigger_type,
      enable: req.body.enable,
      negative_marking_ratio: req.body.negative_marking_ratio,
      sections: req.body.sections,
    });
    try {
      const savedPapers = await questionPapers.save();
      res.status(Constants.success).json(savedPapers);
    } catch (err) {
      res
        .status(Constants.er_failure)
        .json(errHandler.errorHandler(err));
    }
  } else {
    return res
      .status(Constants.er_authorization_failed)
      .json(errHandler.unauthorizedErrorHandler());

  };
}

//Get QuestionPaper

const QuestionPaperGet = (req, res) => {
  if (req.session.user_type == Constants.student || Constants.admin) {
    QuestionPapers.findOne({
        code: req.params.code,
        year: req.params.year,
        month: req.query.month,
        day: req.query.day
      },
      (err, results) => {
        if (err || !results) {
          return res
            .status(Constants.er_not_found)
            .json(errHandler.dataNotFoundErrorHandler());
        }
        return res.status(Constants.success).json(results);
      }
    );
  } else {
    return res
      .status(Constants.er_authorization_failed)
      .json(errHandler.unauthorizedErrorHandler());
  }
};

//Get QuestionPaper by Tpo using code

const QuestionPaperIdGetByTpo = (req, res) => {
  if (req.session.user_type == Constants.tpo || Constants.admin) {
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
          return res
            .status(Constants.er_not_found)
            .json(errHandler.codeNotFoundErrorHandler());
        }
        return res.status(Constants.success).json(results);
      }
    );
  } else {
    return res
      .status(Constants.er_authorization_failed)
      .json(errHandler.unauthorizedErrorHandler());
  }
};

// Get QuestionPaper By Id
const QuestionPaperGetById = function (req, res) {
  if (req.session.user_type == Constants.admin || Constants.student) {
    QuestionPapers.findOne({
        _id: req.params.id,
      },
      (err, results) => {
        if (err || !results) {
          return res
            .status(Constants.er_not_found)
            .json(errHandler.idNotFoundErrorHandler());
        }
        return res.status(Constants.success).json(results);
      }
    );
  } else {
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
            return res.status(Constants.er_failure).json(errHandler.errorHandler(err));
          }
          if (!result) {
            return res
              .status(Constants.er_not_found)
              .json(errHandler.idNotFoundErrorHandler());
          } else {
            return res.status(Constants.success).json(result);
          }
        })
      .catch((err) => {
        return res
          .status(Constants.er_failure)
          .json(errHandler.errorHandler(err));
      });
  } else {
    return res
      .status(Constants.er_authorization_failed)
      .json(errHandler.unauthorizedErrorHandler());
  }
};

//Patch Question Paper
const QuestionPaperPatch = function (req, res) {
  if (req.session.user_type == Constants.admin) {
    const body = req.body;
    //VALIDATE THE DATA
    const {
      error
    } = questionPaperPatchValidation(body);
    if (error) {
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
          return res
            .status(Constants.er_not_found)
            .json(errHandler.idNotFoundErrorHandler());
        } else {
          return res.status(Constants.success).json(results);
        }
      })
      .catch((err) => {
        return res
          .status(Constants.er_failure)
          .json(errHandler.errorHandler(err));
      });
  } else {
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
          return res
            .status(Constants.er_failure)
            .json(errHandler.errorHandler(err));
        }
        if (!results) {
          return res
            .status(Constants.er_not_found)
            .json(errHandler.idNotFoundErrorHandler());
        }
        return res.status(Constants.success).json({
          message: "Deleted successfully",
        });
      }
    );
  } else {
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
};