const questionCollections = require('../app/questionCollections');
const assert = require('assert');

describe("Create Tests", () => {

    it("Create", (done) => {
       // assert(true);

       const Registration = new questionCollections({question:12 ,topic:"MongoDb", options:4, answer:3, weight:6});
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

  
  // All update test

  describe("Update Tests",()=>{
   let updater;
   beforeEach((done) =>{
     updater = new  questionCollections({question:12 ,topic:"MongoDb", options:4, answer:3, weight:6});
     updater.save()
     .then(() =>done());
   });

it('set and save', ()=>{
 updater.set({question:15 ,topic:"MongoDb mong", options:4, answer:8, weight:8});
 updater.save()
   .then(() => questionCollection.find({}))
   .then(questionCollections => {
      assert(questionCollection[0].question !== '12');
   });

});
});

 
 //All delete tests
 
 describe("Delete Tests", ()=>{
    let deleter;
  
  beforeEach((done)=> {
     deleter = new questionCollections({question:12 ,topic:"MongoDb", options:4, answer:3, weight:6})
     deleter.save().then(()=> done());
  });
      it('Delete' ,(done)=>{
  
        questionCollections.findByIdAndDelete(deleter._id)
        .then(()=> questionCollections.findOne({question:12 }))
        .then((Results)=>{
         assert(Results == null);
        done();
        });
        
  
     });
  });
  
