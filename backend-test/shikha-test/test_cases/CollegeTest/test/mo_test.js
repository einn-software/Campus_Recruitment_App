const collegeTest = require('../app/CollegeTest');
const assert = require('assert');

describe("Create Tests", () => {
    it("Create CollegeTest", (done) => {
       const creater = new collegeTest({college_id:5556, date:2020-12-03,paper_id:22222});
       creater.save()
             .then(() => {
             assert( !creater.isNew); //if creater is saved to db then it is not new
                done(); 
             })
            .catch((error) => {
                console.log("error",error);
            }); 
    });
});

//All read Tests
describe("Read Tests", ()=>{
   let Reader;
  beforeEach((done)=> {
    Reader = new collegeTest({college_id:5556, date:2020-12-03,paper_id:22222})
    Reader.save()
    .then(()=> {
       done();
    });
 });
     it('Read',(done)=>{
      collegeTest.find({college_id:5556})
       .then((red)=>{
         assert(Reader._id.toString() === red[0]._id.toString());
         done();
       });
     });
 });
 //update all tests 
describe("Update Tests",()=>{
   let updater;
   beforeEach((done) =>{
     updater = new collegeTest({college_id:5556, date:2020-12-03,paper_id:22222})
     updater.save()
     .then(() =>done());
   });
it('set and save', ()=>{
 updater.set({college_id:5557, date:2020-12-03,paper_id:22223});
 updater.save()
   .then(() => collegeTest.find({}))
   .then(College =>{
      assert(College[0].college_id !== 5556);
    });
  });
});
//All delete tests
 describe("Delete Tests", ()=>{
   let deleter;
 beforeEach((done)=> {
    deleter = new collegeTest({college_id:5556, date:2020-12-03,paper_id:22222})
    deleter.save().then(()=> done());
 });
     it('Delete' ,(done)=>{
        collegeTest.findByIdAndDelete(deleter._id)
       .then(()=> collegeTest.findOne({college_id:5557 }))
       .then((collegeTest)=>{
         assert(collegeTest == null);
        done();
      })
    });
 });



