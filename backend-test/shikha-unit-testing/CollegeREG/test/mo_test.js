const College = require('../app/College');
const assert = require('assert');

describe("Create Tests", () => {

    it("Create College", (done) => {
       // assert(true);

       const Registration = new College({name:"NTc" ,email:"gshikha@gmail.com", password:"ssssss44", phone:7878787878, code:201002 , address:"avantika"});
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
    Register = new College({name:"NTC" ,email:"gshikha@gmail.com", password:"ssssss44", phone:7878787878, code:201002 , address:"avantika"})
    Register.save()
    .then(()=> {
       done();
    });
 });
     it('Read',(done)=>{
 
       College.find({name:"NTC" ,email:"gshikha@gmail.com", password:"ssssss44", phone:7878787878, code:201002 , address:"avantika"})
       .then((reg)=>{
 
          assert(College._id.toString() === reg[0]._id.toString());
          done();
       });
 
    });
 });
 


//update all tests 

describe("Update Tests",()=>{
   let updater;
   beforeEach((done) =>{
     updater = new College({name:"NTC" ,email:"gshikha@gmail.com", password:"ssssss44", phone:7878787878, code:201002 , address:"avantika"})
     updater.save()
     .then(() =>done());
   });

it('set and save', ()=>{
 updater.set({name:"KITE" ,email:"ria@gmail.com", password:"sssses44", phone:7848787878, code:2010021 , address:"gzb"});
 updater.save()
   .then(() => College.find({}))
   .then(Colleges => {
      assert(College[0].name !== 'Shikha');
   });

});
});


 //All delete tests
 
 describe("Delete Tests", ()=>{
   let deleter;
 
 beforeEach((done)=> {
    deleter = new College({name:"NTC" ,email:"gshikha@gmail.com", password:"ssssss44", phone:7878787878, code:201002 , address:"avantika"})
    deleter.save().then(()=> done());
 });
     it('Delete' ,(done)=>{
 
       College.findByIdAndDelete(deleter._id)
       .then(()=> College.findOne({name:"NTC" }))
       .then((College)=>{
         assert(College == null);
        done();
     
       })
       
 
    });
 });



