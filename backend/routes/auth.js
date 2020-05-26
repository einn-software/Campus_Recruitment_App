const router = require("express").Router();
const session = require("express-session");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")(session); //MongoDB session store for Connect and Express
const regcontroller = require("../controller/registerController");
const logController = require("../controller/loginController");
const examController = require("../controller/examinationController");
const resultController = require("../controller/resultController");
const instructionController = require("../controller/instructionController");

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

//Admin Register
router.post("/register/admins", regcontroller.AdminRegister);
router.get("/admins/:id", regcontroller.AdminGet);
router.put("/admins/:id", regcontroller.AdminPut);
router.delete("/admins/:id", regcontroller.AdminDelete);

//Student Register
router.post("/register/students", regcontroller.StudentRegister);

//Tpo Register
router.post("/register/tpos", regcontroller.TpoRegister);
router.get("/tpos/:id", regcontroller.TpoGet);
router.put("/tpos/:id",regcontroller.TpoPut);
router.delete("/tpos/:id", regcontroller.TpoDelete);

//Login
router.post("/login/admins", logController.AdminLogin);
router.post("/login/students", logController.StudentLogin);
router.post("/login/tpos", logController.TpoLogin);

//Question Collection
router.post("/questioncollection", examController.QuestionCollectionCont);
router.get("/questionCollection/:id", examController.QuestionCollectionContGet);
router.put("/questioncCollection/:id", examController.QuestionCollectionContPut);
router.delete("/questionCollection/:id",examController.QuestionCollectionContDelete);

//Question Paper
router.post("/questionPaper", examController.QuestionPaperCont);
router.get("/questionPaper/:college_code",examController.QuestionPaperContGet);
router.put("/questionPaper/:college_code",examController.QuestionPaperContPut);
router.delete("/questionPaper/:college_code",examController.QuestionPaperContDelete);

//Result
router.post("/results", resultController.ResultCont);
router.get("/colleges/:code/results/:question-paper-id",resultController.ResultContGet);

//Instruction
router.post("/instructions", instructionController.InstructionCont);
router.get("/instruction/:id", instructionController.InstructionContGet);
router.put("/instruction/:id",instructionController.InstructionContPut);
router.delete("/instruction/:id", instructionController.InstructionContDelete);

module.exports = router;
