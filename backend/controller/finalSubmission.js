const errHandler = require("./errorHandling")
const Constants = require("../config/constant");

const {
    finalSubmissionValidation
} = require("../config/validation");

const {
    SaveResult
} = require("./resultController");
const {
    response
} = require("express");

const FinalSubmissionPost = (async (req, res) => {
    //LETS VALIDATE THE DATA BEFORE WE ADD A response
    const {
        error
    } = finalSubmissionValidation(req.body);
    if (error) return res.status(Constants.er_failure).json(errHandler.validationErrorHandler(error));

    await SaveResult(req, res);
    try {
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