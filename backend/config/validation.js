const Joi = require("@hapi/joi"); //Joi is the most powerful schema description language and data validator for JavaScript.
Joi.objectId = require("joi-objectid")(Joi);
const Constants = require("./constant");

//Admin Register Validation
const adminRegisterValidation = (data) => {
  const adminSchema = Joi.object({
    name: Joi.string().min(Constants.name_min_length).max(Constants.name_max_length).required(),
    email: Joi.string().min(Constants.email_min_length).max(Constants.email_max_length).email().required(),
    password: Joi.string().min(Constants.password_min_length).max(Constants.password_max_length).required(),
    phone: Joi.string().min(Constants.phone_min_length).max(Constants.phone_max_length).required(),
  });
  return adminSchema.validate(data);
};

// College Register Validation
const collegeValidation = (data) => {
  const collegeSchema = Joi.object({
    name: Joi.string().min(Constants.name_min_length).required().max(Constants.name_max_length),
    code: Joi.number().min(Constants.code_min_length).max(Constants.code_max_length),
    address: Joi.string().min(Constants.address_min_length).max(Constants.address_max_length).required(),
    university: Joi.string().min(Constants.university_min_length).max(Constants.university_max_length).required(),
    email: Joi.string().min(Constants.email_min_length).required().max(Constants.email_max_length).email(),
    phone: Joi.string().min(Constants.phone_min_length).max(Constants.phone_max_length).required(),
  });
  return collegeSchema.validate(data);
};

// Tpo Register validation
const tpoRegisterValidation = (data) => {
  const tpoSchema = Joi.object({
    name: Joi.string().min(Constants.name_min_length).required().max(Constants.name_max_length),
    email: Joi.string().min(Constants.email_min_length).required().max(Constants.email_max_length).email(),
    password: Joi.string().min(Constants.password_min_length).max(Constants.password_max_length).required(),
    phone: Joi.string().min(Constants.phone_min_length).max(Constants.phone_max_length).required(),
    designation: Joi.string().min(Constants.designation_min_length).max(Constants.designation_max_length).required(),
    college: Joi.string().min(Constants.college_min_length).max(Constants.college_max_length).required(),
    code: Joi.number().min(Constants.code_min_length).max(Constants.code_max_length).required(),
  });
  return tpoSchema.validate(data);
};

// Student register validation
const studentRegisterValidation = (data) => {
  const studentSchema = Joi.object({
    name: Joi.string().min(Constants.name_min_length).required().max(Constants.name_max_length),
    email: Joi.string().min(Constants.email_min_length).required().max(Constants.email_max_length).email(),
    password: Joi.string().min(Constants.password_min_length).max(Constants.password_max_length).required(),
    phone: Joi.string().min(Constants.phone_min_length).max(Constants.phone_max_length).required(),
    roll: Joi.string().min(Constants.roll_min_length).max(Constants.roll_max_length).required(),
    branch: Joi.string().min(Constants.branch_min_length).max(Constants.branch_max_length).required(),
    college: Joi.string().min(Constants.college_min_length).max(Constants.college_max_length).required(),
    code: Joi.number().min(Constants.code_min_length).max(Constants.code_max_length).required(),
    exam_start_time: Joi.date(),
  });
  return studentSchema.validate(data);
};

//Login Validation for Admin, Tpo and College
const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(Constants.email_min_length).required().max(Constants.email_max_length).email(),
    password: Joi.string().min(Constants.password_min_length).max(Constants.password_max_length).required(),
  });
  return schema.validate(data);
};

//STUDENT LOGIN VALIDATION
const studentloginValidation = (data) => {
  const schema = Joi.object({
    code: Joi.number().min(Constants.code_min_length).max(Constants.code_max_length).required(),
    roll: Joi.string().min(Constants.roll_min_length).max(Constants.roll_max_length).required(),
    password: Joi.string().min(Constants.password_min_length).max(Constants.password_max_length).required(),
  });
  return schema.validate(data);
};

