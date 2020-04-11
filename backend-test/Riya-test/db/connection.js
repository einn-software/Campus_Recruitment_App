
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();



//Connect to DB for Developement
mongoose.connect(
    process.env.TEST_DB_CONNECT, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify:false
    },
    () => console.log('Connected to db!')
);
