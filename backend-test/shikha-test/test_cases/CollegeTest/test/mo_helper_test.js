const mongoose = require('mongoose');
mongoose.Promise = global. Promise;

before((done) =>{
   mongoose.connect("mongodb://localhost/TestingModel",{useNewUrlParser:true , useUnifiedTopology:true});
   mongoose.connection
   .once("open",()=>{
       console.log("connected");
       done();
   })
   .on("error",()=>{
       console.log("error",error);
   });
});

beforeEach((done)=>{
  mongoose.connection.collections.collegetests.drop(()=>{
      done();
  })
})