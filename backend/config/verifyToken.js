const jwt = require('jsonwebtoken');
const errHandler = require("../controller/errorHandling");
const Constants = require('./constant');

module.exports = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(Constants.er_authentication_failed).json(errHandler.tokenNotFoundErrorHandler());
    }
    const verified = await jwt.verify(token, process.env.TOKEN_SECRET)
    try {
        req.userData = verified;
        next();
    } catch (err) {
        return res.status(Constants.er_failure).json(errHandler.invalidTokenErrorHandler(err));
    }
}