const request = require("supertest");
const { expect } = require("chai");
const app = require("../index");
const mongoose = require("mongoose");
const Admin = require("../model/Admin");
mongoose.Promise = global.Promise;
const Registration = new Admin({
  name: "Suchitra",
  email: "singhsuchi@gmail.com",
  password: "ssssss44",
  phone: 7878787878,
});

before((done) => {
  mongoose.connect("mongodb://localhost/TestingAPIs", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  mongoose.connection
    .once("open", () => {
      console.log("started");
      done();
    })
    .on("error", (error) => {
      console.log("your error", error);
    });
});
before((done) => {
  mongoose.connection.collections.admins.drop(() => {
    done();
  });
});
describe("Create Tests", () => {
  it("It should not require extra path code", async () => {
    const response = await request(app)
      .post("/register/admin")
      .send({
        name: "suchitra",
        email: "singh@email.com",
        password: "rsrsrs",
        phone: "9494949497",
        code: "56464",
      })
      .expect(400);
    expect(response.text).to.equal('"code" is not allowed');
  });

  it("Register a new Admin", () => {
    const response = request(app);

    request(app).post("/register/admin").send(Registration).expect(200);
    Registration.save();
  });
});

describe("POST /login/admin", () => {
  it("should require a email", async () => {
    const response = await request(app)
      .post("/login/admin")
      .send({
        email: "l@gmail.com",
        password: "testtesttest",
      })
      .expect(400);
    expect(response.text).to.equal("Email not found");
  });
  it("should require a valid email", async () => {
    const response = await request(app)
      .post("/login/admin")
      .send({ email: "testuser" })
      .expect(400);
    expect(response.text).to.equal(
      "Unable to login - the email must be a valid email"
    );
  });
  it("should not allow the user having wrong password", async () => {
    const response = await request(app)
      .post("/login/admin")
      .send({ email: "singhsuchi@gmail.com", password: "rgsfdgr" })
      .expect(400);
    expect(response.text).to.equal("Invalid password");
  });
  // it('should only allow valid users to login', async () => {
  //   const newUser = {
  //     email:"singhsuchi@gmail.com",
  //     password:"ssssss44"
  //   }
  //   const response = await request(app)
  //     .post('/login/admin')
  //     .send(newUser)
  //     .expect(200);
  // expect(response.text).to.contain.keys('token');
  // });
});

describe("The GET method", async () => {
  it("should get the user", () => {
    Registration.save().then((user) => {
      const id = Registration._id;
      const response = request(app).get(`/admin/${id}`).send();
      Admin.findByIdAndDelete({ _id: id }).then(() => {
        expect(200);
      });
    });
  });
});

describe("The DELETE method", () => {
  it("should delete the user", () => {
    Registration.save().then((user) => {
      const id = Registration._id;
      const response = request(app).delete(`/admin/${id}`).send();
      Admin.findByIdAndDelete({ _id: id }).then(() => {
        expect(200);
      });
    });
  });
});

describe("The Update method", () => {
  it("should update the user", () => {
    Registration.save().then((user) => {
      const id = Registration._id;
      const response = request(app).put(`/admin/${id}`).send({ name: "Riya" });
      Registration.set({ name: "riya" });
      Registration.save();
      expect(200);
    });
  });
});
