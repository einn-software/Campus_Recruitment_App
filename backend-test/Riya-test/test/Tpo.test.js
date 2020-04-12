const request = require('supertest');
const { expect } = require('chai');
const Tpo = require('../model/Tpo');
const app = require('../index');

// Tpo Register Testing

describe('POST Tpo Register', () => {

    describe('POST tporegister', () => {
  
      it('It should require tpo designation', async () => {
  
        const response = await request(app)
          .post('/register/tpo')
          .send({ 
            name:'suchitra',
            email:'singh@email.com',
            password:'rsrsrs',
            phone:'9494949497' })
          .expect(400);
        expect(response.body.message).toString('"designation" is required');
  
      });
    });
  
  
  
    describe('POST tporegister', () => {
  
      it('To check if the email is already exist ', async () => {
  
        const response = await request(app)
          .post('/register/tpo')
          .send({
            name: 'suchitra',
            email: 'suchitrcom',
            password: 'rsrsrs',
            phone: '9494949497',
            designation:'Placement Officer',
            college: 'Nitra Technical Campus'
          })
          .expect(400);
        expect(response.body.message).toString('"email" must be a valid email');
  
      });
    });
  
  
    describe('POST tporegister', () => {
  
      it('To Register a new Tpo', async () => {
  
        const newTpo = {
          name: 'suchitra',
          email: 'singh@email.com',
          password: 'rsrsrs',
          phone: '9494949497',
          designation:'Placement Officer',
          college: 'Nitra Technical Campus'
        };
  
        const response = await request(app)
          .post('/register/tpo')
          .send(newTpo)
          .expect(400);
        expect(response.body).to.have.property('tpo');
      });
    });
  });

  // Tpo Login API TEST CASE
describe('POST /login/tpo', () => {
    it('should require a email', async () => {
      const response = await request(app)
        .post('/login/tpo')
        .send({
          email:"l@gmail.com",
          password:"testtesttest"
        })
        .expect(400);
      expect(response.body.message).toString('Email not found');
    });
    it('should not allow the user having wrong password', async () => {
      const response = await request(app)
        .post('/login/tpo')
        .send({ email: 'ssinghal@gmail.com', password: 'rgsfdgr' })
        .expect(400);
      expect(response.body.message).toString('Invalid password');
    });
    it('should only allow valid users to login', async () => {
      const newUser = {
        email:"ssinghal@gmail.com",
        password:"15787851"
      }
      const response = await request(app)
        .post('/login/tpo')
        .send(newUser)
        .expect(200);
      expect(response.body.message).to.have.property('token');
    });
  });   