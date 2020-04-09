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
<<<<<<< HEAD
=======

>>>>>>> f3a229d5d3af323918227544f287203a9e33746d

dotenv.config();
const app = require('../index');
// test database
const testdb = mongoose.connect(process.env.TEST_DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log('Connected to test db!'));
module.exports = testdb;



//College Register Testing

describe('POST College Register', () => {

  describe('POST collegeregister', () => {

    it('It should require college name', async () => {

      const response = await request(app)
        .post('/api/user/collegeregister')
        .send({ name: '' })
        .expect(400);
      expect(response.body.message).toString('"name" is not allowed to be empty');

    });
  });
<<<<<<< HEAD


  describe('POST collegeregister', () => {

=======
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
>>>>>>> f3a229d5d3af323918227544f287203a9e33746d
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
<<<<<<< HEAD
        .expect(400);
      expect(response.body).to.have.property({ college });

    });
=======
        .expect(200);
      expect(response.body).toString({ college: '5e8a3086b71f0a357c5baf29' });
    });
   beforeEach((done) => {
    mongoose.connection.db.dropCollection('colleges', (err, result) => {
      done();
      });
       });
>>>>>>> f3a229d5d3af323918227544f287203a9e33746d
  });
});


<<<<<<< HEAD

=======
>>>>>>> f3a229d5d3af323918227544f287203a9e33746d
// Admin Register Testing

