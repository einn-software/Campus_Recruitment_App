const express = require('express')
const bodyParser = require('body-parser'); 
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = express();

//Import Routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');

dotenv.config();

//Connect to DB
mongoose.connect(
    process.env.TEST_DB_CONNECT, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true 
    },
    () => console.log('Connected to db!')
);

//Middleware
app.use(express.json());


//Route Middlewares
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);

module.exports = app;