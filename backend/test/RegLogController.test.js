require("should");
const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../index");

process.env.ENV = "Test";
if ((process.env.ENV = "Test")) {
  console.log("Testing database");
  mongoose.connect(process.env.TEST_DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  mongoose.connection
    .once("open", () => {
      console.log("started");
    })
    .on("error", (error) => {
      console.log("your error", error);
    });
}

const Admin = mongoose.model("Admin");
const Tpo = mongoose.model("Tpo");
const Student = mongoose.model("Student");
const agent = request.agent(app);

describe("Registeration Tests and Login Tests:", () => {
  describe("Admin Registration Testing:", () => {
    it("should return a registered admin:", (done) => {
      const admin = {
        name: "Riya Singhal",
        email: "riya@gmail.com",
        password: "YeahcoolItIs",
        phone: "7586958412",
      };
      agent
        .post("/register/admins")
        .send(admin)
        .expect(200)
        .end((err, results) => {
          results.body.should.have.property("_id");
          done();
        });
    });
    it("should return validation error:", (done) => {
      const admin = {
        name: "Riya Singhal",
        email: "riya@gmail.com",
        password: "YeIs",
        phone: "7586958412",
      };
      agent
        .post("/register/admins")
        .send(admin)
        .expect(400)
        .end((err, results) => {
          results.body.should.have.property("error_info");
          done();
        });
    });
  });
  describe("Admin Login Testing:", () => {
    it("should return a session having field token:", (done) => {
      const admin = {
        email: "riya@gmail.com",
        password: "YeahcoolItIs",
      };
      agent
        .post("/login/admins")
        .send(admin)
        .expect(200)
        .end((err, results) => {
          results.body.should.have.property("user_type");
          const body = results.body;
          done();
        });
    });

    it("should return a authentication error - invalid password:", (done) => {
      const admin = {
        email: "riya@gmail.com",
        password: "YeIs",
      };
      agent
        .post("/login/admins")
        .send(admin)
        .expect(400)
        .end((err, results) => {
          results.body.should.have.property("error_info");
          done();
        });
    });
  });

  describe("Tpo Registration Testing:", () => {
    it("should return a registered tpo:", (done) => {
      const tpo = {
        name: "Riya Singhal",
        email: "riya@gmail.com",
        password: "YeahcoolItIs",
        phone: "7586958412",
        designation: "Director and Teacher",
        college: "Nitra Technical Campus",
        code: "54796543",
      };
      agent
        .post("/register/tpos")
        .send(tpo)
        .expect(200)
        .end((err, results) => {
          results.body.should.have.property("_id");
          done();
        });
    });
    it("should return email already registered:", (done) => {
      const tpo = {
        name: "Riya Singhal",
        email: "riya@gmail.com",
        password: "YeahcoolItIs",
        phone: "7586958412",
        designation: "Director and Teacher",
        college: "Nitra Technical Campus",
        code: "54796543",
      };
      agent
        .post("/register/tpos")
        .send(tpo)
        .expect(400)
        .end((err, results) => {
          results.body.should.have.property("error_info");
          done();
        });
    });
  });
  describe("Tpo Login Testing:", () => {
    it("should return a session having field token:", (done) => {
      const tpo = {
        email: "riya@gmail.com",
        password: "YeahcoolItIs",
      };
      agent
        .post("/login/tpos")
        .send(tpo)
        .expect(200)
        .end((err, results) => {
          results.body.should.have.property("token");
          done();
        });
    });
    it("should return a error - email is not registered:", (done) => {
      const tpo = {
        email: "riyasinghal@gmail.com",
        password: "YeahcoolItIs",
      };
      agent
        .post("/login/tpos")
        .send(tpo)
        .expect(400)
        .end((err, results) => {
          results.body.should.have.property("error_info");
          done();
        });
    });
  });

  describe("Student Registration Testing:", () => {
    it("should return a registered student:", (done) => {
      const student = {
        name: "Riya Singhal",
        email: "riya@gmail.com",
        password: "YeahcoolItIs",
        phone: "7586958412",
        roll: "124578",
        branch: "Computer Science",
        college: "Nitra Technical Campus",
        code: "54796543",
      };
      agent
        .post("/register/students")
        .send(student)
        .expect(200)
        .end((err, results) => {
          results.body.should.have.property("_id");
          done();
        });
    });
    it("should return a validation errror - branch is required:", (done) => {
      const student = {
        name: "Riya Singhal",
        email: "riyasinghal@gmail.com",
        password: "YeahcoolItIs",
        phone: "7586958412",
        roll: "124578",
        college: "Nitra Technical Campus",
        code: "54796543",
      };
      agent
        .post("/register/students")
        .send(student)
        .expect(400)
        .end((err, results) => {
          results.body.should.have.property("error_info");
          done();
        });
    });
  });
  describe("Student Login Testing:", () => {
    it("should return a session having field token:", (done) => {
      const student = {
        code: "54796543",
        roll: "124578",
        password: "YeahcoolItIs",
      };
      agent
        .post("/login/students")
        .send(student)
        .expect(200)
        .end((err, results) => {
          results.body.should.have.property("token");
          done();
        });
    });
    it("should return a validation error - password is required:", (done) => {
      const student = {
        code: "54796543",
        roll: "124578",
      };
      agent
        .post("/login/students")
        .send(student)
        .expect(400)
        .end((err, results) => {
          results.body.should.have.property("error_info");
          done();
        });
    });
  });
  after((done) => {
    Tpo.findByIdAndDelete({
      email: "riya@gmail.com"
    }).exec();
    Admin.findByIdAndDelete({
      email: "riya@gmail.com"
    }).exec();
    Student.findByIdAndDelete({
      email: "riya@gmail.com"
    }).exec();
    done();
  });
});