const testinstructions = require('../app/instructionModel');
const assert = require('assert');

describe("Create Tests", () => {

    it("Create a testinstruction in db", () => {
       // assert(true);

       const NTC = new testinstructions({college:"NTC"});
       NTC.save()
             .then(() => {
                assert( !NTC.isNew);
             })
            .catch((error) => {
                console.log("error",error);
            });


            const April = new testinstructions({Date:'20-04-2020'});
            April.save()
                  .then(() => {
                     assert( !April.isNew);
                  })
                 .catch((error) => {
                     console.log("error",error);
                 });


            const MSG = new testinstructions({message:"Test Message"});
            MSG.save()
                .then(() => {
                   assert( !MSG.isNew);
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
   KITE = testinstructions({college:"KITE"})
   KITE.save()
   .then(()=> {
      done();
   });
});
    it('Read College  : KITE',(done)=>{

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
    AKG = testinstructions({college:"AKG"})
    AKG.save().then(()=> done());
 });
     it('Delete college : AKG',(done)=>{
 
       testinstructions.findByIdAndDelete(AKG._id)
       .then(()=> testinstructions.findOne({'college':'AKG'}))
         .then((testinstructions)=>{
           assert(testinstructions== null);
          done();
       });
 
    });
 });
 
 

