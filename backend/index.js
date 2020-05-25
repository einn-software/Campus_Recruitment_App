const express = require("express"); 
const logger = require("./config/logger");
const volleyball = require("volleyball");
const mongoose = require("mongoose");
const logger = require("./config/logger");
const dotenv = require("dotenv"); // The dotenv is a zero-dependency module that loads environment variables from a .env file into process.env.
const app = express(); // Create the Express application
dotenv.config(); // Gives us access to variables set in the .env file via `process.env.VARIABLE_NAME` syntax
//Import Routes
const authRoute = require("./routes/auth");
//const resetPasswordRoute = require("./routes/ResetPassword");

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
    logger.log('error',error);
  });

//Middleware
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
// app.use((req, res, next) => {
//   const error = new Error("Path is not found");
//   error.status = 404;
//   next(error);
// });

// app.use((error, req, res, next) => {
//   res.status(error.status || 500);
//   res.json({
//     status: error.status,
//     message: `${req.url}` + error.message,
//   });
// });

module.exports = app;
