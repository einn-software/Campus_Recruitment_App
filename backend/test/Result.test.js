/*const request = require('supertest');
const { expect } = require('chai');
const app = require('../index');
const mongoose = require('mongoose');
const Result = require('../model/Results');
mongoose.Promise = global.Promise;
const Registration = new Result({student_id:1234,question_paper_id:2222,question_attempt:"5",correct_attempt:"6",total_marks_scored:30 });

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
  mongoose.connection.collections.results.drop(()=>{
  done();
})
});
describe("Create Tests", () => {
    it('It should not require extra path code', async () => {
  
        const response = await request(app)
        .post('/result')
        .send({ 
            student_id:"1234",
            question_paper_id:"2222",
            question_attempt:"5",
            correct_attempt:"6",
            total_marks_scored:"30",
            designation: "TPO"
            })
        .expect(400);
        expect(response.text).to.equal('"designation" is not allowed');
    });

    it("Result", () => {
             request(app)
                .post('/result')
                .send(Registration)
                .expect(200)
              Registration.save();
    });
})



  describe('The GET method', async()=>{
    it('should get the result', () => {
      Registration.save().then((user)=>{
          const id = Registration._id
          request(app)
          .get(`/result/${id}`)
          .send()
          Result.findByIdAndDelete({_id:id}).then(()=>{
            expect(200)
          })
      })
    })
  });

    describe('The DELETE method', async()=>{
      it('should delete the result', () => {
        Registration.save().then((user)=>{
            const id = Registration._id
            request(app)
            .delete(`/result/${id}`)
            .send()
            Result.findByIdAndDelete({_id:id}).then(()=>{
              expect(200)
            })
        })
      })
    });

    describe('The Update method', async()=>{
      it('should update the result', () => {
        Registration.save().then((user)=>{
            const id = Registration._id
             request(app)
            .put(`/result/${id}`)
            .send({student_id:1234})
              Registration.set({student_id:1235})
              Registration.save()
              expect(200)
            })
        })
      })
      
*/