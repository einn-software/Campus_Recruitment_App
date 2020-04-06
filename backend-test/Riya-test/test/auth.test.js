const request = require('supertest');
const { expect } = require('chai');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();
const app = require('../index');
// test database
const testdb = mongoose.connect(process.env.TEST_DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log('Connected to test db!'));
module.exports = testdb;

//College Register Testing
describe('POST /auth  College Register', () => {
  describe('POST /auth/collegeregister', () => {
    it('It should require college name', async () => {
      const response = await request(app)
        .post('/api/user/collegeregister')
        .send({ name: '' })
        .expect(400);
      expect(response.body.message).toString('"name" is not allowed to be empty');
    });
  });
  describe('POST /auth/collegeregister', () => {
    it('To check if the email is already exist ', async () => {
      const response = await request(app)
        .post('/api/user/collegeregister')
        .send({
          name: 'suchitra',
          email: 'suchitra@email.com',
          password: 'rsrsrs',
          phone: '9494949497',
          code: '21004566',
          address: 'NITRA Technical Campus',
        })
        .expect(400);
      expect(response.body.message).toString('Email already exist');
    });
  });
  describe('POST /auth/collegeregister', () => {
    it('To Register a new College', async () => {
      const newCollege = {
        name: 'suchitra',
        email: 'suchitra@email.com',
        password: 'rsrsrs',
        phone: '9494949497',
        code: '21004566',
        address: 'NITRA Technical Campus',
      };
      const response = await request(app)
        .post('/api/user/collegeregister')
        .send(newCollege)
        .expect(400);
      expect(response.body).toString({ college: '5e8a3086b71f0a357c5baf29' });
    });
    beforeEach((done) => {
      mongoose.connection.db.dropCollection('Colleges', (err, result) => {
        done();
      });
    });
  });
});

// Admin Register Testing
describe('POST /auth  Admin Register', () => {
  describe('POST /auth/adminregister', () => {
    it('It should not require extra path code', async () => {
      const response = await request(app)
        .post('/api/user/adminregister')
        .send({ 
          name:'suchitra',
          email:'singh@email.com',
          password:'rsrsrs',
          phone:'9494949497',
          code: '56464' })
        .expect(400);
      expect(response.body.message).toString('"code" is not allowed');
    });
  });
  describe('POST /auth/adminregister', () => {
    it('To check if the email is already exist ', async () => {
      const response = await request(app)
        .post('/api/user/adminregister')
        .send({
          name:"suchitra",
          email:"singh@email.com",
          password:"rsrsrs",
          phone:"9494949497"
        })
        .expect(400);
      expect(response.body.message).toString('Email already exist');
    });
  });
  describe('POST /auth/adminregister', () => {
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
      expect(response.body).toString({ admin: '5e8ae4303705ad1f4817a9bc' });
    });
    beforeEach((done) => {
      mongoose.connection.db.dropCollection('Admins', (err, result) => {
        done();
      });
    });
  });
});

// Tpo Register Testing
describe('POST /auth  Tpo Register', () => {
  describe('POST /auth/tporegister', () => {
    it('It should require tpo designation', async () => {
      const response = await request(app)
        .post('/api/user/tporegister')
        .send({ 
          name:'suchitra',
          email:'singh@email.com',
          password:'rsrsrs',
          phone:'9494949497' })
        .expect(400);
      expect(response.body.message).toString('"designation" is required');
    });
  });
  describe('POST /auth/tporegister', () => {
    it('To check if the email is already exist ', async () => {
      const response = await request(app)
        .post('/api/user/tporegister')
        .send({
          name: 'suchitra',
          email: 'suchitra@email.com',
          password: 'rsrsrs',
          phone: '9494949497',
          designation:'Placement Officer',
          college: 'Nitra Technical Campus'
        })
        .expect(400);
      expect(response.body.message).toString('Email already exist');
    });
  });
  describe('POST /auth/tporegister', () => {
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
        .post('/api/user/tporegister')
        .send(newTpo)
        .expect(400);
      expect(response.body).toString({ "tpo": '5e8ae71e4c579a0e6c1867e8' });
    });
    beforeEach((done) => {
      mongoose.connection.db.dropCollection('Tpos', (err, result) => {
        done();
      });
    });
  });
});
// Student Testing
describe('POST /auth  Student Register', () => {
  describe('POST /auth/studentregister', () => {
    it('It should require student roll no.', async () => {
      const response = await request(app)
        .post('/api/user/studentregister')
        .send({ 
          name:'suchitra',
          email:'singh@email.com',
          password:'rsrsrs',
          phone:'9494949497' })
        .expect(400);
      expect(response.body.message).toString('"roll" is required');
    });
  });
  describe('POST /auth/studentregister', () => {
    it('To check if the email is valid or not ', async () => {
      const response = await request(app)
        .post('/api/user/studentregister')
        .send({
          name:'suchitra',
          email:'singhds',
          password:'rsrsrs',
          phone:'9494949497',
          roll:'1680210058',
          branch:'Computer science',
          college:'Nitra Technical Campus'
        })
        .expect(400);
      expect(response.body.message).toString('"email" must be a valid email');
    });
  });
  describe('POST /auth/studentregister', () => {
    it('To Register a new Student', async () => {
      const newStudent = {
        name: 'suchitra',
        email: 'singh@email.com',
        password: 'rsrsrs',
        phone: '9494949497',
        roll:'1680210058',
        branch:'Computer science',
        college: 'Nitra Technical Campus'
      };
      const response = await request(app)
        .post('/api/user/studentregister')
        .send(newStudent)
        .expect(400);
      expect(response.body).toString({ student: '5e8ae96513b04611c00f033b"' });
    });
    beforeEach((done) => {
      mongoose.connection.db.dropCollection('Students', (err, result) => {
        done();
      });
    });
  });
});