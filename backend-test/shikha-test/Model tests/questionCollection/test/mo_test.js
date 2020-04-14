const questionCollections = require('../app/questionCollections')
const assert = require('assert');

describe("Create Tests", () => {

    it("Create", (done) => {
       // assert(true);

       const Registration = new questionCollections({question:"what is the capital of india?" ,topic:"G.K", options:[{option1:"Mumbai"},{option2:"Kerala"},{option3:"Delhi"},{option4:"Lucknow"}], answer:"Delhi", weight:6});
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
    Register = new questionCollections({question:"what is the capital of India?" ,topic:"G.K", options:[{option1:"Mumbai"},{option2:"Kerala"},{option3:"Delhi"},{option4:"Lucknow"}], answer:"Delhi", weight:6});
    Register.save()
    .then(()=> {
       done();
    });
 });
     it('Read',(done)=>{
 
       questionCollections.find({question:"what is the capital of India?"})
       .then((reg)=>{
 
          assert(Register._id.toString() === reg[0]._id.toString());
          done();
       });
 
    });
 });

  
  // All update test

  describe("Update Tests",()=>{
   let updater;
   beforeEach((done) =>{
     updater = new  questionCollections({question:"what is the capital of India?" ,topic:"G.K", options:[{option1:"Mumbai"},{option2:"Kerala"},{option3:"Delhi"},{option4:"Lucknow"}], answer:"Delhi", weight:6});
     updater.save()
     .then(() =>done());
   });

it('set and save', ()=>{
 updater.set({question:"what is the capital of Japan?" ,topic:"G.K", options:[{option1:"Tokyo"},{option2:"Kerala"},{option3:"Delhi"},{option4:"Lucknow"}], answer:"Tokyo", weight:6});
 updater.save()
   .then(() => questionCollections.find({}))
   .then(questionCollections => {
      assert(questionCollections[0].question !== 'what is the capital of India?');
   });

});
});

 
 //All delete tests
 
 describe("Delete Tests", ()=>{
    let deleter;
  
  beforeEach((done)=> {
     deleter = new questionCollections({question:"what is the capital of India?" ,topic:"G.K", options:[{option1:"Mumbai"},{option2:"Kerala"},{option3:"Delhi"},{option4:"Lucknow"}], answer:"Delhi", weight:6})
     deleter.save().then(()=> done());
  });
      it('Delete' ,(done)=>{
  
        questionCollections.findByIdAndDelete(deleter._id)
        .then(()=> questionCollections.findOne({question:"what is the capital of India?"}))
        .then((collection)=>{
         assert(collection == null);
        done();
        });
     });
  });
  
