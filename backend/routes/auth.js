const router = require("express").Router();
const session = require("express-session");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")(session); //MongoDB session store for Connect and Express

//import models 
const Admin = require("../model/Admin");
const College = require("../model/College");
const Tpo = require("../model/Tpo");
const Student = require("../model/Student");
const Instruction = require("../model/Instruction");
const Result = require("../model/Result");
const QuestionCollections = require("../model/QuestionCollections");
const QuestionPaper = require("../model/QuestionPaper");

//import jwt token for login
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// import validations
const {
  studentloginValidation,
  questionCollectionsValidation,
  questionPaperValidation,
  resultValidation,
  instructionValidation,
  adminRegisterValidation,
  studentRegisterValidation,
  collegeRegisterValidation,
  tpoRegisterValidation,
  loginValidation,
} = require("../config/validation");
const verify = require("../config/verifyToken");

router.use(
  session({
    secret: "au%mQKNhZBuQZyV0o$|?!!r2t5Dfg4d96r9",
    resave: false, //Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: true, //Forces a session that is "uninitialized" to be saved to the store
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      dbName: "session",
    }),
  })
);

// status code
const success = 200;
const failure = 400;
const notFound = 404;
const authenticationFailed = 401;
const authorizationFailed = 403;

// Error Handlers
function errorHandler(error) {
  const err = {
    status: failure,
    message: error.details[0].message,
    error_info: error.name,
    server_msg: error._message,
    server_error_ref:
      Date.now() + `${Math.floor(1000000000 + Math.random() * 9000000000)}`,
  };
  return err;
}

function unauthorizedErrorHandler() {
  const err = {
    status: authorizationFailed, //403
    message: "Unauthorized access",
    error_info: "Authrization Error",
    server_msg:
      "Authrization Error: the user is not authorized to access this data",
    server_error_ref:
      Date.now() + `${Math.floor(1000000000 + Math.random() * 9000000000)}`,
  };
  return err;
}

function emailNotFoundErrorHandler(error) {
  const err = {
    status: notFound, //404
    message: "Email not found, Please register yourself",
    error_info: "Login Error, As email is not registerd in database",
    server_msg:
      "No user is registered with this email, So can't login the user",
    server_error_ref:
      Date.now() + `${Math.floor(1000000000 + Math.random() * 9000000000)}`,
  };
  return err;
}

function emailExistErrorHandler() {
  const err = {
    status: failure, //400
    message: "Already registered with this email, Please try to login",
    error_info: "Registeration Error, As email is already in database",
    server_msg:
      "Email already exist in the database, So can't register the same user twice",
    server_error_ref:
      Date.now() + `${Math.floor(1000000000 + Math.random() * 9000000000)}`,
  };
  return err;
}

function invalidPasswordErrorHandler() {
  const err = {
    status: authorizationFailed, //403
    message: "Invalid password, please try again later",
    error_info: "Athentication Error",
    server_msg: "Athentication Error: invalid password",
    server_error_ref:
      Date.now() + `${Math.floor(1000000000 + Math.random() * 9000000000)}`,
  };
  return err;
}

function idNotFoundErrorHandler() {
  const err = {
    status: notFound, //404
    message: "Please provide a valid id",
    error_info: "Not Found Error, As id is not found in database",
    server_msg: "No user is registered with this id, So can't get the user",
    server_error_ref:
      Date.now() + `${Math.floor(1000000000 + Math.random() * 9000000000)}`,
  };
  return err;
}

function notFoundRollCodeErrorHandler() {
  const err = {
    status: authenticationFailed, //404
    message: "Roll no. and code not found, Please register yourself",
    error_info:
      "Login Error, As roll no. and code are not registerd in database",
    server_msg:
      "No user is registered with this roll no. and code, So can't login the user",
    server_error_ref:
      Date.now() + `${Math.floor(1000000000 + Math.random() * 9000000000)}`,
  };
  return err;
}

function codeRollErrorHandler() {
  const err = {
    status: failure, //400
    message: "Either Roll no. or code must be unique",
    error_info: "Registertion Error",
    server_msg: "Registeration Error: Either Roll no. or code must be unique",
    server_error_ref:
      Date.now() + `${Math.floor(1000000000 + Math.random() * 9000000000)}`,
  };
  return err;
}

