const express = require('express')
const bodyParser = require('body-parser'); 

const app = express();
const database = require('./db/connection');

//Import Routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');



//Middleware
app.use(express.json());


//Route Middlewares
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);

module.exports = app;