// POST Instructions validation
const instructionValidation = (data) => {
  const instructionSchema = Joi.object({
    code: Joi.number().min(Constants.code_min_length).max(Constants.code_max_length).required(),
    message: Joi.string().min(Constants.message_min_length).required(),
    year: Joi.number().min(Constants.year_min_length).max(Constants.year_max_length).required(),
    month: Joi.number().min(Constants.month_min_length).max(Constants.month_max_length).required(),
    day: Joi.number().min(Constants.day_min_length).max(Constants.day_max_length).required(),
  });
  return instructionSchema.validate(data);
};

// POST Result Validation
const resultValidation = (data) => {
  const resultSchema = Joi.object({
    student_id: Joi.objectId().required(),
    roll: Joi.string().min(Constants.roll_min_length).max(Constants.roll_max_length),
    name: Joi.string().min(Constants.name_min_length).max(Constants.name_max_length),
    code: Joi.number().min(Constants.code_min_length).max(Constants.code_max_length),
    question_paper_id: Joi.objectId().required(),
    question_attempt: Joi.number().min(Constants.question_attempt_min_length).max(Constants.question_attempt_max_length),
    correct_attempt: Joi.number().min(Constants.correct_attempt_min_length).max(Constants.correct_attempt_max_length),
    total_marks_scored: Joi.number().max(Constants.total_marks_scored_max_length),
  });
  return resultSchema.validate(data);
};

// POST questionCollections validation
const questionCollectionsValidation = (data) => {
  const questionCollectionsSchema = Joi.object({
    question: Joi.string().min(Constants.question_min_length).required(),
    topic: Joi.string().min(Constants.topic_min_length).max(Constants.topic_max_length).required(),
    options: Joi.array()
      .items(
        Joi.object({
          index: Joi.number().required(),
          option: Joi.string().min(Constants.option_min_length).required(),
        })
      )
      .required(),
    answer: Joi.number().min(Constants.answer_min_length).max(Constants.answer_max_length).required(),
    weight: Joi.number().min(Constants.weight_min_length).max(Constants.weight_max_length).required(),
  });
  return questionCollectionsSchema.validate(data);
};

// POST questionPaper validation
const questionPaperValidation = (data) => {
  const questionPaperSchema = Joi.object({
    year: Joi.number().min(Constants.year_min_length).max(Constants.year_max_length).required(),
    month: Joi.number().min(Constants.month_min_length).max(Constants.month_max_length).required(),
    day: Joi.number().min(Constants.day_min_length).max(Constants.day_max_length).required(),
    paper_name: Joi.string().min(Constants.paper_name_min_length).max(Constants.paper_name_max_length).required(),
    paper_max_marks: Joi.number().min(Constants.paper_max_marks_min_length).max(Constants.paper_max_marks_max_length).required(),
    max_time: Joi.number().required(),
    instructions_id: Joi.objectId().required(),
    code: Joi.number().min(Constants.code_min_length).max(Constants.code_max_length).required(),
    start_time: Joi.string().required(),
    trigger_type: Joi.number().required(),
    enable: Joi.number().required(),
    negative_marking_ratio: Joi.number().min(Constants.negative_marking_ratio_min_length).required(),
    sections: Joi.array()
      .items(
        Joi.object({
          section_name: Joi.string().min(Constants.section_name_min_length).max(Constants.section_name_max_length).required(),
          section_marks: Joi.number().min(Constants.section_marks_min_length).max(Constants.section_marks_max_length).required(),
          num_of_questions: Joi.number().min(Constants.num_of_questions_min_length).max(Constants.num_of_questions_max_length).required(),
          question_list: Joi.array().items(
            Joi.object({
              question_id: Joi.objectId().required(),
              question_marks: Joi.number().min(Constants.marks_min_length).max(Constants.marks_max_length).required(),
            })
          ),
        })
      )
      .required(),
  });
  return questionPaperSchema.validate(data);
};