//Admin Register
router.post("/register/admins", async (req, res, next) => {
  //LETS VALIDATE THE DATA BEFORE WE MAKE A Admin
  const { error } = adminRegisterValidation(req.body);
  if (error) {
    return res.status(`${failure}`).json(errorHandler(error));
  }

  //Checking if the admin is already in the database
  const emailExist = await Admin.findOne({
    email: req.body.email,
  });
  if (emailExist) {
    return res.status(`${failure}`).json(emailExistErrorHandler());
  }

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
    const user = await admin.save();
    res.status(`${success}`).json(user);
  } catch (error) {
    return res.status(`${failure}`).json(errorHandler(error));
  }
});

//TPO Register
router.post("/register/tpos", async (req, res) => {
  // LETS VALIDATE THE DATA BEFORE WE MAKE A Tpo
  const { error } = tpoRegisterValidation(req.body);
  if (error) {
    return res.status(`${failure}`).json(errorHandler(error));
  }

  //Checking if the tpo is already in the database
  const emailExist = await Tpo.findOne({
    email: req.body.email,
  });
  if (emailExist) {
    return res.status(`${failure}`).json(emailExistErrorHandler());
  }

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
    code: req.body.code,
  });
  try {
    const user = await tpo.save();
    res.status(`${success}`).json(user);
  } catch (err) {
    return res.status(`${failure}`).json(errorHandler(error));
  }
});

//Student Register
router.post("/register/students", async (req, res) => {
  // LETS VALIDATE THE DATA BEFORE WE MAKE A USER
  const { error } = studentRegisterValidation(req.body);
  if (error) return res.status(`${failure}`).json(errorHandler(error));

  //Checking if the student is already in the database
  const emailExist = await Student.findOne({
    email: req.body.email,
  });
  if (emailExist) return res.json(emailExistErrorHandler());

  const rollCodeExist = await Student.findOne({
    roll: req.body.roll,
    code: req.body.code,
  });
  if (rollCodeExist)
    return res.status(`${failure}`).json(codeRollErrorHandler());

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
    code: req.body.code,
  });
  try {
    const user = await student.save();
    res.status(`${success}`).json(user);
  } catch (err) {
    res.status(`${failure}`).json(errorHandler(err));
  }
});

//Student LOGIN
router.post("/login/students", async (req, res) => {
  const { error } = studentloginValidation(req.body);
  if (error) return res.status(`${failure}`).json(errorHandler(error));

  //Checking if the student is not in the database
  const student = await Student.findOne({
    code: req.body.code,
    roll: req.body.roll,
  });
  if (!student)
    return res.status(`${notFound}`).json(notFoundRollCodeErrorHandler());

  //Check if the password is correct
  const validPass = await bcrypt.compare(req.body.password, student.password);
  if (!validPass)
    return res
      .status(`${authorizationFailed}`)
      .json(invalidPasswordErrorHandler());

  //Create and assign a token
  const token = jwt.sign(
    {
      _id: student._id,
    },
    process.env.TOKEN_SECRET
  );
  req.session.email = student.email;
  req.session._id = student._id;
  req.session.token = token;
  req.session.user_type = 3;
  res.status(`${success}`).header("auth-token", token).json({
    email: req.session.email,
    _id: req.session._id,
    token: req.session.token,
    user_type: req.session.user_type,
  });
});

//LOGIN ADMIN
router.post("/login/admins", async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) {
    return res.status(`${failure}`).json(errorHandler(error));
  }

  //Checking if the admin is not in the database
  const admin = await Admin.findOne({
    email: req.body.email,
  });
  if (!admin) {
    return res.status(`${notFound}`).json(emailNotFoundErrorHandler());
  }

  //Check if the password is correct
  const validPass = await bcrypt.compare(req.body.password, admin.password);
  if (!validPass)
    return res
      .status(`${authorizationFailed}`)
      .json(invalidPasswordErrorHandler());

  //Create and assign a token
  const token = jwt.sign(
    {
      _id: admin._id,
    },
    process.env.TOKEN_SECRET
  );
  //To store or access session data, we use the request property req.session, which is (generally) serialized as JSON by the store.
  (req.session.email = admin.email),
    (req.session._id = admin._id),
    (req.session.token = token),
    (req.session.user_type = 1),
    res.status(`${success}`).header("auth-token", token).json({
      email: req.session.email,
      _id: req.session._id,
      token: req.session.token,
      user_type: req.session.user_type,
    });
});

