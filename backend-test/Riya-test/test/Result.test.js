// const request = require('supertest');
// const { expect } = require('chai');
// const Results = require('../model/Results');
// const app = require('../index');

// // Result API Test case

// describe('POST Result', () => {

//     describe('POST result', () => {
  
//       it('It should give a message.', async () => {
  
//         const exist = {
//           student_id: "f033b",
//           question_paper_id: "2023",
//           question_attempt: "50",
//           correct_attempt: "30",
//           total_marks_scored: "20"
//         }
  
//         const response = await request(app)
//           .post('/api/user/result')
//           .send({ exist })
//           .expect(400);
//         expect(response.body.message).toString('Student has already gave the test');
  
//       });
//     });
  
  
//     describe('POST result', () => {
  
//       it('To Add a new result', async () => {
        
//         const newResult = {
//           student_id: "6998",
//           question_paper_id: "2990",
//           question_attempt: "80",
//           correct_attempt: "50",
//           total_marks_scored: "79"
//         };
  
//         const response = await request(app)
//           .post('/api/user/result')
//           .send(newResult)
//           .expect(400);
//         expect(response.body).to.have.property('Result');
//       });
//     });
//   });
  
  
  
//   // GET RESULT API TEST CASES
  
//   describe('GET Result', () => {
  
//     describe('GET /getresult', () => {
  
//       it('It should require Student Id', async () => {
  
//         const response = await request(app)
//           .get('/api/user/getresult')
//           .send({ student_id:'' })
//           .expect(400);
//         expect(response.body.message).toString('"student_id" is not allowed to be empty');
//       });
  
//     });
  
  
//     describe('GET /getresult', () => {
  
//       it('To Add a new result', async () => {
  
//         const newResult = {
//           student_id: "5e8ae96513b04611c00f033b"
//         };
  
//         const response = await request(app)
//           .get('/api/user/getresult')
//           .send(newResult)
//           .expect(200);
  
//         expect(response.body).to.have.property(
//           '_id',
//           'student_id',
//           'question_paper_id',
//           'question_attempt',
//           'correct_attempt',
//           'total_marks_scored',
//         );
//       });
//     });
//   });
  