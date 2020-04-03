


const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

before((done) =>{


    mongoose.connect("mongodb://localhost/Registration", {useNewUrlParser: true});

    mongoose.connection
       .once('open', () => {
          // console.log("connected"))
          done();  
       })    
       .on('error', (error) => {
           console.log("your error" ,error);
       });
    

});

beforeEach((done) => {
    mongoose.connection.db.dropCollection('reg', function(err, result) {
        done()
    });
});  


