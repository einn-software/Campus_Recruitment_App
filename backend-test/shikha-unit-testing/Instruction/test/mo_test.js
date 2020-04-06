const testinstructions = require('../app/instructionModel');
const assert = require('assert');

describe("Create Tests", () => {

    it("Create a testinstruction in db", (done) => {
       // assert(true);

       const instruct = new testinstructions({college:"NTC" ,message:"This is a test message" });
       instruct.save()
             .then(() => {
                assert( !instruct.isNew); //if instruct is saved to db then it is not new
                done(); 
             })
            .catch((error) => {
                console.log("error",error);
            });
    
    });

});

//All read Tests

describe("Read instructions", ()=>{
   let KITE;
 
 beforeEach((done)=> {
    KITE = testinstructions({college:"KITE", message:"ADD this meassage"})
    KITE.save()
    .then(()=> {
       done();
    });
 });
     it('Read College ',(done)=>{
 
       testinstructions.find({college:"KITE"})
       .then((instructions)=>{
 
          assert(KITE._id.toString() === instructions[0]._id.toString());
          done();
       });
 
    });
 });
 
 //All delete tests
 
 describe("Delete instructions", ()=>{
    let AKG;
  
  beforeEach((done)=> {
     AKG = testinstructions({college:"AKG", message:"Add"})
     AKG.save().then(()=> done());
  });
      it('Delete college ' ,(done)=>{
  
        testinstructions.findByIdAndDelete(AKG._id)
        .then(()=> testinstructions.findOne({college:'AKG', message:"Delete"}))
          .then((testinstructions)=>{
            assert(testinstructions== null);
           done();
        });
  
     });
  });

//update all tests 

describe("Update Tets",()=>{
   let updater;
   beforeEach((done) =>{
     updater = new testinstructions({college:'NTC',message:'Test message'})
     updater.save()
     .then(() =>done());
   });


it('set and save', ()=>{
 updater.set('college','KITE');
 updater.save()
   .then(() => testinstructions.find({}))
   .then(testinstructions => {
      assert(testinstructions[0].college !== 'NTC');
   });

});
});
