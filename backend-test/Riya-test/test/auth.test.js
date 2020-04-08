const request = require('supertest');
const { expect } = require('chai');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Admin = require('../model/Admin');
const College = require('../model/College');
const Tpo = require('../model/Tpo');
const Student = require('../model/Student');
const testinstructions = require('../model/instruction');
const Results = require('../model/Results');
const questionCollections = require('../model/questionCollections');
const questionPaper = require('../model/questionPaper')


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
          email: 'suchit@com',
          password: 'rsrsrs',
          phone: '9494949497',
          code: '21004566',
          address: 'NITRA Technical Campus',
        })
        .expect(400);
      expect(response.body.message).toString('"email" must be a valid email');
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
        .expect(200);
      expect(response.body).toString({ college: '5e8a3086b71f0a357c5baf29' });
    });
   beforeEach((done) => {
    mongoose.connection.db.dropCollection('colleges', (err, result) => {
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
          email: 'suchitra',
          password: 'rsrsrs',
          phone: '9494949497',
          designation:'Placement Officer',
          college: 'Nitra Technical Campus'
        })
        .expect(400);
      expect(response.body.message).toString('"email" must be a valid email');
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
      expect(response.body).toString({ student: '5e8ae96513b04611c00f033b' });
    });
    beforeEach((done) => {
      mongoose.connection.db.dropCollection('Students', (err, result) => {
        done();
      });
    });
  });
});

//Test Instructions API Test case
describe('POST /auth Test Instructions', () => {
  describe('POST /auth/testinstructions', () => {
    it('It should require college name.', async () => {
      const response = await request(app)
        .post('/api/user/testinstructions')
        .send({ college:'' })
        .expect(400);
      expect(response.body.message).toString('"college" is not allowed to be empty');
    });
  });
  describe('POST /auth/testinstructions', () => {
    it('To Add a new instructions', async () => {
      const newInstructions = {
        college: 'Nitra Technical Campus',
        message: 'You are not allowed to return back during the test'
      };
      const response = await request(app)
        .post('/api/user/testinstructions')
        .send(newInstructions)
        .expect(200);
      expect(response.body).toString({ instructions: '5e8b1f7d434e6a1de0a802eb' });
    });
    beforeEach((done) => {
      mongoose.connection.db.dropCollection('testinstructions', (err, result) => {
        done();
      });
    });
  });
});
// GET 
describe('GET /auth GET Instructions', () => {
  describe('GET /auth/getinstructions', () => {
    it('It should not return anything.', async () => {
      const response = await request(app)
        .get('/api/user/getinstructions')
        .send({ college:'' })
        .expect(400);
      expect(response.body.message).toString('"college" is not allowed to be empty');
    });
  });
  describe('GET /auth/getinstructions', () => {
    it('To Get the intructions', async () => {
      const newInstructions = {
        college: 'RKGIT Ghaziabad'
      };
      const response = await request(app)
        .get('/api/user/getinstructions')
        .send(newInstructions)
        .expect(200);
      expect(response.body).toString({   
      _id: "5e8c5a7558b83d2a9c4e03b1",
      college: "RKGIT Ghaziabad",
      message: "You are not allowed to return back during the test, so please don't open any other tab during the test",
      date: "2020-04-07T10:48:21.859Z",
      __v: 0 });
    });
    });
  });

// Result API Test case
describe('POST /auth Result', () => {
  describe('POST /auth/result', () => {
    it('It should give a message.', async () => {
      const exist = {
        student_id: "f033b",
        question_paper_id: "2023",
        question_attempt: "50",
        correct_attempt: "30",
        total_marks_scored: "20"
      }
      const response = await request(app)
        .post('/api/user/result')
        .send({ exist })
        .expect(400);
      expect(response.body.message).toString('Student has already given the test');
    });
  });
  describe('POST /auth/result', () => {
    it('To Add a new result', async () => {
      const newResult = {
        student_id: "6998",
        question_paper_id: "2990",
        question_attempt: "80",
        correct_attempt: "50",
        total_marks_scored: "79"
      };
      const response = await request(app)
        .post('/api/user/result')
        .send(newResult)
        .expect(400);
      expect(response.body).toString({ Result: "5e8c6ec7a3bd4e0b5c00da50" });
    });
    beforeEach((done) => {
      mongoose.connection.db.dropCollection('result', (err, result) => {
        done();
      });
    });
  });
});
// GET RESULT API TEST CASES
describe('GET /auth GET Result', () => {
  describe('GET /auth/getresult', () => {
    it('It should require Student Id', async () => {
      const response = await request(app)
        .get('/api/user/getresult')
        .send({ student_id:'' })
        .expect(400);
      expect(response.body.message).toString('"student_id" is not allowed to be empty');
    });
  });
  describe('GET /auth/getresult', () => {
    it('To Add a new result', async () => {
      const newResult = {
        student_id: "5e8ae96513b04611c00f033b"
      };
      const response = await request(app)
        .get('/api/user/getresult')
        .send(newResult)
        .expect(200);
      expect(response.body).toString({
        _id: "5e8c55e12dab9a3a7c7e6cb9",
        student_id: "f033b",
        question_paper_id: "2023",
        question_attempt: "50",
        correct_attempt: "30",
        total_marks_scored: "20",
        date: "2020-04-07T10:28:49.944Z",
        __v: 0
      });
      });
    });
});

