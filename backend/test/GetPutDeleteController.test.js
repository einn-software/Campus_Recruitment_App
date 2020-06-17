// require("should");
// const request = require("supertest");
// const mongoose = require("mongoose");
// const app = require("../index");

// process.env.ENV = "Test";
// if ((process.env.ENV = "Test")) {
//     console.log("Testing database");
//     mongoose.connect(process.env.TEST_DB_CONNECT, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     });
//     mongoose.connection
//         .once("open", () => {
//             console.log("started");
//         })
//         .on("error", (error) => {
//             console.log("your error", error);
//         });
// }

// const Admin = mongoose.model("Admin");
// const Tpo = mongoose.model("Tpo");
// const Student = mongoose.model("Student");
// const agent = request.agent(app);

// describe("Get, Put and Delete data request Tests:", () => {
//     describe("Admin's data Testing:", () => {
//         it("should return Authrization Error: the user is not authorized to access this data:", (done) => {
//             const admin1 = new Admin({
//                 name: "Riya Singhal",
//                 email: "riya@gmail.com",
//                 password: "YeahcoolItIs",
//                 phone: "7586958412",
//             });
//             admin1.save();
//             agent
//                 .get("/admins")
//                 .expect(403)
//                 .end((err, results) => {
//                     results.body.should.have.property("server_msg");
//                     done();
//                 });
//         });

//         it("should return admin's data:", (done) => {
//             const admin1 = new Admin({
//                 name: "Riya Singhal",
//                 email: "riya@gmail.com",
//                 password: "YeahcoolItIs",
//                 phone: "7586958412",
//             });
//             agent
//                 .post("/register/admins")
//                 .send(admin1)
//             const admin2 = new Admin({
//                 name: "Riya Singhal",
//                 email: "riyasinghal@gmail.com",
//                 password: "YeahcoolItIs",
//                 phone: "7586958412",
//             });
//             agent
//                 .post("/register/admins")
//                 .send(admin2)
//             agent.post("/login/admins").send({
//                 email: "riya@gmail.com",
//                 password: "YeahcoolItIs",
//             }).end((err, results) => {
//                 console.log(results.body)
//                 return results.body;
//             });

//             agent
//                 .get("/admins")
//                 .expect(200)
//                 .end((err, results) => {
//                     console.log(results.body)
//                     results.body.should.have.property("token");
//                     done();
//                 });

//         });
//     });
//     after((done) => {
//         //  Tpo.deleteMany({}).exec();
//         Admin.deleteMany({}).exec();
//         // Student.deleteMany({}).exec();
//         done();
//     });
// });