const request = require('supertest');
const { expect } = require('chai');
const app = require('../index');
const mongoose = require('mongoose');
const questionPaper = require('../model/questionPaper');
mongoose.Promise = global.Promise;
const Registration = new questionPaper({date:"2020-12-02", max_marks:50,max_time:3,college_id:23456,section:[{name:"history"},{marks:10},{numofQuestion:5},{questionIdList:4}]});

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
  mongoose.connection.collections.questionpapers.drop(()=>{
  done();
})
});
describe("Create Tests", () => {
    it('It should not require extra path ', async () => {
  
        const response = await request(app)
        .post('/questionPaper')
        .send({ 
            date:"2020-12-02", 
            max_marks:50,
            max_time:3,
            college_id:23456,
            sections:[{name:"history", marks:10, numOfQuestion:5, questionIdList:4}],
            designation: "TPO"
            })
        .expect(400);
        expect(response.text).to.equal('"designation" is not allowed');
    });

    it("QuestionPaper", () => {
             request(app)
                .post('/questionPaper')
                .send(Registration)
                .expect(200)
              Registration.save();
    });
})



  describe('The GET method', async()=>{
    it('should get the questionPaper', () => {
      Registration.save().then((user)=>{
          const id = Registration._id
          request(app)
          .get(`/questionPaper/${id}`)
          .send()
          questionPaper.findByIdAndDelete({_id:id}).then(()=>{
            expect(200)
          })
      })
    })
  });

    describe('The DELETE method', async()=>{
      it('should delete the questionPaper', () => {
        Registration.save().then((user)=>{
            const id = Registration._id
            request(app)
            .delete(`/questionCollection/${id}`)
            .send()
            questionPaper.findByIdAndDelete({_id:id}).then(()=>{
              expect(200)
            })
        })
      })
    });

    describe('The Update method', async()=>{
      it('should update the questionPaper', () => {
        Registration.save().then((user)=>{
            const id = Registration._id
             request(app)
            .put(`/questionPaper/${id}`)
            .send({college_id:23456})
              Registration.set({topic:23457})
              Registration.save()
              expect(200)
            })
        })
      })
      
