const express = require('express')
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

//Connect to DB for Developemen
mongoose.connect(
    process.env.DB_CONNECT, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    },
    () => console.log('Connected to db!')
);

//Import Routes
const authRoute = require('./routes/auth');

//Middleware
app.use(express.json());


//Route Middlewares
app.use('/', authRoute);

module.exports = app;