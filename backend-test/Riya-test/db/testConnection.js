const monk = require('monk');
//Connect to DB for Test

dbUrl = process.env.TEST_DB_CONNECT;
const db = monk(dbUrl);

module.exports = db;