//LOGIN TPO
router.post("/login/tpos", async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(`${failure}`).json(errorHandler(error));

  //Checking if the tpo is not in the database
  const tpo = await Tpo.findOne({
    email: req.body.email,
  });
  if (!tpo) return res.status(`${notFound}`).json(emailNotFoundErrorHandler());

  //Check if the password is correct
  const validPass = await bcrypt.compare(req.body.password, tpo.password);
  if (!validPass)
    return res
      .status(`${authorizationFailed}`)
      .json(invalidPasswordErrorHandler());

  //Create and assign a token
  const token = jwt.sign(
    {
      _id: tpo._id,
    },
    process.env.TOKEN_SECRET
  );
  req.session.email = tpo.email;
  req.session._id = tpo._id;
  req.session.token = token;
  req.session.user_type = 2;
  res.status(`${success}`).header("auth-token", token).json({
    email: req.session.email,
    _id: req.session._id,
    token: req.session.token,
    user_type: req.session.user_type,
  });
});

// To get single Admin data using id
router.get("/admins/:id", verify, async (req, res) => {
  if (req.session.user_type == 1) {
    Admin.findOne(
      {
        _id: req.params.id,
      },
      (err, results) => {
        if (err) {
          return res.status(`${notFound}`).json(idNotFoundErrorHandler());
        }
        return res.status(`${success}`).json(results);
      }
    );
  } else {
    return res
      .status(`${authorizationFailed}`)
      .json(unauthorizedErrorHandler());
  }
});

// To get all Admin's data
router.get("/admins", async (req, res) => {
  if (req.session.user_type == 1) {
    Admin.find({}, (err, results) => {
      if (err) {
        return res.status(`${notFound}`).json(idNotFoundErrorHandler());
      }
      return res.status(`${success}`).json(results);
    });
  } else {
    return res
      .status(`${authorizationFailed}`)
      .json(unauthorizedErrorHandler());
  }
});

//Update admin's info
router.put("/admins/:id", verify, function (req, res) {
  const body = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(body.password, salt);
  body.password = hashedPassword;
  if (req.session.user_type == 1) {
    Admin.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      body
    )
      .then((results) => {
        if (!results) {
          return res.status(`${notFound}`).json(idNotFoundErrorHandler());
        } else {
          res.status(`${success}`).json(results);
        }
      })
      .catch((err) => {
        return res.status(`${failure}`).json(errorHandler(err));
      });
  } else {
    return res
      .status(`${authorizationFailed}`)
      .json(unauthorizedErrorHandler());
  }
});

// delete a admin from the db
router.delete("/admins/:id", verify, function (req, res) {
  if (req.session.user_type == 1) {
    Admin.findByIdAndRemove(
      {
        _id: req.params.id,
      },
      (err, results) => {
        if (err) {
          return res.status(`${failure}`).json(errorHandler(err));
        }
        if (!results) {
          return res.status(`${notFound}`).json(idNotFoundErrorHandler());
        }
        return res.status(`${success}`);
      }
    );
  } else {
    return res
      .status(`${authorizationFailed}`)
      .json(unauthorizedErrorHandler());
  }
});

// To get single Tpo data using id
router.get("/tpos/:id", verify, async (req, res) => {
  if (req.session.user_type == 2) {
    Tpo.findOne(
      {
        _id: req.params.id,
      },
      (err, results) => {
        if (err) {
          return res.status(`${notFound}`).json(idNotFoundErrorHandler());
        }
        return res.status(`${success}`).json(results);
      }
    );
  } else {
    return res
      .status(`${authorizationFailed}`)
      .json(unauthorizedErrorHandler());
  }
});

// To get all tpo's data
router.get("/tpos", async (req, res) => {
  if (req.session.user_type == 2) {
    Tpo.find({}, (err, results) => {
      if (err) {
        return res.status(`${notFound}`).json(idNotFoundErrorHandler());
      }
      return res.status(`${success}`).json(results);
    });
  } else {
    return res
      .status(`${authorizationFailed}`)
      .json(unauthorizedErrorHandler());
  }
});

//Update tpo's info
router.put("/tpos/:id", verify, function (req, res) {
  const body = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(body.password, salt);
  body.password = hashedPassword;
  if (req.session.user_type == 2) {
    Tpo.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      body
    )
      .then((results) => {
        if (!results) {
          return res.status(`${notFound}`).json(idNotFoundErrorHandler());
        } else {
          res.status(`${success}`).json(results);
        }
      })
      .catch((err) => {
        return res.status(`${failure}`).json(errorHandler(err));
      });
  } else {
    return res
      .status(`${authorizationFailed}`)
      .json(unauthorizedErrorHandler());
  }
});

