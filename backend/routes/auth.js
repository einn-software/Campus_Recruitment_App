const router = require("express").Router();
const session = require("express-session");
const MongoStore = require("connect-mongo")(session); //MongoDB session store for Connect and Express
const mongoose = require("mongoose");
const verified = require("../config/verifyToken");
//importing functions from Controller files
const {
  UploadFiles,
  UploadLogFiles
} = require("../controller/uploadAndRegisterStudent");
const {
  AdminRegister,
  StudentRegister,
  TpoRegister,
} = require("../controller/registerController");

const {
  AdminLogin,
  StudentLogin,
  TpoLogin,
} = require("../controller/loginController");

const {
  CollegeAdd,
  CollegeDelete,
  CollegeGet,
  CollegeGetByCode,
  CollegePut,
} = require("../controller/collegeRouteController");

const {
  AdminDelete,
  AdminGet,
  AdminGetById,
  AdminPut,
  StudentDelete,
  StudentGet,
  StudentGetById,
  StudentPut,
  TpoDelete,
  TpoGet,
  TpoGetBtId,
  TpoPut,
} = require("../controller/getPutDeleteController");

const {
  InstructionDelete,
  InstructionGet,
  InstructionGetById,
  InstructionPut,
  InstructionAdd,
  InstructionDeleteAtOnce,
} = require("../controller/instructionController");

const {
  QuestionAdd,
  QuestionGet,
  QuestionGetById,
  QuestionPut,
  QuestionDelete,
  QuestionPaperAdd,
  QuestionPaperGet,
  QuestionPaperIdGetByTpo,
  QuestionPaperGetById,
  QuestionPaperPut,
  QuestionPaperPatch,
  QuestionPaperDelete,
  AllQuestionPaperGet
} = require("../controller/examinationController");

const {
  AnswerSheetAdd,
  AnswerSheetGetById,
  AnswerSheetPut,
  AnswerSheetDeleteById,
  AnswerSheetDeleteByStudentId,
} = require("../controller/studentAnswerSheet");

const {
  ResultAdd,
  ResultGetByPaperIdAndCode,
  ResultGetByPaperIdRollAndCode,
} = require("../controller/resultController");

const {
  AdminForgotPassword,
  AdminResetPassword,
  TpoForgotPassword,
  TpoResetPassword,
  StudentForgotPassword,
  StudentResetPassword,
} = require("../controller/changePasswordController");

const {
  FinalSubmissionPost
} = require("../controller/finalSubmission");

router.use(
  session({
    secret: `${process.env.TOKEN_SECRET}`,
    resave: false, //Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: true, //Forces a session that is "uninitialized" to be saved to the store
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      dbName: "session",
    })
  })
);
router.post("/upload/android-logs", UploadLogFiles);
router.post("/upload", verified, UploadFiles);

//Admin Register API
router.post("/register/admins", AdminRegister);
router.get("/admins", verified, AdminGet);
router.get("/admins/:id", verified, AdminGetById);
router.put("/admins/:id", verified, AdminPut);
router.delete("/admins/:id", verified, AdminDelete);

//Student Register API
router.post("/register/students", StudentRegister);
router.get("/colleges/:code/students", verified, StudentGet);
router.get("/students/:id", verified, StudentGetById);
router.put("/students/:id", verified, StudentPut);
router.delete("/students/:id", verified, StudentDelete);

//Tpo Register API
router.post("/register/tpos", TpoRegister);
router.get("/tpos", verified, TpoGet);
router.get("/tpos/:id", verified, TpoGetBtId);
router.put("/tpos/:id", verified, TpoPut);
router.delete("/tpos/:id", verified, TpoDelete);

//Login API
router.post("/login/admins", AdminLogin);
router.post("/login/students", StudentLogin);
router.post("/login/tpos", TpoLogin);

// College API
router.post("/colleges", verified, CollegeAdd);
router.get("/colleges/:code", verified, CollegeGetByCode);
router.get("/colleges", CollegeGet);
router.put("/colleges/:code", verified, CollegePut);
router.delete("/colleges/:id", verified, CollegeDelete);

// Instructions API
router.post("/instructions", verified, InstructionAdd);
router.get("/instructions", verified, InstructionGet);
router.get("/instructions/:id", verified, InstructionGetById);
router.put("/instructions/:id", verified, InstructionPut);
router.delete("/instructions/:id", verified, InstructionDelete);
router.delete("/instructions", verified, InstructionDeleteAtOnce);

//Question Collection API
router.post("/questions", verified, QuestionAdd);
router.get("/questions", verified, QuestionGet);
router.get("/questions/:id", verified, QuestionGetById);
router.put("/questions/:id", verified, QuestionPut);
router.delete("/questions/:id", verified, QuestionDelete);

//Question Paper API
router.post("/question-papers", verified, QuestionPaperAdd);
router.get("/question-paper", verified, AllQuestionPaperGet);
router.get("/colleges/:code/question-papers/:year", verified, QuestionPaperGet);
router.get("/question-papers/:code", verified, QuestionPaperIdGetByTpo);
router.get("/question-papers/:id/questions", verified, QuestionPaperGetById);
router.put("/question-papers/:id", verified, QuestionPaperPut);
router.delete("/question-papers/:id", verified, QuestionPaperDelete);

//HTTP Patch
router.patch("/question-papers/:id", QuestionPaperPatch);

//Student Answer Sheet API
router.post("/student-answers", verified, AnswerSheetAdd);
router.get(
  "/student-answers/:student_id/:question_paper_id",
  verified,
  AnswerSheetGetById
);
router.put("/student-answers/:id", verified, AnswerSheetPut);
router.delete("/student-answers/:id", verified, AnswerSheetDeleteById);
router.delete(
  "/student-answer/:student_id/:question_paper_id",
  verified,
  AnswerSheetDeleteByStudentId
);

//Result API
router.post("/results", verified, ResultAdd);
router.get(
  "/colleges/:code/results/:question_paper_id",
  verified,
  ResultGetByPaperIdAndCode
);
router.get(
  "/colleges/:code/results/:roll/question-papers/:question_paper_id",
  verified,
  ResultGetByPaperIdRollAndCode
);

// Forgot and Reset Password API
router.post("/forgot-password/admins", AdminForgotPassword);
router.post("/reset-password/admins", AdminResetPassword);
router.post("/forgot-password/tpos", TpoForgotPassword);
router.post("/reset-password/tpos", TpoResetPassword);
router.post("/forgot-password/students", StudentForgotPassword);
router.post("/reset-password/students", StudentResetPassword);

// Final Submission API
router.post("/final-submission", verified, FinalSubmissionPost);

module.exports = router;
