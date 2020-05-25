/*const request = require('supertest');
const { expect } = require('chai');
const app = require('../index');
const mongoose = require('mongoose');
const testinstructions = require('../model/instruction');
mongoose.Promise = global.Promise;
const Registration = new testinstructions({college:"Nitra tech" ,message:"This is a test message" });

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
  mongoose.connection.collections.testinstructions.drop(()=>{
  done();
})
});
describe("Create Tests", () => {
    it('It should not require extra path code', async () => {
  
        const response = await request(app)
        .post('/instructions')
        .send({ 
            college:"Nitra tech" ,
            message:"This is a test message",
            designation:"TPO"
        })
        .expect(400);
        expect(response.text).to.equal('"designation" is not allowed');
    });

    it("Result", () => {
             request(app)
                .post('/instructions')
                .send(Registration)
                .expect(200)
              Registration.save();
    });
})



  describe('The GET method', async()=>{
    it('should get the test instructions', () => {
      Registration.save().then((user)=>{
          const id = Registration._id
          request(app)
          .get(`/instructions/${id}`)
          .send()
          testinstructions.findByIdAndDelete({_id:id}).then(()=>{
            expect(200)
          })
      })
    })
  });

    describe('The DELETE method', async()=>{
      it('should delete the test instructions', () => {
        Registration.save().then((user)=>{
            const id = Registration._id
            request(app)
            .delete(`/instructions/${id}`)
            .send()
            testinstructions.findByIdAndDelete({_id:id}).then(()=>{
              expect(200)
            })
        })
      })
    });

    describe('The Update method', async()=>{
      it('should update the test instructions', () => {
        Registration.save().then((user)=>{
            const id = Registration._id
             request(app)
            .put(`/instructions/${id}`)
            .send({college:"Nitra Tech"})
              Registration.set({college:"Nitra Tech"})
              Registration.save()
              expect(200)
            })
        })
      })
      
*/