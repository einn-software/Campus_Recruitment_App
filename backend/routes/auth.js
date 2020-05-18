const router = require("express").Router();
const Admin = require("../model/Admin");
const College = require("../model/College");
const Tpo = require("../model/Tpo");
const Student = require("../model/Student");
const testinstructions = require("../model/instruction");
const Results = require("../model/Results");
const questionCollections = require("../model/questionCollections");
const questionPaper = require("../model/questionPaper");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {
  hashSync,
  genSaltSync
} = require("bcrypt");
const {
  studentloginValidation,
  questionCollectionsValidation,
  questionPaperValidation,
  ResultsValidation,
  testinstructionsValidation,
  adminRegisterValidation,
  studentRegisterValidation,
  collegeRegisterValidation,
  tpoRegisterValidation,
  loginValidation,
} = require("../config/validation");
const verify = require("../config/verifyToken");

//Admin Register
router.post("/register/admin", async (req, res) => {
  //LETS VALIDATE THE DATA BEFORE WE MAKE A Admin
  const {
    error
  } = adminRegisterValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Checking if the admin is already in the database
  const emailExist = await Admin.findOne({
    email: req.body.email
  });
  if (emailExist) return res.status(400).send("Email already exist");

  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Create a new admin
  const admin = new Admin({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    phone: req.body.phone,
  });
  try {
    const savedUser = await admin.save();
    res.send(savedUser).status(200);
  } catch (err) {
    res.status(400).send(err);
  }
});

