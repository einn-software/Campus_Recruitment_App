const express = require("express"); //The Express is a web framwork for nodejs that provide small, robust tooling for HTTP servers, making it a great solution for single page applications, web sites, hybrids, or public HTTP APIs.
const app = express();
const logger = require("./config/logger");
const volleyball = require("volleyball");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

//Connect to MongoDB
mongoose.connect(" mongodb://localhost/auth", {
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

module.exports = app;
