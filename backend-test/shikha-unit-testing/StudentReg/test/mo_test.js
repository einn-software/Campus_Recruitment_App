const Student = require('../app/Student');
const assert = require('assert');

describe("Create Tests", () => {

    it("Create", (done) => {
       // assert(true);

       const Registration = new Student({name:"Shikha" ,email:"gshikha@gmail.com", password:"ssssss44", phone:7878787878, roll:201002 , branch:"CS" , college:"nTC"});
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
    Register = new Student({name:"Shikha" ,email:"gshikha@gmail.com", password:"ssssss44", phone:7878787878, roll:201002 , branch:"CS" , college:"nTC"})
    Register.save()
    .then(()=> {
       done();
    });
 });
     it('Read',(done)=>{
 
       Student.find({name:"Shikha" ,email:"gshikha@gmail.com", password:"ssssss44", phone:7878787878, roll:201002 , branch:"CS" , college:"nTC"})
       .then((reg)=>{
 
          assert(Student._id.toString() === reg[0]._id.toString());
          done();
       });
 
    });
 });
 
  // All update test

  describe("Update Tests",()=>{
   let updater;
   beforeEach((done) =>{
     updater = new Student({name:"Shikha" ,email:"gshikha@gmail.com", password:"ssssss44", phone:7878787878, roll:201002 , branch:"CS" , college:"nTC"})
     updater.save()
     .then(() =>done());
   });

it('set and save', ()=>{
 updater.set({name:"ria" ,email:"ria@gmail.com", password:"rrrr44", phone:4878787878, roll:2010021 , branch:"CS" , college:"KITE"});
 updater.save()
   .then(() => Student.find({}))
   .then((Students) => {
      assert(Student[0].name !== 'Shikha');
   });

});
});




 //All delete tests
 
 describe("Delete Tests", ()=>{
   let deleter;
 
 beforeEach((done)=> {
    deleter = new Student({name:"Shikha" ,email:"gshikha@gmail.com", password:"ssssss44", phone:7878787878, roll:201002 , branch:"CS" , college:"nTC"})
    deleter.save().then(()=> done());
 });
     it('Delete' ,(done)=>{
 
       Student.findByIdAndDelete(deleter._id)
       .then(()=> Student.findOne({name:"Shikha" }))
       .then((Student)=>{
         assert(Student == null);
        done();       
     

       });
      
    });
 });

