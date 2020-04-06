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

    const testinstructionsValidation = data => {
     const testinstructionsSchema = Joi.object({
 
         college: Joi.string()
              .min(6)
              .required()
              .max(255),
         message: Joi.string()
              
              .required()
              
      });
      return testinstructionsSchema.validate(data);
     
     }

     
const ResultsValidation = data => {
     const ResultsSchema = Joi.object({
 
         student_id: Joi.number()
              
              .required(),
              
         question_paper_id: Joi.number()
              .required(),              
         question_attempt: Joi.number()
              .required(),
         correct_attempt: Joi.number()
              .required(),
         total_marks_scored: Joi.number()
              .required() 

              
      });
      return ResultsSchema.validate(data);
}
module.exports.adminRegisterValidation = adminRegisterValidation;
module.exports.collegeRegisterValidation = collegeRegisterValidation;
module.exports.tpoRegisterValidation = tpoRegisterValidation;
module.exports.studentRegisterValidation = studentRegisterValidation;
module.exports.loginValidation = loginValidation;
module.exports.testinstructionsValidation = testinstructionsValidation;
module.exports.ResultsValidation = ResultsValidation;