// ADMIN Login API TEST CASE
describe('POST /api/user/collegelogin', () => {
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
      email:"rsinghal@gmail.com",
      password:"15787851"
    }
    const response = await request(app)
      .post('/api/user/adminlogin')
      .send(newUser)
      .expect(200);
    expect(response.body.message).toString("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZThjYjBjZGRlNDBiOTI3NGNhNWE5NTEiLCJpYXQiOjE1ODYyNzkyMDh9.wkorI7gdYsj8AXr-faWVy6WeLkKCCoFX9fNGO2orthk");
  });
}); 
// College Login API TEST CASE
describe('POST /api/user/collegelogin', () => {
  it('should require a email', async () => {
    const response = await request(app)
      .post('/api/user/collegelogin')
      .send({
        email:"l@gmail.com",
        password:"testtesttest"
      })
      .expect(400);
    expect(response.body.message).toString('Email not found');
  });
  it('should not allow the user having wrong password', async () => {
    const response = await request(app)
      .post('/api/user/collegelogin')
      .send({ email: 'rsinghal@gmail.com', password: 'rgsfdgr' })
      .expect(400);
    expect(response.body.message).toString('Invalid password');
  });
  it('should only allow valid users to login', async () => {
    const newUser = {
      email:"rsinghal@gmail.com",
      password:"15787851"
    }
    const response = await request(app)
      .post('/api/user/collegelogin')
      .send(newUser)
      .expect(200);
    expect(response.body.message).toString("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZThjYjU2YmNiNjYyOTJlYTRjZjgwMTEiLCJpYXQiOjE1ODYyNzk4MjF9.o-C4Kp_zeQck-BDCFNssXwttzJ0xd7DkHfRQIgE3Wto");
  });
}); 

// Tpo Login API TEST CASE
describe('POST /api/user/tpologin', () => {
  it('should require a email', async () => {
    const response = await request(app)
      .post('/api/user/tpologin')
      .send({
        email:"l@gmail.com",
        password:"testtesttest"
      })
      .expect(400);
    expect(response.body.message).toString('Email not found');
  });
  it('should not allow the user having wrong password', async () => {
    const response = await request(app)
      .post('/api/user/tpologin')
      .send({ email: 'rsinghal@gmail.com', password: 'rgsfdgr' })
      .expect(400);
    expect(response.body.message).toString('Invalid password');
  });
  it('should only allow valid users to login', async () => {
    const newUser = {
      email:"rsinghal@gmail.com",
      password:"15787851"
    }
    const response = await request(app)
      .post('/api/user/tpologin')
      .send(newUser)
      .expect(200);
    expect(response.body.message).toString("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZThjYjhjZmMyODhiMDE5NjQwZjVjY2MiLCJpYXQiOjE1ODYyODA3MTF9.sYtvVkXQXziguEjFx6BR-qEDvc9AQZYuOGJ0aMPvYpw");
  });
}); 

// Student Login API TEST CASE
describe('POST /api/user/studentlogin', () => {
  it('should require a email', async () => {
    const response = await request(app)
      .post('/api/user/studentlogin')
      .send({
        email:"l@gmail.com",
        password:"testtesttest"
      })
      .expect(400);
    expect(response.body.message).toString('Email not found');
  });
  it('should not allow the user having wrong password', async () => {
    const response = await request(app)
      .post('/api/user/studentlogin')
      .send({ email: 'rsinghal@gmail.com', password: 'rgsfdgr' })
      .expect(400);
    expect(response.body.message).toString('Invalid password');
  });
  it('should only allow valid users to login', async () => {
    const newUser = {
      email:"rsinghal@gmail.com",
      password:"15787851"
    }
    const response = await request(app)
      .post('/api/user/studentlogin')
      .send(newUser)
      .expect(200);
    expect(response.body.message).toString("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZThjYjk4MmMyODhiMDE5NjQwZjVjY2QiLCJpYXQiOjE1ODYyODA5ODh9.WYjZOEpOd0Qw8OTavWrQmNwHTDCPSz3GQNyPRuRFlk8");
  });
}); 

// Questions collection API Test case
describe('POST /QuestionCollection', () => {
  describe('POST /auth/questionCollections', () => {
    it('It should give a message.', async () => {
      const response = await request(app)
        .post('/api/user/questionCollections')
        .send({})
        .expect(400);
      expect(response.body.message).toString('"question" is required');
    });
  });
  describe('POST /auth/result', () => {
    it('To Add a new collection', async () => {
      const newcollection = {
        question:"5",
        topic:"Science",
        options:"4",
        answer:"3",
        weight:"2"
      };
      const response = await request(app)
        .post('/api/user/result')
        .send(newcollection)
        .expect(400);
      expect(response.body).toString({ questionCollection: "5e8cd171885de00cb0cc3aa8" });
    });
    beforeEach((done) => {
      mongoose.connection.db.dropCollection('result', (err, result) => {
        done();
      });
    });
  });
});

// GET QUESTION COLLECTION API TEST CASES
describe('GET questionCollections', () => {
  describe('GET getquestionCollections', () => {
    it('It should require Student Id', async () => {
      const response = await request(app)
        .get('/api/user/getquestionCollections')
        .send({ topic:'' })
        .expect(400);
      expect(response.body.message).toString('"topic" is not allowed to be empty');
    });
  });
  describe('GET questionCollections', () => {
    it('To Add a new result', async () => {
      const newcollection = {
        topic:"Science"
      };
      const response = await request(app)
        .get('/api/user/getquestionCollections')
        .send(newcollection)
        .expect(200);
      expect(response.body).toString({
        _id: "5e8cd171885de00cb0cc3aa8",
        question: 5,
        topic: "Science",
        options: 4,
        answer: 3,
        weight: 2,
        __v: 0
      });
      });
    });
});