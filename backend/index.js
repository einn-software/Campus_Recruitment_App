const express = require("express");
const volleyball = require("volleyball");
const mongoose = require("mongoose");
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const {
  logger
} = require("./config/logger");
const {
  deleteOldLogFiles
} = require("./config/rotateLogAndDeleteOldLogFiles");
const dotenv = require("dotenv"); // The dotenv is a zero-dependency module that loads environment variables from a .env file into process.env.
const app = express(); // Create the Express application
app.use(bodyParser.json());
const errHandler = require("./controller/errorHandling");
const Constants = require("./config/constant");
const authRoute = require("./routes/auth"); //Import Routes

dotenv.config(); // Here call the config() method of dotenv library, which loads the variables into the process.env.

//Connect to MongoDBs
mongoose.connect(process.env.DB_CONNECT, {
  useNewUrlParser: true, // To remove Depreciation warnings
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});
mongoose.connection
  .once("open", () => logger.info("Connected to db!")) //Event Listeners
  .on("error", (error) => {
    logger.error(error);
  });

//Middleware
app.use(cors({
  origin: [
    "http://localhost:4200"
  ],credentials: true}));
 
app.use(volleyball); //function which logs incoming requests and outgoing responses as separate events
// app.use(express.json());

deleteOldLogFiles();

//Route Middlewares
app.use("/", authRoute);
app.use("*", function (req, res) {
  logger.error(errHandler.noRouteErrorHandler());
  return res
    .status(Constants.er_failure)
    .json(errHandler.noRouteErrorHandler());
});
//Error hadling middleware
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next(error);
});
app.use((error, req, res, next) => {
  logger.error(req.url);
  logger.error(
    error.status + "\n" + error.stack + "\n" + error.body + "\n" + error.type
  );
  return res.status(Constants.er_failure).json(errHandler.errorHandler(error));
});

module.exports = app;
