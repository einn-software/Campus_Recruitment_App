const {
    createLogger,
    transports,
    format
} = require("winston");

const logger = createLogger({ //A winston logger is created with the createLogger function. In addition, there is a default logger if no logger is explicitly specified.
    transports: [
        new transports.File({
            filename: "./logs/crs.log",
            handleRejections: true, // to handle exceptions set handleRejections as true
            handleExceptions: true, //it is possible to catch and log uncaughtException events from the process by working with custom logger instances (set handleExceptions on transport)
            level: "info", //maximum level of log messages to log
            format: format.combine(
                format.timestamp(),
                format.json()
            ),
        }),
    ],
    exitOnError: false, //By default, winston will exit after logging an uncaughtException so set exitOnError = false to avoid this behaviour
});


module.exports = logger;