// Post StudentAnswerSheet Validation
const states = [Constants.answered, Constants.markedForReview, Constants.unmarked];
const match = [0, 1, 2, 3, 4];
const studentAnswerSheetValidation = (data) => {
  const studentAnswerSheetSchema = Joi.object({
    student_id: Joi.objectId().required(),
    question_paper_id: Joi.objectId().required(),
    question_id: Joi.objectId().required(),
    selected_option: Joi.number().valid(...match).required(),
    state: Joi.number()
      .valid(...states)
      .required(),
    marks_rewarded: Joi.number().min(Constants.marks_min_length).max(Constants.marks_max_length),
    question_max_marks: Joi.number().min(Constants.marks_min_length).max(Constants.marks_max_length).required()
  });
  return studentAnswerSheetSchema.validate(data);
};

//Post final submission validation
const finalSubmissionValidation = (data) => {
  const finalSubmissionSchema = Joi.object({
    question_paper_id: Joi.objectId().required(),
    student_id: Joi.objectId().required()
  });
  return finalSubmissionSchema.validate(data);
};

// All the put request validation
// PUT Instructions validation
const instructionPutValidation = (data) => {
  const instructionPutSchema = Joi.object({
    code: Joi.number().min(Constants.code_min_length).max(Constants.code_max_length),
    message: Joi.string().min(Constants.message_min_length),
    year: Joi.number().min(Constants.year_min_length).max(Constants.year_max_length),
    month: Joi.number().min(Constants.month_min_length).max(Constants.month_max_length),
    day: Joi.number().min(Constants.day_min_length).max(Constants.day_max_length),
  });
  return instructionPutSchema.validate(data);
};
// Put Student validation
const studentPutValidation = (data) => {
  const studentPutSchema = Joi.object({
    name: Joi.string().min(Constants.name_min_length).max(Constants.name_max_length),
    email: Joi.string().min(Constants.email_min_length).max(Constants.email_max_length).email(),
    password: Joi.string().min(Constants.password_min_length).max(Constants.password_max_length),
    phone: Joi.string().min(Constants.phone_min_length).max(Constants.phone_max_length),
    roll: Joi.string().min(Constants.roll_min_length).max(Constants.roll_max_length),
    branch: Joi.string().min(Constants.branch_min_length).max(Constants.branch_max_length),
    exam_start_time: Joi.date(),
  });
  return studentPutSchema.validate(data);
};
//Put Admin Validation
const adminPutValidation = (data) => {
  const adminPutSchema = Joi.object({
    name: Joi.string().min(Constants.name_min_length).max(Constants.name_max_length),
    email: Joi.string().min(Constants.email_min_length).max(Constants.email_max_length).email(),
    password: Joi.string().min(Constants.password_min_length).max(Constants.password_max_length),
    phone: Joi.string().min(Constants.phone_min_length).max(Constants.phone_max_length)
  });
  return adminPutSchema.validate(data);
};

// PUT College Validation
const collegePutValidation = (data) => {
  const collegePutSchema = Joi.object({
    name: Joi.string().min(Constants.name_min_length).max(Constants.name_max_length),
    address: Joi.string().min(Constants.address_min_length).max(Constants.address_max_length),
    university: Joi.string().min(Constants.university_min_length).max(Constants.university_max_length),
    email: Joi.string().min(Constants.email_min_length).max(Constants.email_max_length).email(),
    phone: Joi.string().min(Constants.phone_min_length).max(Constants.phone_max_length)
  });
  return collegePutSchema.validate(data);
};

// PUT Tpo validation
const tpoPutValidation = (data) => {
  const tpoPutSchema = Joi.object({
    name: Joi.string().min(Constants.name_min_length).max(Constants.name_max_length),
    email: Joi.string().min(Constants.email_min_length).max(Constants.email_max_length).email(),
    password: Joi.string().min(Constants.password_min_length).max(Constants.password_max_length),
    phone: Joi.string().min(Constants.phone_min_length).max(Constants.phone_max_length),
    designation: Joi.string().min(Constants.designation_min_length).max(Constants.designation_max_length)
  });
  return tpoPutSchema.validate(data);
};

