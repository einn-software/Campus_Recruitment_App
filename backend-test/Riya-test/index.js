const express = require('express')
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

//Connect to DB for Developement
mongoose.connect(
    process.env.DB_CONNECT, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true 
    },
    () => console.log('Connected to db!')
);

//Import Routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');


//Middleware
app.use(express.json());


//Route Middlewares
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);

module.exports = app;