// delete a tpo from the db
router.delete("/tpos/:id", verify, function (req, res) {
  if (req.session.user_type == 2) {
    Tpo.findByIdAndRemove(
      {
        _id: req.params.id,
      },
      (err, results) => {
        if (err) {
          return res.status(`${failure}`).json(errorHandler(err));
        }
        if (!results) {
          return res.status(`${notFound}`).json(idNotFoundErrorHandler());
        }
        return res.status(`${success}`);
      }
    );
  } else {
    return res
      .status(`${authorizationFailed}`)
      .json(unauthorizedErrorHandler());
  }
});

// To get single student data using id
router.get("/students/:id", verify, async (req, res) => {
  if (req.session.user_type == 3) {
    Student.findOne(
      {
        _id: req.params.id,
      },
      (err, results) => {
        if (err) {
          return res.status(`${notFound}`).json(idNotFoundErrorHandler());
        }
        return res.status(`${success}`).json(results);
      }
    );
  } else {
    return res
      .status(`${authorizationFailed}`)
      .json(unauthorizedErrorHandler());
  }
});

// To get all student's data
router.get("/students", async (req, res) => {
  if (req.session.user_type == 3) {
    Student.find({}, (err, results) => {
      if (err) {
        return res.status(`${notFound}`).json(idNotFoundErrorHandler());
      }
      return res.status(`${success}`).json(results);
    });
  } else {
    return res
      .status(`${authorizationFailed}`)
      .json(unauthorizedErrorHandler());
  }
});

//Update student's info
router.put("/students/:id", verify, function (req, res) {
  const body = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(body.password, salt);
  body.password = hashedPassword;
  if (req.session.user_type == 3) {
    Student.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      body
    )
      .then((results) => {
        if (!results) {
          return res.status(`${notFound}`).json(idNotFoundErrorHandler());
        } else {
          res.status(`${success}`).json(results);
        }
      })
      .catch((err) => {
        return res.status(`${failure}`).json(errorHandler(err));
      });
  } else {
    return res
      .status(`${authorizationFailed}`)
      .json(unauthorizedErrorHandler());
  }
});

// delete a student from the db
router.delete("/students/:id", verify, function (req, res) {
  if (req.session.user_type == 3) {
    Student.findByIdAndRemove(
      {
        _id: req.params.id,
      },
      (err, results) => {
        if (err) {
          return res.status(`${failure}`).json(errorHandler(err));
        }
        if (!results) {
          return res.status(`${notFound}`).json(idNotFoundErrorHandler());
        }
        return res.status(`${success}`);
      }
    );
  } else {
    return res
      .status(`${authorizationFailed}`)
      .json(unauthorizedErrorHandler());
  }
});

//Instruction

router.post("/instructions", verify, async (req, res) => {
  //LETS VALIDATE THE DATA BEFORE WE ADD A INSTRUCTION
  const {
    error
  } = instructionValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Checking if the college is already in the database
  const collegeExist = await Instruction.findOne({
    code: req.body.code,
  });
  if (collegeExist) return res.status(400).send("College already exist");

  // Create a new instruction
  const instructions = new Instruction({
    college_code: req.body.college_code,
    message: req.body.message,
    year: req.body.year,
    month: req.body.month,
    day: req.body.day,
  });
  try {
    const instructions = await instructions.save();
    res.json(instructions);
  } catch (err) {
    res.status(400).send(err);
  }
});

//display instructions
router.get("/instruction/:id", verify, async (req, res) => {
  Instruction.findOne({
      _id: req.params.id,
    },
    (err, response) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!response) {
        return res.json({
          message: "Record not Found",
        });
      }
      return res.json(response);
    }
  );
});

//Update instructions

router.put("/instruction/:id", verify, function (req, res, next) {
  Instruction
    .findOneAndUpdate({
        _id: req.params.id,
      },
      req.body
    )
    .then((data) => {
      if (admin === null) {
        return done(null, false, {
          message: "Something went wrong , Please try again",
        });
      } else {
        res.status(200).json(data);
      }
    })
    .catch(() => {
      res.status(400).json({
        message: "Data not found",
      });
    });
});

// delete a instruction from the db

router.delete("/instruction/:id", verify, function (req, res) {
  Instruction
    .findOneAndRemove({
      _id: req.params.id,
    })
    .then((admin) => {
      if (admin === null) {
        return done(null, false, {
          message: "Something went wrong , Please try again",
        });
      } else {
        res.status(200).json({
          message: "Instruction deleted successfully",
        });
      }
    })
    .catch(() => {
      res.status(400).json({
        message: "Data not found",
      });
    });
});

//Results

