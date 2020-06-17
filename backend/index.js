const express = require("express");
const volleyball = require("volleyball");
const mongoose = require("mongoose");
const logger = require("./config/logger");
const dotenv = require("dotenv"); // The dotenv is a zero-dependency module that loads environment variables from a .env file into process.env.
const app = express(); // Create the Express application
const errHandler = require("./controller/errorHandling");
const Constants = require("./config/constant");

//Import Routes
const authRoute = require("./routes/auth");
dotenv.config(); // Here call the config() method of dotenv library, which loads the variables into the process.env.

//Connect to MongoDBs
mongoose.connect(process.env.DB_CONNECT, {
  useNewUrlParser: true, // To remove Depreciation warnings
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});
mongoose.connection
  .once("open", () => logger.log("info", "Connected to db!")) //Event Listeners 
  .on("error", (error) => {
    logger.log("error", error);
  });

//Middleware
app.use(volleyball); //function which logs incoming requests and outgoing responses as separate events
app.use(express.json());

//Logger 
app.use(function (req, res, next) {
  logger.info(req.url);
  let oldSend = res.send;
  res.send = function (data) {
    logger.info(data);
    oldSend.apply(res, arguments);
  };
  next();
});

//Route Middlewares
app.use("/", authRoute);

//Error hadling middleware
app.use((req, res, next) => {
  next(error);
});

app.use((error, req, res, next) => {
  res.status(Constants.er_failure).json(errHandler.noRouteErrorHandler(error));
});

module.exports = app;