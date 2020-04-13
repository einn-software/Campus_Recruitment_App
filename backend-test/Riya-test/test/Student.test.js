// const request = require('supertest');
// const { expect } = require('chai');
// const Student = require('../model/Student');
// const app = require('../index');

// // Student REGISTER Testing

// describe('POST Student Register', () => {

//     describe('POST studentregister', () => {
  
//       it('It should require student roll no.', async () => {
  
//         const response = await request(app)
//           .post('/register/student')
//           .send({ 
//             name:'suchitra',
//             email:'singh@email.com',
//             password:'rsrsrs',
//             phone:'9494949497' })
//           .expect(400);
//         expect(response.body.message).toString('"roll" is required');
  
//       });
//     });
  
  
//     describe('POST studentregister', () => {
  
//       it('To check if the email is valid or not ', async () => {
  
//         const response = await request(app)
//           .post('/register/student')
//           .send({
//             name:'suchitra',
//             email:'singhds',
//             password:'rsrsrs',
//             phone:'9494949497',
//             roll:'1680210058',
//             branch:'Computer science',
//             college:'Nitra Technical Campus'
//           })
  
//           .expect(400);
//         expect(response.body.message).toString('"email" must be a valid email');
     
//       });
//     });
  
  
//     describe('POST studentregister', () => {
  
//       it('To Register a new Student', async () => {
  
//         const newStudent = {
//           name: 'suchitra',
//           email: 'singh@email.com',
//           password: 'rsrsrs',
//           phone: '9494949497',
//           roll:'1680210058',
//           branch:'Computer science',
//           college: 'Nitra Technical Campus'
//         };
  
//         const response = await request(app)
//           .post('/register/student')
//           .send(newStudent)
//           .expect(400);
//         expect(response.body).to.have.property('student');
//       });
//     });
//   });

//   // Student Login API TEST CASE
// describe('POST /api/user/studentlogin', () => {
//     it('should require a email', async () => {
//       const response = await request(app)
//         .post('/login/student')
//         .send({
//           email:"l@gmail.com",
//           password:"testtesttest"
//         })
//         .expect(400);
//       expect(response.body.message).toString('Email not found');
//     });
//     it('should not allow the user having wrong password', async () => {
//       const response = await request(app)
//         .post('/login/student')
//         .send({ email: 'rsinghal@gmail.com', password: 'rgsfdgr' })
//         .expect(400);
//       expect(response.body.message).toString('Invalid password');
//     });
//     it('should only allow valid users to login', async () => {
//       const newUser = {
//         email:"rsinghal@gmail.com",
//         password:"15787851"
//       }
//       const response = await request(app)
//         .post('/login/student')
//         .send(newUser)
//         .expect(200);
//       expect(response.body.message).to.have.property('token');
//     });
//   });   