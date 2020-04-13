const request = require('supertest');
const { expect } = require('chai');
const app = require('../index');
const mongoose = require('mongoose');
const Admin = require('../model/Admin');
const assert = require('assert');
mongoose.Promise = global.Promise;

before((done) =>{
    mongoose.connect("mongodb://localhost/TestingModel", {useNewUrlParser: true, useUnifiedTopology: true });
    mongoose.connection
       .once('open', () => {
          // console.log("connected"))
          done();  
       })    
       .on('error', (error) => {
           console.log("your error" ,error);
       });
});

before((done) => {
    mongoose.connection.collections.admins.findOneAndDelete({email:"singhsuchi@gmail.com"},() =>{
        done();
    });
});  

describe("Create Tests", () => {
    it('It should not require extra path code', async () => {
  
        const response = await request(app)
        .post('/register/admin')
        .send({ 
                name:'suchitra',
                email:'singh@email.com',
                password:'rsrsrs',
                phone:'9494949497',
                code: '56464'
            })
        .expect(400);
        expect(response.body.message).toString('"code" is not allowed');
    });
    it('To check if the email is valid or not ', async () => {
  
        const response = await request(app)
          .post('/register/admin')
          .send({
            name:"suchitra",
            email:"singhcom",
            password:"rsrsrs",
            phone:"9494949497"
          })
          .expect(400);
        expect(response.body.message).toString('"email" must be a valid email');
  
      });
    it("Register a new Admin", () => {
       // assert(true);
       let reg = 0;
       const Registration = new Admin({name:"Suchitra" ,email:"singhsuchi@gmail.com", password:"ssssss44", phone:7878787878,});
                const response = request(app)
                .post('/register/admin')
                .send(Registration)
                .expect(200)
                Registration.save();
                Admin.find({email:"singhsuchi@gmail.com"})
                  .then((reg = 0)=>{
                   done();
                  })
                  .catch((error) => {
                    console.log("error",error);
                  });
    });
  });

describe('POST /login/admin', () => {
    it('should require a email', async () => {
      const response = await request(app)
        .post('/login/admin')
        .send({
          email:"l@gmail.com",
          password:"testtesttest"
        })
        .expect(400);
      expect(response.body.message).toString('Email not found');
    });
    it('should require a valid email', async () => {
      const response = await request(app)
        .post('/login/admin')
        .send({ email: 'testuser' })
        .expect(400);
      expect(response.body.message).toString('"email" must be a valid email');
    });
    it('should not allow the user having wrong password', async () => {
      const response = await request(app)
        .post('/login/admin')
        .send({ email: 'singhsuchi@gmail.com', password: 'rgsfdgr' })
        .expect(400);
      expect(response.body.message).toString('Invalid password');
    });
    it('should only allow valid users to login', async () => {
      const newUser = {
        email:"singhsuchi@gmail.com",
        password:"ssssss44"
      }
      const response = await request(app)
        .post('/login/admin')
        .send(newUser)
        //.expect(200);
        // console.log(response)
    });
  }); 