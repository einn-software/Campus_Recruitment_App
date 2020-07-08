const jwt = require('jsonwebtoken');
const errHandler = require("../controller/errorHandling");
const Constants = require('./constant');

module.exports = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(Constants.er_authentication_failed).json(errHandler.tokenNotFoundErrorHandler());
    }
    await jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(Constants.er_authentication_failed).json(errHandler.invalidTokenErrorHandler(err));
        }
        next();
    })

}