const request = require('supertest');
const { expect } = require('chai');
const app = require('../index');
const mongoose = require('mongoose');
const questionCollection = require('../model/questionCollections');
mongoose.Promise = global.Promise;
const Registration = new questionCollection({question:"what is the capital of india?" ,topic:"G.K", options:[{option1:"Mumbai"},{option2:"Kerala"},{option3:"Delhi"},{option4:"Lucknow"}], answer:"Delhi", weight:6 });

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
  mongoose.connection.collections.questioncollections.drop(()=>{
  done();
})
});
describe("Create Tests", () => {
    it('It should not require extra path ', async () => {
  
        const response = await request(app)
        .post('/questionCollection')
        .send({ 
            question:"what is the capital of india?" ,
            topic:"G.K", 
            options:[{option1:"Mumbai",option2:"Kerala",option3:"Delhi",option4:"Lucknow"}], 
            answer:"Delhi", 
            weight:"6", 
            designation: "TPO"
            })
        .expect(400);
        expect(response.text).to.equal('"designation" is not allowed');
    });

    it("QuestionCollection", () => {
             request(app)
                .post('/questionCollection')
                .send(Registration)
                .expect(200)
              Registration.save();
    });
})



  describe('The GET method', async()=>{
    it('should get the questionCollection', () => {
      Registration.save().then((user)=>{
          const id = Registration._id
          request(app)
          .get(`/questionCollection/${id}`)
          .send()
          questionCollection.findByIdAndDelete({_id:id}).then(()=>{
            expect(200)
          })
      })
    })
  });

    describe('The DELETE method', async()=>{
      it('should delete the questionCollection', () => {
        Registration.save().then((user)=>{
            const id = Registration._id
            request(app)
            .delete(`/questionCollection/${id}`)
            .send()
            questionCollection.findByIdAndDelete({_id:id}).then(()=>{
              expect(200)
            })
        })
      })
    });

    describe('The Update method', async()=>{
      it('should update the questionCollection', () => {
        Registration.save().then((user)=>{
            const id = Registration._id
             request(app)
            .put(`/questionCollection/${id}`)
            .send({topic:"G.K"})
              Registration.set({topic:"C.S"})
              Registration.save()
              expect(200)
            })
        })
      })
      
