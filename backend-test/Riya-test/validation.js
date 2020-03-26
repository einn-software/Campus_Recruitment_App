//Validation
const Joi = require('@hapi/joi');

//Register Validation
const registerValidation = data => {
    const userSchema = Joi.object({

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
     });
     return userSchema.validate(data);
}
// const collegeRegisterValidation = data => {    
//      const collegeSchema = Joi.object({
     
//         name: Joi.string()
//              .min(6)
//              .required()
//              .max(255),
//         email: Joi.string()
//              .min(6)
//              .required()
//              .max(255)
//              .email(),
//         password: Joi.string()
//              .min(6)
//              .max(255)
//              .required(),
//         phone: Joi.number()
//              .required()
//              .min(10),
//         code: Joi.number()
//              .min(6)
//              .max(10)
//              .required(),
//         address: Joi.string()
//              .min(6)
//              .required()
//              .max(255),
      
//       });
//       return collegeSchema.validate(data);
// }
// const tpoRegisterValidation = data => {    
//       const  tpoSchema = Joi.object({
     
//         name: Joi.string()
//              .min(6)
//              .required()
//              .max(255),
//         email: Joi.string()
//              .min(6)
//              .required()
//              .max(255)
//              .email(),
//         password: Joi.string()
//              .min(6)
//              .max(255)
//              .required(),
//         phone: Joi.number()
//              .required()
//              .min(10),
//         designation: Joi.string()
//              .min(6)
//              .required()
//              .max(23),
//         college: Joi.string()
//              .min(6)
//              .required()
//              .max(40),
      
//       });
//       return tpoSchema.validate(data);
// }
// const studentRegisterValidation = data => {     
//       const studentSchema = Joi.object({
     
//         name: Joi.string()
//              .min(6)
//              .required()
//              .max(255),
//         email: Joi.string()
//              .min(6)
//              .required()
//              .max(255)
//              .email(),
//         password: Joi.string()
//              .min(6)
//              .max(255)
//              .required(),
//         phone: Joi.number()
//              .required()
//              .min(10),
//         designation: Joi.string()
//              .min(6)
//              .required()
//              .max(255),
//         college: Joi.string()
//              .min(6)
//              .required()
//              .max(255),
//          roll:  Joi.number()
//              .min(6)
//              .max(255)
//              .required(),
//          branch: Joi.string()
//              .min(6)
//              .max(255)
//              .required(),
//       });
//       return studentSchema.validate(data);
// }
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
module.exports.registerValidation = registerValidation;
// module.exports.tpoRegisterValidation = tpoRegisterValidation;
// module.exports.adminRegisterValidation = collegeRegisterValidation;
// module.exports.studentRegisterValidation = studentRegisterValidation;
module.exports.loginValidation = loginValidation;