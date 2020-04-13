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
        expect(response.text).to.equal('"code" is not allowed');
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
                Admin.findOne({email:"singhsuchi@gmail.com"},function(Registration){
                     console.log(Registration);
                  })
                  // .catch((error) => {
                  //   console.log("error",error);
                  // });
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
      expect(response.text).to.equal('Email not found');
    });
    it('should require a valid email', async () => {
      const response = await request(app)
        .post('/login/admin')
        .send({ email: 'testuser' })
        .expect(400);
      expect(response.text).to.equal('Unable to login - the email must be a valid email');
    });
    it('should not allow the user having wrong password', async () => {
      const response = await request(app)
        .post('/login/admin')
        .send({ email: 'singhsuchi@gmail.com', password: 'rgsfdgr' })
        .expect(400);
      expect(response.text).to.equal('Invalid password');
    });
    it('should only allow valid users to login', async () => {
      const newUser = {
        email:"singhsuchi@gmail.com",
        password:"ssssss44"
      }

      const response = await request(app)
        .post('/login/admin')
        .send(newUser)
        .expect(200);
    expect(response.text).to.equal('Unable to login - the email must be a valid email');
    });
  }); 
  it('should delete the user', async() => {
    const response = await request(app)
    .delete('/admin/:id')
    .send({name:"Singh"})
    Admin.findOne({email:"singhsuchi@gmail.com"},()=>{
      
    expect(200)
    expect(response.text).to.equal('Your account has been succesfully deleted')
  });
  })
});

