const Tpo = require('../app/Tpo');
const assert = require('assert');

describe("Create Tests", () => {

    it("Create", (done) => {
       // assert(true);

       const Registration = new Tpo({name:"Shikha" ,email:"gshikha@gmail.com", password:"ssssss44", phone:7878787878, designation:"CCC" , branch:"CS" , college:"nTC"});
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
    Register = new Tpo({name:"Shikha" ,email:"gshikha@gmail.com", password:"ssssss44", phone:7878787878, designation:"CCC" , branch:"CS" , college:"nTC"})
    Register.save()
    .then(()=> {
       done();
    });
 });
     it('Read',(done)=>{
 
       Tpo.find({name:"Shikha"})
       .then((reg)=>{
 
          assert(Register._id.toString() === reg[0]._id.toString());
          done();
       });
 
    });
 });

 
  // All update test

  describe("Update Tests",()=>{
   let updater;
   beforeEach((done) =>{
     updater = new Tpo({name:"Shikha" ,email:"gshikha@gmail.com", password:"ssssss44", phone:7878787878, designation:"CCC" , branch:"CS" , college:"nTC"})
     updater.save()
     .then(() =>done());
   });

it('set and save', ()=>{
 updater.set({name:"ria" ,email:"ria@gmail.com", password:"rrrr44", phone:4878787878, designation:"VVV" , branch:"CS" , college:"KITE"});
 updater.save()
   .then(() => Tpo.find({}))
   .then(Tpos => {
      assert(Tpos[0].name !== 'Shikha');
   });

});
});
 
 //All delete tests
 
 describe("Delete Tests", ()=>{
    let deleter;
  
  beforeEach((done)=> {
     deleter = new Tpo({name:"Shikha" ,email:"gshikha@gmail.com", password:"ssssss44", phone:7878787878, designation:"CCC" , branch:"CS" , college:"nTC"})
     deleter.save().then(()=> done());
  });
      it('Delete' ,(done)=>{
  
        Tpo.findByIdAndDelete(deleter._id)
        .then(()=> Tpo.findOne({name:"Shikha" }))
        .then((Tpo)=>{
         assert(Tpo == null);
        done();
        });
        
     });
  });
  



