const errHandler = require("./errorHandling")
const Constants = require("../config/constant");
const {
    logger
} = require("../config/logger");
const {
    finalSubmissionValidation
} = require("../config/validation");

const {
    SaveResult
} = require("./resultController");

const FinalSubmissionPost = (async (req, res) => {
    //LETS VALIDATE THE DATA BEFORE WE ADD A response
    const {
        error
    } = finalSubmissionValidation(req.body);
    if (error) {
        logger.error(errHandler.validationErrorHandler(error));
        return res.status(Constants.er_failure).json(errHandler.validationErrorHandler(error));
    }

    await SaveResult(req, res);
    try {
        logger.info({
            "message": "Your exam submission is successful. Thank you for your time"
        })
        return res.status(Constants.success).json({
            "message": "Your exam submission is successful. Thank you for your time"
        });
    } catch (err) {
        return;
    }
});

module.exports = {
    FinalSubmissionPost
};