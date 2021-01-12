const express = require("express"); //The Express is a web framwork for nodejs that provide small, robust tooling for HTTP servers, making it a great solution for single page applications, web sites, hybrids, or public HTTP APIs.
const volleyball = require("volleyball");
const mongoose = require("mongoose");
const cors = require('cors');
const logger = require("./config/logger");
const dotenv = require("dotenv"); // The dotenv is a zero-dependency module that loads environment variables from a .env file into process.env.
const app = express(); // Create the Express application
const errHandler = require("./controller/errorHandling");
const Constants = require('./config/constant');
//Import Routes
const authRoute = require("./routes/auth");
//const resetPasswordRoute = require("./routes/ResetPassword");
dotenv.config(); // Here call the config() method of dotenv library, which loads the variables into the process.env.

//Connect to MongoDB
mongoose.connect(process.env.DB_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});
mongoose.connection
  .once("open", () => logger.info("Connected to db!"))
  .on("error", (error) => {
    logger.log('error', error);
  });

//Middleware
app.use(cors());
app.use(volleyball);
app.use(express.json());

app.use(function (req, res, next) {
  logger.info(req.url);
  let oldSend = res.send;
  res.send = function (data) {
    logger.info(data);
    oldSend.apply(res, arguments);
  }
  next();
})

//Route Middlewares
app.use("/", authRoute);
// Error hadling middleware
app.use((req, res, next) => {
  next(error);
});

app.use((error, req, res, next) => {
  res.json(errHandler.noRouteErrorHandler(error));
});

module.exports = app;