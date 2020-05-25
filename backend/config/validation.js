const Joi = require("@hapi/joi"); //Joi is the most powerful schema description language and data validator for JavaScript.

//Register Validation
const adminRegisterValidation = (data) => {
  const adminSchema = Joi.object({
    name: Joi.string().min(6).required().max(255),
    email: Joi.string().min(13).required().max(255).email(),
    password: Joi.string().min(6).max(1024).required(),
    phone: Joi.string().required(),
    resetLink: Joi.string(),
  });
  return adminSchema.validate(data);
};

// College Validation
const collegeRegisterValidation = (data) => {
  const collegeSchema = Joi.object({
    name: Joi.string().min(6).required().max(255),
    email: Joi.string().min(13).required().max(255).email(),
    university: Joi.string().min(6).max(255).required(),
    phone: Joi.string().required(),
    code: Joi.number().min(4).required(),
    address: Joi.string().min(13).required().max(255),
    resetLink: Joi.string(),
  });
  return collegeSchema.validate(data);
};

// Tpo validation
const tpoRegisterValidation = (data) => {
  const tpoSchema = Joi.object({
    name: Joi.string().min(6).required().max(255),
    email: Joi.string().min(13).required().max(255).email(),
    password: Joi.string().min(6).max(255).required(),
    phone: Joi.string().required(),
    designation: Joi.string().min(6).required().max(23),
    college: Joi.string().min(6).required().max(40),
    code: Joi.number().min(4).required(),
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
    phone: Joi.string().required(),
    roll: Joi.string().required(),
    branch: Joi.string().min(6).max(255).required(),
    college: Joi.string().min(6).required().max(255),
    code: Joi.number().min(4).required(),
    exam_start_time: Joi.date().required(),
    resetLink: Joi.string(),
  });
  return studentSchema.validate(data);
};

//Login Validation for Admin, Tpo and College
const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(13).max(255).required().email(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

//STUDENT LOGIN VALIDATION
const studentloginValidation = (data) => {
  const schema = Joi.object({
    code: Joi.number().min(4).required(),
    roll: Joi.string().min(13).max(255).required(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

// Test POST Instructions validation
const instructionValidation = (data) => {
  const instructionsSchema = Joi.object({
    code: Joi.number().min(4).required(),
    message: Joi.string().required(),
    year: Joi.number().required(),
    month: Joi.number().required(),
    day: Joi.number().required(),
  });
  return instructionSchema.validate(data);
};

// Result Validation
const resultValidation = (data) => {
  const resultSchema = Joi.object({
    roll: Joi.string().required(),
    name: Joi.string().min(6).required().max(255),
    code: Joi.number().min(4).required(),
    question_paper_id: Joi.string().required(),
    question_attempt: Joi.string().required(),
    correct_attempt: Joi.string().required(),
    total_marks_scored: Joi.string().required(),
  });
  return resultSchema.validate(data);
};

// POST questionCollections validation
const questionCollectionsValidation = (data) => {
  const questionCollectionsSchema = Joi.object({
    question: Joi.string().required(),
    topic: Joi.string().required(),
    options: Joi.array()
      .items(
        Joi.object({
          index: Joi.code().required(),
          option: Joi.string().required(),
        })
      )
      .required(),
    answer: Joi.number().required(),
    weight: Joi.number().required(),
  });
  return questionCollectionsSchema.validate(data);
};

// POST questionPaper validation
const questionPaperValidation = (data) => {
  const questionPaperSchema = Joi.object({
    year: Joi.number().required(),
    month: Joi.number().required(),
    day: Joi.number().required(),
    paper_name: Joi.string().required(),
    max_marks: Joi.number().required(),
    max_time: Joi.string().required(),
    instructions_id: Joi.string().required(),
    code: Joi.number().required().min(4),
    start_time: Joi.number().required(),
    sections: Joi.array()
      .items(
        Joi.object({
          marks: Joi.number().required(),
          numOfQuestion: Joi.number().required(),
          question_list: Joi.array().items(
            Joi.object({
              question_id: Joi.string().required(),
              marks: Joi.number().required(),
            })
          ),
        })
      )
      .required(),
  });
  return questionPaperSchema.validate(data);
};

// Post StudentAnswerSheet Validation

const studentAnswerSheetValidation = (data) =>{
  const studentAnswerSheetSchema = Joi.object({
     student_id: Joi.string().required(),
     question_paper_id: Joi.string().required(),
     question_collection_id: Joi.string().required(),
     selected_option: Joi.number().required(),
     state: Joi.number().required(),

  });
  return studentAnswerSheetSchema.validate(data);
};

module.exports.adminRegisterValidation = adminRegisterValidation;
module.exports.collegeRegisterValidation = collegeRegisterValidation;
module.exports.tpoRegisterValidation = tpoRegisterValidation;
module.exports.studentRegisterValidation = studentRegisterValidation;
module.exports.loginValidation = loginValidation;
module.exports.studentloginValidation = studentloginValidation;
module.exports.instructionValidation = instructionValidation;
module.exports.resultValidation = resultValidation;
module.exports.questionCollectionsValidation = questionCollectionsValidation;
module.exports.questionPaperValidation = questionPaperValidation;
module.exports.studentAnswerSheetValidation = studentAnswerSheetValidation;
