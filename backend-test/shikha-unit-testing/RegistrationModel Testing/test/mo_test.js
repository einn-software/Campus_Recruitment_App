const reg = require('../app/registrationModel');
const assert = require('assert');

describe("Create Admin", () => {

    it("Create a admin in db", (done) => {
       // assert(true);

       const admins = new reg({name:"Shikha"});
       admins.save()
             .then(() => {
                assert( !admins.isNew);
                done();
             })
            .catch((error) => {
                console.log("error",error);
            });
        });
    });