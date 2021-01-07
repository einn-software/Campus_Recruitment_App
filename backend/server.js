const app = require("./index");
const logger = require("./config/logger");
const port = process.env.PORT || 3800; //the port on which the server is running
const listener = app.listen(port, () => {
  logger.info("server up and running at " + listener.address().port);
});