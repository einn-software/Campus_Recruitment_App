const questionPaper = require('../app/questionPaper');
const assert = require('assert');

describe("Create Tests", () => {

    it("Create", (done) => {
       // assert(true);

       const Registration = new questionPaper({question:12 ,topic:"MongoDb", options:4, answer:3, weight:6});
       Registration.save()
             .then(() => {
                assert( !Registration.isNew); //if instruct is saved to db then it is not new
                done(); 
             })
            .catch((error) => {
                console.log("error",error);
            });
    
    });

});

//All read Tests

describe("Read Tests", ()=>{
   let Register;
 
 beforeEach((done)=> {
    Register = new questionCollections({question:12 ,topic:"MongoDb", options:4, answer:3, weight:6})
    Register.save()
    .then(()=> {
       done();
    });
 });
     it('Read',(done)=>{
 
       questionCollections.find({question:12 ,topic:"MongoDb", options:4, answer:3, weight:6})
       .then((reg)=>{
 
          assert(questionCollections._id.toString() === reg[0]._id.toString());
          done();
       });
 
    });
 });
 
 //All delete tests
 
 describe("Delete Tests", ()=>{
    let questionCollection;
  
  beforeEach((done)=> {
     questionCollection = new questionCollections({question:12 ,topic:"MongoDb", options:4, answer:3, weight:6})
     questionCollection.save().then(()=> done());
  });
      it('Delete' ,(done)=>{
  
        questionCollections.findByIdAndDelete(Tpos._id)
        .then(()=> questionCollections.findOne({name:"Shikha" }))
          .then(()=>{
            assert(questionCollections== null);
           done();
        })
        .catch((error),()=>{
             console.log("error",error);
        });
  
     });
  });
  
