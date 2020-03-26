const http = require('http');  
// const server = http.createServer(app);

const express = require('express');            //import the express module
const app = express();                         //execute express like a function
const morgan = require('morgan');
const bodyParser = require('body-parser');
// const mongoose = require('mongoose');

const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');

app.get("/", (req,res)=>{
    res.send("Hii")
});

// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://RiyaSinghal:15011501@node-shop-bbvz1.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

// mongoose.connect(
//     "mongodb+srv://RiyaSinghal:" + 
//     process.env.MONGO_ATLAS_PW + 
//     "@node-shop-bbvz1.mongodb.net/test?retryWrites=true&w=majority", {
//     useMongoClient: true,
//     // useNewUrlParser: true,
//     // useUnifiedTopology: true,
// });
app.use(morgan('dev'));      //dev is a format that we want to output

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", '*');   //* is to give access to the any origin 
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Accept, Authorization");
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({
            
        });
    }
});

app.use('/products', productRoutes);  
app.use('/orders', orderRoutes);  

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})
module.exports = app;

app.listen(3000, ()=>{
    console.log("app started");
});
