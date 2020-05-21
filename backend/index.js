const express = require("express"); //The Express is a web framwork for nodejs that provide small, robust tooling for HTTP servers, making it a great solution for single page applications, web sites, hybrids, or public HTTP APIs.

const logger = require("./config/logger");
const volleyball = require("volleyball");
const mongoose = require("mongoose");
const dotenv = require("dotenv"); // importing all the configurations from .env file
const app = express(); // Create the Express application
dotenv.config(); // Gives us access to variables set in the .env file via `process.env.VARIABLE_NAME` syntax

//Connect to MongoDB
mongoose.connect(process.env.DB_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});
mongoose.connection
  .once("open", () => console.log("Connected to db!"))
  .on("error", (error) => {
    console.log("Your error", error);
  });

//Import Routes
const authRoute = require("./routes/auth");
//const resetPasswordRoute = require("./routes/ResetPassword");

//Middleware
app.use(function (req, res, next) {
  logger.info(req.body);
  let oldSend = res.send;
  res.send = function (data) {
    logger.info(data);
    oldSend.apply(res, arguments);
  };
  next();
});
app.use(volleyball);
app.use(express.json());

//Route Middlewares
app.use("/", authRoute);
//app.use("/", resetPasswordRoute);
// app.all('*', (req, res, next) => {
//   res.status(404).json({
//     status: 'fail',
//     message: `Can't find ${req.originalUrl} on this server!`
//   });
// });
module.exports = app;
