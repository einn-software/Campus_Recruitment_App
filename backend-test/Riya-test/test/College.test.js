// const request = require('supertest');
// const { expect } = require('chai');
// const College = require('../model/College');
// const app = require('../index');
// const mongoose = require('mongoose');
// mongoose.Promise = global.Promise;
// const assert = require('assert');

// const college = new College({
//     name: 'suchitra',
//     email: 'suchitra@email.com',
//     password: 'rsrsrs',
//     phone: '9494949497',
//     code: '21004566',
//     address: 'NITRA Technical Campus',
//   });
// before((done) =>{
//     mongoose.connect("mongodb://localhost/TestingAPIs", {useNewUrlParser: true, useUnifiedTopology: true });
//     mongoose.connection
//        .once('open', () => {
//           // console.log("connected"))
//           done();  
//        })    
//        .on('error', (error) => {
//            console.log("your error" ,error);
//        });
// });

// before((done) => {
//     mongoose.connection.collections.colleges.findOneAndDelete({email:"suchitra@email.com"},() =>{
//         done();
//     });
// });  


// // College Register Testing

// describe('POST College Register', () => {

//  describe('POST collegeregister', () => {
  
//     it('It should require college name', async () => {
  
//          const response = await request(app)
//            .post('/register/college')
//            .send({ name: '' })
//            .expect(400);
//          expect(response.body.message).toString('"name" is not allowed to be empty');
  
//        });
    
//     });
  
  
//      describe('POST collegeregister', () => {
  
//        it('To Register a new College', async () => {
//          const response = await request(app)
//            .post('/register/college')
//            .send(college)
//            .expect(200);
//         college.save();
//        });
//      });
//    });

// // College Login API TEST CASE

//  describe('POST collegelogin', () => {
//      it('should require a email', async () => {
//        const response = await request(app)
//          .post('/login/college')
//          .send({
//            email:"l@gmail.com",
//            password:"testtesttest"
//          })
//          .expect(400);
//        expect(response.body.message).toString('Email not found');
//      });
//      it('should not allow the user having wrong password', async () => {
//        const response = await request(app)
//          .post('/login/college')
//          .send({ email: 'rsinghal@gmail.com', password: 'rgsfdgr' })
//          .expect(400);
//        expect(response.body.message).toString('Invalid password');
//      });
//      it('should only allow valid users to login', async () => {
//        const newUser = {
//          email:"shresthDG@gmail.com",
//          password:"15787851"
//        }
//        const response = await request(app)
//          .post('/login/college')
//          .send(newUser)
//          .expect(200);
//        expect(response.body.message).to.have.property('token');
//      });
//    });