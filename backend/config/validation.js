const Joi = require("@hapi/joi"); //Joi is the most powerful schema description language and data validator for JavaScript.

//Admin Register Validation
const adminRegisterValidation = (data) => {
  const adminSchema = Joi.object({
    name: Joi.string().min(6).required().max(255),
    email: Joi.string().min(13).required().max(255).email(),
    password: Joi.string().min(6).max(1024).required(),
    phone: Joi.string().required()
  });
  return adminSchema.validate(data);
};

// College Register Validation
const collegeValidation = (data) => {
  const collegeSchema = Joi.object({
    name: Joi.string().min(6).required().max(255),
    code: Joi.number().min(4),
    address: Joi.string().min(13).required().max(255),
    university: Joi.string().min(6).max(255).required(),
    email: Joi.string().min(13).required().max(255).email(),
    phone: Joi.string().required(),
  });
  return collegeSchema.validate(data);
};

// Tpo Register validation
const tpoRegisterValidation = (data) => {
  const tpoSchema = Joi.object({
    name: Joi.string().min(6).required().max(255),
    email: Joi.string().min(13).required().max(255).email(),
    password: Joi.string().min(6).max(255).required(),
    phone: Joi.string().required(),
    designation: Joi.string().min(6).required().max(23),
    college: Joi.string().min(6).required().max(40),
    code: Joi.string().min(4).required(),
  });
  return tpoSchema.validate(data);
};

// Student register validation
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
    exam_start_time: Joi.date()
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

// POST Instructions validation
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

// POST Result Validation
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

const studentAnswerSheetValidation = (data) => {
  const studentAnswerSheetSchema = Joi.object({
    student_id: Joi.string().required(),
    question_paper_id: Joi.string().required(),
    question_collection_id: Joi.string().required(),
    selected_option: Joi.number().required(),
    state: Joi.number().required(),

  });
  return studentAnswerSheetSchema.validate(data);
};

// All the put request validation 
// PUT Instructions validation
const instructionPutValidation = (data) => {
  const instructionPutSchema = Joi.object({
    code: Joi.number().min(4),
    message: Joi.string(),
    year: Joi.number(),
    month: Joi.number(),
    day: Joi.number(),
  });
  return instructionPutSchema.validate(data);
};
// Put Student validation
const studentPutValidation = (data) => {
  const studentPutSchema = Joi.object({
    name: Joi.string().min(6).max(255),
    email: Joi.string().min(6).max(255).email(),
    password: Joi.string().min(6).max(255),
    phone: Joi.string(),
    roll: Joi.string(),
    branch: Joi.string().min(6).max(255),
    college: Joi.string().min(6).max(255),
    code: Joi.number().min(4),
    exam_start_time: Joi.date()
  });
  return studentPutSchema.validate(data);
};
//Put Admin Validation
const adminPutValidation = (data) => {
  const adminPutSchema = Joi.object({
    name: Joi.string().min(6).max(255),
    email: Joi.string().min(13).max(255).email(),
    password: Joi.string().min(6).max(1024),
    phone: Joi.string()
  });
  return adminPutSchema.validate(data);
};

// PUT College Validation
const collegePutValidation = (data) => {
  const collegePutSchema = Joi.object({
    name: Joi.string().min(6).max(255),
    address: Joi.string().min(13).max(255),
    university: Joi.string().min(6).max(255),
    email: Joi.string().min(13).max(255).email(),
    phone: Joi.string(),
  });
  return collegePutSchema.validate(data);
};

// PUT Tpo validation
const tpoPutValidation = (data) => {
  const tpoPutSchema = Joi.object({
    name: Joi.string().min(6).max(255),
    email: Joi.string().min(13).max(255).email(),
    password: Joi.string().min(6).max(255),
    phone: Joi.string(),
    designation: Joi.string().min(6).max(23),
    college: Joi.string().min(6).max(40),
    code: Joi.string().min(4),
  });
  return tpoPutSchema.validate(data);
};





module.exports.adminRegisterValidation = adminRegisterValidation;
module.exports.collegeValidation = collegeValidation;
module.exports.tpoRegisterValidation = tpoRegisterValidation;
module.exports.studentRegisterValidation = studentRegisterValidation;
module.exports.loginValidation = loginValidation;
module.exports.studentloginValidation = studentloginValidation;
module.exports.studentPutValidation = studentPutValidation;
module.exports.instructionValidation = instructionValidation;
module.exports.instructionPutValidation = instructionPutValidation;
module.exports.resultValidation = resultValidation;
module.exports.questionCollectionsValidation = questionCollectionsValidation;
module.exports.questionPaperValidation = questionPaperValidation;
module.exports.studentAnswerSheetValidation = studentAnswerSheetValidation;
module.exports.tpoPutValidation = tpoPutValidation;
module.exports.adminPutValidation = adminPutValidation;
module.exports.collegePutValidation = collegePutValidation;