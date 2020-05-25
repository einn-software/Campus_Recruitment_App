const express = require("express"); 
const logger = require("./config/logger");
const volleyball = require("volleyball");
const mongoose = require("mongoose");
const dotenv = require("dotenv"); // importing all the configurations from .env file
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
    console.log("Your error", error);
  });

//Middleware
// Logging middleware
app.use(function (req, res, next) {
  let oldSend = res.send; //only assign the send function to oldsend without a body
  console.log(`${oldSend}`);
  res.send = function (data) {
    // data is used as a body for send function
    res.send = oldSend; // set function back to avoid the 'double-send'
    logger.info(data);
    console.log(res.send);
    return res.send(data); // just call as normal with data -- return data as response to the client
  };
  next();
});

app.use(volleyball);
app.use(express.json());

//Route Middlewares
app.use("/", authRoute);

// Error hadling middleware
app.use((req, res, next) => {
  const error = new Error("Path is not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    status: error.status,
    message:
      `
          $ {
            req.url
          }
          ` + error.message,
  });
});

module.exports = app;
