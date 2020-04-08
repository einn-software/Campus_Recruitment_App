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
/*
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
 */
//All delete tests
describe("Delete", ()=>{
   let deleteR;
 beforeEach((done)=> {
   deleteR = new questionPaper({date:"2020-12-02", max_marks:50,max_time:3,college_id:23456,section:[{marks:10},{numofQuestion:5},{questionIdList:4}]})
   deleteR.save().then(()=> done());
 });
     it('Delete ',(done)=>{
        questionPaper.findByIdAndDelete(deleteR._id)
       .then(()=> questionPaper.findOne({date:"2020-12-02"}))
         .then((questionPaper)=>{
           assert(questionPaper== null);
          done();
       });
    });
 });
//update all tests 
describe("Update Tests",()=>{
   let updater;
 beforeEach((done) =>{
   updater = new questionPaper({date:"2020-12-02", max_marks:50,max_time:3,college_id:23456,section:[{marks:10},{numofQuestion:5},{questionIdList:4}]})
   updater.save()
     .then(() =>done());
   });
it('set and save', ()=>{
 updater.set({date:"2021-12-02", max_marks:150,max_time:3,college_id:23457,section:[{marks:20},{numofQuestion:7},{questionIdList:3}]});
 updater.save()
   .then(() => questionPaper.find({}))
   .then(questionPaper => {
      assert(questionPaper[0].college_id !== "23456");
   });
});
});


 
 
 