//LOGIN ADMIN
router.post("/login/admin", async (req, res) => {
  const {
    error
  } = loginValidation(req.body);
  if (error)
    return res
      .status(400)
      .send({
        error,
        statusCode: 400
      });

  //Checking if the admin is not in the database
  const admin = await Admin.findOne({
    email: req.body.email
  });
  if (!admin) return res.status(400).send({
    error: "Email not found",
    statusCode: 400
  });

  //Check if the password is correct
  const validPass = await bcrypt.compare(req.body.password, admin.password);
  if (!validPass) return res.status(400).send({
    error: "Invalid password",
    statusCode: 400
  });

  //Create and assign a token
  const token = jwt.sign({
    _id: admin._id
  }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send({
    token: token,
    statusCode: 400
  });
});

// display Admin Data

router.get("/admin", verify, async (req, res) => {
  const id = req.user._id;
  Admin.findOne({
    _id: id
  }, (err, results) => {
    if (err) {
      console.log({
        error: err,
        statusCode: 400
      });
      return;
    }
    if (!results) {
      return res.json({
        statusCode: 400,
        message: "Record not Found",
      });
    }
    return res.json({
      statusCode: 200,
      data: results,
    });
  });
});

//Update admin's info

router.put("/admin", verify, function (req, res) {
  const id = req.user._id;
  const body = req.body;
  const salt = genSaltSync(10);
  const hashedPassword = hashSync(body.password, salt);
  body.password = hashedPassword;
  Admin.findOneAndUpdate({
      _id: id
    }, body)
    .then((College) => {
      if (!College) {
        return res.json({
          success: 0,
          message: "Record Not Found",
        });
      } else {
        res.status(200).json({
          success: 1,
          message: "updated successfully",
        });
      }
    })
    .catch(() => {
      res.status(400).send(err);
    });
});

// delete a admin from the db

router.delete("/admin", verify, function (req, res) {
  const id = req.user._id;
  Admin.findByIdAndRemove(id, (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    if (!results) {
      return res.json({
        success: 0,
        message: "Record Not Found",
      });
    }
    return res.json({
      success: 1,
      message: "user deleted successfully",
    });
  });
});

//College Register
router.post("/register/college", async (req, res) => {
  //LETS VALIDATE THE DATA BEFORE WE MAKE A college user
  const {
    error
  } = collegeRegisterValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Checking if the college is already in the database
  const emailExist = await College.findOne({
    email: req.body.email
  });
  if (emailExist) return res.status(400).send("Email already exist");

  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Create a new college
  const college = new College({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    phone: req.body.phone,
    college_code: req.body.college_code,
    address: req.body.address,
  });
  try {
    const savedUser = await college.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

// LOGIN COLLEGE
router.post("/login/college", async (req, res) => {
  const {
    error
  } = loginValidation(req.body);
  if (error)
    return res
      .status(400)
      .send("Unable to login - the email must be a valid email");

  //Checking if the college is not in the database
  const college = await College.findOne({
    email: req.body.email
  });
  if (!college) return res.status(400).send("Email not found");

  //Check if the password is correct
  const validPass = await bcrypt.compare(req.body.password, college.password);
  if (!validPass) return res.status(400).send("Invalid password");

  //Create and assign a token
  const token = jwt.sign({
      _id: college._id,
      name: college.name,
      email: college.email,
      phone: college.phone,
      college_code: college.college_code,
      address: college.address,
    },
    process.env.TOKEN_SECRET
  );
  res.header("auth-token", token).send({
    token: token
  });
});

// display College Data

router.get("/college", verify, async (req, res) => {
  const id = req.user._id;
  College.findOne({
    _id: id
  }, (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    if (!results) {
      return res.json({
        success: 0,
        message: "Record not Found",
      });
    }
    return res.json({
      success: 1,
      data: results,
    });
  });
});

//Update college's info

router.put("/college", verify, function (req, res, next) {
  const id = req.user._id;
  College.findOneAndUpdate({
      _id: id
    }, req.body)
    .then((College) => {
      if (College === null) {
        return done(null, false, {
          message: "Something went wrong , Please try again",
        });
      } else {
        res.status(200).send(College);
      }
    })
    .catch(() => {
      res.status(400).send("Data not found");
    });
});

// delete a college from the db

router.delete("/college", verify, function (req, res, next) {
  const id = req.user._id;
  College.findOneAndRemove({
      _id: id
    })
    .then((College) => {
      if (College === null) {
        return done(null, false, {
          message: "Something went wrong , Please try again",
        });
      } else {
        res.status(200).send("Successfully Deleted");
      }
    })
    .catch(() => {
      res.status(400).send("Data not found");
    });
});

//TPO Register
router.post("/register/tpo", async (req, res) => {
  // LETS VALIDATE THE DATA BEFORE WE MAKE A Tpo
  const {
    error
  } = tpoRegisterValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Checking if the tpo is already in the database
  const emailExist = await Tpo.findOne({
    email: req.body.email
  });
  if (emailExist) return res.status(400).send("Email already exist");

  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Create a new tpo
  const tpo = new Tpo({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    phone: req.body.phone,
    designation: req.body.designation,
    college: req.body.college,
  });
  try {
    const savedUser = await tpo.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

//LOGIN TPO

router.post("/login/tpo", async (req, res) => {
  const {
    error
  } = loginValidation(req.body);
  if (error)
    return res
      .status(400)
      .send("Unable to login - the email must be a valid email");

  //Checking if the tpo is not in the database
  const tpo = await Tpo.findOne({
    email: req.body.email
  });
  if (!tpo) return res.status(400).send("Email not found");

  //Check if the password is correct
  const validPass = await bcrypt.compare(req.body.password, tpo.password);
  if (!validPass) return res.status(400).send("Invalid password");

  //Create and assign a token
  const token = jwt.sign({
      _id: tpo._id,
      name: tpo.name,
      email: tpo.email,
      phone: tpo.phone,
      designation: tpo.designation,
      college: tpo.college,
    },
    process.env.TOKEN_SECRET
  );
  res.header("auth-token", token).send({
    token: token
  });
});

// display Tpos Data

router.get("/Tpo", verify, async (req, res) => {
  const id = req.user._id;
  Tpo.findOne({
    _id: id
  }, (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    if (!results) {
      return res.json({
        success: 0,
        message: "Record not Found",
      });
    }
    return res.json({
      success: 1,
      data: results,
    });
  });
});

//Update tpo's info

router.put("/tpo", verify, function (req, res, next) {
  const id = req.user._id;
  Tpo.findOneAndUpdate({
      _id: id
    }, req.body)
    .then((Tpo) => {
      if (Tpo === null) {
        return done(null, false, {
          message: "Something went wrong , Please try again",
        });
      } else {
        res.status(200).send(Tpo);
      }
    })
    .catch(() => {
      res.status(400).send("Data not found");
    });
});

// delete a tpo from the db

router.delete("/tpo", verify, function (req, res, next) {
  const id = req.user._id;
  Tpo.findOneAndRemove({
      _id: id
    })
    .then((Tpo) => {
      if (Tpo === null) {
        return done(null, false, {
          message: "Something went wrong , Please try again",
        });
      } else {
        res.status(200).send("Successfully Deleted");
      }
    })
    .catch(() => {
      res.status(400).send("Data not found");
    });
});

//Student Register
router.post("/register/student", async (req, res) => {
  // LETS VALIDATE THE DATA BEFORE WE MAKE A USER
  const {
    error
  } = studentRegisterValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Checking if the student is already in the database
  const emailExist = await Student.findOne({
    email: req.body.email
  });
  if (emailExist) return res.status(400).send("Email already exist");
  const emailRoll = await Student.findOne({
    roll: req.body.roll
  });
  if (emailRoll) return res.status(400).send("Roll number already exist");

  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Create a new student
  const student = new Student({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    phone: req.body.phone,
    roll: req.body.roll,
    branch: req.body.branch,
    college: req.body.college,
    college_code: req.body.college_code,
  });
  try {
    const savedUser = await student.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

//Student LOGIN

router.post("/login/student", async (req, res) => {
  const {
    error
  } = studentloginValidation(req.body);
  if (error)
    return res
      .status(400)
      .send({
        error: "Unable to login - something went wrong, please try again",
      });

  //Checking if the student is not in the database
  const student = await Student.findOne({
    roll: req.body.roll
  });
  if (!student) return res.status(400).send({
    error: "Roll number not found"
  });

  //Check if the password is correct
  const validPass = await bcrypt.compare(req.body.password, student.password);
  if (!validPass) return res.status(400).send("Invalid password");

  //Create and assign a token
  const token = jwt.sign({
      _id: student._id,
    },
    process.env.TOKEN_SECRET
  );
  res.header("auth-token", token).send({
    token: token
  });
});

// display students Data

router.get("/student", verify, function (req, res) {
  const id = req.user._id;
  Student.findOne({
    _id: id
  }, (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    if (!results) {
      return res.json({
        success: 0,
        message: "Record not Found",
      });
    }
    return res.json({
      success: 1,
      data: results,
    });
  });
});

//Update student's info

router.put("/student", verify, function (req, res, next) {
  const id = req.user._id;
  Student.findOneAndUpdate({
      _id: id
    }, req.body)
    .then((Student) => {
      if (Student === null) {
        return done(null, false, {
          message: "Something went wrong , Please try again",
        });
      } else {
        res.status(200).send(Student);
      }
    })
    .catch(() => {
      res.status(400).send("Data not found");
    });
});

// delete a student from the db

router.delete("/student", verify, function (req, res, next) {
  const id = req.user._id;
  Student.findOneAndRemove({
      _id: id
    })
    .then((Student) => {
      if (Student === null) {
        return done(null, false, {
          message: "Something went wrong , Please try again",
        });
      } else {
        res.status(200).send("Successfully Deleted");
      }
    })
    .catch(() => {
      res.status(400).send("Data not found");
    });
});

//testinstructions

router.post("/instruction", verify, async (req, res) => {
  //LETS VALIDATE THE DATA BEFORE WE ADD A INSTRUCTION
  const {
    error
  } = testinstructionsValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Checking if the college is already in the database
  const collegeExist = await testinstructions.findOne({
    college_code: req.body.college_code,
  });
  if (collegeExist) return res.status(400).send("College already exist");

  // Create a new instruction
  const instructions = new testinstructions({
    college_code: req.body.college_code,
    message: req.body.message,
    date: req.body.date,
  });
  try {
    const savedinstructions = await instructions.save();
    res.send(savedinstructions);
  } catch (err) {
    res.status(400).send(err);
  }
});

//display test instructions
router.get("/instruction/:college_code/:date", verify, async (req, res) => {
  testinstructions.findOne({
      college_code: req.params.college_code,
      date: req.params.date
    },
    (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Record not Found",
        });
      }
      return res.json({
        success: 1,
        data: results,
      });
    }
  );
});

//Update instructions

router.put("/instruction/:college_code/:date", verify, function (
  req,
  res,
  next
) {
  testinstructions
    .findOneAndUpdate({
      college_code: req.body.college_code
    }, req.body)
    .then((admin) => {
      if (admin === null) {
        return done(null, false, {
          message: "Something went wrong , Please try again",
        });
      } else {
        res.status(200).send(admin);
      }
    })
    .catch(() => {
      res.status(400).send("Data not found");
    });
});

// delete a instruction from the db

router.delete("/instruction/:college_code/:date", verify, function (
  req,
  res,
  next
) {
  testinstructions
    .findOneAndRemove({
      college_code: req.params.college_code
    })
    .then((admin) => {
      if (admin === null) {
        return done(null, false, {
          message: "Something went wrong , Please try again",
        });
      } else {
        res.status(200).send("Successfully Deleted");
      }
    })
    .catch(() => {
      res.status(400).send("Data not found");
    });
});

//Results

router.post("/result", verify, async (req, res) => {
  // LETS VALIDATE THE DATA BEFORE WE ADD A RESULT
  const {
    error
  } = ResultsValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Checking if the studentid is already in the database
  const studentExist = await Results.findOne({
    student_id: req.body.student_id,
  });
  if (studentExist)
    return res.status(400).send("Student has already given the test");

  // Create Result
  const Result = new Results({
    roll: req.body.roll,
    question_paper_id: req.body.question_paper_id,
    question_attempt: req.body.question_attempt,
    correct_attempt: req.body.correct_attempt,
    total_marks_scored: req.body.total_marks_scored,
  });
  try {
    const savedResult = await Result.save();
    res.send(savedResult);
  } catch (err) {
    res.status(400).send(err);
  }
});

// display Results

router.get("/result/:roll", verify, async (req, res) => {
  Results.findOne({
    roll: req.params.roll
  }, (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    if (!results) {
      return res.json({
        success: 0,
        message: "Record not Found",
      });
    }
    return res.json({
      success: 1,
      data: results,
    });
  });
});

//Update result

router.put("/result/:roll", verify, function (req, res, next) {
  Results.findOneAndUpdate({
      roll: req.params.roll
    }, req.body)
    .then((Result) => {
      if (Result === null) {
        return done(null, false, {
          message: "Something went wrong , Please try again",
        });
      } else {
        res.status(200).send(Result);
      }
    })
    .catch(() => {
      res.status(400).send("Data not found");
    });
});

// delete result from the db

router.delete("/result/:roll", verify, function (req, res, next) {
  Results.findOneAndRemove({
      roll: req.params.roll
    })
    .then((Result) => {
      if (Result === null) {
        return done(null, false, {
          message: "Something went wrong , Please try again",
        });
      } else {
        res.status(200).send("Successfully Deleted");
      }
    })
    .catch(() => {
      res.status(400).send("Data not found");
    });
});

//questionCollections

router.post("/questionCollection", verify, async (req, res) => {
  //LETS VALIDATE THE DATA BEFORE WE ADD A COLLECTION
  const {
    error
  } = questionCollectionsValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  // Create a new questionCollection
  const questionCollection = new questionCollections({
    question: req.body.question,
    topic: req.body.topic,
    options: req.body.options,
    answer: req.body.answer,
    weight: req.body.weight,
  });
  try {
    const savedCollections = await questionCollection.save();
    res.send(savedCollections);
  } catch (err) {
    res.status(400).send(err);
  }
});

//get questionCollections

router.get("/questionCollection/:id", verify, async (req, res) => {
  questionCollections.findOne({
    _id: req.params.id
  }, (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    if (!results) {
      return res.json({
        success: 0,
        message: "Record not Found",
      });
    }
    return res.json({
      success: 1,
      data: results,
    });
  });
});

//Update questioncollections

router.put("/questioncCollection/:id", verify, function (req, res, next) {
  questionCollections
    .findByIdAndUpdate({
      _id: req.params.id
    }, req.body)
    .then(function () {
      questionCollections
        .findOne({
          _id: req.params.id
        })
        .then(function (questionCollection) {
          res.send(questionCollection);
        });
    })
    .catch(err, () => {
      res.status(400).send("Please provide a valid id");
    });
});

// delete questionCollections from the db

router.delete("/questionCollection/:id", verify, function (req, res, next) {
  questionCollections
    .findByIdAndRemove({
      _id: req.params.id
    })
    .then(function () {
      res.send("Your account has been succesfully deleted").status(200);
    })
    .catch(() => {
      res.status(400).send("Please provide a valid id");
    });
});

// questionPaper

router.post("/questionPaper", verify, async (req, res) => {
  //LETS VALIDATE THE DATA BEFORE WE ADD A PAPER
  const {
    error
  } = questionPaperValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Checking if the studentid is already in the database
  const collegeExist = await questionPaper.findOne({
    college_id: req.body.college_id,
  });
  if (collegeExist)
    return res.status(400).send("This college has already submitted the test");

  // Create a new questionPaper
  const questionPapers = new questionPaper({
    date: req.body.date,
    max_marks: req.body.max_marks,
    max_time: req.body.max_time,
    college_code: req.body.college_code,
    sections: req.body.sections,
  });
  try {
    const savedPapers = await questionPapers.save();
    res.send(savedPapers);
  } catch (err) {
    res.status(400).send(err);
  }
});

//Get questionPaper

router.get("/questionPaper/:college_code", verify, async (req, res) => {
  questionPaper.findOne({
      college_code: req.params.college_code
    },
    (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Record not Found",
        });
      }
      return res.json({
        success: 1,
        data: results,
      });
    }
  );
});

//Update questionPapers

router.put("/questionPaper/:college_code", verify, function (req, res, next) {
  questionPaper
    .findOneAndUpdate({
      college_code: req.params.college_code
    }, req.body)
    .then((Paper) => {
      if (Paper === null) {
        return done(null, false, {
          message: "Something went wrong , Please try again",
        });
      } else {
        res.status(200).send(Paper);
      }
    })
    .catch(() => {
      res.status(400).send("Data not found");
    });
});

// delete questionPapers from the db

router.delete("/questionPaper/:college_code", verify, function (
  req,
  res,
  next
) {
  questionPaper
    .findOneAndRemove({
      college_code: req.params.college_code
    })
    .then((Paper) => {
      if (Paper === null) {
        return done(null, false, {
          message: "Something went wrong , Please try again",
        });
      } else {
        res.status(200).send("Successfully Deleted");
      }
    })
    .catch(() => {
      res.status(400).send("Data not found");
    });
});

module.exports = router;