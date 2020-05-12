const express = require("express");

const app = express();
const volleyball = require("volleyball");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

//Connect to DB for Developemen
mongoose.connect(
  process.env.DB_CONNECT,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  () => console.log("Connected to db!")
);

//Import Routes
const authRoute = require("./routes/auth");
const resetPasswordRoute = require("./routes/ResetPassword");

//Middleware
app.use(volleyball);
app.use(express.json());

//Route Middlewares
app.use("/", authRoute);
app.use("/", resetPasswordRoute);

module.exports = app;
