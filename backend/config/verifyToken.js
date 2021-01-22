const jwt = require('jsonwebtoken');
const errHandler = require("../controller/errorHandling");
const Constants = require('./constant');
const {
    logger,
    printLogsWithBody
} = require("./logger");

module.exports = async (req, res, next) => {
    printLogsWithBody(req);
    const token = req.header('auth-token');
    if (!token) {
        logger.error(`If (!${token}) - `, errHandler.tokenNotFoundErrorHandler())
        return res.status(Constants.er_authentication_failed).json(errHandler.tokenNotFoundErrorHandler());
    }
    await jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        if (err) {
            logger.error(errHandler.invalidTokenErrorHandler(err));
            return res.status(Constants.er_authentication_failed).json(errHandler.invalidTokenErrorHandler(err));
        }
        req = decoded;
        next();
    })

}
