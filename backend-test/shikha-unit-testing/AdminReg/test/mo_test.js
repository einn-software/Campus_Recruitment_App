const Admin = require('../app/Admin');
const assert = require('assert');

describe("Create Tests", () => {

    it("Create Admin", (done) => {
       // assert(true);

       const Registration = new Admin({name:"Shikha" ,email:"gshikha@gmail.com", password:"ssssss44", phone:7878787878,});
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
    Register = new Admin({name:"Shikha" ,email:"gshikha@gmail.com", password:"ssssss44", phone:7878787878,})
    Register.save()
    .then(()=> {
       done();
    });
 });
     it('Read',(done)=>{
 
       Admin.find({name:"Shikha" ,email:"gshikha@gmail.com", password:"ssssss44", phone:7878787878, })
       .then((reg)=>{
 
          assert(Admin._id === reg[0]._id);
          done();
       });
 
    });
 });
 


//update all tests 

describe("Update Tests",()=>{
   let updater;
   beforeEach((done) =>{
     updater = new Admin({name:"Shikha" ,email:"gshikha@gmail.com", password:"ssssss44", phone:7878787878,})
     updater.save()
     .then(() =>done());
   });


it('set and save', ()=>{
 updater.set({name:'Riya' ,email:'ria@gmail.com', password:'rrrrrrr55', phone:6756765790});
 updater.save()
   .then(() => Admin.find({}))
   .then(Admin => {
      assert(Admin[0].name !== 'Shikha');
   });

});
});


 //All delete tests
 
 describe("Delete Tests", ()=>{
   let deleter;
 
 beforeEach((done)=> {
    deleter = new Admin({name:"Shikha" ,email:"gshikha@gmail.com", password:"ssssss44", phone:7878787878, })
    deleter.save().then(()=>done());
      
 });
     it('Delete' ,(done)=>{
 
       Admin.findByIdAndDelete(deleter._id)
       .then(()=> Admin.findOne({name:"Shikha" }))
         .then((Admin)=>{
           assert(Admin== null);
          done();
       });
 
    });
 });


