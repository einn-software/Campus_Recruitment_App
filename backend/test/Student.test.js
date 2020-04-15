const request = require('supertest');
const { expect } = require('chai');
const app = require('../index');
const mongoose = require('mongoose');
const Student = require('../model/Student');
mongoose.Promise = global.Promise;
const Registration = new Student({name:"Shikha" ,email:"gshikha@gmail.com", password:"ssssss44", phone:"7878787878", roll:"201002" , branch:"Cmp. science" , college:"nitra technical campus" });

before((done) =>{
    mongoose.connect("mongodb://localhost/TestingAPIs", {useNewUrlParser: true, useUnifiedTopology: true });
    mongoose.connection
       .once('open', () => {
         console.log("started");
          done();  
       })    
       .on('error', (error) => {

           console.log("your error" ,error);
       });
});
before((done)=>{
  mongoose.connection.collections.students.drop(()=>{
  done();
})
});
describe("Create Tests", () => {
    it('It should not require extra path code', async () => {
  
        const response = await request(app)
        .post('/register/student')
        .send({ 
            name:"Shikha" ,
            email:"gshikha@gmail.com",
            password:"ssssss44", 
            phone:"7878787878",
            roll:"201002" ,
            branch:"Cmp. science" , 
            college:"nitra technical campus",
            designation: "TPO"
            })
        .expect(400);
        expect(response.text).to.equal('"designation" is not allowed');
    });

    it("Student", () => {
             request(app)
                .post('/register/student')
                .send(Registration)
                .expect(200)
              Registration.save();
    });
})

describe('POST /login/student', () => {
    
    it('should require a valid email', async () => {
      const response = await request(app)
        .post('/login/student')
        .send({ email: 'testuser' })
        .expect(400);
      expect(response.text).to.equal('Unable to login - the email must be a valid email');
    });
    it('should not allow the user having wrong password', async () => {
      const response = await request(app)
        .post('/login/admin')
        .send({ email: 'gshikha@gmail.com', password: 'rgsfdgr' })
        .expect(400);
      expect(response.text).to.equal('Email not found');
    });
    // it('should only allow valid users to login', async () => {
    //   const newUser = {
    //     email:"singhsuchi@gmail.com",
    //     password:"ssssss44"
    //   }
    //   const response = await request(app)
    //     .post('/login/admin')
    //     .send(newUser)
    //     .expect(200);
    // expect(response.text).to.contain.keys('token');
    // });
  }); 


  describe('The GET method', async()=>{
    it('should get the user', () => {
      Registration.save().then((user)=>{
          const id = Registration._id
          request(app)
          .get(`/student/${id}`)
          .send()
          Student.findByIdAndDelete({_id:id}).then(()=>{
            expect(200)
          })
      })
    })
  });

    describe('The DELETE method', ()=>{
      it('should delete the user', () => {
        Registration.save().then((user)=>{
            const id = Registration._id
            request(app)
            .delete(`/student/${id}`)
            .send()
            Student.findByIdAndDelete({_id:id}).then(()=>{
              expect(200)
            })
        })
      })
    });

    describe('The Update method', ()=>{
      it('should update the user', () => {
        Registration.save().then((user)=>{
            const id = Registration._id
             request(app)
            .put(`/student/${id}`)
            .send({roll:1234})
              Registration.set({roll:1235})
              Registration.save()
              expect(200)
            })
        })
      })