describe('POST Admin Register', () => {

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
<<<<<<< HEAD

  describe('POST adminregister', () => {

    it('To check if the email is valid or not ', async () => {

=======
  describe('POST /auth/adminregister', () => {
    it('To check if the email is valid or not ', async () => {
>>>>>>> f3a229d5d3af323918227544f287203a9e33746d
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
<<<<<<< HEAD

=======
>>>>>>> f3a229d5d3af323918227544f287203a9e33746d
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
      expect(response.body).to.have.property('admin');
    });
    // beforeEach((done) => {
    //   mongoose.connection.collections.admins.drop(() => {
    //     done();
    //   });
    // });
  });
});



// Tpo Register Testing

describe('POST Tpo Register', () => {

  describe('POST tporegister', () => {

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



  describe('POST tporegister', () => {

    it('To check if the email is already exist ', async () => {

      const response = await request(app)
        .post('/api/user/tporegister')
        .send({
          name: 'suchitra',
<<<<<<< HEAD
          email: 'suchitrcom',
=======
          email: 'suchitra',
>>>>>>> f3a229d5d3af323918227544f287203a9e33746d
          password: 'rsrsrs',
          phone: '9494949497',
          designation:'Placement Officer',
          college: 'Nitra Technical Campus'
        })
        .expect(400);
      expect(response.body.message).toString('"email" must be a valid email');
<<<<<<< HEAD

=======
>>>>>>> f3a229d5d3af323918227544f287203a9e33746d
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
        .post('/api/user/tporegister')
        .send(newTpo)
        .expect(400);
      expect(response.body).to.have.property('tpo');
    });
    // beforeEach((done) => {
    //   mongoose.connection.db.dropCollection('Tpos', (err, result) => {
    //     done();
    //   });
    // });
  });
});



// Student REGISTER Testing

describe('POST Student Register', () => {

  describe('POST studentregister', () => {

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


  describe('POST studentregister', () => {

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


  describe('POST studentregister', () => {

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
      expect(response.body).to.have.property('student');
    });
    // beforeEach((done) => {
    //   mongoose.connection.db.dropCollection('Students', (err, result) => {
    //     done();
    //   });
    // });
  });
});



//Test Instructions API Test case

describe('POST  Test Instructions', () => {

  describe('POST testinstructions', () => {

    it('It should require college name.', async () => {

      const response = await request(app)
        .post('/api/user/testinstructions')
        .send({ college:'' })
        .expect(400);
      expect(response.body.message).toString('"college" is not allowed to be empty');

    });
  });


  describe('POST testinstructions', () => {

    it('To Add a new instructions', async () => {

      const newInstructions = {
        college: 'Nitra Technical Campus',
        message: 'You are not allowed to return back during the test'
      };
      const response = await request(app)
        .post('/api/user/testinstructions')
        .send(newInstructions)
        .expect(200);
      expect(response.body).to.have.property('instructions');
    });
    // beforeEach((done) => {
    //   mongoose.connection.db.dropCollection('testinstructions', (err, result) => {
    //     done();
    //   });
    // });
  });
});



// GET TEST INSTRUCTION API TEST CASE

describe('GET Instructions', () => {

  describe('GET getinstructions', () => {

    it('It should not return anything.', async () => {

      const response = await request(app)
        .get('/api/user/getinstructions')
        .send({ college:'' })
        .expect(400);
      expect(response.body.message).toString('"college" is not allowed to be empty');
    });
  });


  describe('GET getinstructions', () => {

    it('To Get the intructions', async () => {
      
      const newInstructions = {
        college: 'RKGIT Ghaziabad'
      };
      const response = await request(app)
        .get('/api/user/getinstructions')
        .send(newInstructions)
        .expect(200);
      expect(response.body).to.have.property('_id', 'college', 'message' );
    });
  });
});



// Result API Test case

describe('POST Result', () => {

  describe('POST result', () => {

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
<<<<<<< HEAD
      expect(response.body.message).toString('Student has already gave the test');

=======
      expect(response.body.message).toString('Student has already given the test');
>>>>>>> f3a229d5d3af323918227544f287203a9e33746d
    });
  });


  describe('POST result', () => {

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
      expect(response.body).to.have.property('Result');
    });
    // beforeEach((done) => {
    //   mongoose.connection.db.dropCollection('result', (err, result) => {
    //     done();
    //   });
    // });
  });
});



// GET RESULT API TEST CASES

describe('GET Result', () => {

  describe('GET /getresult', () => {

    it('It should require Student Id', async () => {

      const response = await request(app)
        .get('/api/user/getresult')
        .send({ student_id:'' })
        .expect(400);
      expect(response.body.message).toString('"student_id" is not allowed to be empty');
    });

  });


  describe('GET /getresult', () => {

    it('To Add a new result', async () => {

      const newResult = {
        student_id: "5e8ae96513b04611c00f033b"
      };

      const response = await request(app)
        .get('/api/user/getresult')
        .send(newResult)
        .expect(200);

      expect(response.body).to.have.property(
        '_id',
        'student_id',
        'question_paper_id',
        'question_attempt',
        'correct_attempt',
        'total_marks_scored',
      );
    });
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
    expect(response.body.message).to.have.property('token');
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
      email:"shresthDG@gmail.com",
      password:"15787851"
    }
    const response = await request(app)
      .post('/api/user/collegelogin')
      .send(newUser)
      .expect(200);
    expect(response.body.message).to.have.property('token');
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
      .post('/api/user/tpologin')
      .send(newUser)
      .expect(200);
    expect(response.body.message).to.have.property('token');
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
    expect(response.body.message).to.have.property('token');
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
  describe('POST /questionscollections', () => {
    it('To Add a new collection', async () => {
      const newcollection = {
        question:"5",
        topic:"Science",
        options:"4",
        answer:"3",
        weight:"2"
      };
      const response = await request(app)
        .post('/api/user/questionscollections')
        .send(newcollection)
        .expect(200);
      expect(response.body).toString({ questionCollection: "5e8cd171885de00cb0cc3aa8" });
    });
    // beforeEach((done) => {
    //   mongoose.connection.db.dropCollection('result', (err, result) => {
    //     done();
      // });
    // });
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
    it('To Add a new collection', async () => {
      const newcollection = {
        topic:"Social Science"
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


// Questions PAPERS API Test case
describe('POST /questionPapers', () => {
  describe('POST questionPapers', () => {
    it('It should give a message.', async () => {
      const response = await request(app)
        .post('/api/user/questionPapers')
        .send({})
        .expect(400);
      expect(response.body.message).toString('"question" is required');
    });
  });
  describe('POST questionPapers', () => {
    it('To Add a new collection', async () => {
      const newpaper = {
        question:"5",
        topic:"Science",
        options:"4",
        answer:"3",
        weight:"2"
      };
      const response = await request(app)
        .post('/api/user/questionPapers')
        .send(newpaper)
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

// GET QUESTION PAPER API TEST CASES
describe('GET questionPapers', () => {
  describe('GET questionPapers', () => {
    it('It should require Student Id', async () => {
      const response = await request(app)
        .get('/api/user/getquestionPapers')
        .send({ topic:'' })
        .expect(400);
      expect(response.body.message).toString('"topic" is not allowed to be empty');
    });
  });
  describe('GET questionPapers', () => {
    it('To Add a new paper', async () => {
      const newpaper = {
        topic:"Science"
      };
      const response = await request(app)
        .get('/api/user/getquestionPapers')
        .send(newpaper)
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
