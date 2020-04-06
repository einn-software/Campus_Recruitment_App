const Results = require('../app/Results');
const assert = require('assert');


//create tests

describe("Create Tests", () => {

    it("Create Result", () => {
       const student = new Results({student_id:12,question_paper_id:2222,question_attempt:5,correct_attempt:6,total_marks_scored:30});
       student.save()
         .then(() => {
            assert(!student.isNew);
         })
         .catch((error) => {
            console.log("error",error);
      });
   }); 
});



//All read Tests

describe("Read Results", ()=>{
   let students;
 
 beforeEach((done)=> {
    const students =new  Results({student_id:12,question_paper_id:2222,question_attempt:5,correct_attempt:6,total_marks_scored:30})
    students.save()
    .then(()=> {
       done();
    });
 });
     it('Read studentid ',(done)=>{
 
       Results.find({student_id:12})
       .then((result)=>{
 
          assert(students._id.toString() === result[0]._id.toString());
          done();
       });
 
    });
 });
 
 
 
 
//All delete tests

describe("Delete Results", ()=>{
   let deleteRes;
 
 beforeEach((done)=> {
    deleteRes = Results({student_id:12,question_paper_id:2222,question_attempt:5,correct_attempt:6,total_marks_scored:30})
    deleteRes.save().then(()=> done());
 });
     it('Delete result ',(done)=>{
 
       Results.findByIdAndDelete(deleteRes._id)
       .then(()=> Results.findOne({student_id:12}))
         .then((Results)=>{
           assert(Results == null);
          done();
       });
 
    });
 });

 //all update tests
 
describe("Update Tests",()=>{
   let updater;
   beforeEach((done) =>{
     updater = new Results({student_id:12,question_paper_id:2222,question_attempt:5,correct_attempt:6,total_marks_scored:30})
     updater.save()
     .then(() =>done());
   });

it('set and save', ()=>{
 updater.set({student_id:15,question_paper_id:2272,question_attempt:8,correct_attempt:6,total_marks_scored:60});
 updater.save()
   .then(() => Results.find({}))
   .then(Results => {
      assert(Results[0].student_id !== 12);
   });

});
});



