const { createLogger, transports, format } = require('winston');
require('winston-daily-rotate-file');
const fs = require('fs');

const transport = new(transports.DailyRotateFile)({
    filename: './logs/crs-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    maxSize: '2kk',
    maxFiles: '14d',
    handleRejections: true, // to handle exceptions set handleRejections as true
    handleExceptions: true, //it is possible to catch and log uncaughtException events from the process by working with custom logger instances (set handleExceptions on transport)
    format: format.combine(
            format.timestamp(),
            format.json()) //the format of log messages
});

transport.on('rotate', function(oldFilename, newFilename) {
    // fs.rename(newFilename, newFilename.replace('crs-%DATE%.log','crs.log'))
});

const logger = createLogger({
    transports: [
        transport
    ],
    exitOnError: false, //By default, winston will exit after logging an uncaughtException so set exitOnError = false to avoid this behaviour
});
module.exports = logger;