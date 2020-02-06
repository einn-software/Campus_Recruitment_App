var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();
var {addAdmin} = require('./routes/create_users')

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use(express.json());
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","*");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
})



mongoose.connect('mongodb://localhost/einn',{useNewUrlParser:true,useUnifiedTopology:true},function(err,db){
    if(err){
        console.log('unable to connect',err);
    }
    else{
        console.log("database connnected");
    }
})
//.then(()=>console.log("database connected"));


app.get("/", (req, res)=>{
    res.send ("express");
})
app.post('/create_users',function(req,res){
    console.log('admin creation requested');
    console.log(req.body)

    addAdmin(req.body)
    .then((data)=>console.log(data))
    .catch((err)=>console.log(err))

    var response_data = {
        ...req.body,
        created:"true"
    }
    res.json(response_data)
});




app.listen(5000, ()=>{
    console.log("app started");
})