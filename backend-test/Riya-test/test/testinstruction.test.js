// const request = require('supertest');
// const { expect } = require('chai');
// const app = require('../index');
// const mongoose = require('mongoose');
// const Testinstruction = require('../model/instruction');
// const assert = require('assert');
// mongoose.Promise = global.Promise;
// const Registration = new Admin({name:"Suchitra" ,email:"singhsuchi@gmail.com", password:"ssssss44", phone:7878787878,});

// before((done) =>{
//     mongoose.connect("mongodb://localhost/TestingAPIs", {useNewUrlParser: true, useUnifiedTopology: true });
//     mongoose.connection
//        .once('open', () => {
//          console.log("started");
//           done();  
//        })    
//        .on('error', (error) => {

//            console.log("your error" ,error);
//        });
// });
// before((done)=>{
//   mongoose.connection.collections.testinsrtuctions.drop(()=>{
//   done();
// })
// });
// //  const request = require('supertest');
// //  const { expect } = require('chai');
// //  const testinstructions = require('../model/instruction');
// //  const app = require('../index');
// //  const mongoose = require('mongoose');
// //  mongoose.Promise = global.Promise;

// //  //Test Instructions API Test case

// //  describe('POST  Test Instructions', () => {

// //      describe('POST testinstructions', () => {
  
// //        it('It should require college name.', async () => {
  
// //          const response = await request(app)
// //            .post('/api/user/testinstructions')
// //            .send({ college:'' })
// //            .expect(400);
// //          expect(response.body.message).toString('"college" is not allowed to be empty');
  
// //        });
// //      });
  
  
// //      describe('POST testinstructions', () => {
  
// //        it('To Add a new instructions', async () => {
  
// //          const newInstructions = {
// //            college: 'Nitra Technical Campus',
// //            message: 'You are not allowed to return back during the test'
// //          };
// //          const response = await request(app)
// //            .post('/api/user/testinstructions')
// //            .send(newInstructions)
// //            .expect(200);
// //          expect(response.body).to.have.property('instructions');
// //        });
// //        // beforeEach((done) => {
// //        //   mongoose.connection.db.dropCollection('testinstructions', (err, result) => {
// //        //     done();
// //        //   });
// //        // });
// //      });
// //    });
  
  
  
// //    // GET TEST INSTRUCTION API TEST CASE
  
// //    describe('GET Instructions', () => {
  
// //      describe('GET getinstructions', () => {
  
// //        it('It should not return anything.', async () => {
  
// //          const response = await request(app)
// //            .get('/api/user/getinstructions')
// //            .send({ college:'' })
// //            .expect(400);
// //          expect(response.body.message).toString('"college" is not allowed to be empty');
// //        });
// //      });
  
  
// //      describe('GET getinstructions', () => {
  
// //        it('To Get the intructions', async () => {
        
// //          const newInstructions = {
// //            college: 'RKGIT Ghaziabad'
// //          };
// //          const response = await request(app)
// //            .get('/api/user/getinstructions')
// //            .send(newInstructions)
// //            .expect(200);
// //          expect(response.body).to.have.property('_id', 'college', 'message' );
// //        });
// //      });
// //    });