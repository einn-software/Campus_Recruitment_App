const questionPaper = require('../app/questionPaper');
const assert = require('assert');


//create tests

describe("Create Tests", () => {

    it("Create questionPaper", () => {
       const paper = new questionPaper({date:"2020-12-02", max_marks:50,max_time:3,college_id:23456,section:[{marks:10},{numofQuestion:5},{questionIdList:4}]});
       paper.save()
         .then(() => {
            assert(!paper.isNew);
         })
         .catch((error) => {
            console.log("error",error);
      });
   }); 
});



//All read Tests

describe("Read tests", ()=>{
   let Register;
 
 beforeEach((done)=> {
   Register = new  questionPaper({date:"2020-12-02", max_marks:50,max_time:3,college_id:23456,section:[{marks:10},{numofQuestion:5},{questionIdList:4}]})
    Register.save()
    .then(()=> {
       done();
    });
 });
     it('Read',(done)=>{
 
       questionPaper.find({college_id:23456})
       .then((reg)=>{
 
          assert(Register._id.toString() === reg[0]._id.toString());
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
         .then((Result)=>{
           assert(Result == null);
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



