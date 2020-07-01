const app = require("./index");
const logger = require("./config/logger");
const port = process.env.PORT || 80; //the port on which the server is running
const listener = app.listen(port, function (err) {
  if (err) {
    logger.error("error while starting server", err);
  } else {
    logger.info("server up and running at " + listener.address().port);
  }
});