// PUT questionCollections validation
const questionCollectionsPutValidation = (data) => {
  const questionCollectionsPutSchema = Joi.object({
    question: Joi.string().min(Constants.question_min_length),
    topic: Joi.string().min(Constants.topic_min_length).max(Constants.topic_max_length),
    options: Joi.array()
      .items(
        Joi.object({
          index: Joi.number(),
          option: Joi.string().min(Constants.option_min_length),
        })
      ),
    answer: Joi.number().min(Constants.answer_min_length).max(Constants.answer_max_length),
    weight: Joi.number().min(Constants.weight_min_length).max(Constants.weight_max_length),
  });
  return questionCollectionsPutSchema.validate(data);
};

// PUT questionPaper validation
const questionPaperPutValidation = (data) => {
  const questionPaperPutSchema = Joi.object({
    year: Joi.number().min(Constants.year_min_length).max(Constants.year_max_length),
    month: Joi.number().min(Constants.month_min_length).max(Constants.month_max_length),
    day: Joi.number().min(Constants.day_min_length).max(Constants.day_max_length),
    paper_name: Joi.string().min(Constants.paper_name_min_length).max(Constants.paper_name_max_length),
    paper_max_marks: Joi.number().min(Constants.paper_max_marks_min_length).max(Constants.paper_max_marks_max_length),
    max_time: Joi.number(),
    instructions_id: Joi.objectId(),
    code: Joi.number().min(Constants.code_min_length).max(Constants.code_max_length),
    start_time: Joi.string(),
    trigger_type: Joi.number(),
    enable: Joi.number(),
    negative_marking_ratio: Joi.number().min(Constants.negative_marking_ratio_min_length),
    sections: Joi.array().items(
      Joi.object({
        section_name: Joi.string().min(Constants.section_name_min_length).max(Constants.section_name_max_length),
        section_marks: Joi.number().min(Constants.section_marks_min_length).max(Constants.section_marks_max_length),
        num_of_questions: Joi.number().min(Constants.num_of_questions_min_length).max(Constants.num_of_questions_max_length),
        question_list: Joi.array().items(
          Joi.object({
            question_id: Joi.objectId(),
            question_marks: Joi.number().min(Constants.marks_min_length).max(Constants.marks_max_length),
          })
        ),
      })
    ),
  });
  return questionPaperPutSchema.validate(data);
};

//Put Student Answer Sheet
const answerSheetPutValidation = (data) => {
  const studentAnswerSheetPutSchema = Joi.object({
    student_id: Joi.objectId(),
    question_paper_id: Joi.objectId(),
    question_id: Joi.objectId(),
    selected_option: Joi.number().valid(...match),
    state: Joi.number()
      .valid(...states),
    question_max_marks: Joi.number().min(Constants.marks_min_length).max(Constants.marks_max_length)
  });
  return studentAnswerSheetPutSchema.validate(data);
};

const reqPasswordBodyValidation = (data) => {
  const reqPasswordBodySchema = Joi.object({
    newPassword: Joi.string().min(Constants.password_min_length).max(Constants.password_max_length)
  });
  return reqPasswordBodySchema.validate(data);
};

// Patch questionPaper validation
const questionPaperPatchValidation = (data) => {
  const questionPaperPatchSchema = Joi.object({
    start_time: Joi.string(),
    enable: Joi.number(),
  });
  return questionPaperPatchSchema.validate(data);
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
module.exports.questionCollectionsPutValidation = questionCollectionsPutValidation;
module.exports.questionPaperValidation = questionPaperValidation;
module.exports.questionPaperPutValidation = questionPaperPutValidation;
module.exports.questionPaperPatchValidation = questionPaperPatchValidation;
module.exports.studentAnswerSheetValidation = studentAnswerSheetValidation;
module.exports.answerSheetPutValidation = answerSheetPutValidation;
module.exports.tpoPutValidation = tpoPutValidation;
module.exports.adminPutValidation = adminPutValidation;
module.exports.collegePutValidation = collegePutValidation;
module.exports.reqPasswordBodyValidation = reqPasswordBodyValidation;
module.exports.answerSheetPutValidation = answerSheetPutValidation;
module.exports.reqPasswordBodyValidation = reqPasswordBodyValidation;
module.exports.finalSubmissionValidation = finalSubmissionValidation;