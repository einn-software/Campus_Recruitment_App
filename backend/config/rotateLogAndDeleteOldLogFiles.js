const fs = require("fs");
const errHandler = require("../controller/errorHandling");
const Constants = require("./constant");
const path = require("path");
const moment = require("moment");
const logger = require("./logger");
var dirPath = ["./logs/", "./androidLogs/"];

function deleteOldLogFiles() {
  setInterval(function () {
    dirPath.forEach((directoryPath) => {
      fs.readdir(directoryPath, (err, files) => {
        if (err) logger.error(errHandler.errorHandler(err));
        for (var i = 0; i < files.length; i++) {
          if (files[i] == Constants.logFile) {
            fs.stat(path.join(directoryPath, files[i]), function (err, stat) {
              if (err) logger.error(errHandler.errorHandler(err));
              var fileSize = stat.size / 1024 / 1024; //file size in MB
              if (fileSize >= Constants.fileSizeInMB) {
                var gettingCurrentDateAndTime = moment().format('YYYY_MM_DD_hh_mm_ss')
                var filename =
                  "crs" + gettingCurrentDateAndTime +
                  ".log"; // file name

                var fileToBeCreatedAtPath = `./logs/${filename}`;

                var ws = fs.createWriteStream(fileToBeCreatedAtPath, {
                  flags: "w",
                  encoding: "utf-8",
                });
                ws.on("error", function (err) {
                  logger.error(errHandler.errorHandler(err));
                });
                fs.readFile(
                  "./logs/crs.log", {
                    encoding: "utf-8",
                  },
                  (err, data) => {
                    if (err) logger.error(errHandler.errorHandler(err));
                    ws.write(data); // write the data of crs.log into new file
                    fs.writeFile("./logs/crs.log", "", function () {}); // make crs.log file empty
                  }
                );
              }
            });
          } else {
            let findFileAtLocation = path.join(directoryPath, files[i]);
            fs.stat(findFileAtLocation, function (err, stat) {
              if (err) logger.error(errHandler.errorHandler(err));
              else {
                var now = new Date().getTime();
                var endTime = new Date(stat.mtime).getTime() + Constants.fifteenDaysInMiliseconds;
                if (now > endTime) {
                  return fs.unlink(findFileAtLocation, function (err) {
                    if (err) logger.error(errHandler.errorHandler(err));
                    logger.info(`${findFileAtLocation}, file got removed`)
                  });
                }
              }
            });
          }
        }
      });
    }, Constants.oneDayInMilisecond); // check everyday
  });
}
module.exports.deleteOldLogFiles = deleteOldLogFiles;