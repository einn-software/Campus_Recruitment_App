const request = require('supertest');
const { expect } = require('chai');
const Admin = require('../model/Admin');
const app = require('../index');
const db = require('mongoose');

// Admin Register Testing

describe('POST Admin Register', () => {
    // before(async () => {
    //   await Admin.remove({});
    // });
  
    describe('POST adminregister', () => {
  
      it('It should not require extra path code', async () => {
  
        const response = await request(app)
          .post('/api/user/adminregister')
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

    });
  
    describe('POST adminregister', () => {
  
      it('To check if the email is valid or not ', async () => {
  
        const response = await request(app)
          .post('/api/user/adminregister')
          .send({
            name:"suchitra",
            email:"singhcom",
            password:"rsrsrs",
            phone:"9494949497"
          })
          .expect(400);
        expect(response.body.message).toString('"email" must be a valid email');
  
      });
    });
      
    describe('POST adminregister', () => {
      it('To Register a new Admin', async () => {
        const newAdmin = {
          name: 'suchitra',
          email: 'singh@email.com',
          password: 'rsrsrs',
          phone: '9494949497'
        };
        const response = await request(app)
          .post('/api/user/adminregister')
          .send(newAdmin)
          .expect(400);
        // expect(response.body).to.have.property('admin');
      });
      const data = Admin.findOne({email:'singh@email.com'},(function(res){
        if(data){console.log(data);}
       }));
    });
  }); 
    // ADMIN Login API TEST CASE
  describe('POST /api/user/adminlogin', () => {
    it('should require a email', async () => {
      const response = await request(app)
        .post('/api/user/adminlogin')
        .send({
          email:"l@gmail.com",
          password:"testtesttest"
        })
        .expect(400);
      expect(response.body.message).toString('Email not found');
    });
    it('should require a valid email', async () => {
      const response = await request(app)
        .post('/api/user/adminlogin')
        .send({ email: 'testuser' })
        .expect(400);
      expect(response.body.message).toString('"email" must be a valid email');
    });
    it('should not allow the user having wrong password', async () => {
      const response = await request(app)
        .post('/api/user/adminlogin')
        .send({ email: 'rsinghal@gmail.com', password: 'rgsfdgr' })
        .expect(400);
      expect(response.body.message).toString('Invalid password');
    });
    it('should only allow valid users to login', async () => {
      const newUser = {
        email:"pragya@gmail.com",
        password:"15787851"
      }
      const response = await request(app)
        .post('/api/user/adminlogin')
        .send(newUser)
        .expect(200);
      expect(response.body).to.have.property('token');
    });
  }); 