const Results = require('../app/resultModel');
const assert = require('assert');


//create tests

describe("Create Tests", () => {

    it("Create Result", () => {
       const student = new Results({student_id:12});
       student.save()
         .then(() => {
            assert(!student.isNew);
         })
         .catch((error) => {
            console.log("error",error);
      });

      const questionPaper = new Results({question_paper_id:12});
      questionPaper.save()
        .then(() => {
           assert(!questionPaper.isNew);
        })
        .catch((error) => {
           console.log("error",error);
     });


     const questionAttempt= new Results({question_attempt:12});
     questionAttempt.save()
       .then(() => {
          assert(!questionAttempt.isNew);
       })
       .catch((error) => {
          console.log("error",error);
    });
    

    const correctAttempt= new Results({correct_attempt:12});
    correctAttempt.save()
      .then(() => {
         assert(!correctAttempt.isNew);
      })
      .catch((error) => {
         console.log("error",error);
   });

   const totalmarks= new Results({total_marks_scored:12});
   totalmarks.save()
     .then(() => {
        assert(!totalmarks.isNew);
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
    const students =new  Results({student_id:12})
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
    deleteRes = Results({student_id:12})
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
