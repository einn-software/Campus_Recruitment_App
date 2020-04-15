const request = require('supertest');
const { expect } = require('chai');
const app = require('../index');
const mongoose = require('mongoose');
const College = require('../model/College');
mongoose.Promise = global.Promise;
const Registration = new College({name:"Suchitra" ,email:"singhsuchi@gmail.com", password:"ssssss44", phone:7878787878, code:223 ,address:"avantika" });

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
  mongoose.connection.collections.colleges.drop(()=>{
  done();
})
});
describe("Create Tests", () => {
    it('It should not require extra path code', async () => {
  
        const response = await request(app)
        .post('/register/college')
        .send({ 
                name:'suchitra',
                email:'singh@email.com',
                password:'rsrsrs',
                phone:'9494949497',
                code: '223',
                address: "Avantika",
                designation: "TPO"
            })
        .expect(400);
        expect(response.text).to.equal('"designation" is not allowed');
    });

    it("Register a new College", () => {
            
        request(app)
                .post('/register/college')
                .send(Registration)
                .expect(200)
              Registration.save();
    });
})


describe('POST /login/college', () => {
    it('should require a email', async () => {
      const response = await request(app)
        .post('/login/college')
        .send({
          email:"l@gmail.com",
          password:"testtesttest"
        })
        .expect(400);
      expect(response.text).to.equal('Email not found');
    });
    it('should require a valid email', async () => {
      const response = await request(app)
        .post('/login/college')
        .send({ email: 'testuser' })
        .expect(400);
      expect(response.text).to.equal('Unable to login - the email must be a valid email');
    });
    it('should not allow the user having wrong password', async () => {
      const response = await request(app)
        .post('/login/college')
        .send({ email: 'singhsuchi@gmail.com', password: 'rgsfdgr' })
        .expect(400);
      expect(response.text).to.equal('Invalid password');
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

  describe('The GET method', ()=>{
    it('should get the college', () => {
      Registration.save().then((user)=>{
          const id = Registration._id
          request(app)
          .get(`/college/${id}`)
          .send()
          College.findByIdAndDelete({_id:id}).then(()=>{
            expect(200)
          })
      })
    })
  });

    describe('The DELETE method', ()=>{
      it('should delete the college', () => {
        Registration.save().then((user)=>{
            const id = Registration._id
            request(app)
            .delete(`/admin/${id}`)
            .send()
            College.findByIdAndDelete({_id:id}).then(()=>{
              expect(200)
            })
        })
      })
    });

    describe('The Update method', async()=>{
      it('should update the college', () => {
        Registration.save().then((user)=>{
            const id = Registration._id
             request(app)
            .put(`/college/${id}`)
            .send({name:"Riya"})
              Registration.set({name:"riya"})
              Registration.save()
              expect(200)
            })
        })
      })
