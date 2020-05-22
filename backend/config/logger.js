const {
  createLogger,
  transports,
  format
} = require("winston");

const logger = createLogger({
  transports: [
    //A transport is a storage device for the logs, possible to construct multiple transports of the same type e.g. transports.File
    new transports.Console({
      level: "error"
    }),
    new transports.File({
      filename: "info.log",
      handleRejections: true, // to handle exceptions set handleRejections as true
      handleExceptions: true, //it is possible to catch and log uncaughtException events from the process by working with custom logger instances (set handleExceptions on transport)
      level: "info",
      format: format.combine(
        format.timestamp(),
        format.prettyPrint(),
        format.json()
      ),
    }),
  ],
  exitOnError: false, //By default, winston will exit after logging an uncaughtException so set exitOnError = false to avoid this behaviour
});

module.exports = logger;