router.post("/results", verify, async (req, res) => {
  // LETS VALIDATE THE DATA BEFORE WE ADD A RESULT
  const {
    error
  } = resultValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Checking if the studentid is already in the database
  const studentExist = await Result.findOne({
    student_id: req.body.student_id,
  });
  if (studentExist)
    return res.status(400).send("Student has already given the test");

  // Create Result
  const result = new Result({
    student_id: req.body.student_id,
    roll: req.body.roll,
    name: req.body.name,
    code: req.body.code,
    question_paper_id: req.body.question_paper_id,
    question_attempt: req.body.question_attempt,
    correct_attempt: req.body.correct_attempt,
    total_marks_scored: req.body.total_marks_scored,
  });
  try {
    const result = await result.save();
    res.json(Result);
  } catch (err) {
    res.status(400).json(err);
  }
});

// display Results

router.get(
  "/colleges/:code/results/:question-paper-id",
  verify,
  async (req, res) => {
    Result.findOne({
        code: req.params.code,
        question_paper_id: req.params.question - paper - id,
      },
      (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        if (!results) {
          return res.json({
            message: "Record not Found",
          });
        }
        return res.json({
          results,
        });
      }
    );
  }
);

//questionCollections

router.post("/questioncollection", verify, async (req, res) => {
  //LETS VALIDATE THE DATA BEFORE WE ADD A COLLECTION
  const { error } = questionCollectionsValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  // Create a new questionCollection
  const questionCollection = new QuestionCollections({
    question: req.body.question,
    topic: req.body.topic,
    options: req.body.options,
    answer: req.body.answer,
    weight: req.body.weight,
  });
  try {
    const Collection = await questionCollection.save();
    res.send(Collection, {
      message: "Question added successfully into the database",
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

//get questionCollections

router.get("/questionCollection/:id", verify, async (req, res) => {
  QuestionCollections.findOne({
      _id: req.params.id,
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

//Update questioncollections

router.put("/questioncCollection/:id", verify, function (req, res, next) {
  QuestionCollections
    .findByIdAndUpdate({
        _id: req.params.id,
      },
      req.body
    )
    .then(function () {
      QuestionCollections
        .findOne({
          _id: req.params.id,
        })
        .then(function (QuestionCollection) {
          res.send(QuestionCollection);
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
      _id: req.params.id,
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
  const { error } = questionPaperValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Checking if the studentid is already in the database
  const collegeExist = await questionPaper.findOne({
    college_id: req.body.college_id,
  });
  if (collegeExist)
    return res.status(400).send("This college has already submitted the test");

  // Create a new questionPaper
  const questionPapers = new QuestionPaper({
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
  QuestionPaper.findOne({
      college_code: req.params.college_code,
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
  QuestionPaper
    .findOneAndUpdate({
        college_code: req.params.college_code,
      },
      req.body
    )
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
  QuestionPaper
    .findOneAndRemove({
      college_code: req.params.college_code,
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

//College Register
router.post("/register/college", async (req, res) => {
  //LETS VALIDATE THE DATA BEFORE WE MAKE A college user
  const { error } = collegeRegisterValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Checking if the college is already in the database
  const emailExist = await College.findOne({
    email: req.body.email,
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
    const user = await college.save();
    res.send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

// LOGIN COLLEGE
router.post("/login/college", async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error)
    return res
      .status(400)
      .send("Unable to login - the email must be a valid email");

  //Checking if the college is not in the database
  const college = await College.findOne({
    email: req.body.email,
  });
  if (!college) return res.status(400).send("Email not found");

  //Check if the password is correct
  const validPass = await bcrypt.compare(req.body.password, college.password);
  if (!validPass) return res.status(400).send("Invalid password");

  //Create and assign a token
  const token = jwt.sign(
    {
      _id: college._id,
    },
    process.env.TOKEN_SECRET
  );
  (req.session.email = admin.email),
    (req.session._id = admin._id),
    (req.session.token = token),
    (req.session.user_type = "Admin"),
    res.header("auth-token", token).json(req.session);
});

// display College Data

router.get("/college", verify, async (req, res) => {
  const id = req.user._id;
  College.findOne(
    {
      _id: id,
    },
    (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          message: "Record not Found",
        });
      }
      return res.json({
        data: results,
      });
    }
  );
});

//Update college's info

router.put("/college", verify, function (req, res, next) {
  const id = req.user._id;
  College.findOneAndUpdate(
    {
      _id: id,
    },
    req.body
  )
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
    _id: id,
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

module.exports = router;
