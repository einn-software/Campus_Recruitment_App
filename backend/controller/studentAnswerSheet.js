//importing modules to be used
const errHandler = require('./errorHandling');
const Constants = require('../config/constant');

//importing model
const AnswerSheet = require('../model/StudentAnswerSheet');
const logger = require('../config/logger');

// importing validation
const {
    studentAnswerSheetValidation,
    answerSheetPutValidation,
} = require('../config/validation');

const AnswerSheetAdd = async(req, res) => {
    //LETS VALIDATE THE DATA BEFORE WE ADD A response
    const { error } = studentAnswerSheetValidation(req.body);
    if (error) {
        logger.log('error', errHandler.validationErrorHandler(error));
        return res
            .status(Constants.er_failure)
            .json(errHandler.validationErrorHandler(error));
    }
    //Checking if the question is already answered(post) in the database
    const answerExist = await AnswerSheet.findOne({
        student_id: req.body.student_id,
        question_paper_id: req.body.question_paper_id,
        question_id: req.body.question_id,
    });
    if (answerExist) {
        logger.log(
            'error',
            `Function AnswerSheet.findOne({student_id: ${req.body.student_id}},{question_paper_id: ${req.body.question_paper_id}},{question_id: ${req.body.question_id}})`,
            errHandler.answerExistErrorHandler()
        );
        return res
            .status(Constants.er_failure)
            .json(errHandler.answerExistErrorHandler());
    }
    // Create a new response(answer) in the answerSheet
    const answerSet = new AnswerSheet({
        student_id: req.body.student_id,
        question_paper_id: req.body.question_paper_id,
        question_id: req.body.question_id,
        selected_option: req.body.selected_option,
        state: req.body.state,
        marks_rewarded: 0,
        question_max_marks: req.body.question_max_marks,
    });
    try {
        await answerSet.save();
        const answer = await AnswerSheet.findOne({
            question_id: req.body.question_id,
        }, {
            marks_rewarded: 0,
        });
        logger.info(answer)
        return res.status(Constants.success).json(answer);
    } catch (err) {
        logger.log("error", errHandler.errorHandler(err))
        return res.status(Constants.er_failure).json(errHandler.errorHandler(err));
    }
};

// To get the answerSheet using id
const AnswerSheetGetById = function(req, res) {
    AnswerSheet.find({
            student_id: req.params.student_id,
            question_paper_id: req.params.question_paper_id,
        }, {
            marks_rewarded: 0,
        },
        (err, results) => {
            logger.log(
                'error',
                `Function AnswerSheet.findOne({student_id: ${req.body.student_id}},{question_paper_id: ${req.body.question_paper_id}})`,
                errHandler.idNotFoundErrorHandler()
            );
            if (err || !results) {
                return res
                    .status(Constants.er_not_found)
                    .json(errHandler.idNotFoundErrorHandler());
            }
            logger.info(results)
            return res.status(Constants.success).json(results);
        }
    );
};

//To change or update the answerSheet's data by using their id
const AnswerSheetPut = function(req, res) {
    const body = req.body;
    //VALIDATE THE DATA
    const { error } = answerSheetPutValidation(body);
    if (error) {
        logger.log('error', errHandler.validationErrorHandler(error));
        return res
            .status(Constants.er_failure)
            .json(errHandler.validationErrorHandler(error));
    }
    AnswerSheet.findOneAndUpdate({
            _id: req.params.id,
        },
        body, {
            new: true,
        },
        async(err, result) => {
            if (err) {
                logger.log("error", errHandler.errorHandler(err))
                return res
                    .status(Constants.er_failure)
                    .json(errHandler.errorHandler(err));
            }
            if (!result) {
                logger.log(
                    'error',
                    `Function AnswerSheet.findOne({_id: ${req.body.id}})`,
                    errHandler.idNotFoundErrorHandler()
                );
                return res
                    .status(Constants.er_not_found)
                    .json(errHandler.idNotFoundErrorHandler());
            } else {
                const answer = await AnswerSheet.findOne({
                    _id: req.params.id,
                }, {
                    marks_rewarded: 0,
                });
                logger.info(answer)
                return res.status(Constants.success).json(answer);
            }
        }
    ).catch((err) => {
        logger.log("error", errHandler.errorHandler(err))
        return res.status(Constants.er_failure).json(errHandler.errorHandler(err));
    });
};

//To delete the answerSheet's data by using their id
const AnswerSheetDeleteById = function(req, res) {
    if (req.session.user_type == Constants.admin) {
        AnswerSheet.findByIdAndRemove({
                _id: req.params.id,
            },
            (err, results) => {
                if (err) {
                    logger.log("error", errHandler.errorHandler(err))
                    return res
                        .status(Constants.er_failure)
                        .json(errHandler.errorHandler(err));
                }
                if (!results) {
                    logger.log(
                        'error',
                        `Function AnswerSheet.findOne({_id: ${req.body.id}})`,
                        errHandler.idNotFoundErrorHandler()
                    );
                    return res
                        .status(Constants.er_not_found)
                        .json(errHandler.idNotFoundErrorHandler());
                }
                logger.info({
                    message: 'Data deleted successfully',
                })
                return res.status(Constants.success).json({
                    message: 'Data deleted successfully',
                });
            }
        );
    } else {
        logger.log("error", `({user_type:${req.session.user_type}})`, errHandler.unauthorizedErrorHandler())
        return res
            .status(Constants.er_authorization_failed)
            .json(errHandler.unauthorizedErrorHandler());
    }
};

//To delete the answerSheet's data by using their student-id and question-paper-id
const AnswerSheetDeleteByStudentId = function(req, res) {
    if (req.session.user_type == Constants.admins) {
        AnswerSheet.findByIdAndRemove({
                student_id: req.params.student_id,
                question_paper_id: req.params.question_paper_id,
            },
            (err, results) => {
                if (err) {
                    logger.log("error", errHandler.errorHandler(err))
                    return res
                        .status(Constants.er_failure)
                        .json(errHandler.errorHandler(err));
                }
                if (!results) {
                    logger.log(
                        'error',
                        `Function AnswerSheet.findOne({student_id: ${req.body.student_id}},{question_paper_id: ${req.body.question_paper_id}})`,
                        errHandler.idNotFoundErrorHandler()
                    );
                    return res
                        .status(Constants.er_not_found)
                        .json(errHandler.idNotFoundErrorHandler());
                }
                logger.info({
                    message: 'Data deleted successfully',
                })
                return res.status(Constants.success).json({
                    message: 'Data deleted successfully',
                });
            }
        );
    } else {
        logger.log("error", `({user_type:${req.session.user_type}})`, errHandler.unauthorizedErrorHandler())
        return res
            .status(Constants.er_authorization_failed)
            .json(errHandler.unauthorizedErrorHandler());
    }
};
module.exports = {
    AnswerSheetAdd,
    AnswerSheetGetById,
    AnswerSheetPut,
    AnswerSheetDeleteById,
    AnswerSheetDeleteByStudentId,
};