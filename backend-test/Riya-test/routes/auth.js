const router = require('express').Router();
const Admin = require('../model/Admin');
const College = require('../model/College');
const Tpo = require('../model/Tpo');
const Student = require('../model/Student');
const testinstructions = require('../model/instruction');
const Results = require('../model/Results');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {ResultsValidation, testinstructionsValidation, adminRegisterValidation, studentRegisterValidation, collegeRegisterValidation, tpoRegisterValidation, loginValidation, } = require('../validation');


//Admin Register
router.post('/adminregister', async (req, res) => {
    
    //LETS VALIDATE THE DATA BEFORE WE MAKE A USER
    const { error } = adminRegisterValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    //Checking if the user is already in the database
    const emailExist = await Admin.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('Email already exist');

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create a new user
    const admin = new Admin({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        phone: req.body.phone,
    });
    try{
        const savedUser = await admin.save();
        res.send({ admin: admin._id});
        // res.send(savedUser);
    }catch(err){
        res.status(400).send(err);
    }
});

//College Register
router.post('/collegeregister', async (req, res) => {
    
    //LETS VALIDATE THE DATA BEFORE WE MAKE A USER    
    const { error } = collegeRegisterValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Checking if the user is already in the database
    const emailExist = await College.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('Email already exist');

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create a new user
    const college = new College({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        phone: req.body.phone,
        code: req.body.code,
        address: req.body.address,
    });
    try{
        const savedUser = await college.save();
        res.send({ college: college._id});
    }catch(err){
        res.status(400).send(err);
    }
});

//TPO Register
router.post('/tporegister', async (req, res) => { 

   // LETS VALIDATE THE DATA BEFORE WE MAKE A USER    
    const { error } = tpoRegisterValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
  //Checking if the user is already in the database
    const emailExist = await Tpo.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('Email already exist');
 
    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

   // Create a new user
    const tpo = new Tpo({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        phone: req.body.phone,
        designation: req.body.designation,
        college: req.body.college,
    });
    try{
        const savedUser = await tpo.save();
        res.send({tpo: tpo._id});
    }catch(err){
        res.status(400).send(err);
    }
});

//Student Register
router.post('/studentregister', async (req, res) => { 

    // LETS VALIDATE THE DATA BEFORE WE MAKE A USER    
     const { error } = studentRegisterValidation(req.body);
     if (error) return res.status(400).send(error.details[0].message);
     
   //Checking if the user is already in the database
     const emailExist = await Tpo.findOne({email: req.body.email});
     if(emailExist) return res.status(400).send('Email already exist');
  
     //Hash password
     const salt = await bcrypt.genSalt(10);
     const hashedPassword = await bcrypt.hash(req.body.password, salt);
 
    // Create a new user
     const student = new Student({
         name: req.body.name,
         email: req.body.email,
         password: hashedPassword,
         phone: req.body.phone,
         roll: req.body.roll,
         branch: req.body.branch,
         college: req.body.college,
     });
     try{
         const savedUser = await student.save();
         res.send({student: student._id});
     }catch(err){
         res.status(400).send(err);
     }
 });


 //Student LOGIN
 router.post('/studentlogin',async(req, res) => {
     const { error } = loginValidation(req.body);
     if (error) return res.status(400).send(error.details[0].message);
     //Checking if the user is already in the database
     const student = await student.findOne({email: req.body.email});
     if(!student) return res.status(400).send('Email not found');
     //Check if the password is correct
     const validPass = await bcrypt.compare(req.body.password, student.password);
     if(!validPass) return res.status(400).send('Invalid password');
     //Create and assign a token
     const token = jwt.sign({_id: student._id}, process.env.TOKEN_SECRET);
     res.header('auth-token', token).send(token);
 });

//LOGIN COLLEGE
router.post('/collegelogin',async(req, res) => {
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    //Checking if the user is already in the database
    const college = await College.findOne({email: req.body.email});
    if(!college) return res.status(400).send('Email not found');
    //Check if the password is correct
    const validPass = await bcrypt.compare(req.body.password, college.password);
    if(!validPass) return res.status(400).send('Invalid password');
    //Create and assign a token
    const token = jwt.sign({_id: college._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);
});

//LOGIN TPO
router.post('/tpologin',async(req, res) => {
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    //Checking if the user is already in the database
    const tpo = await Tpo.findOne({email: req.body.email});
    if(!tpo) return res.status(400).send('Email not found');
    //Check if the password is correct
    const validPass = await bcrypt.compare(req.body.password, tpo.password);
    if(!validPass) return res.status(400).send('Invalid password');
    //Create and assign a token
    const token = jwt.sign({_id: tpo._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);
});

//LOGIN ADMIN
router.post('/adminlogin',async(req, res) => {
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    //Checking if the user is already in the database
    const admin = await Admin.findOne({email: req.body.email});
    if(!admin) return res.status(400).send('Email not found');
    //Check if the password is correct
    const validPass = await bcrypt.compare(req.body.password, admin.password);
    if(!validPass) return res.status(400).send('Invalid password');
    //Create and assign a token
    const token = jwt.sign({_id: admin._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);
});


//testinstructions

router.post('/testinstructions',async(req,res) => {

    //LETS VALIDATE THE DATA BEFORE WE ADD A INSTRUCTION
    const { error } = testinstructionsValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);   

    // Create a new instruction
    const instructions = new testinstructions({
        college: req.body.college,
        message: req.body.message,
    });
    try{
        const savedinstructions = await instructions.save();
        res.send({ instructions: instructions._id});
        // res.send(savedinstructions);
    }catch(err){
        res.status(400).send(err);
    }
});


//Results 


router.post('/result', async (req, res) => { 

    // LETS VALIDATE THE DATA BEFORE WE MAKE A USER    
     const { error } = ResultsValidation(req.body);
     if (error) return res.status(400).send(error.details[0].message);
     
    
    // Create Result
     const Result = new Results({
         student_id: req.body.student_id,
         question_paper_id: req.body.question_paper_id,
         question_attempt: req.body.question_attempt,
         correct_attempt: req.body.correct_attempt,
         total_marks_scored: req.body.total_marks_scored,
     });
     try{
         const savedResult = await Result.save();
         res.send({Result: Result._id});
     }catch(err){
         res.status(400).send(err);
     }
 });




module.exports = router;