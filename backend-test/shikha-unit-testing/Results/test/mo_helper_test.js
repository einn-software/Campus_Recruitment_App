const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

before((done) =>{


    mongoose.connect("mongodb://localhost/StudentResults", {useNewUrlParser: true, useUnifiedTopology: true });

    mongoose.connection
       .once('open', () => {
          done();  
       })    
       .on('error', (error) => {
           console.log("your error" ,error);
       });
    

});

beforeEach((done) => {
    mongoose.connection.db.dropCollection('Results', function(err, result) {
        done()
    });
});  

