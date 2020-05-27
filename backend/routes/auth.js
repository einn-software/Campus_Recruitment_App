const router = require("express").Router();
const session = require("express-session");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")(session); //MongoDB session store for Connect and Express
const {
  AdminRegister,
  StudentRegister,
  TpoRegister
} = require("../controller/registerController");
const {
  AdminLogin,
  StudentLogin,
  TpoLogin
} = require("../controller/loginController");
const {
  collegeAdd,
  collegeDelete,
  collegeGet,
  collegeGetById,
  collegePut
} = require('../controller/collegeRouteController');
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
  TpoPut
} = require('../controller/getPutDeleteController')
//const {} = require("../controller/examinationController");
//const resultController = require("../controller/resultController");
const {
  instructionDelete,
  instructionGet,
  instructionGetById,
  instructionPut,
  instructionAdd
} = require("../controller/instructionController");

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
router.post("/register/admins", AdminRegister);
router.get("/admins", AdminGet)
router.get("/admins/:id", AdminGetById);
router.put("/admins/:id", AdminPut);
router.delete("/admins/:id", AdminDelete);

//Student Register
router.post("/register/students", StudentRegister);
router.get("/students", StudentGet)
router.get("/students/:id", StudentGetById);
router.put("/students/:id", StudentPut);
router.delete("/students/:id", StudentDelete);

//Tpo Register
router.post("/register/tpos", TpoRegister);
router.post("/tpos", TpoGet)
router.get("/tpos/:id", TpoGetBtId);
router.put("/tpos/:id", TpoPut);
router.delete("/tpos/:id", TpoDelete);

//Login
router.post("/login/admins", AdminLogin);
router.post("/login/students", StudentLogin);
router.post("/login/tpos", TpoLogin);

// College Apis
router.post("/colleges", collegeAdd);
router.get("/colleges/:id", collegeGetById);
router.get("/collegess", collegeGet);
router.put("/colleges/:id", collegePut);
router.delete("/colleges/:id", collegeDelete);

// Instructions api
router.post("/instructions", instructionAdd)
router.get("/instructions", instructionGet)
router.get("/instructions/:id", instructionGetById);
router.put("/instructions/:id", instructionPut);
router.delete("/instructions/:id", instructionDelete);

// //Question Collection
// router.post("/questioncollection", examController.QuestionCollectionCont);
// router.get("/questionCollection/:id", examController.QuestionCollectionContGet);
// router.put("/questioncCollection/:id", examController.QuestionCollectionContPut);
// router.delete("/questionCollection/:id",examController.QuestionCollectionContDelete);

// //Question Paper
// router.post("/questionPaper", examController.QuestionPaperCont);
// router.get("/questionPaper/:college_code",examController.QuestionPaperContGet);
// router.put("/questionPaper/:college_code",examController.QuestionPaperContPut);
// router.delete("/questionPaper/:college_code",examController.QuestionPaperContDelete);

// //Result
// router.post("/results", resultController.ResultCont);
// router.get("/colleges/:code/results/:question-paper-id",resultController.ResultContGet);

// //Instruction
// router.post("/instructions", instructionController.InstructionCont);
// router.get("/instruction/:id", instructionController.InstructionContGet);
// router.put("/instruction/:id",instructionController.InstructionContPut);
// router.delete("/instruction/:id", instructionController.InstructionContDelete);


module.exports = router;