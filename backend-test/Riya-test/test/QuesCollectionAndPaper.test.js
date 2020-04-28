//  const request = require('supertest');
//  const { expect } = require('chai');
//  const questionCollections = require('../model/questionCollections');
//  const questionPaper = require('../model/questionPaper');
//  const app = require('../index');

//  before((done) =>{
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
//     mongoose.connection.collections.questionCollections.findOneAndDelete({topic:"Science"},() =>{
//         done();
//     });
// });  


// //  // Questions collection API Test case
// //  describe('POST /QuestionCollection', () => {
// //    describe('POST /auth/questionCollections', () => {
// //      it('It should give a message.', async () => {
// //        const response = await request(app)
// //          .post('/api/user/questionCollections')
// //          .send({})
// //          .expect(400);
// //        expect(response.body.message).toString('"question" is required');
// //      });
// //    });
// //    describe('POST /questionscollections', () => {
// //      it('To Add a new collection', async () => {
// //        const newcollection = {
// //          question:"5",
// //          topic:"Science",
// //          options:"4",
// //          answer:"3",
// //          weight:"2"
// //        };
// //        const response = await request(app)
// //          .post('/api/user/questionscollections')
// //          .send(newcollection)
// //          .expect(200);
// //        expect(response.body).toString({ questionCollection: "5e8cd171885de00cb0cc3aa8" });
// //      });
// //    });
// //  });

// // // GET QUESTION COLLECTION API TEST CASES
// // describe('GET questionCollections', () => {
// //   describe('GET getquestionCollections', () => {
// //     it('It should require Student Id', async () => {
// //       const response = await request(app)
// //         .get('/api/user/getquestionCollections')
// //         .send({ topic:'' })
// //         .expect(400);
// //       expect(response.body.message).toString('"topic" is not allowed to be empty');
// //     });
// //   });
// //   describe('GET questionCollections', () => {
// //     it('To Add a new collection', async () => {
// //       const newcollection = {
// //         topic:"Social Science"
// //       };
// //       const response = await request(app)
// //         .get('/api/user/getquestionCollections')
// //         .send(newcollection)
// //         .expect(200);
// //       expect(response.body).toString({
// //         _id: "5e8cd171885de00cb0cc3aa8",
// //         question: 5,
// //         topic: "Science",
// //         options: 4,
// //         answer: 3,
// //         weight: 2,
// //         __v: 0
// //       });
// //     });
// //   });
// // });


// // // Questions PAPERS API Test case
// // describe('POST /questionPapers', () => {
// //   describe('POST questionPapers', () => {
// //     it('It should give a message.', async () => {
// //       const response = await request(app)
// //         .post('/api/user/questionPapers')
// //         .send({})
// //         .expect(400);
// //       expect(response.body.message).toString('"question" is required');
// //     });
// //   });
// //   describe('POST questionPapers', () => {
// //     it('To Add a new collection', async () => {
// //       const newpaper = {
// //         question:"5",
// //         topic:"Science",
// //         options:"4",
// //         answer:"3",
// //         weight:"2"
// //       };
// //       const response = await request(app)
// //         .post('/api/user/questionPapers')
// //         .send(newpaper)
// //         .expect(400);
// //       expect(response.body).toString({ questionCollection: "5e8cd171885de00cb0cc3aa8" });
// //     });
// //     beforeEach((done) => {
// //       mongoose.connection.db.dropCollection('result', (err, result) => {
// //         done();
// //       });
// //     });
// //   });
// // });

// // // GET QUESTION PAPER API TEST CASES
// // describe('GET questionPapers', () => {
// //   describe('GET questionPapers', () => {
// //     it('It should require Student Id', async () => {
// //       const response = await request(app)
// //         .get('/api/user/getquestionPapers')
// //         .send({ topic:'' })
// //         .expect(400);
// //       expect(response.body.message).toString('"topic" is not allowed to be empty');
// //     });
// //   });
// //   describe('GET questionPapers', () => {
// //     it('To Add a new paper', async () => {
// //       const newpaper = {
// //         topic:"Science"
// //       };
// //       const response = await request(app)
// //         .get('/api/user/getquestionPapers')
// //         .send(newpaper)
// //         .expect(200);
// //       expect(response.body).toString({
// //         _id: "5e8cd171885de00cb0cc3aa8",
// //         question: 5,
// //         topic: "Science",
// //         options: 4,
// //         answer: 3,
// //         weight: 2,
// //         __v: 0
// //       });
// //     });
// //   });
// // });
