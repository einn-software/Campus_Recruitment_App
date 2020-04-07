const Joi = require('@hapi/joi');

//Register Validation
const adminRegisterValidation = data => {
    const adminSchema = Joi.object({

        name: Joi.string().min(6).required().max(255),
        email: Joi.string().min(6).required().max(255).email(),
        password: Joi.string().min(6).max(255).required(),
        phone: Joi.number().required().min(10),
     });
     return adminSchema.validate(data);
}
const collegeRegisterValidation = data => {    
    const collegeSchema = Joi.object({
    
       name: Joi.string()
            .min(6)
            .required()
            .max(255),
       email: Joi.string()
            .min(6)
            .required()
            .max(255)
            .email(),
       password: Joi.string()
            .min(6)
            .max(255)
            .required(),
       phone: Joi.number()
            .required()
            .min(10),
       code: Joi.string()
            .min(3)
            .required(),
       address: Joi.string()
            .min(6)
            .required()
            .max(255),
     
     });
     return collegeSchema.validate(data);
}
const tpoRegisterValidation = data => {    
    const  tpoSchema = Joi.object({
    
       name: Joi.string()
            .min(6)
            .required()
            .max(255),
       email: Joi.string()
            .min(6)
            .required()
            .max(255)
            .email(),
       password: Joi.string()
            .min(6)
            .max(255)
            .required(),
       phone: Joi.number()
            .required()
            .min(10),
       designation: Joi.string()
            .min(6)
            .required()
            .max(23),
       college: Joi.string()
            .min(6)
            .required()
            .max(40),
     
     });
     return tpoSchema.validate(data);
}
const studentRegisterValidation = data => {     
      const studentSchema = Joi.object({
     
        name: Joi.string()
             .min(6)
             .required()
             .max(255),
        email: Joi.string()
             .min(6)
             .required()
             .max(255)
             .email(),
        password: Joi.string()
             .min(6)
             .max(255)
             .required(),
        phone: Joi.number()
             .required()
             .min(10),
         roll:  Joi.number()
             .min(6)
             .required(),
         branch: Joi.string()
             .min(6)
             .max(255)
             .required(),
         college: Joi.string()
             .min(6)
             .required()
             .max(255),
      });
      return studentSchema.validate(data);
}
//Login Validation
const loginValidation = data => {
    const schema = Joi.object({
        email: Joi.string()
            .min(6)
            .required()
            .email(),
        password: Joi.string()
        .min(6)
        .required()
    });
    return schema.validate(data);

}

// Test POST Instructions validation
    const testinstructionsValidation = data => {
     const testinstructionsSchema = Joi.object({
 
         college: Joi.string()
              .min(6)
              .required()
              .max(255),
         message: Joi.string()       
              .required().min(10)       
      });
      return testinstructionsSchema.validate(data);
     
     }
// Test GET Instructions validation
const getinstructionsValidation = data => {
     const getinstructionsSchema = Joi.object({
 
         college: Joi.string()
              .min(6)
              .required()
              .max(255),
      
      });
      return getinstructionsSchema.validate(data);
     
     }

 
// Result Validation
const ResultsValidation = data => {
     const ResultsSchema = Joi.object({
 
         student_id: Joi.string().min(4).max(30)
              .required(),       
         question_paper_id: Joi.string().min(4).max(30)
              .required(),              
         question_attempt: Joi.string().min(1).max(30)
              .required(),
         correct_attempt: Joi.string().min(1).max(30)
              .required(),
         total_marks_scored: Joi.string().min(2).max(30)
              .required()
      });
      return ResultsSchema.validate(data);
}
//Get Result Validation
const getResultsValidation = data => {
     const getResultsSchema = Joi.object({
 
         student_id: Joi.string().min(4).max(30)
              .required(),       
      });
      return getResultsSchema.validate(data);
}
// POST questionCollections validation
const questionCollectionsValidation = data => {
     const questionCollectionsSchema = Joi.object({
 
         question: Joi.number()
              .required(),       
         topic: Joi.string()
              .required(),              
         options: Joi.number()
              .required(),
         answer: Joi.number()
              .required(),
         weight: Joi.number()
              .required()
      });
      return questionCollectionsSchema.validate(data);
}

// GET questionCollections validation
const getquestionCollectionsValidation = data => {
     const getquestionCollectionsSchema = Joi.object({
 
         topic: Joi.string().min(4).max(30)
              .required(),       
      });
      return getquestionCollectionsSchema.validate(data);
}


// POST questionPaper validation
const questionPaperValidation = data => {
     const questionPaperSchema = Joi.object({
 
         date: Joi.date()
              .required(),       
         max_marks: Joi.number()
              .required(),              
         max_time: Joi.string()
              .required(),
         college_id: Joi.number()
              .required(),
   });
      return questionPaperSchema.validate(data);
}
// GET questionPaper validation
const getquestionPaperValidation = data => {
     const getquestionPaperSchema = Joi.object({
 
         college_id: Joi.number().min(4).max(30)
              .required(),       
      });
      return getquestionPaperSchema.validate(data);
}






module.exports.adminRegisterValidation = adminRegisterValidation;
module.exports.collegeRegisterValidation = collegeRegisterValidation;
module.exports.tpoRegisterValidation = tpoRegisterValidation;
module.exports.studentRegisterValidation = studentRegisterValidation;
module.exports.loginValidation = loginValidation;
module.exports.testinstructionsValidation = testinstructionsValidation;
module.exports.getinstructionsValidation = getinstructionsValidation;
module.exports.ResultsValidation = ResultsValidation;
module.exports.getResultsValidation = getResultsValidation;
module.exports.questionCollectionsValidation = questionCollectionsValidation;
module.exports.getquestionCollectionsValidation = getquestionCollectionsValidation;
module.exports.questionPaperValidation = questionPaperValidation;
module.exports.getquestionPaperValidation = getquestionPaperValidation;

