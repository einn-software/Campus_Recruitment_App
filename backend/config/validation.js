const Joi = require("@hapi/joi"); //Joi is the most powerful schema description language and data validator for JavaScript.

//Register Validation
const adminRegisterValidation = (data) => {
  const adminSchema = Joi.object({
    name: Joi.string().min(6).required().max(255),
    email: Joi.string().min(6).required().max(255).email(),
    password: Joi.string().min(6).max(255).required(),
    phone: Joi.number().required().min(10),
    resetLink: Joi.string(),
  });
  return adminSchema.validate(data);
};

// College Validation
const collegeRegisterValidation = (data) => {
  const collegeSchema = Joi.object({
    name: Joi.string().min(6).required().max(255),
    email: Joi.string().min(6).required().max(255).email(),
    password: Joi.string().min(6).max(255).required(),
    phone: Joi.number().required().min(10),
    college_code: Joi.string().min(3).required(),
    address: Joi.string().min(6).required().max(255),
    resetLink: Joi.string(),
  });
  return collegeSchema.validate(data);
};

// Tpo validation
const tpoRegisterValidation = (data) => {
  const tpoSchema = Joi.object({
    name: Joi.string().min(6).required().max(255),
    email: Joi.string().min(6).required().max(255).email(),
    password: Joi.string().min(6).max(255).required(),
    phone: Joi.number().required().min(10),
    designation: Joi.string().min(6).required().max(23),
    college: Joi.string().min(6).required().max(40),
    college_code: Joi.string().min(3).required(),
    resetLink: Joi.string(),
  });
  return tpoSchema.validate(data);
};

// Student validation
const studentRegisterValidation = (data) => {
  const studentSchema = Joi.object({
    name: Joi.string().min(6).required().max(255),
    email: Joi.string().min(6).required().max(255).email(),
    password: Joi.string().min(6).max(255).required(),
    phone: Joi.number().required().min(10),
    roll: Joi.number().min(6).required(),
    branch: Joi.string().min(6).max(255).required(),
    college: Joi.string().min(6).required().max(255),
    college_code: Joi.string().min(3).required(),
    resetLink: Joi.string(),
  });
  return studentSchema.validate(data);
};

//Login Validation for Admin, Tpo and College
const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

//STUDENT LOGIN VALIDATION
const studentloginValidation = (data) => {
  const schema = Joi.object({
    roll: Joi.number().min(6).required(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

// Test POST Instructions validation
const testinstructionsValidation = (data) => {
  const testinstructionsSchema = Joi.object({
    college_code: Joi.string().min(3).required(),
    message: Joi.string().required().min(10),
    date: Joi.string().required().min(10),
  });
  return testinstructionsSchema.validate(data);
};
// Test GET Instructions validation
const getinstructionsValidation = (data) => {
  const getinstructionsSchema = Joi.object({
    college_code: Joi.string().min(3).required(),
    date: Joi.string().required().min(10),
  });
  return getinstructionsSchema.validate(data);
};

// Result Validation
const ResultsValidation = (data) => {
  const ResultsSchema = Joi.object({
    roll: Joi.number().min(6).required(),
    question_paper_id: Joi.string().min(3).max(30).required(),
    question_attempt: Joi.string().min(1).max(30).required(),
    correct_attempt: Joi.string().min(1).max(30).required(),
    total_marks_scored: Joi.string().min(1).max(30).required(),
  });
  return ResultsSchema.validate(data);
};

// POST questionCollections validation
const questionCollectionsValidation = (data) => {
  const questionCollectionsSchema = Joi.object({
    question: Joi.string().required(),
    topic: Joi.string().required(),
    options: Joi.array()
      .items(
        Joi.object({
          option1: Joi.string().required(),
          option2: Joi.string().required(),
          option3: Joi.string().required(),
          option4: Joi.string().required(),
        })
      )
      .required(),
    answer: Joi.string().required(),
    weight: Joi.number().required(),
  });
  return questionCollectionsSchema.validate(data);
};

// POST questionPaper validation
const questionPaperValidation = (data) => {
  const questionPaperSchema = Joi.object({
    date: Joi.date().required(),
    max_marks: Joi.number().required(),
    max_time: Joi.number().required(),
    college_code: Joi.string().required().min(3),
    sections: Joi.array()
      .items(
        Joi.object({
          name: Joi.string().required(),
          marks: Joi.number().required(),
          numOfQuestion: Joi.number().required(),
          questionIdList: Joi.number().required(),
        })
      )
      .required(),
  });
  return questionPaperSchema.validate(data);
};

module.exports.adminRegisterValidation = adminRegisterValidation;
module.exports.collegeRegisterValidation = collegeRegisterValidation;
module.exports.tpoRegisterValidation = tpoRegisterValidation;
module.exports.studentRegisterValidation = studentRegisterValidation;
module.exports.loginValidation = loginValidation;
module.exports.studentloginValidation = studentloginValidation;
module.exports.testinstructionsValidation = testinstructionsValidation;
module.exports.getinstructionsValidation = getinstructionsValidation;
module.exports.ResultsValidation = ResultsValidation;
module.exports.questionCollectionsValidation = questionCollectionsValidation;
module.exports.questionPaperValidation = questionPaperValidation;